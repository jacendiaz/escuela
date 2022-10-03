<div class="container-fluid">
    <h3 class="text-dark mb-4">Docentes</h3>
    <div class="card shadow">
        <div class="card-header py-3">
            <p class="text-primary m-0 fw-bold">Info Docentes</p>
        </div>
        <div class="card-body">

            <div class="row">
                <div class="col-2 offset-10">
                    <div class="text-center">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#modalDocente" id="botonCrear">
                            <i class="fas fa-plus"></i> Crear
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <br />

            <div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                <table id="datos_alumno" class="table my-0" id="dataTable">
                    <thead>
                        <tr>
                            <th>Clave Empleado</th>
                            <th>Nombre completo</th>
                            <th>Teléfono</th>
                            <th>Usuario</th>
                            <th>Dirección</th>
                            <th>Especialidad</th>
                            <th>Cedula profecional</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        include "../db/conexion.php";
                        $objeto = new Conexion();
                        $conexion = $objeto->Conectar();

                        $consulta = "SELECT clave_empleado, concat(empleado.nombre, ' ', apellidoP, ' ', apellidoM)
                                    as NombreCompleto, telefono, especialidad, cedula, usuarios.correo as usuario,
                                    concat(calle,':',numero, ' ', colonia, ' ',municipio, ' ', estado, ':', ' CP: ', codigo_postal) as direccion
                                    FROM empleado
                                    inner join usuarios on usuarios.id = empleado.usuario
                                    inner join direcciones on empleado.direccion = direcciones.id
                                    inner join tipo_usuarios on usuarios.tipousu = tipo_usuarios.id
                                    ORDER BY usuarios.id";

                        $resultado = $conexion->prepare($consulta);
                        $resultado->execute();

                        if ($resultado->rowCount() > 0) {
                            $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
                            foreach ($data as $dat) { ?>
                                <tr>
                                    <td><?php echo $dat['clave_empleado']; ?></td>
                                    <td><?php echo $dat['NombreCompleto']; ?></td>
                                    <td><?php echo $dat['telefono']; ?></td>
                                    <td><?php echo $dat['usuario']; ?></td>
                                    <td><?php echo $dat['direccion']; ?></td>
                                    <td><?php echo $dat['especialidad']; ?></td>
                                    <td><?php echo $dat['cedula']; ?></td>
                                    <?php if ($_SESSION['tipousu'] == "Administrador") { ?>
                                        <td>
                                            <form action="" id="formEditarDoc<?php echo $dat['clave_empleado'] ?>" method="POST" class="confirmar d-inline">
                                                <input type="hidden" name="boton" id="boton<?php echo $dat['clave_empleado'] ?>" value="Docentes">
                                                <input type="hidden" id="<?php echo $dat['clave_empleado']; ?>" value="<?php echo $dat['clave_empleado']; ?>">
                                                <button class="btn btn-warning" name="boton" value="Docentes" type="submit"><i class='fas fa-edit'></i> Editar</button>
                                                <!-- <input class="btn btn-danger" type="submit"> -->
                                            </form>

                                            <form action="" id="formEliminarDoc<?php echo $dat['clave_empleado'] ?>" method="POST" class="confirmar d-inline">
                                                <input type="hidden" name="boton" id="boton<?php echo $dat['clave_empleado'] ?>" value="Docentes">
                                                <input type="hidden" id="<?php echo $dat['clave_empleado']; ?>" value="<?php echo $dat['clave_empleado']; ?>">
                                                <button class="btn btn-danger" name="boton" value="Docentes" type="submit"><i class='fas fa-trash-alt'></i> Eliminar</button>
                                                <!-- <input class="btn btn-danger" type="submit"> -->
                                            </form>
                                        </td>
                                    <?php } ?>
                                </tr>
                        <?php }
                        } ?>
                    </tbody>

                </table>
            </div>

        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalDocente" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Crear Docente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-content">
                    <div class="modal-body">
                        <form method="POST" id="formulario" enctype="multipart/form-data">

                            <label for="nombre">Ingrese el nombre</label>
                            <input type="text" name="nombre" id="nombre" class="form-control" placeholder="Nombre">
                            <br />

                            <label for="apellidoP">Ingrese el apellido paterno</label>
                            <input type="text" name="apellidoP" id="apellidoP" class="form-control" placeholder="Apellido paterno">
                            <br />

                            <label for="apellidoM">Ingrese el apellido materno</label>
                            <input type="text" name="apellidoM" id="apellidoM" class="form-control" placeholder="Apellido materno">
                            <br />

                            <label for="telefono">Ingrese el número telefonico</label>
                            <input type="text" name="telefono" id="telefono" class="form-control" placeholder="Número de telefono">
                            <br />

                            <!-- <label for="telefono">Ingrese el teléfono</label>
                            <input type="text" name="telefono" id="telefono" class="form-control">
                            <br /> -->


                            <?php

                            $consulta = "SELECT id, correo FROM usuarios WHERE tipousu = 3";

                            $resultado = $conexion->prepare($consulta);
                            $resultado->execute();

                            ?>

                            <div class="mb-3">
                                <label for="telefono" class="form-label">Selecciona un usuario</label>
                                <select class="form-select" id="usuario" name="usuario" aria-label="Default select example">
                                    <option selected value="0">Usuario</option>
                                    <?php

                                    while ($r = $resultado->fetch(PDO::FETCH_ASSOC)) {

                                        $consulta2 = "SELECT * FROM empleado inner join usuarios on empleado.usuario = usuarios.id WHERE usuarios.id = " . $r['id'];
                                        $resultado2 = $conexion->prepare($consulta2);
                                        $resultado2->execute();

                                        if (!$resultado2->rowCount() >= 1) {
                                            echo "<option value='" . $r['id'] . "'>" . $r['id'] . " : " .  $r['correo'] . "</option>";
                                        }
                                    }
                                    ?>
                                </select>
                            </div>

                            <label for="especialidad">Ingrese la especialidad</label>
                            <input type="text" name="especialidad" id="especialidad" class="form-control" placeholder="Especialidad">
                            <br />

                            <label for="cedula">Ingrese número de cedula profecional</label>
                            <input type="text" name="cedula" id="cedula" class="form-control" placeholder="Cedula profecional">
                            <br />


                            <div class="mb-1">
                                <h6 class="text">Dirección</h6>
                                <!-- Gradient divider -->
                                <hr data-content="AND" class="hr-text">
                            </div>

                            <div class="mb-3">
                                <label for="cp" class="form-label">Código postal</label>
                                <input type="number" name="cp" class="form-control" id="cp" placeholder="Código postal">

                            </div>

                            <div class="mb-3">
                                <label for="tipoAsentamiento" class="form-label">Tipo de asentamiento</label>
                                <input disabled readonly type="text" name="tipoAsentamiento" class="form-control" id="tipoAsentamiento" placeholder="Tipo de asentamiento">
                            </div>

                            <div class="mb-3">
                                <label for="colonia" class="form-label">Ingrese la colonia</label>
                                <input type="text" name="colonia" class="form-control" id="colonia" placeholder="Colonia">
                            </div>

                            <div class="mb-3">
                                <label for="municipio" class="form-label">Municipio</label>
                                <input disabled readonly type="text" name="municipio" class="form-control" id="municipio" placeholder="Municipio">
                            </div>

                            <div class="mb-3">
                                <label for="estado" class="form-label">Estado</label>
                                <input disabled readonly type="text" name="estado" class="form-control" id="estado" placeholder="Estado">
                            </div>

                            <div class="mb-3">
                                <label for="ciudad" class="form-label>">Ciudad</label>
                                <input disabled readonly type="text" name="ciudad" class="form-control" id="ciudad" placeholder="Ciudad">
                            </div>

                            <div class="mb-3">

                                <label for="calle" class="form-label">Ingrese la calle</label>
                                <input type="text" name="calle" class="form-control" id="calle" placeholder="Calle">
                            </div>

                            <div class="mb-3">
                                <label for="numero" class="form-label">Ingrese el número</label>
                                <input type="number" name="numero" class="form-control" id="numero" placeholder="Número">
                            </div>
                    </div>
                    <div class="modal-footer">
                        <input type="hidden" name="id_usuario" id="id_usuario">
                        <input type="hidden" name="operacion" id="operacion">
                        <input type="hidden" name="boton" id="boton" value="Docentes">

                        <input type="submit" name="action" id="action" class="btn btn-success" value="Crear">


                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>