create database crud_node;

use crud_node;

create table persona ( 
	id INT NOT NULL auto_increment,
    nombre varchar(50) NOT NULL,
    direccion varchar(150),
    telefono varchar(10),
    primary key(id)
);

insert into persona(nombre, direccion, telefono) values("Juan", "Calle 27383 Col.Centro", "6672787666");