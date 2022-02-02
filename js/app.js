// Lista de variables
const car = document.querySelector('#carrito'),
  listCar = document.querySelector('#lista-carrito tbody'),
  emptyCar = document.querySelector('#vaciar-carrito'),
  listCourses = document.querySelector('#lista-cursos');
let carItems = [];

// Se hace una función que carga todos los cursos
const loadAllEventListeners = () => {
  // Cuando agregas un curso presionando "Agregar al carrito"
  listCourses.addEventListener('click', addNewCourse);

  // Elimina un elemento de la lista
  car.addEventListener('click', deleteItem)

  //Vacía todo el carrito
  emptyCar.addEventListener('click', emptyAllCar);

}

// Función para agregar cursos
const addNewCourse = (e) => {
  // Cancelamos la naturaleza del evento por defecto
  e.preventDefault();

  // Validamos si el target contiene la clase del botón
  if (e.target.classList.contains('agregar-carrito')) {
    // Por medio de traversing DOM vamos a la etiqueta padre
    const parentElement = e.target.parentElement.parentElement;
    getInformation(parentElement);
  }
}

// Función para eliminar elementos de la lista
const deleteItem = (e) => {
  const isDelete = e.target.classList.contains('borrar-curso');
  if (isDelete) {
    const position = e.target.getAttribute('data-id');
    
    // Eliminar del arreglo el id encontrado
    carItems = carItems.filter((element) => element['id'] != position);
    uploadInfo();
  }
}

// Eliminar todo el carrito y evitando el event Bublling con stopPropagation
const emptyAllCar = (e) => {
  e.stopPropagation();
  carItems = []
  uploadInfo();
}

// Obtener la información de la tarjeta seleccionada
const getInformation = (parentElement) => {
  // Retornamos un objeto con la información
  let item = {
    img: parentElement.querySelector('img').src,
    title: parentElement.querySelector('h4').textContent,
    price: parentElement.querySelector('.precio span').textContent,
    id: parentElement.querySelector('a').getAttribute('data-id'),
    quantity: 1
  }

  // Con el método some verificamos si ya existe un valor
  const isExist = carItems.some((element) => element['id'] === item['id']);

  // Si existe validamos verificamos su posición y modificamos la propiedad quantity, si no, se añade al array
  if (isExist) {
    // Forma 1
    // const index = carItems.findIndex((element) => element['id'] === item['id'])
    // carItems[index]['quantity'] += 1;

    // Forma 2
    const newListCarItems = carItems.map((element) => {
      if (element['id'] === item['id']) {
        element['quantity']++
        return element
      } else {
        return element
      }
    })
    carItems = [...newListCarItems]
  } else {
    carItems = [...carItems, item]
  }

  uploadInfo();
}

// Muestra el carrito de compras en el HTML
const uploadInfo = () => {
  // Limpiar HTML
  clearCar();

  // Recorre el array de items del carro y agrega al HTML
  carItems.forEach((element) => {
    // Destructuring al elemento que llega
    const { img, title, price, quantity, id } = element;
    // Creamos una etiqueta tr
    const row = document.createElement('tr');
    // Añadimos el contenido a la etiqueta tr
    row.innerHTML = `
      <td>
      <img width="100" src="${img}" alt="Logo curso"/>
      </td>
      <td>
      ${title}
      </td>
      <td>
      ${price}
      </td>
      <td>
      ${quantity}
      </td>
      <td>
      <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
      `
    listCar.appendChild(row);
  });
}

// Función para limpiar el HTML
const clearCar = () => {
  // Forma rápida - mejor performance
  while (listCar.firstChild) {
    listCar.removeChild(listCar.firstChild)
  }
}

// Cargar todos los eventos
loadAllEventListeners();
