create database projetointegrado;

use projetointegrado;


create table usuario(
    nome varchar(80),
    email varchar(80),
    telefone varchar(80),
    apartamento int,
    senha varchar(80),
    adm boolean default false
);

create table visitante(
    nome varchar(80),
    documento varchar(80),
    dt_visita datetime,
    restricao boolean default false
);

create table area(
    nome varchar(80),
    dt_reservado datetime
);



insert into usuario (nome,email,telefone,apartamento,senha,adm) VALUES ("administrador", "adiministrador","000","0", "123456", true);