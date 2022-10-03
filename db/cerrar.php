<?php

session_start();
unset($_SESSION['nusuario']);
session_destroy();
header("Location: ../index.php");