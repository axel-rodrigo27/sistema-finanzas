document.addEventListener("DOMContentLoaded", () => {
    // 1. Consulto la sesión
    const idUsuario = localStorage.getItem("id_usuario");
    if (!idUsuario) {
        // Si no está lo mando al login
        window.location.href = "./index.html";
        return;
    }

    // 2. Elementos del Modal
    const modal = document.getElementById("modal-cerrar-sesion");
    const btnAbrirModal = document.getElementById("btn-cerrar-sesion");
    const btnConfirmarSalir = document.getElementById("btn-confirmar-salir");
    const btnCancelarModal = document.getElementById("btn-cancelar-modal");
    const btnCancelarModalX = document.getElementById("btn-cancelar-modal-x");

    // Abrir el modal al tocar el botón de la barra superior
    if (btnAbrirModal && modal) {
        btnAbrirModal.addEventListener("click", () => {
            modal.classList.add("is-active"); // Bulma muestra el modal con esta clase
        });
    }

    // Función auxiliar para cerrar el modal
    const cerrarModal = () => {
        modal.classList.remove("is-active");
    };

    // Cancelar / Cerrar modal
    if (btnCancelarModal) btnCancelarModal.addEventListener("click", cerrarModal);
    if (btnCancelarModalX) btnCancelarModalX.addEventListener("click", cerrarModal);

    // Confirmar salida desde el botón del modal ("Sí, salir")
    if (btnConfirmarSalir) {
        btnConfirmarSalir.addEventListener("click", () => {
            // Borramos el id
            localStorage.removeItem("id_usuario");
            // Lo mandamos al login
            window.location.href = "./index.html";
        });
    }
    //ahora tmb cargamos los ultimos 3 movimientos desde el backend
    cargarUltimosMovimientos(idUsuario);
    cargarResumenTarjetas(idUsuario);
});
async function cargarResumenTarjetas(idUsuario) {
    try {
        const [resIngresos, resGastos, resCapital] = await Promise.all([
            fetch(`http://localhost:8000/api/v1/movimientos/ingresos/total?usuario_id=${idUsuario}`),
            fetch(`http://localhost:8000/api/v1/movimientos/gastos/total?usuario_id=${idUsuario}`),
            fetch(`http://localhost:8000/api/v1/movimientos/capital/total?usuario_id=${idUsuario}`)
        ]);

        if (!resIngresos.ok || !resGastos.ok || !resCapital.ok) {
            throw new Error("Error en alguna de las peticiones de totales");
        }

        const dataIngresos = await resIngresos.json();
        const dataGastos = await resGastos.json();
        const dataCapital = await resCapital.json();

        // Nodos del HTML
        const elemIngresos = document.getElementById("total-ingresos");
        const elemGastos = document.getElementById("total-gastos");
        const elemBalance = document.getElementById("total-balance");

        // Formateo y renderizado
        if (elemIngresos) {
            elemIngresos.textContent = `$ ${Number(dataIngresos.suma_total).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
        }
        if (elemGastos) {
            elemGastos.textContent = `$ ${Number(dataGastos.suma_total).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
        }
        if (elemBalance) {
            elemBalance.textContent = `$ ${Number(dataCapital.suma_total).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
        }

    } catch (error) {
        console.error("Error al obtener los totales de las tarjetas:", error);
    }
}
async function cargarUltimosMovimientos(idUsuario) {
    try {
        // Apuntamos al endpoint /ultimos
        const respuesta = await fetch(`http://localhost:8000/api/v1/movimientos/ultimos?usuario_id=${idUsuario}`);
        
        if (!respuesta.ok) {
            throw new Error("Error al obtener los movimientos");
        }

        const movimientos = await respuesta.json();
        const tablaContainer = document.getElementById("tabla-movimientos");

        if (!tablaContainer) return;

        // Si el usuario no tiene movimientos registrados
        if (movimientos.length === 0) {
            tablaContainer.innerHTML = `
                <tr>
                    <td colspan="5" class="has-text-centered has-text-grey py-4">
                        No hay movimientos registrados.
                    </td>
                </tr>`;
            return;
        }

        // Renderizamos las filas directamente (el backend ya envía máximo 3)
        tablaContainer.innerHTML = movimientos.map(mov => `
            <tr>
                <td>
                    <span class="tag ${mov.tipo === 'ingreso' ? 'is-success' : 'is-danger'}">
                        ${mov.tipo}
                    </span>
                </td>
                <td class="has-text-weight-bold">$ ${mov.monto}</td>
                <td>${mov.categoria || mov.id_categoria || 'Sin categoría'}</td>
                <td>${mov.descripcion || '-'}</td>
                <td>${new Date(mov.fecha_registro).toLocaleDateString()}</td>
            </tr>
        `).join("");

    } catch (error) {
        console.error("Error al cargar la tabla:", error);
    }
}