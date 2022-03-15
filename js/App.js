import { GuardaSolicitudVehiculo } from "../modulos/GuardaSolicitudVehiculo.js";
import { GuardaSolicitudGastosMedicos } from "../modulos/GuardaSolicitudGastosMedicos.js" ;
import { GuardaSolicitudVidaAhorro } from "../modulos/GuardaSolicitudVidaAhorro.js";
import { GuardaSolicitudOtro } from "../modulos/GuardaSolicitudOtro.js";
import {Edad} from "../modulos/funciones.js";
class App {

    constructor(reset = false) {
        sessionStorage.removeItem('asegurados')
        let arrayAseguradosGastosMedicos = [];
        let tarjetasAsegurados = document.getElementById("tarjetasGastosMedicos");
        let totalPorcentaje = 0;

        const urlGet="http://localhost/clicksegurosbackend/proceso.php/";
        const urlPost = "http://localhost/clicksegurosbackend/procesopost.php/";

        alertify.defaults.transition = "zoom";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";

        function ocultasecciones(){
            // OCULTAREMOS TODOS LOS <section> EN index.html

            // Obtenemos el arreglo de todos los section por medio de la clase que tienen en común
            var elementos = document.getElementsByClassName("form");

            // iteramos para ocultarlos
            for (let el of elementos) {
                el.setAttribute('style', 'display:none;')
            }
        }

        function limpiaDatos(){
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
            document.querySelector("#chkAceptacion").checked = false;

        }

        function fechaDeHoy(){
            let fechaActual = new Date();

            let mes = (fechaActual.getMonth() + 1) < 10 ? `0${fechaActual.getMonth() + 1}` : fechaActual.getMonth() + 1;
            let dia = fechaActual.getDate() < 10 ? `0${fechaActual.getDate()}` : fechaActual.getDate();
            let año = fechaActual.getFullYear();

            return año + "-" + mes + "-" + dia;
        }

        function LlenaComboTipoDeSeguro(){
            const PROCESO = "?proceso=CATTIPOSEGURO_SELECT_ALL";
            const url = urlGet + PROCESO;
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

        function CrearItemAsegurado(nombre, genero, fechanacimiento, ocupacion, practicadeportespeligrosos,parentezco){
            if(nombre=="" || genero =='0' || fechanacimiento=='' || ocupacion=='' ){
                alertify.alert('Atención', "Datos incompletos").set('modal', false);return false;
            }
            if (parentezco=='Hijo' && genero=='MASCULINO'){parentezco='Hijo'}
            if (parentezco=='Hijo' && genero=='FEMENINO'){parentezco='Hija'}
            if (parentezco=='Hermano' && genero=='MASCULINO'){parentezco='Hermano'}
            if (parentezco=='Hermano' && genero=='FEMENINO'){parentezco='Hermana'}
            if (parentezco=='Padre' && genero=='MASCULINO'){parentezco='Padre'}
            if (parentezco=='Padre' && genero=='FEMENINO'){parentezco='Madre'}
            // Creamos el item
            let item = {
                nombre: nombre,
                genero: genero,
                fechanacimiento: fechanacimiento,
                ocupacion: ocupacion,
                practicadeportespeligrosos: practicadeportespeligrosos,
                parentezco: parentezco
            }

            // Agregamos el item al arreglo
            arrayAseguradosGastosMedicos.push(item);

            // Guardamos el arreglo en la variable de sesión convertido a sting
            sessionStorage.setItem('asegurados', JSON.stringify(arrayAseguradosGastosMedicos));

            // Pintamos en el DOM los asegurados
            pintaAsegurados();
            if(parentezco=='Titular' || parentezco=='Cónyuge'){
                document.getElementById(parentezco).setAttribute('disabled','disabled');
            }
            document.getElementById("txtNombreContratanteGastosMedicos").focus();
            return true;
        }

        function borrarAsegurado(indice){
            const parent = arrayAseguradosGastosMedicos[indice].parentezco;
            if (parent=='Titular' || parent=='Conyuge'){
                document.querySelector(`#${parent}`).removeAttribute('disabled');
            }
            arrayAseguradosGastosMedicos.splice(indice,1);
            sessionStorage.setItem('asegurados', JSON.stringify(arrayAseguradosGastosMedicos));
            pintaAsegurados();
        }

        function pintaAsegurados(){
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
                    const nombreClaseBoton = ".btnAsegurado"+index;
                    const classButton ="btnAsegurado"+index;
                    tarjetasAsegurados.innerHTML += `
                    <div class="card flex-fill card-asegurado" style="width: 18rem;" id="asegurado${index}">
                    <div class="card-body ">
                        <h5 class="card-title">${asegurado.nombre}</h5>
                        <p class="card-text">
                            Género: <b>${asegurado.genero}</b></br>
                            Fecha de nacimiento: <b>${asegurado.fechanacimiento}</b></br>
                            Ocupación: <b>${asegurado.ocupacion}</b></br>
                            Practica deportes peligrosos: <b>${asegurado.practicadeportespeligrosos}</b></br>
                            Parentezco: <b>${asegurado.parentezco}</b>
                        </p>
                        <button class="btn btn-outline-danger ${classButton}">Eliminar</button>
                    </div>
                </div>
                    `;

                document.querySelector(nombreClaseBoton).addEventListener("click",()=>{
                    borrarAsegurado(index,false);
                    });
                })
            }
        }

        function sumaPorcentaje(){
            const total = parseInt(document.getElementById("retBaja").value) + parseInt(document.getElementById("retMedia").value) + parseInt(document.getElementById("retAlta").value);
            return total;
        }

        if (reset) {
            //Establecemos la fecha actual
            document.querySelector("#txtFecha").value = fechaDeHoy();

            //Llenamos el combo de tipos de seguro
            LlenaComboTipoDeSeguro();

            let aplicacion = null;
            let eleccion = null;
            
            // Ocultamos todas las secciones HTML de los diferentes tipos de seguro
            ocultasecciones();
            
            // Visualizar las secciones del HTML según el tipo de seguro seleccionado
            const combo = document.querySelector("#cboTipoDeSeguro");
            combo.addEventListener("change", () => {
                ocultasecciones();
                const idSection = combo.value
                document.getElementById(idSection).setAttribute('style', '');
                document.getElementById("frmAdjuntararchivo").setAttribute('style', '');
                document.getElementById("frmAceptacion").setAttribute('style', '');
            })

            // Agregar asegurado en Seguro de Gastos médicos
            document.getElementById("btnAgregaAseguradoGastosMedicos").addEventListener("click", (e) => {
                // Evitamos que recargue
                e.preventDefault();
                let formulario = document.querySelector("#formularioAseguradoGastosMedicos");
                if(CrearItemAsegurado(
                    document.getElementById("txtNombreContratanteGastosMedicos").value,
                    document.getElementById("cboGeneroGastosMedicos").value,
                    document.getElementById("txtFechaNacimientoGastosMedicos").value,
                    document.getElementById("txtOcupacionGastosMedicos").value,
                    document.getElementById("chkPracticaDeportesGastosMedicos").checked == true ? "Si" : "No",
                    document.querySelector('input[name="radParentezco"]:checked').value
                )){
                    formulario.reset();
                    document.getElementById("txtNombreContratanteGastosMedicos").focus()
                }
            })

            // OCULTA O MUESTRA LOS DATOS DEL CÓNYUGT SEGÚN LA SELECCIÓN DEL RADIOBUTTON
            document.getElementById("proteccionNo").addEventListener("change", () => {
                document.getElementById("txtFechaNacimientoVidaAhorroConyuge").value="";
                document.getElementById("txtEdadVidaAhorroConyuge").value="";
                document.getElementById("cboGeneroVidaAhorroConyuge").value="0";
                document.querySelector(".datos-conyuge").setAttribute('style', 'display:none;');
                sessionStorage.setItem('proteccionAlConyuge','No');
            })
            document.getElementById("proteccionSi").addEventListener("change", () => {
                document.querySelector(".datos-conyuge").setAttribute('style', '');
                sessionStorage.setItem('proteccionAlConyuge','Si');
            })

            const fechaNacimientoConyuge = document.getElementById("txtFechaNacimientoVidaAhorroConyuge");
            fechaNacimientoConyuge.addEventListener("change", () => {
                let edadCalculada = Edad(fechaNacimientoConyuge.value);
                if(edadCalculada<100){
                    document.getElementById("txtEdadVidaAhorroConyuge").value = Edad(fechaNacimientoConyuge.value);
                } else {
                    document.getElementById("txtEdadVidaAhorroConyuge").value = "";
                }
            })

            // CAMBIO DE PORCENTAJE DE RETORNO DE INVERSIÓN
            let elBaja = document.getElementById("retBaja");
            let elMedia = document.getElementById("retMedia");
            let elAlta = document.getElementById("retAlta");
            document.getElementById("porcRetBaja").innerHTML = elBaja.value + "%";
            document.getElementById("porcRetMedia").innerHTML = elMedia.value + "%";
            document.getElementById("porcRetAlta").innerHTML = elAlta.value + "%";
            document.getElementById("sumaRetornoDeInversion").innerHTML = `${sumaPorcentaje()}%`;

            elBaja.addEventListener("change", () =>{
                document.getElementById("porcRetBaja").innerHTML = elBaja.value + "%";
                totalPorcentaje = sumaPorcentaje();
                if(totalPorcentaje>100){
                    elBaja.value = elBaja.value - (totalPorcentaje - 100);
                    document.getElementById("porcRetBaja").innerHTML = elBaja.value + "%";
                    sessionStorage.setItem('totalPorcentaje',totalPorcentaje);
                }
                document.getElementById("sumaRetornoDeInversion").innerHTML = `${sumaPorcentaje()}%`;
            })
            elMedia.addEventListener("change", () => {
                document.getElementById("porcRetMedia").innerHTML = elMedia.value + "%";
                totalPorcentaje = sumaPorcentaje();
                if(totalPorcentaje>100){
                    elMedia.value = elMedia.value - (totalPorcentaje - 100);
                    document.getElementById("porcRetMedia").innerHTML = elMedia.value + "%";
                    sessionStorage.setItem('totalPorcentaje',totalPorcentaje);
                }
                document.getElementById("sumaRetornoDeInversion").innerHTML = `${sumaPorcentaje()}%`;
            })
            elAlta.addEventListener("change", () => {
                document.getElementById("porcRetAlta").innerHTML = elAlta.value + "%";
                totalPorcentaje = sumaPorcentaje();
                if(totalPorcentaje>100){
                    elAlta.value = elAlta.value - (totalPorcentaje - 100);
                    document.getElementById("porcRetAlta").innerHTML = elAlta.value + "%";
                    sessionStorage.setItem('totalPorcentaje',totalPorcentaje);
                }
                document.getElementById("sumaRetornoDeInversion").innerHTML = `${sumaPorcentaje()}%`;
            })

            // GUARDAR REGISTRO
            document.getElementById("btnEnviarForm").addEventListener("click", () => {
                // Si ha checado la aceptación de aviso de privacidad y etc., se intentará guardar
                if (document.querySelector(".chkAceptacion").checked) {
                    /**
                     Obtenemos el value del tipo de seguro, el cual tiene:
                     Vehículo, GastosMedicos, VidaAhorro,Otro
                     Estos los toma del campo idSection en la tabla cattiposeguro de la BD
                     Y según la opción invocaremos la función que guardará en la BD
                     */
                    const opcion = document.getElementById("cboTipoDeSeguro").value;
                    let resultado = 0;
                    switch (opcion) {
                        case 'Vehículo':
                            /**
                             En esta función usaremos una url que utilizará el método POST,
                             porque enviaremos datos de un archivo pdf que se subirá al servidor.
                             * */
                            resultado = GuardaSolicitudVehiculo(urlPost);
                            break;
                        case 'GastosMedicos':
                            resultado = GuardaSolicitudGastosMedicos(urlPost);
                            break;
                        case 'VidaAhorro':
                            resultado = GuardaSolicitudVidaAhorro(urlPost);
                            break;
                        case 'Otro':
                            resultado = GuardaSolicitudOtro(urlPost);
                            break;
                    }
                    if (resultado == 1) {
                        alertify.alert('Atención', "Se guardó el registro").set('modal', false);
                        ocultasecciones();
                        limpiaDatos();
                        document.getElementById("formularioAseguradoVidaAhorro").reset();
                        document.getElementById("formularioOtro").reset();
                        sessionStorage.removeItem('asegurados');
                        sessionStorage.removeItem('totalPorcentaje');
                        sessionStorage.removeItem('proteccionAlConyuge');
                    }
                } else {
                    alertify.alert('Atención', "Falta aceptar aviso de privacidad, uso de datos, términos y condiciones").set('modal', false);
                }
            })
        }
    }
}
window.onload = () => new App(true);
