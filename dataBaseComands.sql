CREATE database Lavadero;
USE Lavadero;

CREATE TABLE servicios(
	id bigint primary key auto_increment not null,
    detalle varchar(50) not null,
    valor double not null,
    estado varchar(10) not null);

CREATE TABLE Usuarios(
	idUsuario bigint primary key auto_increment not null,
    name varchar(50) not null,
    role varchar(10) not null,
    email varchar(50) not null);

CREATE TABLE ventas(
	id bigint primary key auto_increment not null,
    detalle varchar(50) not null,
    cantidad INT not null,
    fechaVenta date,
    valor double not null,
	documento varchar(50) not null,
	name varchar(50) not null,
    Responsable varchar(50) not null,
    estado varchar(10) not null);
