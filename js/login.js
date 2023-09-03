document.getElementById("boton").addEventListener("click", validarRegistro);

//Validar Registro
function validarRegistro(e) {
  let correo = document.getElementById("floatingInput3").value;
  let contraseña = document.getElementById("exampleInputPassword1").value;
  let alerta = document.getElementById("alerta");
  const checkbox = document.getElementById("exampleCheck1");


 let fallo = false;

document.getElementById("obligatorio").style.display = "none";
document.getElementById("obligatorio1").style.display = "none";
document.getElementById("obligatorio2").style.display = "none";
document.getElementById("alerta1").style.display = "none";

  if(correo.indexOf("@") == -1){
    document.getElementById("obligatorio").style.display = "block";
    document.getElementById("alerta1").style.display = "block";
    e.preventDefault();
    fallo = true;
  }
  if(contraseña.length < 6){

    document.getElementById("obligatorio1").style.display = "block";
    document.getElementById("alerta1").style.display = "block";
    e.preventDefault();
    fallo = true;
  }
  if(!checkbox.checked){
    document.getElementById("obligatorio2").style.display = "block";
    document.getElementById("alerta1").style.display = "block";
    e.preventDefault();
    fallo = true;
  }

  if (!fallo) {
    e.preventDefault();
    localStorage.setItem("correo", correo);
    localStorage.setItem("pass", contraseña);
    window.location.href = "index.html";
  } 
  }


document.addEventListener("keydown", function (event) {
  if (event.key === "b") {
    localStorage.clear();

    alert("LocalStorage ha sido borrado.");
  }
});
