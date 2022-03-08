-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-03-2022 a las 22:45:54
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
  `aplicacion` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cattiposeguro`
--

INSERT INTO `cattiposeguro` (`id`, `nombreseguro`, `aplicacion`) VALUES
(1, 'Automóvil', 'Vehículo'),
(2, 'Motocicleta', 'Vehículo'),
(3, 'Pickup', 'Vehículo'),
(4, 'Pickup de carga', 'Vehículo'),
(5, 'Equipo pesado', 'Vehículo'),
(6, 'Tractocamión', 'Vehículo'),
(7, 'Remolque', 'Vehículo'),
(8, 'Gastos médicos', 'Vehículo'),
(9, 'Vida - ahorro', 'Vehículo'),
(10, 'Otro', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudsegurovehiculo`
--

CREATE TABLE `solicitudsegurovehiculo` (
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
  `tipopersona` varchar(15) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `version` varchar(100) NOT NULL,
  `transmision` varchar(15) NOT NULL,
  `descripcionversion` text NOT NULL,
  `tipodecobertura` varchar(25) NOT NULL
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
-- Indices de la tabla `solicitudsegurovehiculo`
--
ALTER TABLE `solicitudsegurovehiculo`
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
-- AUTO_INCREMENT de la tabla `solicitudsegurovehiculo`
--
ALTER TABLE `solicitudsegurovehiculo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
