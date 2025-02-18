DROP DATABASE IF EXISTS clinica;
CREATE DATABASE clinica;
USE clinica;

CREATE TABLE consultas(
    consulta_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    nome_paciente VARCHAR(255) NOT NULL,
    nome_medico VARCHAR(255) NOT NULL,
    data_hora DATETIME NOT NULL
);

INSERT INTO consultas VALUES(null,'João', 'Dr. Carlos', now());
INSERT INTO consultas VALUES(null,'Ana', 'Dr. Carlos', now());
INSERT INTO consultas VALUES(null,'Marcela', 'Dra. Lúcia', now());

Describe consultas;
SELECT * FROM consultas;

