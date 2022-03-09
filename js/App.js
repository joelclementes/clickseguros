import {GuardaSolicitudVehiculo} from "../modulos/GuardaSolicitudVehiculo.js"
class App {
    
    constructor(reset = false) {
        this.url = "http://127.0.0.1:80/clicksegurosbackend/proceso.php/"

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
                // const datos = response.data;
                for (let d of datos) {
                    strOpciones += `<option value="${d.idSection}">${d.nombreseguro}</option>`;
                }
                document.querySelector("#cboTipoDeSeguro").innerHTML = strOpciones;
            }
        })
    }

    fnConstruyeFrm1(datos){
        let strOpciones = ``;
        let datosGenerales = ``;
        strOpciones = `<option value="0" selected>Seleccione</option>`;
        // const datos = response.data;
        for (let d of datos) {
            strOpciones += `<option value="${d.id}">${d.nombreseguro}</option>`;
        }
        datosGenerales = `
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="mb-3">
                    <label for="txtFecha" class="form-label">Fecha</label>
                    <input type="date" class="form-control" name="txtFecha" id="txtFecha" placeholder="" value="${this.fechaDeHoy()}">
                </div>
                <div class="mb-3">
                    <label for="txtNombre" class="form-label">Nombre</label>
                    <input type="text" class="form-control" name="txtNombre" id="txtNombre" placeholder="">
                </div>
                <div class="mb-3">
                    <label for="txtApellidos" class="form-label">Apellidos</label>
                    <input type="text" class="form-control" name="txtApellidos" id="txtApellidos" placeholder="">
                </div>
                <div class="mb-3">
                    <label for="txtPais" class="form-label">País de residencia</label>
                    <input type="text" class="form-control" name="txtPais" id="txtPais" placeholder="">
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="mb-3">
                    <label for="txtCodigoPostal" class="form-label">Código postal</label>
                    <input type="text" class="form-control" name="txtCodigoPostal" id="txtCodigoPostal" placeholder="">
                </div>
                <div class="mb-3">
                    <label for="txtCelular" class="form-label">Número celular</label>
                    <input type="text" class="form-control" name="txtCelular" id="txtCelular" placeholder="">
                </div>
                <div class="mb-3">
                    <label for="txtCorreo" class="form-label">Correo</label>
                    <input type="email" class="form-control" name="txtCorreo" id="txtCorreo" placeholder="correo@ejemplo.com">
                </div>
                <div class="mb-3">
                    <label for="txtCodigoDeEpisodio" class="form-label">Código de episodio</label>
                    <input type="text" class="form-control" name="txtCodigoDeEpisodio" id="txtCodigoDeEpisodio" placeholder="">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-6 mb-3">
                <label for="cboTipoDeSeguro" class="form-label">Tipo de seguro</label>
                <select class="form-select" name="cboTipoDeSeguro" id="cboTipoDeSeguro" placeholder="">${strOpciones}</select>
            </div>
        </div>`;
            document.getElementById("datosgenerales").innerHTML = datosGenerales;
        

    }

}
window.onload = () => new App(true);