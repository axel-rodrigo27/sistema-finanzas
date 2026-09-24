// URL base de tu API (Asegurate de que el puerto coincida con tu backend)
const API_URL = "http://localhost:8000/api/v1";

document.addEventListener("DOMContentLoaded", () => {
    // 1. Si el usuario ya ingresó antes, lo mandamos directo al inicio
    const idGuardado = localStorage.getItem("id_usuario");
    if (idGuardado) {
        window.location.href = "./inicio.html";
        return;
    }

    // 2. Escuchamos el envío del formulario
    const formAcceso = document.getElementById("form-acceso");
    if (formAcceso) {
        formAcceso.addEventListener("submit", procesarIngreso);
    }
});

async function procesarIngreso(e) {
    e.preventDefault(); // Evita que la página se recargue

    const inputCorreo = document.getElementById("correo-input");
    const mensajeError = document.getElementById("mensaje-error");
    
    // Limpiamos mensajes de error previos
    mensajeError.textContent = "";

    const correo = inputCorreo.value.trim();

    if (!correo) {
        mensajeError.textContent = "Por favor, ingresá un correo válido.";
        return;
    }

    try {
        // Envíamos el POST al endpoint de acceso
        const respuesta = await fetch(`${API_URL}/usuarios/acceder`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo: correo })
        });

        const datos = await respuesta.json();

        // Si la respuesta de la API no es exitosa (status distinto de 200/201)
        if (!respuesta.ok) {
            mensajeError.textContent = datos.error || "Ocurrió un error al ingresar.";
            return;
        }

        // AQUÍ RECIBÍS EL ID Y LO GUARDÁS:
        // datos.usuario.id_usuario viene directo de la BD
        localStorage.setItem("id_usuario", datos.usuario.id_usuario);
        localStorage.setItem("correo_usuario", datos.usuario.correo);

        // Redirigimos al usuario a la pantalla principal/dashboard
        window.location.href = "./inicio.html";

    } catch (error) {
        mensajeError.textContent = "No se pudo conectar con el servidor. Revisá si Docker está activo.";
    }
}