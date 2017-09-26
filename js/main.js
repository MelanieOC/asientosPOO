class Pasajero {
    constructor(numero, nombre, apellido, dni) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.numero = numero;
    }

    toHTML() {
        let html = `<div class="well lista">
                        <strong>Asiento N°${this.numero}</strong><br>
                        <strong>Pasajero: </strong>${this.nombre} ${this.apellido}<br>
                        <strong>DNI: </strong>${this.dni}<br>
                    </div>`
        return html;
    }
}

class Bus {
    constructor() {
        this.asientos = [];
        this.numeroAsientos = undefined;
        this.numAsiento = undefined;
        this.asientoSeleccionado = undefined;
    }
    dibujarTabla() {
        let tabla = $('<div>')
        for (let j = 0; j < this.numeroAsientos; j += 4) {
            let fila = $('<div>').addClass('fila');
            for (let i = j + 1; i <= j + 4; i++) {
                let asiento = this.asientos[i - 1];
                let celda = $('<button>').addClass('celda desocupado').html(i);
                if (i == j + 2) {
                    celda.css('margin-right', '45px');
                }
                celda.appendTo(fila).click((e) => this.elegirAsiento(e.currentTarget));
            }
            tabla.append(fila);
        }
        return tabla;
    }
    elegirAsiento(div) {
        $('.desocupado').css('background-color', '#57EC89');
        this.numAsiento = parseInt(div.textContent);
        this.asientoSeleccionado = $(div);
        if (this.asientos[this.numAsiento - 1] == undefined) {
            $("#numero").html(`Asiento Nº ${this.numAsiento}`);
            this.asientoSeleccionado.css('background-color', 'orange');
            $('#nombre').focus();
            $('#btnReservar').prop('disabled', false);
        } else {
            this.liberar();
        }
    }
    reservar() {
        let nombre = $('#nombre').val();
        let apellido = $('#apellido').val();
        let dni = $('#dni').val();
        if (nombre != '' && apellido != '' && dni != '') {
            this.asientos[this.numAsiento - 1] = new Pasajero(this.numAsiento, nombre, apellido, dni);
            this.asientoSeleccionado.removeClass('desocupado').addClass('ocupado').css('background-color', 'red').prop('disabled', true);
            this.reiniciar();
        } else {
            console.log('faltan datos');
        }
    }
    tabLiberar() {
        $("#liberar").html('<p>Escoja el asiento reservado a liberar</p>')
        $('.desocupado').css('background-color', '#57EC89').prop('disabled', true);
        $(".ocupado").prop('disabled', false);
    }
    liberar() {
        $("#liberar").empty();
        let mostrar = this.asientos[this.numAsiento - 1].toHTML();
        $("#liberar").append(mostrar);
        $('<button>').addClass('btn').html('Liberar').click(() => this.cancelar()).appendTo("#liberar");
    }
    cancelar() {
        this.asientos[this.numAsiento - 1] = undefined;
        this.asientoSeleccionado.removeClass('ocupado').addClass('desocupado').css('background-color', '#57EC89').prop('disabled', true);
    }
    listar() {
        let ocupados = this.asientos.filter(a => !undefined);
        if (ocupados.length == 0) {
            $("#listar").html('<div class="alert alert-warning" role="alert">Aún no hay pasajeros</div>');
        } else {
            let lista = '';
            ocupados.forEach(a => lista += a.toHTML());
            $("#listar").html(lista);
        }
    }
    buscar(){
        $("#encontrados").empty();
        let busqueda = $('#busqueda').val();
        let encontrado = this.asientos.filter(a=>!undefined&&a.dni==busqueda);
        if (encontrado.length == 0) {
            $("#encontrados").html('<div class="alert alert-warning" role="alert">Sin resultados</div>');
        } else {
            let lista = '';
            encontrado.forEach(a => lista += a.toHTML());
            $("#encontrados").html(lista);
        }
        $('#busqueda').val('');
    }
    reiniciar() {
        $(".desocupado").prop('disabled', false);
        $(".ocupado").prop('disabled', true);
        $('#btnReservar').prop('disabled', true);
    }
    eventos() {
        $("#tabListar").click(() => this.listar());
        $("#tabLiberar").click(() => this.tabLiberar());
        $("#tabReservar").click(() => this.reiniciar());
        $('#btnReservar').click(() => this.reservar());
        $('#btnBuscar').click(() => this.buscar());
        $('#tabBuscar').click(() => $("#encontrados").empty());
    }
    iniciar() {
        this.numeroAsientos = 32;
        $('#asientos').html(this.dibujarTabla());
        this.eventos();
    }
}

$(document).ready(() => {
    let asientos = new Bus();
    asientos.iniciar();
})