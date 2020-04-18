let userList = document.getElementById("tbody");
let button = document.getElementById("btn-send");
let us;
let btnsEliminar = null;

function traerUsuarios() {
  //console.log(us);
  let usuarios = us;
  let usuariosRender = usuarios
    .map((user, indice) => {
      return `<tr>
        <td>${user.nombre}</td>
        <td>${user.apellido}</td>
        <td>${user.pais}</td>
        <td><button class="btn-delete" data-indice="${indice}">Eliminar</button></td>
    </tr>`;
    })
    .join("");
  //console.log(usuariosRender);

  userList.innerHTML = usuariosRender;

  btnsEliminar = document.getElementsByClassName("btn-delete");

  Array.from(btnsEliminar).forEach((btn) => {
    btn.onclick = eliminarDatos;
  });

  //console.log(btnsEliminar);
}

function enviarDatos() {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let pais = document.getElementById("select-country").value;

  let data = { nombre: nombre, apellido: apellido, pais: pais };

  fetch(`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((resJson) => {
      console.log("res pos", resJson);
      refrescar();
    });
}

function eliminarDatos(e) {
  //console.log("eliminando...");

  fetch(
    `https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${e.target.dataset.indice}`,
    {
      method: "DELETE",
    }
  )
    .then((res) => res.json())
    .then((res2) => {
      refrescar();
    });
}

function refrescar() {
  fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios")
    .then((respuesta) => respuesta.json())
    .then((resUsuarios) => {
      //console.log("resss", resUsuarios);
      us = resUsuarios;
      traerUsuarios();
    });
}

refrescar();

button.onclick = enviarDatos;
