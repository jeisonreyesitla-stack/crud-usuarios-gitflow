// logica del frontend para el crud
const form = document.getElementById("formUsuario");
const tabla = document.querySelector("#tablaUsuarios tbody");

// trae todos los usuarios y los pinta en la tabla
async function cargarUsuarios() {
  const res = await fetch("/api/usuarios");
  const usuarios = await res.json();
  tabla.innerHTML = "";
  usuarios.forEach(u => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${u.nombre}</td>
      <td>${u.email}</td>
      <td>
        <button onclick="editarUsuario(\'${u.id}\', \'${u.nombre}\', \'${u.email}\')">Editar</button>
        <button onclick="borrarUsuario(\'${u.id}\')">Borrar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// manda el usuario al editar
function editarUsuario(id, nombre, email) {
  document.getElementById("usuarioId").value = id;
  document.getElementById("nombre").value = nombre;
  document.getElementById("email").value = email;
}

// borra un usuario
async function borrarUsuario(id) {
  await fetch("/api/usuarios/" + id, { method: "DELETE" });
  cargarUsuarios();
}

// envia el form (crea o actualiza)
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("usuarioId").value;
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;

  if (id) {
    await fetch("/api/usuarios/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email })
    });
  } else {
    await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email })
    });
  }

  form.reset();
  document.getElementById("usuarioId").value = "";
  cargarUsuarios();
});

cargarUsuarios();
