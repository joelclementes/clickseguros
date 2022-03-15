import {ValidaEmail} from "../modulos/funciones.js";
export function GuardaSolicitudVidaAhorro(url) {
  // CREAMOS OBJETO JSON CON LOS VALORES GENERALES QUE SE CAPTURARON
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
    nombrecontratante: document.getElementById("txtNombreContratanteVidaAhorro").value,
    generocontratante: document.getElementById("cboGeneroVidaAhorro").value,
    fechanacimientocontratante: document.getElementById("txtFechaNacimientoVidaAhorro").value,
    ocupacioncontratante: document.getElementById("txtOcupacionVidaAhorro").value,
    conyugeproteccion: sessionStorage.getItem("proteccionAlConyuge"),
    conyugefechadenacimiento: document.getElementById("txtFechaNacimientoVidaAhorroConyuge").value,
    conyugeedad: document.getElementById("txtEdadVidaAhorroConyuge").value,
    conyugegenero: document.getElementById("txtEdadVidaAhorroConyuge").value,
    retornoinversionbaja: document.getElementById("retBaja").value,
    retornoinversionmedia: document.getElementById("retMedia").value,
    retornoinversionalta: document.getElementById("retAlta").value,
    retornoinversionsuma: parseInt(document.getElementById("retBaja").value) + parseInt(document.getElementById("retMedia").value) + parseInt(document.getElementById("retAlta").value)
  }

  // VALIDAMOS CAMPOS DE DATOS GENERALES
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

  if(datoscapturados.nombrecontratante==''){
    alertify.alert('Atención', "Ingrese nombre del contratante").set('modal', false); return '0';
  }

  if(datoscapturados.generocontratante=='0'){
    alertify.alert('Atención', "Ingrese género del contratante").set('modal', false); return '0';
  }

  if(datoscapturados.fechanacimientocontratante==''){
    alertify.alert('Atención', "Ingrese fecha de nacimiento del contratante").set('modal', false); return '0';
  }

  if(datoscapturados.ocupacioncontratante==''){
    alertify.alert('Atención', "Ingrese ocupación del contratante").set('modal', false); return '0';
  }

  // VALIDAMOS INFORMACIÓN DEL CÓNYUGE: FECHA DE NACIMIENTO, GÉNERO
  if(datoscapturados.conyugeproteccion=='Si'){
    if(datoscapturados.conyugefechadenacimiento=='' || datoscapturados.genero=='0'){
        alertify.alert('Atención', "No ha ingresado datos válidos del cónyuge").set('modal', false); return '0';
    }
  }

  if(datoscapturados.retornoinversionsuma<100){
    alertify.alert('Atención', "La suma del retorno de inversión debe ser 100").set('modal', false); return '0';
  }

  // OBTENEMOS LOS DATOS DEL ARCHIVO ADJUNTO
  let inputFile = document.getElementById("archNombre");
  let par_archivo = inputFile.files[0];
  let nombreArchivo
  let tipoArchivo;

  if (par_archivo != undefined) {
    nombreArchivo = par_archivo.name;
    tipoArchivo = par_archivo.type;
  }

  //   VALIDAMOS QUE EL ARCHIVO NO LLEVE ESPACIOS NI CARACTERES ESPECIALES
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

  // PREPARAMOS LOS PARÁMETROS QUE SE ENVIARÁN AL SERVIDOR
  var parametrosAjax = new FormData();
  if (nombreArchivo == undefined) {
    parametrosAjax.append("proceso", "SOLICITUDVIDAAHORRO_INSERTSINARCHIVOS");
  } else {
    parametrosAjax.append("proceso", "SOLICITUDVIDAAHORRO_INSERT");
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
  parametrosAjax.append('nombrecontratante', datoscapturados.nombrecontratante);
  parametrosAjax.append('generocontratante', datoscapturados.generocontratante);
  parametrosAjax.append('fechanacimientocontratante', datoscapturados.fechanacimientocontratante);
  parametrosAjax.append('ocupacioncontratante', datoscapturados.ocupacioncontratante);
  parametrosAjax.append('conyugeproteccion', datoscapturados.conyugeproteccion);
  parametrosAjax.append('conyugefechadenacimiento', datoscapturados.conyugefechadenacimiento);
  parametrosAjax.append('conyugeedad', datoscapturados.conyugeedad);
  parametrosAjax.append('conyugegenero', datoscapturados.conyugegenero);
  parametrosAjax.append('retornoinversionbaja', datoscapturados.retornoinversionbaja);
  parametrosAjax.append('retornoinversionmedia', datoscapturados.retornoinversionmedia);
  parametrosAjax.append('retornoinversionalta', datoscapturados.retornoinversionalta);
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