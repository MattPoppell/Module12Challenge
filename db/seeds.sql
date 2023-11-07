USE employee_db;

INSERT INTO department (name)
VALUES  ("Research and Design"),
        ("Engineering"),
        ("Testing"),
        ("Development");

INSERT INTO role (title, salary, department_id)
VALUES  ("Researcher", 45000, 1),
        ("Engineer", 75000, 2),
        ("Designer", 45000, 1),
        ("Tester", 74000, 3),
        ("Developer", 95000, 4),
        ("Engineer Assistant", 50000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Jimmy", "Smith", 1, NULL), 
        ("Tom", "Collins", 2, 1),
        ("Johnny", "Walker", 3, NULL), 
        ("Queen", "Elizabeth", 4, 7),
        ("Ron", "Swanson", 5, 8),
        ("Davy", "Crockett", 6, 14), 
        ("Mike", "Jones", 5, NULL), 
        ("Conrad", "Magnusson", 4, 9), 
        ("Valiant", "Thor", 3, NULL), 
        ("Miles", "Davis", 2, NULL);