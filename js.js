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
    document.getElementById('intervalo_a').value = '';
    document.getElementById('intervalo_b').value = '';
    document.getElementById("tolerancia").value = ''; // Limpiar el campo de tolerancia
    // Limpiar resultados
    document.getElementById("resultado").value = '';
    document.getElementById("lst_Itera").value = '';
    document.getElementById("lst_Error").value = '';
});

// Asegurarse de que solo se acepten números en los campos de intervalo
document.getElementById("intervalo_a").addEventListener("input", function(event) {
    this.value = this.value.replace(/[^0-9.-]/g, ''); // Reemplazar cualquier carácter no numérico
});
document.getElementById("intervalo_b").addEventListener("input", function(event) {
    this.value = this.value.replace(/[^0-9.-]/g, ''); // Reemplazar cualquier carácter no numérico
});
document.getElementById("tolerancia").addEventListener("input", function(event) {
    this.value = this.value.replace(/[^0-9.-]/g, ''); // Reemplazar cualquier carácter no numérico
});

function bisectionMethod() {
    // Verificar si se ha seleccionado un modo
    if (mode !== 'radians' && mode !== 'degrees') {
        alert("Por favor, selecciona un modo de entrada (grados o radianes).");
        return; // Detener la función si no hay modo seleccionado
    }

    // Inicialización
    let a = parseFloat(document.getElementById("intervalo_a").value);
    let b = parseFloat(document.getElementById("intervalo_b").value);
    let error = 100; 
    let x; 
    let iteraciones = []; 
    let erroresRelativos = []; 
    let prevX;

    let maxIteraciones = 100; 
    
    // Leer la tolerancia de error del input
    let tolerancia = parseFloat(document.getElementById("tolerancia").value);
    if (isNaN(tolerancia) || tolerancia <= 0) {
        alert("Por favor, introduce una tolerancia válida.");
        return; 
    }

    // Verificación de intervalos
    if (isNaN(a) || isNaN(b) || a >= b) {
        alert("Por favor, asegúrate de que los intervalos son válidos y a < b.");
        return; 
    }

    // Verificar si hay una solución exacta en los extremos
    if (f(a) === 0) {
        alert(`Se encontró una solución exacta: x = ${formatNumber(a)}`);
        return; // Detener el proceso
    }
    if (f(b) === 0) {
        alert(`Se encontró una solución exacta: x = ${formatNumber(b)}`);
        return; // Detener el proceso
    }

    if (f(a) * f(b) > 0) {
        alert("No se encontró una solución en el intervalo dado.");
        return; 
    }

    for (let i = 0; i < maxIteraciones && error > tolerancia; i++) {
        x = (a + b) / 2; 
        let f_x = f(x); 

        // Formatear x y f(x) con la función formatNumber
        let formattedX = formatNumber(x);
        let formattedFX = formatNumber(f_x);

        iteraciones.push(`Iteración ${i + 1}: x = ${formattedX}, f(x) = ${formattedFX}`);

        if (f(a) * f_x < 0) {
            b = x; 
        } else {
            a = x; 
        }

        if (i > 0) {
            error = Math.abs((x - prevX) / x) * 100; 
            erroresRelativos.push(`Error: ${error.toFixed(4)}%`);
        }

        // Comprobar si se ha encontrado una raíz exacta
        if (f(x) === 0) {
            alert(`Se encontró una solución exacta: x = ${formatNumber(x)}`);
            break; // Detener el proceso
        }

        prevX = x; 
    }

    document.getElementById("resultado").value = `Última x: ${formatNumber(x)}`;
    document.getElementById("lst_Itera").value = iteraciones.join('\n');
    document.getElementById("lst_Error").value = erroresRelativos.join('\n');

    if (error > tolerancia) {
        alert("No se encontró una solución en el intervalo dado.");
    }
}

// Función para formatear números
function formatNumber(num) {
    if (Number.isInteger(num)) {
        return num.toString(); // Solo el entero
    } else {
        return parseFloat(num.toFixed(4)).toString(); // Hasta 4 decimales sin ceros innecesarios
    }
}

// Función para evaluar la función ingresada por el usuario
function f(x) {
    // Obtener la función desde el input
    let func = document.getElementById("funcion").value;

    // Convertir grados a radianes si el modo es grados
    if (mode === 'degrees') {
        x = x * (Math.PI / 180); // Convertir a radianes
    }

    // Reemplazar π con Math.PI
    func = func.replace(/π/g, 'Math.PI');

    // Evaluar la función utilizando mathjs
    try {
        // Registrar la función para depuración
        console.log(`Evaluando la función: ${func} en x = ${x}`); // Para depuración
        let result = math.evaluate(func, { x: x });
        console.log(`Resultado de la evaluación: ${result}`); // Para depuración
        return result;
    } catch (error) {
        console.error("Error al evaluar la función: ", error);
        alert("Error al evaluar la función. Asegúrate de que esté escrita correctamente.");
        return NaN; // Retornar NaN en caso de error
    }
}
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