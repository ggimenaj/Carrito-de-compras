//seleccionamos los botones y mostramos en consola que funcionen
const carrito = document.querySelector("#carrito");
console.log(carrito);
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
console.log(contenedorCarrito);
const vaciarCarrito = document.querySelector("#vaciar-carrito");
console.log(vaciarCarrito);
const listaDeCursos = document.querySelector("#lista-cursos");
console.log(listaDeCursos);
//carrito vacio
let articulosCarrito = [];

//funcion para que cuando hagan click en "agregar curso" dentro de la lista de cursos, se realice un evento que lo definimos mas abajo
cargarEvento();
function cargarEvento() {
  listaDeCursos.addEventListener("click", agregarCurso);

  //elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //vaciar el carrito
  vaciarCarrito.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHtml();
  });
}

//funcion para agregar un curso, vemos si la tarjeta del curso contiene "agregar carrito" entonces se realiza la funcion
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatoCurso(cursoSeleccionado);
  }
}

//elimina producro del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHtml();
  }
}
//selecciona el html del curso
function leerDatoCurso(curso) {
  console.log(curso);

  //objeto con el contenido del curso
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisa si un elemento ya esta en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //actualiamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //lo agregamos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
  }

  //llama al carrito
  carritoHtml();
}

//muestra el carrito en el html
function carritoHtml() {
  //limpiar el html
  limpiarHtml();

  //muestra cada elemento del curso seleccionado en el html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src="${imagen}" width = '150' />
            </td>
            <td>
                ${titulo}
            </td>        
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href = "#" class = "borrar-curso" data-id = "${id}"> X </a>
            </td>
        `;
    //agrega el carrito en el tbody del html
    contenedorCarrito.appendChild(row);
  });
}

//elimina los cursos del tbody
function limpiarHtml() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
