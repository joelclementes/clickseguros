-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-03-2022 a las 22:29:28
-- Versión del servidor: 10.4.20-MariaDB
-- Versión de PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `clickseguros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cattiposeguro`
--

CREATE TABLE `cattiposeguro` (
  `id` int(11) NOT NULL,
  `nombreseguro` varchar(50) NOT NULL,
  `idSection` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cattiposeguro`
--

INSERT INTO `cattiposeguro` (`id`, `nombreseguro`, `idSection`) VALUES
(1, 'Automóvil', 'Vehículo'),
(2, 'Motocicleta', 'Vehículo'),
(3, 'Pickup', 'Vehículo'),
(4, 'Pickup de carga', 'Vehículo'),
(5, 'Equipo pesado', 'Vehículo'),
(6, 'Tractocamión', 'Vehículo'),
(7, 'Remolque', 'Vehículo'),
(8, 'Gastos médicos', 'GastosMedicos'),
(9, 'Vida - ahorro', 'VidaAhorro'),
(10, 'Otro', 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(150) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `codigopostal` varchar(10) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `codigoepisodio` varchar(50) NOT NULL,
  `tiposeguro` varchar(50) NOT NULL,
  `descripcionotro` text NOT NULL,
  `archivo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`id`, `fecha`, `nombre`, `apellidos`, `pais`, `codigopostal`, `celular`, `correo`, `codigoepisodio`, `tiposeguro`, `descripcionotro`, `archivo`) VALUES
(1, '2022-03-15', 'Joel', 'Clemente Serrano', 'México', '91640', '2284959759', 'joelcs73@gmail.com', '123', 'Vida - ahorro', '', '2284959759_FacturaDiors2022.pdf'),
(2, '2022-03-15', 'Joel', 'clemente', 'méxico', '91640', '2284', 'joelcs73@gmail.com', '321', 'Otro', 'Prueba de descripción', ''),
(3, '2022-03-15', 'Joel', 'Clemente', 'México', '91640', '2284959759', 'joelcs73@hotmail.com', '654', 'Otro', 'Segunda prueba de descripción.', '2284959759_RecetaMuestra.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudsegurogastosmedicos`
--

CREATE TABLE `solicitudsegurogastosmedicos` (
  `id` int(11) NOT NULL,
  `idSolicitud` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `genero` varchar(10) NOT NULL,
  `fechanacimiento` date NOT NULL,
  `ocupacion` varchar(200) NOT NULL,
  `practicadeportespeligrosos` varchar(2) NOT NULL,
  `parentezco` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudsegurovehiculo`
--

CREATE TABLE `solicitudsegurovehiculo` (
  `id` int(11) NOT NULL,
  `idSolicitud` int(11) NOT NULL,
  `tipopersona` varchar(15) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `version` varchar(100) NOT NULL,
  `transmision` varchar(15) NOT NULL,
  `descripcionversion` varchar(200) NOT NULL,
  `tipodecobertura` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudsegurovidaahorro`
--

CREATE TABLE `solicitudsegurovidaahorro` (
  `id` int(11) NOT NULL,
  `idSolicitud` int(11) NOT NULL,
  `nombrecontratante` varchar(200) NOT NULL,
  `generocontratante` int(11) NOT NULL,
  `fechanacimientocontratante` date NOT NULL,
  `ocupacioncontratante` varchar(200) NOT NULL,
  `conyugeproteccion` varchar(2) NOT NULL,
  `conyugefechadenacimiento` date NOT NULL,
  `conyugeedad` int(11) NOT NULL,
  `conyugegenero` varchar(10) NOT NULL,
  `retornoinversionbaja` int(11) NOT NULL,
  `retornoinversionmedia` int(11) NOT NULL,
  `retornoinversionalta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cattiposeguro`
--
ALTER TABLE `cattiposeguro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitudsegurogastosmedicos`
--
ALTER TABLE `solicitudsegurogastosmedicos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitudsegurovehiculo`
--
ALTER TABLE `solicitudsegurovehiculo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitudsegurovidaahorro`
--
ALTER TABLE `solicitudsegurovidaahorro`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cattiposeguro`
--
ALTER TABLE `cattiposeguro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `solicitudsegurogastosmedicos`
--
ALTER TABLE `solicitudsegurogastosmedicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudsegurovehiculo`
--
ALTER TABLE `solicitudsegurovehiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `solicitudsegurovidaahorro`
--
ALTER TABLE `solicitudsegurovidaahorro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
