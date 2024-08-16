document.addEventListener("load", cargarDatos());

// Navbar acordeón
document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("nav-open");
});
let dataCasos = []; // Defino esta variable para almacenar los casos.

//Función para cargar los datos desde el archivo JSON
async function cargarDatos() {
  try {
    const response = await fetch("../casos.json");

    if (!response.ok) {
      throw new Error("La red no responde.");
    }
    const data = await response.json();

    dataCasos = data.casos;

    const casosStorage = localStorage.getItem("casos");
    if (casosStorage) {
      dataCasos = JSON.parse(casosStorage);
    }
    mostrarCasos(dataCasos); //Llamo a la funciòn mostrar casos para que aparezcan en el DOM.
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

// Función para mostrar los casos en la página
function mostrarCasos(arrayCasos) {
  const $datosDiv = document.getElementById("datos");
  $datosDiv.innerHTML = "";
  arrayCasos.forEach((caso) => {
    const casoDiv = document.createElement("div");
    casoDiv.innerHTML = `
                    <h3 class="casosSubtitulos">Caso ${caso.id} (${caso.tipo})</h3>
                    <p>Contexto: ${caso.contexto}</p>
                    <p>Descripción:${caso.descripcion}</p>
                    <button class="btn-caso" onclick="editarCaso(${caso.id})">Editar</button>
                    <button class="btn-caso" onclick="eliminarCaso(${caso.id})">Eliminar</button>
                `;
    $datosDiv.appendChild(casoDiv);
  });
}

//Función para agregar un nuevo caso
function agregarCaso(event) {
  event.preventDefault();
  const tipo = document.getElementById("tipo").value;
  const contexto = document.getElementById("contexto").value;
  const descripcion = document.getElementById("descripcion").value;

  if (tipo && contexto && descripcion) {
    const nuevoCaso = {
      id: dataCasos.length + 1,
      tipo: tipo,
      contexto: contexto,
      descripcion: descripcion,
    };
    dataCasos.push(nuevoCaso);
    localStorage.setItem("casos", JSON.stringify(dataCasos)); // Guardo los casos nuevos en el storage
    mostrarCasos(dataCasos); // Mostrar casos actualizados
  }
}
