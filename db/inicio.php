<?php


session_start();

$_SESSION['crud'] = null;


header("Location: ../views/inicio.php");
