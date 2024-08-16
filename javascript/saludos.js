function saludar(nombre) {
  return `Hola ${nombre}`;
}

// console.log(module.exports);  Es un objeto

function saludarHolaMundo() {
  return "¡Hola, Mundo!";
}

// EXPORTAR VARIAS ELEMENTOS
/* module.exports.saludar = saludar;
module.exports.saludarHolaMundo = saludarHolaMundo; */

// SINTAXIS MÁS CONCIZA PARA EXPORTAR NUEVOS ELEMENTOS
module.exports = {
  saludar: saludar,
  saludarHolaMundo: saludarHolaMundo,
};
