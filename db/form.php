<?php
session_start();
$_SESSION['boton'] = $_POST['boton'];
$_SESSION['crud'] = $_POST['crud'];

header("Location: ../views/inicio.php");
