class Pasajero {
    constructor(numero, nombre, apellido, dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.numero = numero;
        this.ocupado = false;
    }

    toHTML() {
        let html = `<div class="lista">
                    <strong>Asiento N°${this.numero}</strong><br>
                    <strong>Nombres: </strong>${this.nombre}<br>
                    <strong>Apellidos: </strong>${this.apellido}<br>
                    <strong>DNI: </strong>${this.dni}<br>
                 </div>`
        return html;
    }
}

class Bus{
    constructor(){
        this.asientos=[];
        this.numeroAsientos=undefined;
        this.numAsiento=undefined;
        this.celda=undefined;
    }
    dibujarTabla(){
        let tabla=$('<div>')
        for (let j = 0; j < this.numeroAsientos; j += 4) {
            let fila = $('<div>').addClass('fila');
          for (let i = j + 1; i <= j + 4; i++) {
            let asiento = this.asientos[i - 1];
            let celda = $('<div>').addClass('celda desocupado').html(i);
            if (i==j+2) {
                celda.css('margin-right','40px');
            }
            
            celda.appendTo(fila).click((e)=>this.elegirAsiento(e.currentTarget));
          }
          tabla.append(fila);
        }
        return tabla;
    }
    formulario(){
        $('#nombre').prop('readonly',false);
        $('#apellido').prop('readonly',false);
        $('#dni').prop('readonly',false);
        $('#nombre').focus();
        $('#btnReservar').click(()=>this.reservar());
        //this.asientos[this.numAsiento]=new Pasajero();
    }
    elegirAsiento(div){
        $('.desocupado').css('background-color','#57EC89');
        this.numAsiento=parseInt(div.textContent);
        this.celda=$(div);
        if(this.asientos[this.numAsiento-1]==undefined){
            this.celda.css('background-color','orange');
            this.formulario();
        } 
    }
    reservar(){
        let nombre = $('#nombre').val();
        let apellido= $('#apellido').val();
        let dni=$('#dni').val();
        if (nombre != '' && apellido != '' && dni != '') {
            this.asientos[this.numAsiento-1]= new Pasajero(this.numAsiento, nombre, apellido, dni); 
            this.celda.css('background-color','red');
            this.reiniciar();
            console.log(this.asientos);
        } else {
            console.log('faltan datos');
        }

    }
    reiniciar(){
        $('#nombre').val('').prop('readonly',true);
        $('#apellido').val('').prop('readonly',true);
        $('#dni').val('').prop('readonly',true);
        $('#btnReservar').off('click');
    }
    iniciar(){
        this.numeroAsientos=32;
        $('#asientos').html(this.dibujarTabla());
    }
}

$(document).ready(()=>{
    let asientos=new Bus();
    asientos.iniciar();
})