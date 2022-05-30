// Variables
const btnEnviar = document.querySelector("#enviar");
const formulario = document.querySelector("#enviar-mail");
const btnResetear = document.querySelector("#resetBtn");

// Variables para los campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
// expresion regular para validar un email. sacado de emailRegects.com
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<> ()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListener();
function eventListener(){
    // cuando la app arranca.
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del formulario.
    email.addEventListener("blur",validarFormulario);
    asunto.addEventListener("blur",validarFormulario);
    mensaje.addEventListener("blur",validarFormulario);

   // Reinicia el Formulario
    btnResetear.addEventListener("click", resetearFormulario); 

   // Enviar Email
    formulario.addEventListener('submit',enviarEmail)

}

// Funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    //signo de prohibido cuando pasamos el cursor encima, hacer que el boton se vea sin color, como que no esta habilitado.
    btnEnviar.classList.add("cursor-not-allowed","opacity-50")
}

function validarFormulario(e) {

    if(e.target.value.length > 0 ) {

        // Eliminamos los errores ,(cuando no completamos un campo salta el msj con el error, hacemos que cuando si lo completemos se borre eso)
        const error = document.querySelector("p.error");
        if (error) {
            error.remove();
        }

        e.target.classList.remove ("border","border-red-500");
        e.target.classList.add ("border","border-green-500");

    } else {
        e.target.classList.remove ("border", "border-green-500");
        e.target.classList.add ("border", "border-red-500");

        mostrarError("Todos los campos son obligatorios");
    }

    if (e.target.type === "email") {
        
        // usar la ExprecionRegular para comprovar con el valor del requerimiento del mail.
        if(er.test(e.target.value)) {

         const error = document.querySelector("p.error");
         if (error) {
            error.remove();
           } 
            e.target.classList.remove ("border","border-red-500");
            e.target.classList.add ("border","border-green-500");

        } else {
            e.target.classList.remove ("border","border-green-500");
            e.target.classList.add ("border","border-red-500");
            mostrarError("Email no valido");
        } 
    }
    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed","opacity-50")
    } else{
        iniciarApp();

    }
    //else {console.log ('quedan campos por validar')
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("border","border-red-500","background-red-100","text-red-500","p-3",'mt-5',"text-center","error");

    //le agregamos el atributo de "error", para que no se repita el mensaje de error en el html.
    const errores = document.querySelectorAll(".error")
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    
    }
}   

// Envio de Email...siempre que tenemos un codigo de Js que revisa un formulario, tenemos "e" t"prevent default"
function enviarEmail(e){
    e.preventDefault();

 // Mostrar spinner (rueda de enviando...)
    const spinner = document.querySelector('#spinner');
    spinner.style.display = "flex";
    // ocultamos el spinner dsp de unos segundos
    setTimeout ( () => {
       spinner.style.display = "none";

     //Mensaje de que salio todo bien.
      const  parrafo = document.createElement('p');
      parrafo.textContent = "El Mail se envio correctamente";
      parrafo.classList.add("text-center","my-10","p-2","bg-green-500","text-white","font-bold","uppercase");

     // Inserta el parrafpo antes del spinner.
      formulario.insertBefore(parrafo, spinner);
     
       setTimeout (()=> {
          parrafo.remove(); //Eliminamos el msj de Envio de Mail.
          resetearFormulario();
        }, 4000 );
    }, 3000 );
}

// funcion que resetea el formulario
function resetearFormulario (e) {
    e.preventDefault();
    formulario.reset();

    iniciarApp();
}