//Agregar link de api 
const url='http://localhost:3001/suplementos/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const URLimg = document.getElementById=('URLimg')
const nombre = document.getElementById=('nombre')
const descripcion = document.getElementById=('descripcion')
const costo = document.getElementById=('costo')
let opcion = ''

btnCrear.addEventListener('click', ()=>{
  URLimg.value = ''
  nombre.value = ''
  descripcion.value = ''
  costo.value = ''
  modalArticulo.show()
  opcion = 'crear'
})

//Funcion para mostrar los resultados 
const mostrar = (articulos) => {
  articulos.forEach(articulo => {
    resultados += `
    <tr>
        <td>${articulo.id}</td>
        <td>${articulo.image}</td>
        <td>${articulo.titulo}</td>
        <td>${articulo.precio}</td>
        <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnEliminar btn btn-danger">Eliminar</a></td>
    </tr>
    `
  });
  contenedor.innerHTML = resultados
} 

//Procedimiento  mostrar
fetch(url)
    .then( response => response.json())
    .then( data => mostrar (data))
    .catch( error => console.log("error url",error))


const on = (element, event, selector, handler) => {
  element.addEventListener(event, e => {
    if (e.target.closest(selector)){
      handler(e)
    }
  })
}

//Procedimeinto borrar
on(document, 'click', '.btnEliminar', e =>{
  const fila = e.target.parentNode.parentNode
  const id = fila.firstElementChild.innerHTML
  alertify.confirm("¿Estas seguro que quieres eliminar el producto?",
  function(){
    fetch(url+id, {
      method: 'DELETE'
    })
    .then( res => res.json())
    .then(() => location.reload())
    alertify.success('Eliminado');
  },
  function(){
    alertify.error('Cencelado');
  })
})

//Procedimeinto editar
let idform = 0
on (document, 'click', '.btnEditar', e =>{
  const fila = e.target.parentNode.parentNode
  idform = fila.children[0].innerHTML
  const URLimgForm = fila.children[1].innerHTML
  const nombreForm = fila.children[2].innerHTML
  const costoForm = fila.children[3].innerHTML

  URLimg.value = URLimgForm
  nombre.value = nombreForm
  costo.value = costoForm
  opcion = 'editar'

  modalArticulo.show()
})


//Procedimiento para crear y editar 
formArticulo.addEventListener('submit', (e) =>{
  e.preventDefault()
  if(opcion=='crear'){
    fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        URLimg: URLimg.value,
        nombre: nombre.value,
        costo: costo.value
      })
    })
    .then(response => response.json())
    .then(data => {
      const nuevoArticulo = []
      nuevoArticulo.push(data)
      mostrar(nuevoArticulo)
    })
 
  }
  if(opcion=='editar'){
    fetch(url+idform,{
      method: 'put',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        URLimg: URLimg.value,
        nombre: nombre.value,
        costo: costo.value
      })
    })
    .then(response => response.json())
    .then(response => location.reload())

  }
  modalArticulo.hide()
})

