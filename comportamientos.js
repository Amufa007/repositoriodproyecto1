archivojs
// Obtiene una referencia a todos los botones "Agregar al carrito"
const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');

// Agrega un evento de clic a cada botón
botonesAgregarCarrito.forEach((boton) => {
  boton.addEventListener('click', agregarAlCarrito);
});
function guardarCarrito(carrito) {
    const carritoJSON = JSON.stringify(carrito); // Convertir el objeto JavaScript a JSON
  
    localStorage.setItem('carrito', carritoJSON); // Guardar el carrito en el almacenamiento local
}
function obtenerCarrito() {
    // Verificar si hay un carrito almacenado en el almacenamiento local
    if (localStorage.getItem('carrito')) {
      // Si existe, obtener el carrito almacenado y convertirlo de JSON a objeto JavaScript
      const carritoJSON = localStorage.getItem('carrito');
      const carrito = JSON.parse(carritoJSON);
      return carrito;
    } else {
      // Si no hay un carrito almacenado, devolver un carrito vacío
      return [];
    }
}
// Objeto para almacenar los productos en el carrito

const carrito = {};
// Función para agregar un producto al carrito
function agregarAlCarrito(evento) {
  evento.preventDefault();

  // Obtiene el ID del producto desde el atributo data-id del botón
  const productoId = evento.target.dataset.id;

  // Verifica si el producto ya está en el carrito
  if (carrito[productoId]) {
    // Si el producto ya existe en el carrito, aumenta su contador en 1
    carrito[productoId] += 1;
  } else {
    // Si el producto no existe en el carrito, inicializa su contador en 1
    carrito[productoId] = 1;
  }

  // Actualiza el contador del carrito en la interfaz
  actualizarContadorCarrito();
  mostrarContadorCarrito();
  obtenerTotalCompra();
}

// Función para actualizar el contador del carrito en la interfaz
// Función para actualizar el contador del carrito en la interfaz
function actualizarContadorCarrito() {
    // Obtiene una referencia al elemento donde se mostrará el contador
    const contadorCarrito = document.getElementById('contador-carrito');
  
    // Obtiene la cantidad total de productos en el carrito sumando los contadores
    const cantidadTotal = Object.values(carrito).reduce((total, contador) => total + contador, 0);
  
    // Actualiza el texto del contador con la cantidad total
    contadorCarrito.textContent = cantidadTotal;
  
    // Muestra u oculta el contador según si hay productos en el carrito
    if (cantidadTotal > 0) {
      contadorCarrito.style.display = 'block';
    } else {
      contadorCarrito.style.display = 'none';
    }
  }

  const contadorCarrito = document.querySelector("#contador-carrito");
  // Función para mostrar el contador del carrito
  function mostrarContadorCarrito() {
    // Obtener los productos del carrito desde el almacenamiento local
    const carrito = obtenerCarrito();
  
    // Obtener la cantidad total de productos en el carrito
    const cantidadProductos = carrito.length;
  
    // Mostrar la cantidad en el contador del carrito
    contadorCarrito.textContent = cantidadProductos;
  }
  // Llamar a la función para mostrar el contador del carrito al cargar la página
mostrarContadorCarrito();


function mostrarProductosCarrito() {
  const carrito = obtenerCarrito(); // Obtener los productos del carrito desde el almacenamiento local
  const tbody = document.querySelector("#lista-carrito tbody");
  tbody.innerHTML = ""; // Limpiar el contenido actual de la tabla

  carrito.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${producto.imagen}" width="50"></td>
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
      <td><button class="eliminar-producto" data-id="${producto.id}">Eliminar</button></td>
    `;

    tbody.appendChild(fila);
    mostrarContadorCarrito();
  });
  const botonesEliminar = document.querySelectorAll(".eliminar-producto");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", function () {
      const productoId = boton.dataset.id;
      eliminarProductoCarrito(productoId);
      sumarPreciosCarrito();
      mostrarContadorCarrito();
    });
  });
}
function eliminarProductoCarrito(productoId) {
  let carrito = obtenerCarrito(); // Obtener los productos del carrito desde el almacenamiento local

  // Convertir el productoId a entero
  const id = parseInt(productoId);

  // Filtrar el carrito para eliminar el producto con el ID especificado
  carrito = carrito.filter((producto) => producto.id !== id);

  // Actualizar el carrito en el almacenamiento local
  guardarCarrito(carrito);

  // Volver a mostrar los productos del carrito
  mostrarProductosCarrito();
  mostrarTotalCarrito();
  actualizarBotonComprar();
}


mostrarProductosCarrito()

//compra

function sumarPreciosCarrito() {
  const carrito = obtenerCarrito(); // Obtener los productos del carrito desde el almacenamiento local

  let totalCompra = 0;

  carrito.forEach((producto) => {
    const precioDecimal = parseFloat(producto.precio);
    totalCompra += precioDecimal;
  });
    // Redondear el resultado a dos decimales
  totalCompra = totalCompra.toFixed(2);

  return totalCompra;
}



const totalCarritoElement = document.getElementById("total-compra");

// Función para mostrar el total en el carrito
function mostrarTotalCarrito() {
  // Obtener el total de la compra
  const totalCompra = sumarPreciosCarrito(); // Suponiendo que tienes la función sumarPreciosCarrito()

  // Actualizar el contenido del elemento con el total
  totalCarritoElement.textContent = `Total: ${totalCompra} USD`;
}

// Llamar a la función para mostrar el total al cargar la página o cuando se actualice el carrito
mostrarTotalCarrito();

function agregarProductoCarrito(event) {
    event.preventDefault();
  
    const boton = event.target;
    const item = boton.closest(".ropa"); // Buscar el elemento padre más cercano con la clase "ropa"
    const imagen = item.querySelector("img").src;
    const nombre = item.querySelector("h4").textContent;
    const precio = item.querySelector(".precio").textContent;
  
    const producto = {
      imagen,
      nombre,
      precio,
      id: Date.now() // Generar un ID único usando la marca de tiempo actual
    };
  
    let carrito = obtenerCarrito(); // Obtener los productos del carrito desde el almacenamiento local
    carrito.push(producto); // Agregar el nuevo producto al carrito
    guardarCarrito(carrito); // Guardar el carrito actualizado en el almacenamiento local
    
    mostrarProductosCarrito(); // Actualizar la tabla de productos del carrito
    mostrarContadorCarrito(); //actualizar contador
    // Obtener el elemento HTML donde se mostrará el total de la compra
    mostrarTotalCarrito(); 
    actualizarBotonComprar();   
}


document.addEventListener("DOMContentLoaded", () => {
    // ...
  
    const agregarCarritoButtons = document.querySelectorAll(".agregar-carrito");
    agregarCarritoButtons.forEach((button) => {
      button.addEventListener("click", agregarProductoCarrito);
      button.addEventListener("click", actualizarContadorCarrito);
      button.addEventListener("click", mostrarProductosCarrito); // Agregar llamado a la función mostrarProductosCarrito
    });
  
    // ...
  });

//vacial carrito
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
// Función para vaciar el carrito al hacer clic en el botón
function vaciarCarrito(event) {
    event.preventDefault();
  
    // Eliminar los productos del almacenamiento local
    localStorage.removeItem("carrito");
  
    // Actualizar el contador del carrito
    mostrarContadorCarrito();
  
    // Mostrar el carrito vacío en la interfaz de usuario
    mostrarProductosCarrito();
    mostrarTotalCarrito();
    actualizarBotonComprar();


}

//obtener informacion de la venta



//obtener fecha 
function obtenerFechaActual() {
  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Se suma 1 porque los meses comienzan desde 0
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
}
//validar la compra
function actualizarBotonComprar() {
  const carrito = obtenerCarrito();
  const botonComprar = document.getElementById("btn-comprar");

  if (carrito.length === 0) {
    botonComprar.disabled = true;
  } else {
    botonComprar.disabled = false;
  }
}

//limpiar carro
function limpiarCarrito() {
  // Limpiar el carrito en el almacenamiento local
  localStorage.removeItem('carrito');
}
limpiarCarrito()
// Llamar a la función actualizarBotonComprar para inicializar el estado del botón
actualizarBotonComprar();

function exportarVentaExcel() {
  const carrito = obtenerCarrito(); // Obtener los productos del carrito desde el almacenamiento local

  // Crear una matriz con los datos de la venta
  const datosVenta = [
    ["Producto", "Precio"],
    // Agregar una fila en blanco para separar las columnas existentes de las nuevas
    ["", ""]
  ];
  let cont=0;
  let totalCompra = 0;
  carrito.forEach((producto) => {
    datosVenta[0].push(producto.nombre); // Agregar el nombre del producto a la primera fila de la matriz
    datosVenta[1].push(producto.precio); // Agregar el precio del producto a la segunda fila de la matriz
    const precioDecimal = parseFloat(producto.precio);
    totalCompra += precioDecimal;
  });
 // Variable para almacenar la suma de los precios
  // Agregar las dos nuevas columnas al final de la matriz
  datosVenta[0].push("numVenta");
  datosVenta[1].push(cont+1);
  datosVenta[0].push("fechaVenta");
  datosVenta[1].push(obtenerFechaActual());
  datosVenta[0].push(["Total"])
  datosVenta[1].push([totalCompra]);


  // Agregar una fila al final con el total de la compra
 

  // Crear un libro de Excel y una hoja de cálculo
  const libro = XLSX.utils.book_new();
  const hoja = XLSX.utils.aoa_to_sheet(datosVenta);

  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(libro, hoja, "Venta");

  // Guardar el libro como un archivo de Excel
  XLSX.writeFile(libro, "venta.xlsx");
  
}




function redireccionar() {
  window.location.href = "compra.html"; // Reemplaza  con la URL de la página a la que deseas redireccionar
}
