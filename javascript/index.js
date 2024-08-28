document.addEventListener("load", cargarDatos(), obtenerDatos());

// Navbar acordeón
document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("nav-open");
});

//Función para cargar los datos desde el archivo JSON
async function cargarDatos() {
  try {
    const casosStorage = localStorage.getItem("casos");
    if (!casosStorage) {
      const response = await fetch("../casos.json");
      if (!response.ok) {
        throw new Error("La red no responde.");
      }
      const data = await response.json();
      dataCasos = data.casos;
    } else {
      dataCasos = JSON.parse(casosStorage);
    }
    mostrarCasos(dataCasos);
  } catch (error) {
    console.error("Error al cargar los datos", error);
  }
}

// Función para mostrar los casos en la página
function mostrarCasos(arrayCasos) {
  const $datosDiv = document.getElementById("datos");
  $datosDiv.innerHTML = "";

  if (!arrayCasos || arrayCasos.length === 0) {
    const casoDiv = document.createElement("div");
    casoDiv.innerHTML = `
                    <h3 class="casosSubtitulos">Caso ${caso.id} (${caso.tipo})</h3>
                    <p>Contexto: ${caso.contexto}</p>
                    <p>Descripción:${caso.descripcion}</p>
                    <button class="btn-caso" onclick="eliminarCaso(${caso.id})">Eliminar</button>
                `;
    $datosDiv.appendChild(casoDiv);
  } else {
    arrayCasos.forEach((caso) => {
      const casoDiv = document.createElement("div");
      casoDiv.innerHTML = `
                      <h3 class="casosSubtitulos">Caso Nº ${caso.id} (${caso.tipo})</h3>
                      <p>Contexto: ${caso.contexto}</p>
                      <p>Descripción:${caso.descripcion}</p>
                      <button class="btn-caso" onclick=editarCaso("${caso.id}")>Editar</button>
                      <button class="btn-caso" onclick=eliminarCaso("${caso.id}")>Eliminar</button>
                  `;
      $datosDiv.appendChild(casoDiv);
    });
  }
}

//Función para agregar un nuevo caso
function agregarCaso(event) {
  event.preventDefault();
  const tipo = document.getElementById("tipo").value;
  const contexto = document.getElementById("contexto").value;
  const descripcion = document.getElementById("descripcion").value;

  if (tipo && contexto && descripcion) {
    const id = crypto.randomUUID().slice(0, 5);
    const nuevoCaso = {
      id: id,
      tipo: tipo,
      contexto: contexto,
      descripcion: descripcion,
    };
    dataCasos.push(nuevoCaso);
    guardarEnStorage(dataCasos);
  }
}

function eliminarCaso(id) {
  dataCasos = dataCasos.filter((caso) => caso.id != id);
  guardarEnStorage(dataCasos);
}

function guardarEnStorage(dataCasos) {
  localStorage.setItem("casos", JSON.stringify(dataCasos));
  mostrarCasos(dataCasos);
}

//API
// Función para obtener los datos de la API
function obtenerDatos() {
  return fetch(
    "http://localhost:8080/" +
      "https://www.cultura.gob.ar/api/v2.0/organismos/?format=json"
  )
    .then((response) => response.json())
    .then((data) => mostrarDatos(data.results))
    .catch((error) => console.error("Error al obtener los datos:", error));
}

// Función para mostrar los datos en el DOM
function mostrarDatos(datos) {
  const lista = document.getElementById("lista-datos");

  datos.forEach((dato) => {
    const item = document.createElement("li");

    // Crear el contenido del item con el nombre, dirección, teléfono y un enlace
    item.innerHTML = `
      <h3>${dato.nombre}</h3>
      <p>Dirección: ${dato.direccion}</p>
      <p>Teléfono: ${dato.telefono}</p>
      <p>Email: <a href="mailto:${dato.email}">${dato.email}</a></p>
      <p><a href="${dato.link}" target="_blank">Más información</a></p>
    `;

    // Agregar el item a la lista
    lista.appendChild(item);
  });
}
