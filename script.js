// Cargar tareas desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', cargarTareas);

document.getElementById('agregar').addEventListener('click', function() {
    let titulo = document.getElementById('titulo').value;
    let descripcion = document.getElementById('descripcion').value;
    let fechaVencimiento = document.getElementById('fecha_vencimiento').value;
    let estado = document.getElementById('estado').value;

    if (titulo.trim() === "") {
        alert("El título es obligatorio");
        return;
    }

    let tareas = obtenerTareas();

    // Obtener y actualizar el ID autoincremental
    let id = obtenerIdAutoincremental();
    setIdAutoincremental(id + 1); // Incrementamos el ID para la siguiente tarea

    // Crear un nuevo objeto de tarea con el ID autoincremental
    let tarea = {
        id,
        titulo,
        descripcion,
        fechaVencimiento,
        estado
    };

    // Agregar tarea al arreglo
    tareas.push(tarea);
    guardarTareas(tareas);
    cargarTareas();
    limpiarFormulario();
});

// Función para cargar tareas desde localStorage
function cargarTareas() {
    let tareas = obtenerTareas();
    let listaTareas = document.getElementById('lista-tareas');
    listaTareas.innerHTML = '';

    tareas.forEach(tarea => {
        let li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${tarea.titulo}</strong><br>
                ${tarea.descripcion ? `<em>${tarea.descripcion}</em><br>` : ''}
                <small>Vence: ${tarea.fechaVencimiento}</small><br>
                Estado: ${tarea.estado}
            </div>
            <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
        `;
        listaTareas.appendChild(li);
    });
}

// Función para obtener las tareas almacenadas en localStorage
function obtenerTareas() {
    let tareas = localStorage.getItem('tareas');
    return tareas ? JSON.parse(tareas) : [];
}

// Función para guardar las tareas en localStorage
function guardarTareas(tareas) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para eliminar tarea
function eliminarTarea(id) {
    let tareas = obtenerTareas();
    tareas = tareas.filter(tarea => tarea.id !== id);
    guardarTareas(tareas);
    cargarTareas();
}

// Limpiar el formulario después de agregar la tarea
function limpiarFormulario() {
    document.getElementById('titulo').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('fecha_vencimiento').value = '';
    document.getElementById('estado').value = 'pendiente';
}

// Función para obtener el ID autoincremental desde localStorage
function obtenerIdAutoincremental() {
    let id = localStorage.getItem('idAutoincremental');
    return id ? parseInt(id) : 0; // Si no existe, empezamos desde 0
}

// Función para guardar el ID autoincremental en localStorage
function setIdAutoincremental(id) {
    localStorage.setItem('idAutoincremental', id);
}
