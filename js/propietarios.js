let listaTabla = document.getElementById("tbody-mascotas");
let btnAgregar = document.getElementById("btn-agregar");

const inpIdentificacion = document.getElementById("identificacion-propietario");
const inpPais = document.getElementById("pais-propietario");
const inpNombre = document.getElementById("nombre-propietario");
const inpApellido = document.getElementById("apellido-propietario");

const inputIndice = document.getElementById("input-indice");
let btnAgregarNuevo = document.getElementById("btn-nueva-mascota");
//console.log(listaTabla);

let propietarios = [
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
function listarPropietarios() {
  let html = propietarios
    .map((propietario, i) => {
      return `            <tr>
                            <th scope="row">${i}</th>
                            <td>${propietario.identificacion}</td>
                            <td>${propietario.nombre}</td>
                            <td>${propietario.apellido}</td>
                            <td>${propietario.pais}</td>
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
    btn.onclick = eliminarPropietario;
  });
  Array.from(document.getElementsByClassName("btn-editar")).forEach((btn) => {
    btn.onclick = editarPropietario;
  });
}
listarPropietarios();
console.log("a");

//Agregar mascota
function enviarPropietario() {
  const accion = btnAgregar.innerHTML;

  switch (accion) {
    case "Guardar":
      let propietarioGuardar = {
        identificacion: inpIdentificacion.value,
        nombre: inpNombre.value,
        apellido: inpApellido.value,
        pais: inpPais.value,
      };
      propietarios[inputIndice.value] = propietarioGuardar;
      break;

    case "Crear":
      let propietarioCrear = {
        identificacion: inpIdentificacion.value,
        nombre: inpNombre.value,
        apellido: inpApellido.value,
        pais: inpPais.value,
      };
      propietarios.push(propietarioCrear);
      break;
  }

  listarPropietarios();
}
btnAgregar.onclick = enviarPropietario;

//Eliminar propietario
function eliminarPropietario(e) {
  let i_nuevo = e.target.dataset.indice;
  let nuevosPropietarios = propietarios.filter((propietario, i) => {
    if (i != i_nuevo) {
      return propietario;
    }
  });
  propietarios = nuevosPropietarios;
  listarPropietarios();
}

//Editar propietario
function editarPropietario(e) {
  document.getElementById("btn-agregar").innerHTML = "Guardar";
  document
    .getElementById("btn-agregar")
    .setAttribute("class", "btn btn-success");

  const index = e.target.dataset.indice;
  const propietario = propietarios[index];

  inpIdentificacion.value = propietario.identificacion;
  inpNombre.value = propietario.nombre;
  inpPais.value = propietario.pais;
  inpApellido.value = propietario.apellido;
  inputIndice.value = index;

  document.getElementById(
    "modal-titulo"
  ).innerHTML = `Editando a ${propietario.nombre} ${propietario.apellido}`;
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

  document.getElementById("modal-titulo").innerHTML = `Nuevo propietario`;
}
btnAgregarNuevo.onclick = resetModal;
