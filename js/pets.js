let listaTabla = document.getElementById("tbody-mascotas");
let btnAgregar = document.getElementById("btn-agregar");
let inputNombreMascota = document.getElementById("nombre-mascota");
let inputTipoMascota = document.getElementById("tipo-mascota");
let inputPropietario = document.getElementById("nombre-propietario");
let inputIndice = document.getElementById("input-indice");
let btnAgregarNuevo = document.getElementById("btn-nueva-mascota");
//console.log(listaTabla);
let mascotas;
let uri = "http://localhost:3000/mascotas"

// obtiene mascotas del servidor y las lista 
async function traerMascotas() {
  mascotas = await fetch(uri)
    .then(res => res.json()).then(r => {
      mascotas = r;
      listarMascotas();
    })
}
traerMascotas()

//Listar mascotas
function listarMascotas() {
  let html = mascotas
    .map((mascota, i) => {
      return `            <tr>
                            <th scope="row">${i}</th>
                            <td>${mascota.nombre}</td>
                            <td>${mascota.tipo}</td>
                            <td>${mascota.propietario}</td>
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
    btn.onclick = eliminarMascota;
  });
  Array.from(document.getElementsByClassName("btn-editar")).forEach((btn) => {
    btn.onclick = editarMascota;
  });
}

//Agregar mascota
function enviarMascota() {
  const accion = btnAgregar.innerHTML;

  switch (accion) {
    case "Guardar":
      let mascotaGuardar = {
        nombre: inputNombreMascota.value,
        tipo: inputTipoMascota.value,
        propietario: inputPropietario.value,
      };
      console.log(inputIndice.value);
      mascotas[inputIndice.value] = mascotaGuardar;
      break;

    case "Crear":
      let mascotaCrear = {
        nombre: inputNombreMascota.value,
        tipo: inputTipoMascota.value,
        propietario: inputPropietario.value,
      };
      mascotas.push(mascotaCrear);
      break;
  }

  listarMascotas();
}
btnAgregar.onclick = enviarMascota;

//Eliminar mascota
function eliminarMascota(e) {
  let i_nuevo = e.target.dataset.indice;
  let nuevasMascotas = mascotas.filter((mascota, i) => {
    if (i != i_nuevo) {
      return mascota;
    }
  });
  mascotas = nuevasMascotas;
  listarMascotas();
}

//Editar mascota
function editarMascota(e) {
  document.getElementById("btn-agregar").innerHTML = "Guardar";
  document
    .getElementById("btn-agregar")
    .setAttribute("class", "btn btn-success");

  const index = e.target.dataset.indice;
  const mascota = mascotas[index];

  inputNombreMascota.value = mascota.nombre;
  inputTipoMascota.value = mascota.tipo;
  inputPropietario.value = mascota.propietario;
  inputIndice.value = index;

  document.getElementById(
    "modal-titulo"
  ).innerHTML = `Editando a ${mascota.nombre} de ${mascota.propietario}`;
}

//Reestablcer boton del modal
function resetModal() {
  document.getElementById("btn-agregar").innerHTML = "Crear";
  document
    .getElementById("btn-agregar")
    .setAttribute("class", "btn btn-primary");

  inputIndice.value = undefined;
  inputNombreMascota.value = "";
  inputPropietario.value = "Propietario";
  inputTipoMascota.value = "Perro";

  document.getElementById("modal-titulo").innerHTML = `Nueva mascota`;
}
btnAgregarNuevo.onclick = resetModal;
