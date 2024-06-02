#!/bin/bash

# Ejecuta las sentencias SQL para crear las tablas
PGPASSWORD="ED" psql -h db -U "EDINSON" -d "text" <<EOF

--CREAR CLIENTE: 

CREATE TABLE Cliente (
id_cliente SERIAL PRIMARY KEY,
telefono VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
nombre VARCHAR(100) NOT NULL
);

--CREAR DIRECCION DEL CLIENTE:

CREATE TABLE direccion_cliente (
calle VARCHAR(50),
comuna VARCHAR(50),
barrio VARCHAR(50),
ciudad VARCHAR(50),
id_cliente INT NOT NULL,
CONSTRAINT fk_direccion_cliente
FOREIGN KEY(id_cliente)
REFERENCES Cliente(id_cliente)
);

--CREAR SUCURSAL: 

CREATE TABLE Sucursal (
id_sucursal SERIAL PRIMARY KEY,
telefono VARCHAR(10) NOT NULL,
nombre VARCHAR(100) NOT NULL,
id_cliente INT,

CONSTRAINT fk_sucursal_cliente 

FOREIGN KEY (id_cliente) 

REFERENCES Cliente(id_cliente)

);

--CREAR DIRECCION DE LA SUCURSAL: 

CREATE TABLE direccion_sucursal (

id_direccion SERIAL PRIMARY KEY,
calle VARCHAR(50),
comuna VARCHAR(50),
barrio VARCHAR(50),
ciudad VARCHAR(50),

id_sucursal INT NOT NULL,

CONSTRAINT fk_direccion_sucursal 

FOREIGN KEY(id_sucursal) 

REFERENCES Sucursal(id_sucursal)
);

--CREAR MENSAJERO: 

CREATE TABLE Mensajero (
id_mensajero INT PRIMARY KEY,
telefono VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL,
nombre VARCHAR(100) NOT NULL
);

--CREAR DIRECCION DEL MENSAJERO: 

CREATE TABLE direccion_mensajero (
calle VARCHAR(50),
comuna VARCHAR(50),
barrio VARCHAR(50),
ciudad VARCHAR(50),
id_mensajero INT NOT NULL,
CONSTRAINT fk_direccion_mensajero
FOREIGN KEY(id_mensajero)
REFERENCES Mensajero(id_mensajero)
);

--CREAR TABLA DE LA RELACION CLIENTE-MENSAJERO:

CREATE TABLE cliente_mensajero (
id_cliente INT NOT NULL,
id_mensajero INT NOT NULL,
PRIMARY KEY (id_cliente, id_mensajero),
CONSTRAINT fk_cliente
FOREIGN KEY (id_cliente)
REFERENCES Cliente(id_cliente),
CONSTRAINT fk_mensajero
FOREIGN KEY (id_mensajero)
REFERENCES Mensajero(id_mensajero)
);

--CREAR  TABLA USUARIO: 

CREATE TABLE usuario(
login SERIAL PRIMARY KEY,
email VARCHAR(100) NOT NULL,
telefono VARCHAR(100) NOT NULL,
contraseña VARCHAR(100) NOT NULL
);

--CREAR DIRECCION USUARIO:

CREATE TABLE direccion_usuario (
calle VARCHAR(50),
comuna VARCHAR(50),
barrio VARCHAR(50),
ciudad VARCHAR(50),
login INT NOT NULL,
CONSTRAINT fk_direccion_usuario
FOREIGN KEY(login)
REFERENCES Usuario(login)
);

--CREAR TABLA DE LA RELACION CLIENTE-USUARIO:

CREATE TABLE cliente_usuario(
id_cliente INT NOT NULL,
login INT NOT NULL,
PRIMARY KEY (id_cliente, login),
CONSTRAINT fk_cliente
FOREIGN KEY (id_cliente)
REFERENCES Cliente(id_cliente),
CONSTRAINT fk_login
FOREIGN KEY(login)
REFERENCES Usuario(login)
);

--CREAR LA TABLA SERVICIO:

CREATE TABLE servicio(
codigo SERIAL PRIMARY KEY,
descripcion VARCHAR(100)
);

--CREAR TABLA DESTINO: 

CREATE TABLE destino (
calle VARCHAR(50),
comuna VARCHAR(50),
barrio VARCHAR(50),
ciudad VARCHAR(50),
codigo_servicio INT NOT NULL,
CONSTRAINT fk_destino_servicio
FOREIGN KEY(codigo_servicio)
REFERENCES Servicio(codigo)
);

--CREAR TABLA ORIGEN: 

CREATE TABLE origen (
calle VARCHAR(50),
comuna VARCHAR(50),
barrio VARCHAR(50),
ciudad VARCHAR(50),
codigo_servicio INT NOT NULL,
CONSTRAINT fk_origen_servicio
FOREIGN KEY(codigo_servicio)
REFERENCES Servicio(codigo)
);

--CREAR TABLA VEHICULO:

CREATE TABLE vehiculo (

id_vehiculo SERIAL PRIMARY KEY,
capacidad INT NOT NULL,
nombre VARCHAR(70)
);

--CREAR TABLA DE LA RELACION MENSAJERO-VEHICULO:

CREATE TABLE mensajero_vehiculo(
id_vehiculo INT NOT NULL,
id_mensajero INT NOT NULL,
PRIMARY KEY (id_vehiculo, id_mensajero),
CONSTRAINT fk_id_vehiculo 
FOREIGN KEY (id_vehiculo)
REFERENCES vehiculo(id_vehiculo),
CONSTRAINT fk_id_mensajero 
FOREIGN KEY(id_mensajero)
REFERENCES mensajero(id_mensajero)
);

--CREAR TABLA DE LA RELACION VEHICULO-SERVICIO:

CREATE TABLE vehiculo_servicio (
id_vehiculo INT NOT NULL,
codigo INT NOT NULL,
PRIMARY KEY (id_vehiculo, codigo),
CONSTRAINT fk_id_vehiculo FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(id_vehiculo),
CONSTRAINT fk_codigo_servicio FOREIGN KEY(codigo) REFERENCES servicio(codigo)
);

--CREAR TABLA REGISTRA: 

CREATE TABLE registra (
id SERIAL PRIMARY KEY,
usuario_id INT NOT NULL,
servicio_id INT NOT NULL,
hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
fecha DATE NOT NULL,
CONSTRAINT fk_usuario
FOREIGN KEY (usuario_id)
REFERENCES usuario (login),
CONSTRAINT fk_servicio
FOREIGN KEY (servicio_id)
REFERENCES servicio (codigo)
);

EOF
