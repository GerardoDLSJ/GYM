/*Creacion de la base de datos*/
CREATE DATABASE GYM;
/*Usar la base datos gym*/
USE GYM;
/*Creacion de la tabla */
CREATE TABLE Empleado(
	idEmpleado INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    idRolEmpleado INT NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellidoPaterno VARCHAR(30) NOT NULL,
    apellidMmaterno VARCHAR(30),
    edad INT NOT NULL,
    correo VARCHAR(99) UNIQUE NOT NULL,
    contraseña VARCHAR(40)  NOT NULL,
    FOREIGN KEY (idRolEmpleado) REFERENCES RolEmpleado(idRolEmpleado)      
);

CREATE TABLE RolEmpleado(
	idRolEmpleado INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    nombreRol VARCHAR(30) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    restriccion VARCHAR(100) NOT NULL
);

CREATE TABLE Cliente(
	idCliente INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    apellidoPaterno VARCHAR(30) NOT NULL,
    apellidMmaterno VARCHAR(30),
    edad INT NOT NULL,
    sexo ENUM ('M', 'F') NOT NULL,
    telefono VARCHAR (10) NOT NULL
);

CREATE TABLE TipoPago(
	idTipoPago INT PRIMARY KEY AUTO_INCREMENT,
    tipoPago VARCHAR(30) NOT NULL
);

CREATE TABLE TipoSuscripcion(
	idTipoSuscripcion INT PRIMARY KEY AUTO_INCREMENT,
    tipoSuscripcion VARCHAR(50) NOT NULL,
    costo DECIMAL(6,2) NOT NULL
);

CREATE TABLE UsuariosSuscritos(
	idUsuariosSuscritos INT PRIMARY KEY AUTO_INCREMENT,
    idTipoSuscripcion INT NOT NULL,
    idCliente INT NOT NULL,
    idTipoPago INT NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    FOREIGN KEY (idTipoSuscripcion) REFERENCES TipoSuscripcion(idTipoSuscripcion),
    FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
    FOREIGN KEY (idTipoPago) REFERENCES TipoPago(idTipoPago)   
);

CREATE TABLE HistorialSuscripcion(
	idHistorialSuscripcion INT PRIMARY KEY AUTO_INCREMENT,
    idUsuariosSuscritos INT NOT NULL,
    idEmpleado INT NOT NULL,
    idTipoModificacion INT NOT NULL,
    fechaModificacion DATE NOT NULL,
    FOREIGN KEY (idUsuariosSuscritos) REFERENCES UsuariosSuscritos(idUsuariosSuscritos),
    FOREIGN KEY (idEmpleado) REFERENCES Empleado(idEmpleado),
    FOREIGN KEY (idTipoModificacion) REFERENCES TipoModificacion(idTipoModificacion)   
);

CREATE TABLE TipoModificacion(
	idTipoModificacion INT PRIMARY KEY AUTO_INCREMENT,
    tipoModificacion VARCHAR(999) NOT NULL
);

CREATE TABLE Ventas(
	idVentas INT PRIMARY KEY AUTO_INCREMENT,
	idEmpleado INT NOT NULL,
    idUsuariosSuscritos INT NOT NULL,
    idTipoPago INT NOT NULL,
    cantidad DECIMAL(6,2) NOT NULL,    
    fechaVenta DATE NOT NULL,
    FOREIGN KEY (idUsuariosSuscritos) REFERENCES UsuariosSuscritos(idUsuariosSuscritos),
    FOREIGN KEY (idEmpleado) REFERENCES Empleado(idEmpleado),
    FOREIGN KEY (idTipoPago) REFERENCES TipoPago(idTipoPago)
);



/*INSERT*/
INSERT INTO Ventas(idEmpleado, idUsuariosSuscritos, idTipoPago, cantidad, fechaVenta) 
VALUE (1, 1, 1, 120, '2001-12-29');



/*
CREATE TABLE Categoria(
	idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    nombreCategoria VARCHAR(99) NOT NULL
);

CREATE TABLE Producto(
	idProducto INT PRIMARY KEY AUTO_INCREMENT,
    nombreProducto VARCHAR(40) NOT NULL,
    descripcion VARCHAR(300),
    cantidad INT NOT NULL,
    costo DECIMAL(6,2) NOT NULL,
    idCategoria INT NOT NULL,
    FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);

CREATE TABLE Horarios(
    idHorario INT PRIMARY KEY AUTO_INCREMENT,
    horario VARCHAR(40) NOT NULL,
    actividad VARCHAR(300)
);

CREATE TABLE Multas(
    idMultas INT PRIMARY KEY AUTO_INCREMENT,
    multa VARCHAR(40) NOT NULL,
    costo DECIMAL(6,2) NOT NULL
);

CREATE TABLE AsignacionMulta(
	idAsignacionMulta INT PRIMARY KEY AUTO_INCREMENT,
    idMultas INT,
    idUsuariosSuscritos INT
);

*/


 DROP DATABASE GYM;