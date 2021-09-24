function parsear(arr, base = 10, fn) {
  if (typeof arr == 'string') return parseInt(arr, base);
  let newArr = [];
  for (let i = 0; i < arr.length; i++)
    newArr.push(fn ? fn(arr[i], i, base) : parseInt(arr[i], base));
  return newArr;
}

function calcRango(arr) {
  return Math.max(...arr) - Math.min(...arr);
}
function calcMinMax() {
  return [Math.min(...arr), Math.max(...arr)];
}

function calcFrecuencia(arr, esIntervalo = false) {
  let count = [];
  count = arr.reduce((acc, curr) => {
    if (typeof acc[curr] == 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});
  count = Object.entries(count);

  for (let i = 0; i < count.length; i++) {
    count[i] = {val: parsear(count[i][0]), freq: count[i][1]};
  }
  return count;
}

function datoRepresentativo(arr) {
  sum = 0;
  const limits = generarLimites(arr, cantIntervalos, true);
  limits.forEach((el, idx) => {
    if (limits.length % 2 == 0) {
      if (idx == limits.length / 2)
        sum = (el.ptoMedio_xi + limits[idx - 1].ptoMedio_xi) / 2;
    } else if (idx == Math.floor(limits.length / 2)) sum = el.ptoMedio_xi;
  });
  return sum;
}

function generarTabla(arr) {
  const limits = generarLimites(arr, cantIntervalos, true);
  const frecuencia = calcFrecuencia(arr, (esIntervalo = false));
  let struct = [],
    acum = 0;
  limits.forEach((el, idx) => {
    const {linf, lsup, ptoMedio_xi} = el;
    let i = 0;
    let fi = 0;
    while (i < frecuencia.length) {
      if (frecuencia[i].val >= linf && frecuencia[i].val <= lsup)
        fi += frecuencia[i].freq;

      i++;
    }
    acum += fi;
    struct.push({...el, fi, Fi: acum, xi_fi: el.ptoMedio_xi * fi});
  });
  return struct;
}

function calcAmplitud(arr, isInt = false, cantDec = 1) {
  return isInt
    ? calcRango(arr) + 1 / Math.pow(10, cantDec)
    : calcRango(arr) + 1;
}
function calcCantIntervalos(arr, cant = null) {
  return cant
    ? Math.ceil(calcAmplitud(arr, true, 1) / cant)
    : Math.ceil(1 + 3.322 * Math.log10(arr.length));
}

function generarLimites(arr, intervalos, ptoM = true) {
  let newArr = [];
  let idx = calcMinMax(arr)[0],
    linf = idx,
    lsup = idx + intervalos - 1,
    ptoMedio_xi = 0;
  const cantIntervalos = intervalos;

  while (idx < calcMinMax(arr)[1]) {
    ptoMedio_xi = (linf + lsup) / 2;
    if (linf == arr[0]) {
      if (ptoM) newArr.push({linf, lsup, ptoMedio_xi});
      else newArr.push({linf, lsup});
    } else {
      if (ptoM) newArr.push({linf, lsup, ptoMedio_xi});
      else newArr.push({linf, lsup});
    }
    idx += cantIntervalos;
    linf = idx;
    lsup = linf + cantIntervalos - 1;
  }
  return newArr;
}

function calcPromedio(arr) {
  const tabla = generarTabla(arr);
  let sum = 0;
  tabla.forEach((el, idx) => {
    sum += el.xi_fi;
  });
  return sum / arr.length;
}

/***********************************************************************/

let symbol = '-';
let arr = [
  138, 146, 168, 146, 161, 164, 158, 126, 173, 145, 150, 140, 138, 142, 153,
  132, 147, 176, 147, 142, 135, 150, 125, 148, 119, 153, 156, 149, 152, 154,
  140, 145, 157, 144, 165, 135, 128, 144, 136, 134,
];
/* Ordenar de menor a mayor*/
arr = arr.sort((a, b) => a - b);
console.log(arr);

const intervalos = 5; //No funcan los intervalos...

const minmax = calcMinMax(arr); // (arr)
const rango = calcRango(arr); // (arr)
const amplitud = calcAmplitud(arr, false, 1); //(arr , isInt , cantDec)
const cantIntervalos = calcCantIntervalos(arr, intervalos); // (arr, cantIntervalos)
const frecuencia = calcFrecuencia(arr); //(arr)
const limits = generarLimites(arr, cantIntervalos, false); //(arr, cantIntervalos, ptoMedio)
const datoRep = datoRepresentativo(arr); // (arr, ptoMedio, limits)
const tabla = generarTabla(arr); // (arr)
const promedio = calcPromedio(arr);

console.log(`Cantidad de Datos: ${arr.length}`);
console.log(`Cantidad de Intervalos: ${intervalos}`);
console.log(`Minimo & Maximo: ${minmax[0]} -- ${minmax[1]}`);
console.log(`Rango: ${rango}`);
console.log(`Amplitud: ${amplitud}`);
console.log(`Intervalos / Separacion: ${cantIntervalos}`);
console.log(`Puton Medio Representativo: ${datoRep}`);
console.log(`Promedio: ${promedio}`);
console.log(`Limites: `, limits);
console.log(`TABLA`, tabla);

console.log(`Frecuencia: `, frecuencia);
