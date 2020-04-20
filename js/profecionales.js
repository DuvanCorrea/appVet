let listaTabla = document.getElementById("tbody-mascotas");
let btnAgregar = document.getElementById("btn-agregar");

const inpIdentificacion = document.getElementById("identificacion-profecional");
const inpPais = document.getElementById("pais-profecional");
const inpNombre = document.getElementById("nombre-profecional");
const inpApellido = document.getElementById("apellido-profecional");

const inputIndice = document.getElementById("input-indice");
let btnAgregarNuevo = document.getElementById("btn-nueva-mascota");
//console.log(listaTabla);

let profecionales = [
  {
    identificacion: "123456789",
    pais: "Colombia",
    nombre: "Pepe",
    apellido: "Moralez",
  },
  {
    identificacion: "987654321",
    pais: "Mexico",
    nombre: "Luis",
    apellido: "Iguita",
  },
];

//Listar mascotas
function listarProfecionales() {
  let html = profecionales
    .map((profecional, i) => {
      return `            <tr>
                            <th scope="row">${i}</th>
                            <td>${profecional.identificacion}</td>
                            <td>${profecional.nombre}</td>
                            <td>${profecional.apellido}</td>
                            <td>${profecional.pais}</td>
                            <td>
                                <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                                    <button type="button" class="btn btn-success btn-editar" data-indice=${i}
                                        data-toggle="modal" data-target="#exampleModal">
                                        <i class="far fa-edit" data-indice=${i}></i>
                                        Editar</button>
                                    <button type="button" class="btn btn-danger btn-eliminar" data-indice=${i}>
                                        <i class="far fa-trash-alt" data-indice=${i}></i>
                                        Eliminar</button>
                                </div>
                            </td>
                        </tr>`;
    })
    .join("");
  listaTabla.innerHTML = html;

  //agrega evento de eliminar a los botones eliminar
  Array.from(document.getElementsByClassName("btn-eliminar")).forEach((btn) => {
    btn.onclick = eliminarProfecional;
  });
  Array.from(document.getElementsByClassName("btn-editar")).forEach((btn) => {
    btn.onclick = editarProfecional;
  });
}
listarProfecionales();
console.log("a");

//Agregar mascota
function enviarProfecional() {
  const accion = btnAgregar.innerHTML;

  switch (accion) {
    case "Guardar":
      let profecionalGuardar = {
        identificacion: inpIdentificacion.value,
        nombre: inpNombre.value,
        apellido: inpApellido.value,
        pais: inpPais.value,
      };
      profecionales[inputIndice.value] = profecionalGuardar;
      break;

    case "Crear":
      let profecionalCrear = {
        identificacion: inpIdentificacion.value,
        nombre: inpNombre.value,
        apellido: inpApellido.value,
        pais: inpPais.value,
      };
      profecionales.push(profecionalCrear);
      break;
  }

  listarProfecionales();
}
btnAgregar.onclick = enviarProfecional;

//Eliminar profecional
function eliminarProfecional(e) {
  let i_nuevo = e.target.dataset.indice;
  let nuevosProfecionales = profecionales.filter((profecional, i) => {
    if (i != i_nuevo) {
      return profecional;
    }
  });
  profecionales = nuevosProfecionales;
  listarProfecionales();
}

//Editar profecional
function editarProfecional(e) {
  document.getElementById("btn-agregar").innerHTML = "Guardar";
  document
    .getElementById("btn-agregar")
    .setAttribute("class", "btn btn-success");

  const index = e.target.dataset.indice;
  const profecional = profecionales[index];

  inpIdentificacion.value = profecional.identificacion;
  inpNombre.value = profecional.nombre;
  inpPais.value = profecional.pais;
  inpApellido.value = profecional.apellido;
  inputIndice.value = index;

  document.getElementById(
    "modal-titulo"
  ).innerHTML = `Editando a ${profecional.nombre} ${profecional.apellido}`;
}

//Reestablcer boton del modal
function resetModal() {
  document.getElementById("btn-agregar").innerHTML = "Crear";
  document
    .getElementById("btn-agregar")
    .setAttribute("class", "btn btn-primary");

  inputIndice.value = undefined;
  inpNombre.value = "";
  inpApellido.value = "";
  inpPais.value = "Colombia";
  inpIdentificacion.value = "";

  document.getElementById("modal-titulo").innerHTML = `Nuevo profecional`;
}
btnAgregarNuevo.onclick = resetModal;
