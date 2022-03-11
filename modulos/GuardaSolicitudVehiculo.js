import {ValidaEmail} from "../modulos/funciones.js";
export function GuardaSolicitudVehiculo(url) {
    //Creamos objeto JSON con los valores que se capturaron
    const datoscapturados = {
        fecha: document.getElementById("txtFecha").value,
        nombre: document.getElementById("txtNombreSolicitante").value,
        apellidos: document.getElementById("txtApellidosSolicitante").value,
        pais: document.getElementById("txtPaisSolicitante").value,
        codigopostal: document.getElementById("txtCodigoPostalSolicitante").value,
        celular: document.getElementById("txtCelularSolicitante").value,
        correo: document.getElementById("txtCorreoSolicitante").value,
        codigoepisodio: document.getElementById("txtCodigoDeEpisodio").value,
        tiposeguro: document.getElementById("cboTipoDeSeguro").options[document.getElementById("cboTipoDeSeguro").selectedIndex].text,
        tipopersona: document.getElementById("cboTipoPersonaVehiculo").value,
        modelo: document.getElementById("txtModeloVehiculo").value,
        marca: document.getElementById("txtMarcaVehiculo").value,
        version: document.getElementById("txtVersionVehiculo").value,
        transmision: document.getElementById("cboTransmisionVehiculo").value,
        descripcionversion: document.getElementById("txtDescripcionVersionVehiculo").value,
        tipodecobertura: document.getElementById("cboTipoCoberturaVehiculo").value
    }

    // Validando campos
    if (datoscapturados.nombre == '') {
        alertify.alert('Atención', "No ha ingresado nombre").set('modal', false); return '0';
    }
    if (datoscapturados.apellidos == '') {
        alertify.alert('Atención', "No ha ingresado apellidos").set('modal', false); return '0';
    }
    if (datoscapturados.pais == '') {
        alertify.alert('Atención', "No ha ingresado país de residencia").set('modal', false); return '0';
    }
    if (datoscapturados.codigopostal == '') {
        alertify.alert('Atención', "No ha ingresado código postal").set('modal', false); return '0';
    }
    if (datoscapturados.celular == '') {
        alertify.alert('Atención', "No ha ingresado celular").set('modal', false); return '0';
    }
    if (datoscapturados.correo == '') {
        alertify.alert('Atención', "No ha ingresado correo").set('modal', false); return '0';
    }
    if(!ValidaEmail(datoscapturados.correo)){
        alertify.alert('Atención', "Correo inválido").set('modal', false);return '0';
    }
    if (datoscapturados.codigoepisodio == '') {
        alertify.alert('Atención', "No ha ingresado código de episodio").set('modal', false); return '0';
    }
    if (datoscapturados.tipopersona == '0') {
        alertify.alert('Atención', "No ha seleccionado tipo de persona").set('modal', false); return '0';
    }
    if (datoscapturados.modelo == '') {
        alertify.alert('Atención', "No ha ingresado modelo").set('modal', false); return '0';
    }
    if (datoscapturados.marca == '') {
        alertify.alert('Atención', "No ha ingresado marca").set('modal', false); return '0';
    }
    if (datoscapturados.version == '') {
        alertify.alert('Atención', "No ha ingresado versión").set('modal', false); return '0';
    }
    if (datoscapturados.transmision == '0') {
        alertify.alert('Atención', "No ha seleccionado transmisión").set('modal', false); return '0';
    }
    if (datoscapturados.tipodecobertura == '0') {
        alertify.alert('Atención', "No ha seleccionado tipo de cobertura").set('modal', false); return '0';
    }

    // Obtenemos los datos del archivo adjunto
    let inputFile = document.getElementById("archNombre");
    let par_archivo = inputFile.files[0];
    let nombreArchivo
    let tipoArchivo;

    if (par_archivo != undefined) {
        nombreArchivo = par_archivo.name;
        tipoArchivo = par_archivo.type;
    }

    //   Validamos que el archivo no lleve espacios ni caracteres especiales
    if (
        nombreArchivo != undefined &&
        (nombreArchivo.includes("á") || nombreArchivo.includes("à") || nombreArchivo.includes("ä") || nombreArchivo.includes("â") ||
            nombreArchivo.includes("é") || nombreArchivo.includes("è") || nombreArchivo.includes("ë") || nombreArchivo.includes("ê") ||
            nombreArchivo.includes("í") || nombreArchivo.includes("ì") || nombreArchivo.includes("ï") || nombreArchivo.includes("î") ||
            nombreArchivo.includes("ó") || nombreArchivo.includes("ò") || nombreArchivo.includes("ö") || nombreArchivo.includes("ô") ||
            nombreArchivo.includes("ú") || nombreArchivo.includes("ù") || nombreArchivo.includes("ü") || nombreArchivo.includes("û") ||
            nombreArchivo.includes("ñ") ||
            nombreArchivo.includes("~") ||
            nombreArchivo.includes("¿") ||
            nombreArchivo.includes(" ") ||
            nombreArchivo.includes("'"))
    ) {
        alertify
            .alert(
                "Atención",
                "Nombre de archivo inválido</br>(No debe tener espacios, «ñ», ni caracteres especiales)."
            )
            .set("modal", false);
        return '0';
    }

    //   Preparamos los parámetros que se enviarán al servidor
    var parametrosAjax = new FormData();
    if (nombreArchivo == undefined) {
        parametrosAjax.append("proceso", "SOLICITUDVEHICULO_INSERTSINARCHIVOS");
    } else {
        parametrosAjax.append("proceso", "SOLICITUDVEHICULO_INSERT");
    }
    parametrosAjax.append("fecha", datoscapturados.fecha);
    parametrosAjax.append("nombre", datoscapturados.nombre);
    parametrosAjax.append("apellidos", datoscapturados.apellidos);
    parametrosAjax.append("pais", datoscapturados.pais);
    parametrosAjax.append("codigopostal", datoscapturados.codigopostal);
    parametrosAjax.append("celular", datoscapturados.celular);
    parametrosAjax.append("correo", datoscapturados.correo);
    parametrosAjax.append("codigoepisodio", datoscapturados.codigoepisodio);
    parametrosAjax.append("tiposeguro", datoscapturados.tiposeguro);
    parametrosAjax.append("tipopersona", datoscapturados.tipopersona);
    parametrosAjax.append("modelo", datoscapturados.modelo);
    parametrosAjax.append("marca", datoscapturados.marca);
    parametrosAjax.append("version", datoscapturados.version);
    parametrosAjax.append("transmision", datoscapturados.transmision);
    parametrosAjax.append("descripcionversion", datoscapturados.descripcionversion);
    parametrosAjax.append("tipodecobertura", datoscapturados.tipodecobertura);
    parametrosAjax.append("archivo", par_archivo);
    var res = 0;
    $.ajax({
        url: url,
        type: "POST",
        data: parametrosAjax,
        contentType: false,
        cache: false,
        processData: false,
        async: false,
        success: function (resultado) {
            res = resultado;
            if (resultado == 0) {
                alertify.alert("Ocurrió un error", resultado).set("modal", false);
            } else {

            }
        },
    })
    return res;

}