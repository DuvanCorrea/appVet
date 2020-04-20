let listaTabla = document.getElementById("tbody-mascotas");
let btnAgregar = document.getElementById("btn-agregar");
let inputNombreMascota = document.getElementById("nombre-mascota");
let inputTipoMascota = document.getElementById("tipo-mascota");
let inputPropietario = document.getElementById("nombre-propietario");
//console.log(listaTabla);

let mascotas = [
  {
    nombre: "Firulaius",
    tipo: "Perro",
    propietario: "Duvan",
  },
  {
    nombre: "Iris",
    tipo: "Conejo",
    propietario: "Fer",
  },
  {
    nombre: "Zeus",
    tipo: "Conejo",
    propietario: "Fer",
  },
];

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
                                    <button type="button" class="btn btn-success btn-editar">
                                        <i class="far fa-edit" ></i>
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
}
listarMascotas();

//Agregar mascota
function agregarMascota() {
  let mascota = {
    nombre: inputNombreMascota.value,
    tipo: inputTipoMascota.value,
    propietario: inputPropietario.value,
  };
  mascotas.push(mascota);
  listarMascotas();
}
btnAgregar.onclick = agregarMascota;

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
