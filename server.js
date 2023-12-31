const express = require('express');
const inquirer = require('inquirer');
require('console.table');
const db = require('./config/connection.js');

const PORT = process.envPORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const departmentAll = () => {
    db.query(`SELECT name as Name FROM department;`, (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log('All departments listed.');
        console.table(res);
        prompter();
    });
};
const departmentAdd = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What deparment would you like to add?',
            name: 'dept'
        }
    ]).then((data) => {
        db.query(`INSERT INTO department(name) VALUES (?);`,
            [data.dept],
            (err) => {
                if (err) throw err;
                console.log('New department added.');
                console.table(data);
                prompter();
            });
    });
};

const employeeAll = () => {
    db.query(`SELECT first_name as "First Name", last_name as "Last Name", role_id as Role, manager_id as Manager FROM employees;`, (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log('All employees listed.');
        console.table(res);
        prompter();
    });
};

const employeeAdd = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee\'s first name?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the employee\'s last name?',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'What is the employee\'s role ID?',
            name: 'roleId'
        },
        {
            type: 'input',
            message: 'What is the employee\'s manager ID?',
            name: 'managerId'
        }
    ]).then((data) => {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`,
            [data.firstName, data.lastName, data.roleId, data.managerId],
            (err) => {
                if (err) throw err;
                console.log('New employee added.');
                prompter();
            });
    });
};

const roleAll = () => {
    db.query(`SELECT title as Title, salary as Salary, department_id as "Department ID" FROM role;`, (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log('All roles listed.');
        console.table(res);
        prompter();
    });
};

const roleAdd = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Which role would you like to add?',
            name: 'role'
        },
        {
            type: 'input',
            message: 'What is the salary?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the department`s id number?',
            name: 'deptRole'
        }
    ]).then((data) => {
        db.query(`INSERT INTO role(title, salary, department_id) VALUES (?,?,?);`,
            [data.role, data.salary, data.deptRole],
            (err) => {
                if (err) throw err;
                console.log('New role added.');
                console.table(data);
                prompter();
            });
    });
};

const employeeRoleUpdate = () => {
    db.query(`SELECT * FROM employees;`, (err, res) => {
        if (err) throw err;
        console.table(res);
    });
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee ID of the employee you want to update?',
            name: 'updateEmployee',
        },
        {
            type: 'input',
            message: 'To what role will the employee be updated?',
            name: 'updatedEmployeeRole'
        }
    ]).then((data) => {
        db.query(`UPDATE employees SET role_id = (?) WHERE id = (?);`,
            [data.updatedEmployeeRole, data.updateEmployee],
            (err) => {
                if (err) throw err;
                console.log('Employee information updated.');
                prompter();
            });
    });
};
const prompter = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompter',
            message: 'Please select an option.',
            choices: [
                'List All Departments',
                'List All Roles',
                'List All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee Role',
                'Quit'
            ]
        }
    ]).then((data) => {
        if (data.prompter === 'List All Departments') {
            departmentAll();
        };
        if (data.prompter === 'List All Roles') {
            roleAll();
        };
        if (data.prompter === 'List All Employees') {
            employeeAll();
        };
        if (data.prompter === 'Add A Department') {
            departmentAdd();
        };
        if (data.prompter === 'Add A Role') {
            roleAdd();
        };
        if (data.prompter === 'Add An Employee') {
            employeeAdd();
        };
        if (data.prompter === 'Update An Employee Role') {
            employeeRoleUpdate();
        };
        if (data.prompter === 'Quit') {
            quit();
        };
    });
};

db.connect((err) => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`You are now on port ${PORT}`);
    });
    prompter();
});

const quit = () => {
    console.log('Hasta luego, Amigo!');
    db.end();
    process.exit();
};