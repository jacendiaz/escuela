$(document).ready(function () {

    $("#botonCrear").click(function () {
        $("#formulario")[0].reset();
        $(".modal-title").text("Crear Usuario");
        $("#action").val("Crear");
        $("#operacion").val("Crear");
        $("#imagen_subida").html("");
    });


    $('#datos_usuario').DataTable({
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

    var email = $('#email').val();
    var tipousu = $('#tipousu').val();
    var action = $("#action").val();

    if (tipousu != 0 && email != '') {

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
                        title: 'Usuario registrado correctamente.'
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
                        title: 'Usuario actualizado correctamente.'
                    }).then((result) => {
                        if (result.value) {
                            $('#formulario')[0].reset();
                            $('#modalUsuario').modal('hide');
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


$("[id^=formEditarUsu]").submit(function (e) {
    e.preventDefault();
    var id_usuario = $($(this)[0][1]).attr("id");
    console.log(id_usuario);
    boton = $("#boton" + id_usuario).val()
    $.ajax({
        url: "../db/buscar.php",
        method: "POST",
        data: {
            id: id_usuario,
            boton: boton
        },
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#modalUsuario').modal('show');
            $('#email').val(data.correo);
            $('#tipousu').val(data.tipousu);
            $('.modal-title').text("Editar Usuario");
            $('#id_usuario').val(id_usuario);
            $('#action').val("Editar");
            $('#operacion').val("Editar");
            $('#boton').val("Usuarios");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    })
});
