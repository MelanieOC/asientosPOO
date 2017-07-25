//Se crea la tabla con for
var asientos = new Array(32);//Array global con los numeros de asientos
var filas = new Array(4);//el numero de filas
for(var j = 0; j<filas.length;j++){
  filas[j]='<tr>';//se crea filas de la tabla
  var espacios = '<tr>';
  for (var i = j+1; i <= asientos.length; i+=filas.length) {
    filas[j] += '<td class="desocupado">' + i + '</td>';//se crea las celdas con una clase y un id
    espacios+='<td> </td>';//fila en blanco
  }
}
var tab = new Array(5);
tab[0]=filas[0];
tab[1]=filas[1];
tab[2]=espacios;
tab[3]=filas[2];
tab[4]=filas[3];
document.getElementById('asientos').innerHTML =  '<table>'+ tab.reverse().join('</tr>')+'</table>';//se imprime la tabla en html

function pasajero(numero, nombre, apellido, dni) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.dni= dni;
  this.numero = numero;
  this.ocupado = false;
  this.toHTML = function () {
    var html = '';
    html += "<strong>Asiento N°"+this.numero+"</strong><br>";
    html += "<strong>Nombres: </strong>" + this.nombre + "<br>";
    html += "<strong>Apellidos: </strong>" + this.apellido + "<br>";
    html += "<strong>DNI: </strong>" + this.dni + "<br>";
    return '<div class="lista">'+ html + '</div>';
  }
}

var Contenido = document.getElementById('Contenido');
var celdas = document.getElementsByClassName('desocupado');

//Para cada celda se le da el evento click
for (var i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener('click',redirect);
}
var numero;//variable global que agarrará el valor del numero de asiento
var celdita;//variable global que agarrará la celda seleccionada
function redirect(event){//funcion que se ejecutará cada vez que se de click al numero de asiento
  limpiar();
  celdita=event.target;
  numero = event.target.textContent;//se extrae el valor de cada celda
  var estadoCelda=celdita.className;

  if(estadoCelda=='desocupado'){//si el asiento esta desocupada se mostrará en pantalla el formulario y el boton Reservar
    formulario();
  } else { // si esta ocupada se mostrara los datos que contiene ese asiento y el boton cancelar
    mostrar(numero);
  }

}

function mostrar(num) {
  document.getElementById('mostrar').innerHTML= asientos[numero-1].toHTML();
}

function formulario() {
  var _asiento='<p>Asiento N°' + numero + '</p>';
  var _nombre='<p>Nombre: <input type="text" id="nombre" placeholder="Nombres" required/></p>';
  var _apellido = '<p>Apellidos: <input type="text" id="apellido" placeholder="Apellidos" required></p>';
  var _dni= '<p>DNI: <input type="number" id="dni" placeholder="DNI" required></p>';
  var boton= '<p><input type="submit" onclick="Reservar()" value="Reservar"></p>'
  document.getElementById('Contenido').innerHTML= '<form id="Reservar">' + _asiento+_nombre+_apellido+_dni+boton+'</form>';
}

function limpiar() { //funcion para que borre el contenido
  document.getElementById('Contenido').innerHTML = '';
  document.getElementById('Asiento').innerHTML='Dale click al asiento';
  document.getElementById('mostrar').innerHTML='';
}

function Reservar() {//funcion hacen que los datos ingresados se almacenaran en el array global
  var name =  document.getElementById('nombre').value;
  var surname  = document.getElementById('apellido').value;
  var id = document.getElementById('dni').value;
  asientos[numero - 1] = new pasajero(numero, name, surname, id); //se almacena en el array
  celdita.className="ocupado";
  limpiar();
}

function Liberar() {//funcion que borra los datos en ese asiento
  asientos[numero - 1] = undefined;
  celdita.className = "desocupado";
  limpiar();
}

function Busqueda() {//funcion que muestra el campo de busqueda
    limpiar();
    var _dni= '<div class="Busqueda"> Introduzca DNI:<input type="text" id="busqueda"/>';
    var _boton ='<p><button onclick="Buscar()">Buscar</button></p></div>';
    document.getElementById('Contenido').innerHTML = _dni + _boton
}
function Buscar() { //funcion que busca el DNI
  var busqueda = document.getElementById('busqueda').value;
  for(var i= 1; i <= asientos.length; i++){
    if(asientos[i-1]!=undefined && busqueda == asientos[i-1].dni){
      document.getElementById('mostrar').innerHTML=asientos[i-1].toHTML();
    }
  }
}

function Listar() {//funcion que muestra todos los asientos ocupados y su contenido
  limpiar();
  for (var i = 1; i <= asientos.length; i++) {
    if (asientos[i-1]!= undefined) {//si el numero de asiento está definido
      mostrar(i);
    }
  }
}
