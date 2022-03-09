import {GuardaSolicitudVehiculo} from "../modulos/GuardaSolicitudVehiculo.js"
class App {
    
    constructor(reset = false) {
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
            for(let el of elementos){
                el.setAttribute('style','display:none;')
            }
        }

        const limpiaDatos = () => {
            // Datos generales
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
            const url = this.urlGet+PROCESO;
            let strOpciones;
            $.ajax({
                url: url,
                dataType:"json",
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



        if (reset) {
            document.querySelector("#txtFecha").value = fechaDeHoy();
            LlenaComboTipoDeSeguro();

            const combo = document.querySelector("#cboTipoDeSeguro");
            let aplicacion=null;
            let eleccion=null;

            ocultasecciones();

            combo.addEventListener("change", () => {
                ocultasecciones();
                const idSection = combo.value
                document.getElementById(idSection).setAttribute('style','')
            })

            document.getElementById("btnEnviarFormVehiculos").addEventListener("click", () => {
                if (document.getElementById("chkAceptacionVehiculos").checked){
                    const resultado = GuardaSolicitudVehiculo(this.urlPost);
                    console.log(`Resultado ${resultado}`);
                    if (resultado==1){
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

}
window.onload = () => new App(true);
