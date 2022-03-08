<?php
include_once 'procesosBD.php';

class jsonUsu{
	public $usuDatos="";
    public $usuPermisos="";
    public $opcDisponibles="";
}

class Seguros{

    const SERVER = "localhost";
    const USER = "root";
    const PWD = "";
    const DB = "clickseguros";

    const FILESPATH = "documentosAdjuntos/";
    const FILESPATHSTORE = "../../documentosAdjuntos";

    //******************** */ CATÁLOGO DE TIPOS DE SEGURO *************************/
    public function cattiposeguro_select_all(){
        $ProcesosBD = new ProcesosBD(self::SERVER,self::USER,self::PWD,self::DB);
        $consulta = "SELECT * FROM cattiposeguro";
        return $ProcesosBD->tabla($consulta);        
    }

    //********************** C R U D *******************/
    public function segurovehiculo_insert($fecha,$nombre,$apellidos,$pais,$codigopostal,$celular,$correo,$codigoepisodio,$tiposeguro,$tipopersona,$modelo,$marca,$version,$transmision,$descripcionversion,$tipodecobertura,$nameArchivo,$sizeArchivo,$tmpArchivo,$typeArchivo){
        $target_dir = self::FILESPATHSTORE;
        if (!file_exists($target_dir)) {
			mkdir($target_dir, 0777, true);
		}
        $tarjet_file = $target_dir.'/'.basename($nameArchivo);
        if(move_uploaded_file($tmpArchivo,$tarjet_file)){
            $ProcesosBD = new ProcesosBD(self::SERVER,self::USER,self::PWD,self::DB);
            $sentencia = "INSERT INTO solicitudsegurovehiculo (fecha,nombre,apellidos,pais,codigopostal,celular,correo,codigoepisodio,tiposeguro,tipopersona,modelo,marca,version,transmision,descripcionversion,tipodecobertura) VALUES ('$fecha','$nombre','$apellidos','$pais','$codigopostal','$celular','$correo','$codigoepisodio','$tiposeguro','$tipopersona','$modelo','$marca','$version','$transmision','$descripcionversion','$tipodecobertura')";
            return $ProcesosBD->ejecutaSentencia($sentencia);
        }
    }


}
