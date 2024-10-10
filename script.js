// Modo de entrada por defecto
let mode = 'radians'; 

// Función para establecer el modo de entrada (grados o radianes)
function setMode(selectedMode) {
    mode = selectedMode; // Cambia el modo según la selección
    
    // Cambiar el estado visual de los botones
    const btnRadians = document.getElementById('btn-radians');
    const btnDegrees = document.getElementById('btn-degrees');

    // Cambiar la clase activa/inactiva sin desactivar el otro botón
    if (mode === 'radians') {
        btnRadians.classList.add('active');
        btnRadians.classList.remove('inactive');
        btnDegrees.classList.remove('active');
        btnDegrees.classList.add('inactive');
    } else {
        btnDegrees.classList.add('active');
        btnDegrees.classList.remove('inactive');
        btnRadians.classList.remove('active');
        btnRadians.classList.add('inactive');
    }

    // Mostrar el modo actual en la consola
    console.log(`Modo actual: ${mode}`);
    
    // O también puedes mostrarlo en un elemento de la página
    document.getElementById('modo-actual').textContent = ` ${mode}`;
}

// Establece el modo predeterminado al cargar la página
window.onload = function() {
    setMode(mode); // Llama a la función para establecer el modo predeterminado
};

// Función para resolver la función por el método de Newton-Raphson
function NewtMethod() {
    // Obtener los valores de los campos de texto
    const funcion = document.getElementById("funcion").value;
    const derivada = document.getElementById("derv").value;
    const valorInicial = parseFloat(document.getElementById("valorini").value);
    
    let x = valorInicial; // Valor inicial
    const maxIteraciones = 10; // Número máximo de iteraciones
    const tolerancia = 0.0001; // Tolerancia para la convergencia
    let iteraciones = []; // Para almacenar las iteraciones
    let errores = []; // Para almacenar los errores
    
    for (let i = 0; i < maxIteraciones; i++) {
        const f_x = math.evaluate(funcion, { x });
        const f_prime_x = math.evaluate(derivada, { x });
        
        if (f_prime_x === 0) {
            console.log("La derivada es cero, no se puede continuar.");
            return;
        }
        
        // Actualizar x utilizando la fórmula de Newton-Raphson
        const nuevoX = x - f_x / f_prime_x;
        
        // Almacenar iteración con 4 decimales
        iteraciones.push(`Iteración ${i + 1}: x = ${nuevoX.toFixed(4)}`);
        
        // Calcular el error
        const error = Math.abs(nuevoX - x);
        errores.push(error.toFixed(4)); // Almacenar error con 4 decimales
        
        // Verificar la convergencia
        if (error < tolerancia) {
            break;
        }
        
        x = nuevoX; // Actualizar x para la siguiente iteración
    }

    // Mostrar el resultado final
    document.getElementById('resultado').value = x.toFixed(4); // Mostrar resultado final con 4 decimales
    document.getElementById('lst_Itera').value = iteraciones.join("\n"); // Mostrar iteraciones
    document.getElementById('lst_Error').value = errores.join("\n"); // Mostrar errores
}
























// Función para agregar texto a la función
function agregarFuncion(texto) {
    var campoFuncion = document.getElementById('funcion');
    if (campoFuncion) {
        campoFuncion.value += texto; // Añade el texto al final del valor actual en el campo de texto
    } else {
        console.error("El campo de texto 'funcion' no existe");
    }
}








// DESCARGAR RESULTADOS
function descargarResultados() {
    const resultados = `Resultados:\n${document.getElementById("lst_Itera").value}\nErrores:\n${document.getElementById("lst_Error").value}`;
    const blob = new Blob([resultados], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resultados.txt";
    link.click();
}


// Evento para limpiar los campos 
document.getElementById('limpiar').addEventListener('click', function() {
    // Limpiar entradas
    document.getElementById('funcion').value = '';
    document.getElementById('derv').value = '';
    document.getElementById("valorini").value = ''; 
    // Limpiar resultados
    document.getElementById("resultado").value = '';
    document.getElementById("lst_Itera").value = '';
    document.getElementById("lst_Error").value = '';
});

















//  OCULTAR BOTONES:
function toggleTrigButtons() {
    const trigButtons = document.querySelector('.trig-buttons');
    if (trigButtons.style.display === 'none' || trigButtons.style.display === '') {
        trigButtons.style.display = 'block';
    } else {
        trigButtons.style.display = 'none';
    }
}
function toggleTrigButtonsd() {
    const trigButtonsd = document.querySelector('.trig-buttonsd');
    if (trigButtonsd.style.display === 'none' || trigButtonsd.style.display === '') {
        trigButtonsd.style.display = 'block';
    } else {
        trigButtonsd.style.display = 'none';
    }
}