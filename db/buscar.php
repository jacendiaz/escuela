<?php

session_start();

include_once "conexion.php";

$objeto = new Conexion();
$conexion = $objeto->Conectar();

switch ($_POST['boton']) {
    case 'Usuarios':
        $id = $_POST['id'];

        $consulta = "SELECT * FROM usuarios 
        WHERE id = '$id'";

        $resultado = $conexion->prepare($consulta);
        $resultado->execute();


        if ($resultado->rowCount() >= 1) {
            $data = $resultado->fetch(PDO::FETCH_ASSOC);
            print json_encode($data);
        } else {
            $data = "error";
            print json_encode($data);
        }



        break;
    case 'Alumnos':

        $nombre = $_POST['nombre'];
        $apellidop = $_POST['apellidop'];
        $apellidom = $_POST['apellidom'];
        $telefono = $_POST['telefono'];
        $usuario = $_POST['usuario'];
        $gradogrupo = $_POST['gp'];


        $calle = $_POST['calle'];
        $numero = $_POST['numero'];
        $colonia = $_POST['colonia'];
        $municipio = $_POST['municipio'];
        $estado = $_POST['estado'];
        $cp = $_POST['cp'];

        $consulta = "SELECT * FROM direcciones WHERE calle = '$calle' AND numero = '$numero' AND colonia = '$colonia' AND municipio = '$municipio' AND estado = '$estado' AND codigo_postal = '$cp'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        if (!$resultado->rowCount() >= 1) {
            $consulta1 = "INSERT INTO direcciones (id,calle,numero,colonia,municipio,estado,codigo_postal) VALUES (null,?,?,?,?,?,?)";
            $resultado1 = $conexion->prepare($consulta1);
            $resultado1->execute([$calle, $numero, $colonia, $municipio, $estado, $cp]);
        }

        $consulta2 = "SELECT id FROM direcciones WHERE calle = '$calle' AND numero = '$numero' AND colonia = '$colonia' AND municipio = '$municipio' AND estado = '$estado' AND codigo_postal = '$cp'";
        $resultado2 = $conexion->prepare($consulta2);
        $resultado2->execute();

        $data = $resultado2->fetchAll(PDO::FETCH_ASSOC);

        $direccion = $data[0]['id'];

        $consulta3 = "INSERT INTO alumnos (matricula,nombre,apellidoP,apellidoM,telefono,id_usuario,direccion,grado_grupo) VALUES (null,?,?,?,?,?,?,?)";
        $resultado3 = $conexion->prepare($consulta3);
        $resultado3->execute([$nombre, $apellidop, $apellidom, $telefono, $usuario, $direccion, $gradogrupo]);


        if ($resultado3) {
            print json_encode(['resultado' => 'succes']);
        } else {
            print json_encode(['resultado' => 'error']);
        }

        break;

    case "Docentes":

        $nombre = $_POST['nombre'];
        $apellidop = $_POST['apellidop'];
        $apellidom = $_POST['apellidom'];
        $telefono = $_POST['telefono'];
        $especialidad = $_POST['especialidad'];
        $cedula = $_POST['cedula'];
        $usuario = $_POST['usuario'];
        $tipo_empleado = 1;


        $calle = $_POST['calle'];
        $numero = $_POST['numero'];
        $colonia = $_POST['colonia'];
        $municipio = $_POST['municipio'];
        $estado = $_POST['estado'];
        $cp = $_POST['cp'];

        $consulta = "SELECT * FROM direcciones WHERE calle = '$calle' AND numero = '$numero' AND colonia = '$colonia' AND municipio = '$municipio' AND estado = '$estado' AND codigo_postal = '$cp'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        if (!$resultado->rowCount() >= 1) {
            $consulta1 = "INSERT INTO direcciones (id,calle,numero,colonia,municipio,estado,codigo_postal) VALUES (null,?,?,?,?,?,?)";
            $resultado1 = $conexion->prepare($consulta1);
            $resultado1->execute([$calle, $numero, $colonia, $municipio, $estado, $cp]);
        }

        $consulta2 = "SELECT id FROM direcciones WHERE calle = '$calle' AND numero = '$numero' AND colonia = '$colonia' AND municipio = '$municipio' AND estado = '$estado' AND codigo_postal = '$cp'";
        $resultado2 = $conexion->prepare($consulta2);
        $resultado2->execute();

        $data = $resultado2->fetchAll(PDO::FETCH_ASSOC);

        $direccion = $data[0]['id'];

        $consulta3 = "INSERT INTO empleado (clave_empleado,nombre,apellidoP,apellidoM,telefono,especialidad,cedula,direccion,usuario,tipo_empleado) VALUES (null,?,?,?,?,?,?,?,?,?)";
        $resultado3 = $conexion->prepare($consulta3);
        $resultado3->execute([$nombre, $apellidop, $apellidom, $telefono, $especialidad, $cedula, $direccion, $usuario, $tipo_empleado]);

        if ($resultado3) {
            print json_encode(['resultado' => 'succes']);
        } else {
            print json_encode(['resultado' => 'error']);
        }
        break;
    case "Administrativos":
        $nombre = $_POST['nombre'];
        $apellidop = $_POST['apellidop'];
        $apellidom = $_POST['apellidom'];
        $telefono = $_POST['telefono'];
        $especialidad = $_POST['especialidad'];
        $cedula = $_POST['cedula'];
        $usuario = $_POST['usuario'];
        $tipo_empleado = 2;


        $calle = $_POST['calle'];
        $numero = $_POST['numero'];
        $colonia = $_POST['colonia'];
        $municipio = $_POST['municipio'];
        $estado = $_POST['estado'];
        $cp = $_POST['cp'];

        $consulta = "SELECT * FROM direcciones WHERE calle = '$calle' AND numero = '$numero' AND colonia = '$colonia' AND municipio = '$municipio' AND estado = '$estado' AND codigo_postal = '$cp'";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        if (!$resultado->rowCount() >= 1) {
            $consulta1 = "INSERT INTO direcciones (id,calle,numero,colonia,municipio,estado,codigo_postal) VALUES (null,?,?,?,?,?,?)";
            $resultado1 = $conexion->prepare($consulta1);
            $resultado1->execute([$calle, $numero, $colonia, $municipio, $estado, $cp]);
        }

        $consulta2 = "SELECT id FROM direcciones WHERE calle = '$calle' AND numero = '$numero' AND colonia = '$colonia' AND municipio = '$municipio' AND estado = '$estado' AND codigo_postal = '$cp'";
        $resultado2 = $conexion->prepare($consulta2);
        $resultado2->execute();

        $data = $resultado2->fetchAll(PDO::FETCH_ASSOC);

        $direccion = $data[0]['id'];

        $consulta3 = "INSERT INTO empleado (clave_empleado,nombre,apellidoP,apellidoM,telefono,especialidad,cedula,direccion,usuario,tipo_empleado) VALUES (null,?,?,?,?,?,?,?,?,?)";
        $resultado3 = $conexion->prepare($consulta3);
        $resultado3->execute([$nombre, $apellidop, $apellidom, $telefono, $especialidad, $cedula, $direccion, $usuario, $tipo_empleado]);

        if ($resultado3) {
            print json_encode(['resultado' => 'succes']);
        } else {
            print json_encode(['resultado' => 'error']);
        }
        break;

    case "Materias":
        $id = $_POST["id"];
        $consulta = "SELECT * FROM materias WHERE id = $id";

        $resultado = $conexion->prepare($consulta);
        $resultado->execute();

        if ($resultado->rowCount() >= 1) {
            $data = $resultado->fetch(PDO::FETCH_ASSOC);
            print json_encode($data);
        } else {
            $data = "error";
            print json_encode($data);
        }
        break;

    default:
        # code...
        break;
}
