-- 1. TABLA DE USUARIOS
CREATE TABLE usuarios (
    correo VARCHAR(100) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABLA DE CATEGORÍAS (Catálogo para Ingresos, Gastos y Deudas)
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    tipo_asociado VARCHAR(20) NOT NULL
);

-- 3. TABLA DE ESTADOS DE CUENTAS (Catálogo de Estados)
CREATE TABLE estado_cuenta (
    id_estado INT PRIMARY KEY,
    nombre_estado VARCHAR(30) NOT NULL
);
-- Carga inicial de catálogo de estados
INSERT INTO estado_cuenta (id_estado, nombre_estado) VALUES 
(1, 'PENDIENTE'),
(2, 'SALDADO');

-- 4. TABLA DE MOVIMIENTOS (Ganancias y Gastos Diarios)
CREATE TABLE movimientos (
    id_movimiento SERIAL PRIMARY KEY,
    correo_usuario VARCHAR(100) REFERENCES usuarios(correo) ON DELETE CASCADE,
    tipo VARCHAR(15) NOT NULL, -- 'GANANCIA' o 'GASTO'
    monto DECIMAL(12, 2) NOT NULL,
    id_categoria INT REFERENCES categorias(id_categoria),
    descripcion TEXT,
    fecha_operacion DATE DEFAULT CURRENT_DATE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABLA DE CUENTAS PENDIENTES (Deudores a Pagar y a Cobrar)
CREATE TABLE cuentas_pendientes (
    id_cuenta SERIAL PRIMARY KEY,
    correo_usuario VARCHAR(100) REFERENCES usuarios(correo) ON DELETE CASCADE,
    tipo VARCHAR(20) NOT NULL, -- 'A_PAGAR' o 'A_COBRAR'
    entidad VARCHAR(100) NOT NULL, -- Nombre de la persona/proveedor
    monto DECIMAL(12, 2) NOT NULL,
    id_estado INT REFERENCES estado_cuenta(id_estado) DEFAULT 1, -- 1 = PENDIENTE
    id_categoria INT REFERENCES categorias(id_categoria),
    fecha_emision DATE DEFAULT CURRENT_DATE,
    fecha_vencimiento DATE,
    fecha_pago TIMESTAMP,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);