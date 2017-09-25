
function pasajero(numero, nombre, apellido, dni) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.dni = dni;
  this.numero = numero;
  this.ocupado = false;
  this.toHTML = function () {
    var html = '';
    html += "<strong>Asiento N°" + numero + "</strong><br>";
    html += "<strong>Nombres: </strong>" + this.nombre + "<br>";
    html += "<strong>Apellidos: </strong>" + this.apellido + "<br>";
    html += "<strong>DNI: </strong>" + this.dni + "<br>";
    return '<div class="lista">' + html + '</div>';
  }
}

function asientos() {
  this.asientos = new Array(32);
  this.numeroAsiento = undefined;
  this.add = function (pasajero, numero) {
    this.asientos[numero] = pasajero;
  }
  this.dibujarTabla = function () {
    var filas = [];
    for (var j = 0; j < this.asientos.length; j += 4) {
      filas[j] = '<tr>';
      for (var i = j + 1; i <= j + 4; i++) {
        var asiento = this.asientos[i - 1];
        if (asiento != undefined) {
          filas[j] += '<td onclick="redirect(this)" class="ocupado">' + i + '</td>';
        } else {
          filas[j] += '<td onclick="redirect(this)" class="desocupado">' + i + '</td>';
        }
      }
    }
    return '<table>' + filas.join('</tr>') + '</table>';
  }

  this.formulario = function (numero) {
    var html = '';
    html += '<p>Asiento N°' + numero + '</p>';
    html += '<p>Nombre: <input type="text" id="nombre" placeholder="Nombres" required/></p>';
    html += '<p>Apellidos: <input type="text" id="apellido" placeholder="Apellidos" required></p>';
    html += '<p>DNI: <input type="number" id="dni" placeholder="DNI" required></p>';
    html += '<p><input type="submit" onclick="Reservar()" value="Reservar"></p>'
    return '<form id="Reservar"' + html + '</form>';
  }

  this.liberar = function () {
    this.asientos[this.numeroAsiento - 1] = undefined;
  }


}
var asientos = new asientos();
document.getElementById('asientos').innerHTML = asientos.dibujarTabla();

var Contenido = document.getElementById('Contenido');


function redirect(event) {
  asientos.numeroAsiento = event.textContent;
  var estadoCelda = event.className;
  if (estadoCelda == 'desocupado') {//si el asiento esta desocupada se mostrará en pantalla el formulario y el boton Reservar
    Contenido.innerHTML = asientos.formulario(asientos.numeroAsiento);
  } else { // si esta ocupada se mostrara los datos que contiene ese asiento y el boton cancelar
    Contenido.innerHTML = asientos.asientos[asientos.numeroAsiento - 1].toHTML() + '<p><button onclick="Cancelar()">Cancelar</button></p>';
  }
}

function Reservar() {
  var name = document.getElementById('nombre').value;
  var surname = document.getElementById('apellido').value;
  var id = document.getElementById('dni').value;
  if (name != '' && surname != '' && id != '') {
    asientos.asientos[asientos.numeroAsiento - 1] = new pasajero(asientos.numeroAsiento, name, surname, id); //se almacena en el array
    document.getElementById('asientos').innerHTML = asientos.dibujarTabla();
    limpiar();
  }
}

function limpiar() { //funcion para que borre el contenido
  document.getElementById('Contenido').innerHTML = '';
  document.getElementById('mostrar').innerHTML = '';
}

function Cancelar() {
  asientos.liberar();
  document.getElementById('asientos').innerHTML = asientos.dibujarTabla();
}
