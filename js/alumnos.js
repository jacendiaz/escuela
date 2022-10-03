
$(document).ready(function () {

    $("#botonCrear").click(function () {
        $("#formulario")[0].reset();
        $(".modal-title").text("Crear Alumno");
        $("#action").val("Crear");
        $("#operacion").val("Crear");
        $("#imagen_subida").html("");
    });


    $('#datos_alumno').DataTable({
        language: {
            "decimal": "",
            "emptyTable": "No hay datos",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "infoEmpty": "Mostrando 0 a 0 de 0 registros",
            "infoFiltered": "(Filtro de _MAX_ total registros)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ registros",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron coincidencias",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            },
            "aria": {
                "sortAscending": ": Activar orden de columna ascendente",
                "sortDescending": ": Activar orden de columna desendente"
            }
        }
    });


});

//Aquí código inserción
$(document).on('submit', '#formulario', function (event) {
    event.preventDefault();

    var nombre = $('#nombre').val();
    var usuario = $('#usuario').val();
    var action = $("#action").val();

    if (nombre != '' && usuario != 0) {
        if (action == 'Crear') {
            $.ajax({
                url: "../db/registrar.php",
                method: 'POST',
                data: new FormData(this),
                contentType: false,
                processData: false,
                success: function (data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Alumno registrado correctamente.'
                    }).then((result) => {
                        if (result.value) {
                            $('#formulario')[0].reset();
                            $('#modalUsuario').modal('hide');
                            //dataTable.ajax.reload();
                            window.location.reload();
                        }
                    });
                }
            });
        } else if (action == 'Editar') {
            $.ajax({
                url: "../db/actualizar.php",
                method: 'POST',
                data: new FormData(this),
                contentType: false,
                processData: false,
                success: function (data) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Alumno actualizado correctamente.'
                    }).then((result) => {
                        if (result.value) {
                            $('#formulario')[0].reset();
                            $('#modalAlumno').modal('hide');
                            //dataTable.ajax.reload();
                            window.location.reload();
                        }
                    })



                }
            });
        }


    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Algunos campos son requeridos.'
        });
    }
});


$("[id^=formEditarMat]").submit(function (e) {
    e.preventDefault();
    var id_materia = $($(this)[0][1]).attr("id");
    console.log(id_materia);
    boton = $("#boton" + id_materia).val()
    $.ajax({
        url: "../db/buscar.php",
        method: "POST",
        data: {
            id: id_materia,
            boton: boton
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#modalMateria').modal('show');
            $('#nombre').val(data.nombre);
            $('#apellidoP').val(data.apellidoP);
            $('#apellidoM').val(data.apellidoM);
            $('#telefono').val(data.telefono);
            $('#id_usuario').val(data.id_usuario);
            $('#direccion').val(data.direccion);
            $('#grado_grupo').val(data.grado_grupo);
            $('.modal-title').text("Editar Materia");
            $('#id_alumno').val(id_materia);
            $('#action').val("Editar");
            $('#operacion').val("Editar");
            $('#boton').val("Alumonos");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    })
});