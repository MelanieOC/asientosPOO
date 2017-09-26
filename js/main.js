class Pasajero {
    constructor(numero, nombre, apellido, dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.numero = numero;
        this.ocupado = false;
    }

    toHTML() {
        let html = `<div class="well lista">
                    <strong>Asiento N°${this.numero}</strong><br>
                    <strong>Psajero: </strong>${this.nombre} ${this.apellido}<br>
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
            let celda = $('<button>').addClass('celda desocupado').html(i);
            if (i==j+2) {
                celda.css('margin-right','45px');
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
    }
    elegirAsiento(div){
        $('.desocupado').css('background-color','#57EC89');
        this.numAsiento=parseInt(div.textContent);
        this.celda=$(div);
        if(this.asientos[this.numAsiento-1]==undefined){
            this.celda.css('background-color','orange');
            this.formulario();
        } else {
            console.log('hola');
        }
    }
    reservar(){
        let nombre = $('#nombre').val();
        let apellido= $('#apellido').val();
        let dni=$('#dni').val();
        if (nombre != '' && apellido != '' && dni != '') {
            this.asientos[this.numAsiento-1]= new Pasajero(this.numAsiento, nombre, apellido, dni); 
            this.celda.removeClass('desocupado').addClass('ocupado').css('background-color','red').prop('disabled',true);
            this.reiniciar();
        } else {
            console.log('faltan datos');
        }
    }
    liberar(){
        $('.desocupado').css('background-color','#57EC89').prop('disabled',true);
        $(".ocupado").prop('disabled',false);
    }
    listar(){
        let ocupados = this.asientos.filter(a=>!undefined);
        if(ocupados.length==0){
            $("#listar").html('No hay pasajeros');
        } else {
            let lista='';
            ocupados.forEach(a=>lista+=a.toHTML());
            $("#listar").html(lista);
        }
    }
    reiniciar(){
        $(".desocupado").prop('disabled',false);
        $(".ocupado").prop('disabled',true);
        $('#nombre').val('').prop('readonly',true);
        $('#apellido').val('').prop('readonly',true);
        $('#dni').val('').prop('readonly',true);
        $('#btnReservar').off('click');
    }
    eventos(){
        $("#tabListar").click(()=>this.listar());
        $("#tabLiberar").click(()=>this.liberar());
        $("#tabReservar").click(()=>this.reiniciar());
    }
    iniciar(){
        this.numeroAsientos=32;
        $('#asientos').html(this.dibujarTabla());
        this.eventos();
    }
}

$(document).ready(()=>{
    let asientos=new Bus();
    asientos.iniciar();
})