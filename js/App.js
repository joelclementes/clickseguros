import { GuardaSolicitudVehiculo } from "../modulos/GuardaSolicitudVehiculo.js"
class App {

    constructor(reset = false) {
        sessionStorage.removeItem('asegurados')
        let arrayAseguradosGastosMedicos = [];
        let tarjetasAsegurados = document.getElementById("tarjetasGastosMedicos");

        this.urlGet = "http://localhost/clicksegurosbackend/proceso.php/";
        this.urlPost = "http://localhost/clicksegurosbackend/procesopost.php/";
        // this.urlGet = "http://a2plcpnl0158:2083/clicksegurosbackend/proceso.php/";


        alertify.defaults.transition = "zoom";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";

        const ocultasecciones = () => {
            // OCULTAREMOS TODOS LOS <section> EN index.html

            // Obtenemos el arreglo de todos los section por medio de la clase que tienen en común
            var elementos = document.getElementsByClassName("form");

            // iteramos para ocultarlos
            for (let el of elementos) {
                el.setAttribute('style', 'display:none;')
            }
        }

        const limpiaDatos = () => {
            // Datos generales
            document.querySelector("#cboTipoDeSeguro").value = '0';
            document.querySelector("#txtFecha").value = fechaDeHoy();
            document.querySelector("#txtNombreSolicitante").value = "";
            document.querySelector("#txtApellidosSolicitante").value = "";
            document.querySelector("#txtPaisSolicitante").value = "";
            document.querySelector("#txtCodigoPostalSolicitante").value = "";
            document.querySelector("#txtCelularSolicitante").value = "";
            document.querySelector("#txtCorreoSolicitante").value = "";
            document.querySelector("#txtCodigoDeEpisodio").value = "";
            document.querySelector("#archNombre").value = "";

            //Datos para seguro de vehículo
            document.querySelector("#cboTipoPersonaVehiculo").value = '0';
            document.querySelector("#txtModeloVehiculo").value = "";
            document.querySelector("#txtMarcaVehiculo").value = "";
            document.querySelector("#txtVersionVehiculo").value = "";
            document.querySelector("#cboTransmisionVehiculo").value = '0';
            document.querySelector("#txtDescripcionVersionVehiculo").value = "";
            document.querySelector("#cboTipoCoberturaVehiculo").value = '0';
            document.querySelector("#chkAceptacionVehiculos").checked = false;

        }

        const fechaDeHoy = () => {
            let fechaActual = new Date();

            let mes = (fechaActual.getMonth() + 1) < 10 ? `0${fechaActual.getMonth() + 1}` : fechaActual.getMonth() + 1;
            let dia = fechaActual.getDate() < 10 ? `0${fechaActual.getDate()}` : fechaActual.getDate();
            let año = fechaActual.getFullYear();

            return año + "-" + mes + "-" + dia;
        }

        const LlenaComboTipoDeSeguro = () => {
            const PROCESO = "?proceso=CATTIPOSEGURO_SELECT_ALL";
            const url = this.urlGet + PROCESO;
            let strOpciones;
            $.ajax({
                url: url,
                dataType: "json",
                success: function (datos) {
                    let strOpciones = ``;
                    strOpciones = `<option value="0" selected>Seleccione</option>`;
                    for (let d of datos) {
                        strOpciones += `<option value="${d.idSection}">${d.nombreseguro}</option>`;
                    }
                    document.querySelector("#cboTipoDeSeguro").innerHTML = strOpciones;
                }
            })
        }

        const CrearItemAsegurado = (nombre, genero, fechanacimiento, ocupacion, practicadeportespeligrosos) => {
            // Creamos el item
            let item = {
                nombre: nombre,
                genero: genero,
                fechanacimiento: fechanacimiento,
                ocupacion: ocupacion,
                practicadeportespeligrosos: practicadeportespeligrosos
            }

            // Agregamos el item al arreglo
            arrayAseguradosGastosMedicos.push(item);

            // Guardamos el arreglo en la variable de sesión convertido a sting
            sessionStorage.setItem('asegurados', JSON.stringify(arrayAseguradosGastosMedicos));

            // Pintamos en el DOM los asegurados
            pintaAsegurados();
        }

        const borrarAsegurado = (indice) =>{
            arrayAseguradosGastosMedicos.splice(indice,1);
            sessionStorage.setItem('asegurados', JSON.stringify(arrayAseguradosGastosMedicos));
            pintaAsegurados();
        }

        const pintaAsegurados = () => {
            //  Limpiamos el contenido de los asegurados
            tarjetasAsegurados.innerHTML = ``;

            // Obtenemos los datos en la memoria de sesión, que está en string y convertimos a json
            const arrayAseguradosGastosMedicos = JSON.parse(sessionStorage.getItem('asegurados'));

            // Validamos si está vacía o no la variable de sesión
            if (arrayAseguradosGastosMedicos === null) {
                arrayAseguradosGastosMedicos = [];
            } else {
                // Iteramos el json para construir las tarjetas
                arrayAseguradosGastosMedicos.forEach((asegurado, index) => {
                    tarjetasAsegurados.innerHTML += `
                    <div class="card flex-fill card-asegurado" style="width: 18rem;" id="asegurado${index}">
                    <div class="card-body ">
                        <h5 class="card-title">${asegurado.nombre}</h5>
                        <!--<h6 class="card-subtitle mb-2 text-muted">${asegurado.genero}</h6>-->
                        <p class="card-text">
                            Género: <b>${asegurado.genero}</b></br>
                            Fecha de nacimiento: <b>${asegurado.fechanacimiento}</b></br>
                            Ocupación: <b>${asegurado.ocupacion}</b></br>
                            Practica deportes peligrosos: <b>${asegurado.practicadeportespeligrosos}</b>
                        </p>
                        <a class="btn btn-outline-danger" onclick="borrarAsegurado(${index})">Eliminar</a>
                    </div>
                </div>
                    `;
                })
            }
        }

        if (reset) {
            document.querySelector("#txtFecha").value = fechaDeHoy();
            LlenaComboTipoDeSeguro();

            const combo = document.querySelector("#cboTipoDeSeguro");
            let aplicacion = null;
            let eleccion = null;

            ocultasecciones();

            // Visualizar las secciones según el tipo de seguro seleccionado
            combo.addEventListener("change", () => {
                ocultasecciones();
                const idSection = combo.value
                document.getElementById(idSection).setAttribute('style', '');
                document.getElementById("frmAdjuntararchivo").setAttribute('style', '');
                document.getElementById("frmAceptacion").setAttribute('style', '');
            })


            // Agregar asegurado en Seguro de Gastos médicos
            document.getElementById("btnAgregaAseguradoGastosMedicos").addEventListener("click", (e) => {
                e.preventDefault();
                let formulario = document.querySelector("#formularioAseguradoGastosMedicos");
                CrearItemAsegurado(
                    document.getElementById("txtNombreContratanteGastosMedicos").value,
                    document.getElementById("cboGeneroGastosMedicos").value,
                    document.getElementById("txtFechaNacimientoGastosMedicos").value,
                    document.getElementById("txtOcupacionGastosMedicos").value,
                    document.getElementById("chkPracticaDeportesGastosMedicos").checked == true ? "Si" : "No",
                );
                formulario.reset();
            })


            // Guardar registro
            document.getElementById("btnEnviarFormVehiculos").addEventListener("click", () => {
                if (document.querySelector(".chkAceptacion").checked) {
                    const opcion = document.getElementById("cboTipoDeSeguro").value;
                    let resultado = 0;
                    switch (opcion) {
                        case 'Vehículo':
                            resultado = GuardaSolicitudVehiculo(this.urlPost);
                            break;
                    }
                    // const resultado = GuardaSolicitudVehiculo(this.urlPost);
                    console.log(`Resultado ${resultado}`);
                    if (resultado == 1) {
                        alertify.alert('Atención', "Se guardó el registro").set('modal', false);
                        ocultasecciones();
                        limpiaDatos();
                    }
                } else {
                    alertify.alert('Atención', "Debe aceptar aceptación de aviso de privacidad, uso de datos, términos y condiciones").set('modal', false);
                }
            })
        }
    }
    // borrarAsegurado(indice){
    //     arrayAseguradosGastosMedicos.splice(indice);
    //     pintaAsegurados();
    // }

}
window.onload = () => new App(true);
