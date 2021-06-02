create database crud_node;

use crud_node;

create table categorias ( 
	ID INT NOT NULL auto_increment,
    Nombre varchar(50) NOT NULL,
    primary key(ID)
);

create table personal (
    ID INT NOT NULL auto_increment,
    Nombre varchar(50) NOT NULL,
    Apellidos varchar(80) NOT NULL,
    Telefono varchar(10) NULL,
    Direccion varchar(150) NULL,
    primary key(ID)
);

create table tickets (
    ID INT NOT NULL auto_increment,
    Nombre varchar(50) NOT NULL,
    Descripcion varchar(100) NULL,
    Prioridad char NOT NULL,
    Personal int NOT NULL,
    Categorias int NOT NULL,
    Estatus varchar(3) NOT NULL,
    primary key(ID),
    FOREIGN KEY (Personal) REFERENCES personal(ID),
    FOREIGN KEY (Categorias) REFERENCES categorias(ID)
);

insert into categorias(nombre) values("Consulta");
insert into categorias(nombre) values("Incidencia");
insert into categorias(nombre) values("Peticion de Servicio");

insert into personal(Nombre,Apellidos,Telefono,Direccion) values("Angel Emmanuel","Aviles LHopes", "6671234567","Residencia No. 513, Dubai");
insert into personal(Nombre,Apellidos,Telefono,Direccion) values("Guevi Jaziel","Torres Moreno", "6674567810","Shibuya, Tokyo Japon");
insert into personal(Nombre,Apellidos,Telefono,Direccion) values("Daniel Arnulfo","Torres Gomez", "6677901020","Villa Juarez, Navolato");

insert into tickets(Nombre,Descripcion,Prioridad,Personal,Categorias,Estatus) values("Problema al cargar","Tuve un problema al cargar materias este semestre", '2',1,2,"ABT");
insert into tickets(Nombre,Descripcion,Prioridad,Personal,Categorias,Estatus) values("Consulta del servicio social","Quisiera informacion sobre las fechas del servicio", '1',3,1,"ABT");
insert into tickets(Nombre,Descripcion,Prioridad,Personal,Categorias,Estatus) values("Peticion de kardex","Necesito mi kardex es urgente", '3',2,3,"ABT");