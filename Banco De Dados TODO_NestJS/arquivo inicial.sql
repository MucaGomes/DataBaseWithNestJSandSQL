create database db_todo;

use db_todo;

select * from tb_tarefa;

INSERT INTO tb_tarefa(id, nome, descricao, responsavel, data, status) 
VALUES ('3', 'João', 'Dev FullStack Senior', 'Por cuidar da parte FullStack do site da empresa', '2022-09-09', '1');