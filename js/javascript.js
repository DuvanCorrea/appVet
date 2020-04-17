const Mipromesa = (indice) => {
  new Promise((resolve, reject) => {
    let timeResolve = Math.floor(Math.random() * 5000) + 1000;
    let timeReject = Math.floor(Math.random() * 5000) + 1000;

    setTimeout(() => {
      console.log(`La promesa ${indice} exitosa`);
    }, timeResolve);

    setTimeout(() => {
      console.log(`La ${indice} fallo`);
    }, timeReject);
  });
};

let misPromesas = [];
for (let i = 0; i < 5; i++) {
  misPromesas = [...misPromesas, Mipromesa(i)];
}

misPromesas.forEach((prom) =>
  prom.then((res) => console.log(res)).catch((res) => console.log(res))
);

/*
Mipromesa.then(
  (respuesta) => console.log(respuesta),
  (razon) => console.log(razon)
);
*/
