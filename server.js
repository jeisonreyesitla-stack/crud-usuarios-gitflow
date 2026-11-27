// server principal del crud de usuarios
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PUERTO = 3000;
const ARCHIVO_DATOS = path.join(__dirname, "usuarios.json");

app.use(express.json());
app.use(express.static("public"));

// lee los usuarios del archivo json
function leerUsuarios() {
  const data = fs.readFileSync(ARCHIVO_DATOS, "utf-8");
  return JSON.parse(data);
}

// guarda los usuarios en el archivo json
function guardarUsuarios(usuarios) {
  fs.writeFileSync(ARCHIVO_DATOS, JSON.stringify(usuarios, null, 2));
}

// obtener todos los usuarios
app.get("/api/usuarios", (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
});

// obtener un usuario por id
app.get("/api/usuarios/:id", (req, res) => {
  const usuarios = leerUsuarios();
  const usuario = usuarios.find(u => u.id === req.params.id);
  if (!usuario) {
    return res.status(404).json({ error: "usuario no encontrado" });
  }
  res.json(usuario);
});

// crear usuario nuevo
app.post("/api/usuarios", (req, res) => {
  const usuarios = leerUsuarios();
  const nuevoUsuario = {
    id: Date.now().toString(),
    nombre: req.body.nombre,
    email: req.body.email
  };
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  res.status(201).json(nuevoUsuario);
});

// actualizar usuario
app.put("/api/usuarios/:id", (req, res) => {
  const usuarios = leerUsuarios();
  const index = usuarios.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "usuario no encontrado" });
  }
  usuarios[index].nombre = req.body.nombre;
  usuarios[index].email = req.body.email;
  guardarUsuarios(usuarios);
  res.json(usuarios[index]);
});

// borrar usuario
app.delete("/api/usuarios/:id", (req, res) => {
  const usuarios = leerUsuarios();
  const usuariosFiltrados = usuarios.filter(u => u.id !== req.params.id);
  guardarUsuarios(usuariosFiltrados);
  res.json({ mensaje: "usuario borrado" });
});

// simula el pago y mejora la membresia del usuario
app.post("/api/usuarios/:id/pago", (req, res) => {
  const usuarios = leerUsuarios();
  const index = usuarios.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "usuario no encontrado" });
  }
  usuarios[index].membresia = "premium";
  guardarUsuarios(usuarios);
  res.json(usuarios[index]);
});

app.listen(PUERTO, () => {
  console.log("servidor corriendo en puerto " + PUERTO);
});


