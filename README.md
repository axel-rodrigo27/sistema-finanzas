# 📊 Dashboard de Gestión Financiera y Control de Cuentas para Negocios

Una aplicación web de gestión financiera diseñada para pequeños comercios, emprendedores y PyMEs. Permite llevar un control riguroso del flujo de caja, gastos operativos y una gestión clara de las cuentas por cobrar y por pagar, transformando registros diarios en métricas visuales para la toma de decisiones.

---

## 🎯 El Problema de Negocio que Resuelve

Muchos pequeños negocios y emprendimientos llevan sus cuentas en cuadernos o planillas de cálculo desordenadas. Esto genera complicaciones operativas graves:

1. **Confusión en las deudas:** Dificultad para diferenciar entre el dinero que el negocio debe a sus proveedores y el dinero que los clientes le deben al negocio (fiado).
2. **Pérdida del flujo de caja real:** Mezclar compromisos futuros con el dinero disponible del día, lo que lleva a gastar más de lo que realmente se tiene.
3. **Falta de categorías estandarizadas:** Cargas inconsistentes (ejemplo: escribir "alquiler", "pago del local" o "expensas" para lo mismo), lo que impide entender en qué se va el dinero a fin de mes.
4. **Ausencia de visibilidad:** Imposibilidad de ver la salud del negocio de un vistazo sin tener que hacer cálculos manuales.

---

## 💡 La Solución

Esta plataforma centraliza la administración del negocio ofreciendo una interfaz ordenada, limpia y con procesos de carga seguros que evitan errores humanos. 

Cada usuario o negocio accede con su correo electrónico para gestionar su información de manera totalmente privada y aislada.

---

## 🚀 Módulos y Funcionalidades del Sistema

La aplicación se estructura en 6 secciones principales accesibles desde la barra de navegación:

### 🏠 1. Inicio (Carga Rápida)
* **Formulario centralizado:** Permite registrar cualquier movimiento (Ganancia, Gasto, Deuda a Pagar o Deuda a Cobrar) indicando monto, fecha, categoría fija y una breve descripción.
* **Mecanismo de confirmación (Modal):** Antes de guardar cualquier registro, el sistema solicita una confirmación en pantalla para evitar errores accidentales de tipeo o carga.

### 📈 2. Ganancias / Ingresos
* **Resumen de ingresos:** Muestra el total acumulado de dinero ingresado al negocio.
* **Historial detallado:** Tabla ordenada cronológicamente con el detalle de las ventas y servicios cobrados.

### 📉 3. Gastos
* **Control de egresos:** Permite monitorear el dinero destinado a la operación diaria (alquiler, servicios, sueldos, impuestos).
* **Categorización estandarizada:** Evita la contaminación de datos al restringir los tipos de gastos a opciones prefijadas.

### 🔴 4. Deudores a Pagar (Pasivos / Cuentas por Pagar)
Sección enfocada en los compromisos financieros del negocio (proveedores, préstamos, facturas pendientes):
* **Tabla de Deudas Activas:** Listado de compromisos pendientes con fecha límite y monto.
* **Acción de liquidación:** Incluye el botón **"Marcar como Pagado"**, que mueve automáticamente el registro a la tabla de historial para indicar que el compromiso fue saldado.
* **Historial de Deudas Saldadas:** Registro de consultas para auditoría de pagos pasados.

### 🟢 5. Deudores a Cobrar (Activos / Cuentas por Cobrar)
Sección dedicada al dinero que otros le deben al negocio (clientes, ventas a crédito, fiados):
* **Tabla de Cobros Pendientes:** Muestra quién debe, cuánto y desde cuándo.
* **Acción de cobro:** Incluye el botón **"Marcar como Cobrado"**, que confirma el ingreso del dinero y traslada el registro al historial.
* **Historial de Cobros Realizados:** Registro de los créditos que ya fueron cobrados exitosamente.

### 📊 6. Gráficos y Estadísticas (Dashboard Analítico)
* **Indicadores clave (KPIs):**
  * *Total Ganancias del Mes*
  * *Total Gastos Operativos*
  * *Balance Neto* (Dinero real disponible)
  * *Riesgo de Liquidez* (Comparativa entre lo que se debe pagar vs. lo que se tiene por cobrar)
* **Visualización dinámica:**
  * **Gráficos de Torta:** Distribución porcentual de los gastos por categoría para identificar fugas de dinero.
  * **Gráficos de Barras:** Comparativa general entre Ingresos, Gastos y Deudas.
  * **Filtros interactivos:** Posibilidad de filtrar los gráficos para ver vistas específicas (Solo Gastos, Solo Deudas o Vista General).

---

## 🚀 Endpoints de la API REST (v1)

| Módulo | Método | Endpoint | Descripción |
| :--- | :--- | :--- | :--- |
| **Usuarios** | `POST` | `/api/v1/usuarios/registro` | Registrar un nuevo usuario |
| | `POST` | `/api/v1/usuarios/login` | Iniciar sesión |
| | `GET` | `/api/v1/usuarios/perfil` | Obtener perfil del usuario |
| | `PUT` | `/api/v1/usuarios/perfil` | Modificar datos del perfil |
| | `DELETE` | `/api/v1/usuarios/perfil` | Eliminar la cuenta |
| **Inicio** | `GET` | `/api/v1/inicio/recientes` | Minitabla con los 3 registros recién añadidos |
| **Movimientos** | `GET` | `/api/v1/movimientos` | Listar todos los ingresos y gastos |
| *(Ingresos / Gastos)* | `GET` | `/api/v1/movimientos/:id` | Ver detalle de un movimiento |
| | `POST` | `/api/v1/movimientos` | Crear ingreso o gasto (desde Inicio, Ingresos o Gastos) |
| | `PUT` | `/api/v1/movimientos/:id` | Editar ingreso o gasto |
| | `DELETE` | `/api/v1/movimientos/:id` | Eliminar ingreso o gasto |
| **Deudas** | `GET` | `/api/v1/cuentas` | Listar todas las deudas y cobros |
| | `GET` | `/api/v1/cuentas/pendientes` | Listar deudas activas (`estado = 1`) |
| | `GET` | `/api/v1/cuentas/historial` | Listar cuentas saldadas (`estado = 2`) |
| | `POST` | `/api/v1/cuentas` | Crear deuda o cobro pendiente |
| | `PUT` | `/api/v1/cuentas/:id` | Editar datos de la cuenta |
| | `PATCH` | `/api/v1/cuentas/:id/saldar` | Pasar de PENDIENTE (`1`) a SALDADO (`2`) |
| | `DELETE` | `/api/v1/cuentas/:id` | Eliminar registro de deuda |
| **Categorías** | `GET` | `/api/v1/categorias` | Obtener catálogo de categorías |
| **Estadísticas** | `GET` | `/api/v1/estadisticas/resumen` | Datos para generar los gráficos y balances |

---

## 📌 Próximos Pasos (En Desarrollo)

* [ ] Implementación de la arquitectura de Base de Datos relacional.
* [ ] Desarrollo de la API backend.
* [ ] Integración de la interfaz gráfica y controladores.