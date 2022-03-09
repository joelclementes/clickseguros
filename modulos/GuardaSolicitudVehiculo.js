export function GuardaSolicitudVehiculo(url){
    // Datos de solicitud
    const datoscapturados = {
        fecha : document.getElementById("txtFecha").value,
        nombre : document.getElementById("txtNombreSolicitante").value,
        apellidos : document.getElementById("txtApellidosSolicitante").value,
        pais : document.getElementById("txtPaisSolicitante").value
    }
    const fecha = document.getElementById("txtFecha").value;
    const nombre = document.getElementById("txtNombreSolicitante").value;
    const apellidos = document.getElementById("txtApellidosSolicitante").value;
    const pais = document.getElementById("txtPaisSolicitante").value;
    const codigopostal = document.getElementById("txtCodigoPostalSolicitante").value;
    const celular = document.getElementById("txtCelularSolicitante").value;
    const correo = document.getElementById("txtCorreoSolicitante").value;
    const codigoepisodio = document.getElementById("txtCodigoDeEpisodio").value;
    const combo = document.getElementById("cboTipoDeSeguro");
    const tiposeguro = combo.options[combo.selectedIndex].text;

    // Datos específicos de vehículo
    const tipopersona = document.getElementById("cboTipoPersonaVehiculo").value;
    const modelo = document.getElementById("txtModeloVehiculo").value;
    const marca = document.getElementById("txtMarcaVehiculo").value;
    const version = document.getElementById("txtVersionVehiculo").value;
    const transmision = document.getElementById("cboTransmisionVehiculo").value;
    const descripcionversion = document.getElementById("txtDescripcionVersionVehiculo").value;
    const tipodecobertura = document.getElementById("cboTipoCoberturaVehiculo").value;
    
    // Validando campos
    if(nombre==''){
        alertify.alert('Atención', "No ha ingresado nombre").set('modal', false); return '0';
    }
    if(codigopostal==''){
        alertify.alert('Atención', "No ha ingresado código postal").set('modal', false); return '0';
    }
    if(celular==''){
        alertify.alert('Atención', "No ha ingresado celular").set('modal', false); return '0';
    }
    if(correo==''){
        alertify.alert('Atención', "No ha ingresado correo").set('modal', false); return '0';
    }
    if(tipopersona=='0'){
        alertify.alert('Atención', "No ha seleccionado tipo de persona").set('modal', false); return '0';
    }
    if(modelo==''){
        alertify.alert('Atención', "No ha ingresado modelo").set('modal', false); return '0';
    }
    if(marca==''){
        alertify.alert('Atención', "No ha ingresado marca").set('modal', false); return '0';
    }
    if(transmision=='0'){
        alertify.alert('Atención', "No ha seleccionado transmisión").set('modal', false); return '0';
    }
    if(tipodecobertura=='0'){
        alertify.alert('Atención', "No ha seleccionado tipo de cobertura").set('modal', false); return '0';
    }


    const PROCESO = `?proceso=CATTIPOSEGURO_SELECT_ALL&fecha=${fecha}&nombre=${nombre}&apellidos=${apellidos}&pais=${pais}&codigopostal=${codigopostal}&celular=${celular}&correo=${correo}`;

    // const codigoepisodio = document.getElementById("txtCodigoDeEpisodio").value;
    // const combo = document.getElementById("cboTipoDeSeguro");
    // const tiposeguro = combo.options[combo.selectedIndex].text;

    // // Datos específicos de vehículo
    // const tipopersona = document.getElementById("cboTipoPersonaVehiculo").value;
    // const modelo = document.getElementById("txtModeloVehiculo").value;
    // const marca = document.getElementById("txtMarcaVehiculo").value;
    // const version = document.getElementById("txtVersionVehiculo").value;
    // const transmision = document.getElementById("cboTransmisionVehiculo").value;
    // const descripcionversion = document.getElementById("txtDescripcionVersionVehiculo").value;
    // const tipodecobertura = document.getElementById("cboTipoCoberturaVehiculo").value;

    const urlApi = url+PROCESO;

    return urlApi;
}