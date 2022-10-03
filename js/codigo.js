
//$(document).ready(function(){

$('#formLogin').submit(function (e) {
    e.preventDefault();
    console.log("Hola");
    var usuario = $.trim($("#usuario").val());
    var password = $.trim($("#password").val());
    if (usuario == "" && password == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacios!!',
        });
        return false;
    } else if (usuario == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo usuario vacio!!',
        });
        return false;
    } else if (password == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo password vacio!!',
        });
        return false;
    } else if (!regexforpassword(password)) {
        Swal.fire({
            icon: 'warning',
            title: 'La contraseña debe tener entre 6 y 20 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos.',
        });
    } else {
        $.ajax({
            url: "db/login.php",
            type: "POST",
            datatype: "json",
            data: { usuario: usuario, password: password },
            success: function (data) {
                console.log(data);
                console.log(data == '"error"');
                if (data == '"error"') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Datos incorrectos',
                    });
                    document.getElementById("usuario").value = "";
                    document.getElementById("password").value = "";
                    return false;
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Datos Correctos!!',
                        confirmButtonColor: "#3885f6",
                        confirmButtonText: 'Ingresar'
                    }).then((result) => {
                        if (result.value) {
                            window.location.href = "views/inicio.php";
                        }
                    })
                }
            }
        });
    }
});

$('#formRegistrarUsu').submit(function (e) {
    e.preventDefault();

    var usuario = $.trim($("#correo").val());
    var password = $.trim($("#password").val());
    var tipousu = ($("#tipousu").val());
    if (usuario == "" && password == "" && tipousu == "Tipo de usuario") {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacios!!',
        });
        return false;
    } else if (usuario == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo correo vacio!!',
        });
        return false;
    } else if (password == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo contraseña vacio!!',
        });
        return false;
    } else if (!regexforpassword(password)) {
        Swal.fire({
            icon: 'warning',
            title: 'La contraseña debe tener entre 6 y 20 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos.',
        });
    } else if (tipousu == "Tipo de usuario") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo tipo de usuario no seleccionado!!',
        });
        return false;

    } else {
        $.ajax({
            url: "../db/registrar.php",
            type: "POST",
            datatype: "json",
            data: { usuario: usuario, password: password, tipousu: tipousu },
            success: function (data) {
                console.log(data);
                console.log(data == '"success"');

                switch (data) {

                    case '"success"':
                        Swal.fire({
                            icon: 'success',
                            title: 'Usuario registrado!!',
                            confirmButtonColor: "#3885f6",
                            confirmButtonText: 'Confirmar'
                        }).then((result) => {
                            if (result.value) {
                                window.location.href = "inicio.php";
                            }
                        })
                        break;
                    case '"error"':
                        Swal.fire({
                            icon: 'error',
                            title: 'Ha ocurrido un error',
                        });
                        break;
                    case '"warning"':
                        Swal.fire({
                            icon: 'warning',
                            title: 'El usuario ya existe',
                        });
                        break;
                }


            }
        });
    }
});
//});

$('#FormRegistrarAlu').submit(function (e) {
    e.preventDefault();

    var nombre = $.trim($("#nombre").val());
    var apellidop = $.trim($("#apellidop").val());
    var apellidom = $.trim($("#apellidom").val());
    var telefono = $.trim($("#telefono").val());
    var usuario = ($("#usuario").val());
    var gp = $.trim($("#gp").val());

    var calle = $.trim($("#calle").val());
    var numero = $.trim($("#numero").val());
    var colonia = $.trim($("#colonia").val());
    var municipio = $.trim($("#municipio").val());
    var estado = $.trim($("#estado").val());
    var cp = $.trim($("#cp").val());

    if (nombre == "" && apellidop == "" && apellidom == "" && telefono == "" && usuario == "Usuario" && gp == "Grado y grupo" && calle == "" && numero == "" && colonia == "" && municipio == "" && estado == "" && cp == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacios!!',
        });
        return false;
    } else if (nombre == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo nombre vacio!!',
        });
        return false;
    } else if (apellidop == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo apellido paterno vacio!!',
        });
        return false;
    } else if (apellidom == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo apellido materno vacio!!',
        });
        return false;
    } else if (telefono == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo telefono vacio!!',
        });
        return false;
    } else if (usuario == "Usuario") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo usuario no seleccionado!!',
        });
        return false;
    } else if (gp == "Grado y grupo") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo grado y grupo no seleccionado!!',
        });
        return false;
    } else if (calle == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo calle vacio!!',
        });
        return false;
    } else if (numero == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo numero vacio!!',
        });
        return false;
    } else if (colonia == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo colonia vacio!!',
        });
        return false;
    } else if (municipio == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo municipio vacio!!',
        });
        return false;
    } else if (estado == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo estado vacio!!',
        });
        return false;
    } else if (cp == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo codigo postal vacio!!',
        });
        return false;
    } else {
        $.ajax({
            url: "../db/registrar.php",
            type: "POST",
            datatype: "json",
            data: { nombre: nombre, apellidop: apellidop, apellidom: apellidom, telefono: telefono, usuario: usuario, gp: gp, calle: calle, numero: numero, colonia: colonia, municipio: municipio, estado: estado, cp: cp },
            success: function (data) {
                console.log(data);
                console.log(data == "'error'");
                if (data == "'error") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                    });
                    // document.getElementById("usuario").value = "";
                    // document.getElementById("password").value = "";
                    // return false;
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Alumno registrado!!',
                        confirmButtonColor: "#3885f6",
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result.value) {
                            window.location.href = "inicio.php";
                        }
                    })
                }
            }
        });
    }

});

$('#FormRegistrarDocentes').submit(function (e) {
    e.preventDefault();
    console.log("hola")
    var nombre = $.trim($("#nombre").val());
    var apellidop = $.trim($("#apellidop").val());
    var apellidom = $.trim($("#apellidom").val());
    var telefono = $.trim($("#telefono").val());
    var usuario = ($("#usuario").val());
    var especialidad = $.trim($("#especialidad").val());
    var cedula = $.trim($("#cedula").val());

    var calle = $.trim($("#calle").val());
    var numero = $.trim($("#numero").val());
    var colonia = $.trim($("#colonia").val());
    var municipio = $.trim($("#municipio").val());
    var estado = $.trim($("#estado").val());
    var cp = $.trim($("#cp").val());

    if (nombre == "" && apellidop == "" && apellidom == "" && telefono == "" && usuario == "Usuario" && especialidad == "" && cedula == "" && calle == "" && numero == "" && colonia == "" && municipio == "" && estado == "" && cp == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacios!!',
        });
        return false;
    } else if (nombre == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo nombre vacio!!',
        });
        return false;
    } else if (apellidop == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo apellido paterno vacio!!',
        });
        return false;
    } else if (apellidom == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo apellido materno vacio!!',
        });
        return false;
    } else if (telefono == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo telefono vacio!!',
        });
        return false;
    } else if (usuario == "Usuario") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo usuario no seleccionado!!',
        });
        return false;
    } else if (especialidad == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo especialidad vacio!!',
        });
        return false;
    } else if (cedula == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo cedula vacio!!',
        });
        return false;
    } else if (cedula == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo cedula vacio!!',
        });
        return false;
    } else if (calle == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo calle vacio!!',
        });
        return false;
    } else if (numero == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo numero vacio!!',
        });
        return false;
    } else if (colonia == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo colonia vacio!!',
        });
        return false;
    } else if (municipio == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo municipio vacio!!',
        });
        return false;
    } else if (estado == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo estado vacio!!',
        });
        return false;
    } else if (cp == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo codigo postal vacio!!',
        });
        return false;
    } else {
        $.ajax({
            url: "../db/registrar.php",
            type: "POST",
            datatype: "json",
            data: { nombre: nombre, apellidop: apellidop, apellidom: apellidom, telefono: telefono, usuario: usuario, especialidad: especialidad, cedula: cedula, calle: calle, numero: numero, colonia: colonia, municipio: municipio, estado: estado, cp: cp },
            success: function (data) {
                console.log(data);
                console.log(data == "'error'");
                if (data == "'error") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                    });
                    // document.getElementById("usuario").value = "";
                    // document.getElementById("password").value = "";
                    // return false;
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Docente registrado!!',
                        confirmButtonColor: "#3885f6",
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result.value) {
                            window.location.href = "inicio.php";
                        }
                    })
                }
            }
        });
    }

});

$('#FormRegistrarAdministrativos').submit(function (e) {
    e.preventDefault();
    console.log("hola")
    var nombre = $.trim($("#nombre").val());
    var apellidop = $.trim($("#apellidop").val());
    var apellidom = $.trim($("#apellidom").val());
    var telefono = $.trim($("#telefono").val());
    var usuario = ($("#usuario").val());
    var especialidad = $.trim($("#especialidad").val());
    var cedula = $.trim($("#cedula").val());

    var calle = $.trim($("#calle").val());
    var numero = $.trim($("#numero").val());
    var colonia = $.trim($("#colonia").val());
    var municipio = $.trim($("#municipio").val());
    var estado = $.trim($("#estado").val());
    var cp = $.trim($("#cp").val());

    if (nombre == "" && apellidop == "" && apellidom == "" && telefono == "" && usuario == "Usuario" && especialidad == "" && cedula == "" && calle == "" && numero == "" && colonia == "" && municipio == "" && estado == "" && cp == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacios!!',
        });
        return false;
    } else if (nombre == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo nombre vacio!!',
        });
        return false;
    } else if (apellidop == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo apellido paterno vacio!!',
        });
        return false;
    } else if (apellidom == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo apellido materno vacio!!',
        });
        return false;
    } else if (telefono == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo telefono vacio!!',
        });
        return false;
    } else if (usuario == "Usuario") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo usuario no seleccionado!!',
        });
        return false;
    } else if (especialidad == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo especialidad vacio!!',
        });
        return false;
    } else if (cedula == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo cedula vacio!!',
        });
        return false;
    } else if (cedula == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo cedula vacio!!',
        });
        return false;
    } else if (calle == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo calle vacio!!',
        });
        return false;
    } else if (numero == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo numero vacio!!',
        });
        return false;
    } else if (colonia == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo colonia vacio!!',
        });
        return false;
    } else if (municipio == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo municipio vacio!!',
        });
        return false;
    } else if (estado == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo estado vacio!!',
        });
        return false;
    } else if (cp == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo codigo postal vacio!!',
        });
        return false;
    } else {
        $.ajax({
            url: "../db/registrar.php",
            type: "POST",
            datatype: "json",
            data: { nombre: nombre, apellidop: apellidop, apellidom: apellidom, telefono: telefono, usuario: usuario, especialidad: especialidad, cedula: cedula, calle: calle, numero: numero, colonia: colonia, municipio: municipio, estado: estado, cp: cp },
            success: function (data) {
                console.log(data);
                console.log(data == "'error'");
                if (data == "'error") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                    });
                    // document.getElementById("usuario").value = "";
                    // document.getElementById("password").value = "";
                    // return false;
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Administrativo registrado!!',
                        confirmButtonColor: "#3885f6",
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result.value) {
                            window.location.href = "inicio.php";
                        }
                    })
                }
            }
        });
    }

});

$('#FormRegistrarMaterias').submit(function (e) {
    e.preventDefault();

    var nombre = $.trim($("#nombre").val());
    console.log(nombre);
    if (nombre == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo nombre vacio!!',
        });
        return false;
    } else {
        $.ajax({
            url: "../db/registrar.php",
            type: "POST",
            datatype: "json",
            data: { nombre: nombre },
            success: function (data) {
                console.log(data);
                console.log(data == "'error'");
                if (data == "'error") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error',
                    });
                    // document.getElementById("usuario").value = "";
                    // document.getElementById("password").value = "";
                    // return false;
                }
                else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Materia registrada!!',
                        confirmButtonColor: "#3885f6",
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result.value) {
                            window.location.href = "inicio.php";
                        }
                    })
                }
            }
        });
    }
});

$("#FormBuscarUsu").submit(function (e) {
    e.preventDefault();
    var id = $.trim($("#id").val());
    console.log(id);
    if (id == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacio!!',
        });
        return false;
    } else if (id == $.trim($("#ida").val())) {
        Swal.fire({
            icon: 'warning',
            title: 'Ya has proporcionado ese ID antes!!',
        });
        return false;
    }

    else {
        $.ajax({
            url: "../db/buscar.php",
            type: 'POST',
            datatype: "json",
            data: { id: id },
            success: function (data) {
                console.log(data);
                if (data == '"error"') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Usuario no encontrado',
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario encontrado!!',
                        confirmButtonColor: "#3885f6",
                        confirmButtonText: 'Confirmar'
                    }).then((result) => {
                        if (result.value) {
                            var url = 'inicio.php';
                            const obj = JSON.parse(data);
                            concatform(url, obj);
                        }
                    })
                }
            }
        });
    }
});

$('#formActualizarUsu').submit(function (e) {
    e.preventDefault();

    var ida = $.trim($("#ida").val());
    var usuario = $.trim($("#correo").val());
    var password = $.trim($("#password").val());
    var tipousu = ($("#tipousu").val());
    if (usuario == "" && password == "" && tipousu == "Tipo de usuario") {
        Swal.fire({
            icon: 'warning',
            title: 'Campos vacios!!',
        });
        return false;
    } else if (usuario == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo correo vacio!!',
        });
        return false;
    } else if (password == "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo contraseña vacio!!',
        });
        return false;
    } else if (!regexforpassword(password)) {
        Swal.fire({
            icon: 'warning',
            title: 'La contraseña debe tener entre 6 y 20 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos.',
        });
    } else if (tipousu == "Tipo de usuario") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo tipo de usuario no seleccionado!!',
        });
        return false;

    } else {
        $.ajax({
            url: "../db/actualizar.php",
            type: "POST",
            datatype: "json",
            data: { ida: ida, usuario: usuario, password: password, tipousu: tipousu },
            success: function (data) {
                console.log(data);
                console.log(data == "'error'");

                switch (data) {

                    case '"success"':
                        console.log("success 1");
                        Swal.fire({

                            icon: 'success',
                            title: 'Usuario actualizado!!',
                            confirmButtonColor: "#3885f6",
                            confirmButtonText: 'Confirmar'
                        }).then((result) => {
                            if (result.value) {
                                window.location.href = "inicio.php";
                            }
                        })
                        break;
                    case '"warning"':
                        Swal.fire({
                            icon: 'warning',
                            title: 'No has actualizado ningún campo!!!',
                        });
                        break;
                    case '"error"':
                        Swal.fire({
                            icon: 'error',
                            title: 'Ha ocurrido un error',
                        });
                }


            }
        });
    }
});

function regexforpassword(password) {

    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (regex.test(password)) {
        return true;
    } else {

        return false;
    }
}


function concatform(url, obj) {
    var form = "<form action='" + url + "' method='post'>";

    for (const key in obj) {
        form += '<input type="hidden" name="' + key + '" value="' + obj[key] + '" />';
    }
    console.log(form)

    var formpost = $(form);
    $('body').append(formpost);

    formpost.submit();
}

function sum (){
    
}