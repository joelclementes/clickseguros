class App {
    
    constructor(reset = false) {
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

            document.querySelector("#cboTipoDeSeguro").addEventListener("change", () => {
                console.log("Elegiste")
            })
        }
    }

    fnLlenaComboTipoDeSeguro() {
        const url = `http://localhost/clickseguros/backend/proceso.php/?proceso=CATTIPOSEGURO_SELECT_ALL`;
        let strOpciones;
        $.ajax({
            url: url,
            dataType:"json",
            success: function (datos) {
                let strOpciones = ``;
                strOpciones = `<option value="0" selected>Seleccione</option>`;
                // const datos = response.data;
                for (let d of datos) {
                    strOpciones += `<option value="${d.id}">${d.nombreseguro}</option>`;
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