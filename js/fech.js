const listaUsuarios = document.getElementById("lista-usuarios");
const boton = document.getElementById("boton");

function reqListener() {
  const usuarios = JSON.parse(this.responseText);
  console.log(usuarios);
  const usuariosRender = usuarios
    .map((usuario) => `<li>${usuario.nombre}</li>`)
    .join("");
  console.log(usuariosRender);
  listaUsuarios.innerHTML = usuariosRender;
}

function enviarDatos() {
  const data = { name: "monady 24" };
  // peticion post con fech

  fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((resJson) => console.log(resJson));

  // fin peticion fech

  //setTimeout(refrescar, 3000);
}

function refrescar() {
  peticion.open("GET", "https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios");
  peticion.send();
}

boton.addEventListener("click", enviarDatos);
