class Calculadora {
  sumar(num1, num2) {
    return num1 + num2;
  }
  restar(num1, num2) {
    return num1 - num2;
  }
  dividir(num1, num2) {
    return num1 / num2;
  }
  multiplicar(num1, num2) {
    return num1 * num2;
  }
}

let displayValorAnterior = document.getElementById("valor_anterior");
let displayValorActual = document.getElementById("valor_actual");
let botonesNumeros = document.querySelectorAll(".numero");
let botonesOperadores = document.querySelectorAll(".operador");

// esta clase nos permitira manejar los que ocurre en el display de la calculadora
class Display {
  constructor(displayValorAnterior, displayValorActual) {
    this.displayValorAnterior = displayValorAnterior;
    this.displayValorActual = displayValorActual;
    this.calculador = new Calculadora();
    this.valorActual = "";
    this.valorAnterior = "";
    this.tipoOperacion = undefined;
    this.signos = {
      sumar: "+",
      restar: "-",
      multiplicar: "x",
      dividir: "/",
    };
  }

  borrar() {
    this.valorActual = this.valorActual.toString().slice(0, -1);
    /*
    con la funcion slice(0,-1) cortamos el ultimo numero de nuestro valor actual y se lo agregamos al mismo valor actual
    que nos mostrara el valorActual con el ultimo numero cortado
    se agrega directo en el html con la propiedad "onclick"
    */
    this.imprimirValores(); //imrpimimos los valores
  }

  borrarTodo() {
    this.valorAnterior = "";
    this.valorActual = "";
    this.tipoOperacion = undefined;
    this.imprimirValores();
    //se agrega directo en el html con la propiedad "onclick"
  }

  agergarNumero(numero) {
    if (numero === "." && this.valorActual.includes(".")) return;
    /*
    esta condicion nos indica
    numero === "." = si el numero es igual a "." y
    this.valorActual.includes(".") = si en el numero ya hay incluido un punto
    si se cumple se retorna y no se agrega otro punto. si no se cumple se agrega el punto y se continua ejencutando el codigo
    */
    this.valorActual = this.valorActual.toString() + numero.toString();
    this.imprimirValores();
  }

  imprimirValores() {
    this.displayValorActual.textContent = this.valorActual;
    this.displayValorAnterior.textContent = `${this.valorAnterior} ${
      this.signos[this.tipoOperacion] || ""
    } `;
  }
  calcular() {
    /*
    en el metodo para agregar numero, con el metodo toString agregabamos string, ahora para realizar los calculos debemos transformarlos a numero
    por eso ocupamos el metodo parseFloat para realizar esta transformacion y lo agregamos a una variable(const)
    */
    const valorAnterior = parseFloat(this.valorAnterior);
    const valorActual = parseFloat(this.valorActual);

    if (isNaN(valorAnterior) || isNaN(valorActual)) return;
    /*
    con la funcion  isNaN consultamos si las variables no son numeros (is not a number) si es verdadero que se retorna y si es falso continua el codigo
    */
    this.valorActual = this.calculador[this.tipoOperacion](
      valorAnterior,
      valorActual
    );
  }

  computar(tipo) {
    this.tipoOperacion !== "igual" && this.calcular();
    this.tipoOperacion = tipo;
    this.valorAnterior = this.valorActual || this.valorAnterior;
    this.valorActual = "";
    this.imprimirValores();
  }
}

//se instancia la clase display
const display = new Display(displayValorAnterior, displayValorActual);

//EVENTOS
botonesNumeros.forEach((boton) => {
  boton.addEventListener("click", () => display.agergarNumero(boton.innerHTML));
});

botonesOperadores.forEach((boton) => {
  boton.addEventListener("click", () => display.computar(boton.value));
});
