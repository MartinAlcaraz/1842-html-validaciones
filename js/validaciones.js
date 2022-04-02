export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [       // arreglo con los errores que podrian producirse
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {    // objeto con los mensajes respondiendo al error ocurrido 
  nombre: {                             // corresponde al input de nombre
    valueMissing: "El campo nombre  no puede estar vacío",
  },
  email: {                  
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido",
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {  // si se encuentra el error procucido en input.validity.  en el arreglo tipoDeErrores[]
    if (input.validity[error]) {     // se retorna el mensaje de error contenido en el arreglo
                                
      console.log("tipoDeInput: ",tipoDeInput,". error:" ,error);
      console.log("input.validity.valueMissing: ", input.validity.valueMissing);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);   // objeto dentro de otro objeto

      mensaje = mensajesDeError[tipoDeInput][error]; 
    }
  });
  return mensaje;       // mensaje de error retornado
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}

function borrar(){
  
}