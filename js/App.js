import {GuardaSolicitudVehiculo} from "../modulos/GuardaSolicitudVehiculo.js"
class App {
    
    constructor(reset = false) {
        this.url = "http://localhost/clicksegurosbackend/proceso.php/";
        // this.url = "http://a2plcpnl0158:2083/clicksegurosbackend/proceso.php/";
        

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

        const fechaDeHoy = () => {
            let fechaActual = new Date();
    
            let mes = (fechaActual.getMonth() + 1) < 10 ? `0${fechaActual.getMonth() + 1}` : fechaActual.getMonth() + 1;
            let dia = fechaActual.getDate() < 10 ? `0${fechaActual.getDate()}` : fechaActual.getDate();
            let año = fechaActual.getFullYear();
    
            return año + "-" + mes + "-" + dia;
        }


        if (reset) {
            document.querySelector("#txtFecha").value = fechaDeHoy();
            new App().fnLlenaComboTipoDeSeguro();

            const combo = document.querySelector("#cboTipoDeSeguro");
            let aplicacion=null;
            let eleccion=null;

            ocultasecciones();

            combo.addEventListener("change", () => {
                ocultasecciones();
                const idSection = combo.value
                document.getElementById(idSection).setAttribute('style','')
                // eleccion=combo.options[combo.selectedIndex].text;
            })

            document.getElementById("btnEnviarFormVehiculos").addEventListener("click", () => {
                console.log(GuardaSolicitudVehiculo(this.url));
            })
        }
    }

    fnLlenaComboTipoDeSeguro() {
        const PROCESO = "?proceso=CATTIPOSEGURO_SELECT_ALL";
        const url = this.url+PROCESO;
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

}
window.onload = () => new App(true);