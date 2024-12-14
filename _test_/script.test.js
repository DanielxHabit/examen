import 'jest-localstorage-mock'; // Simular localStorage

// Funciones a probar
function obtenerTareas() {
    let tareas = localStorage.getItem('tareas');
    return tareas ? JSON.parse(tareas) : [];
}

function guardarTareas(tareas) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function eliminarTarea(id) {
    let tareas = obtenerTareas();
    tareas = tareas.filter(tarea => tarea.id !== id);
    guardarTareas(tareas);
}

function obtenerIdAutoincremental() {
    let id = localStorage.getItem('idAutoincremental');
    return id ? parseInt(id) : 0;
}

function setIdAutoincremental(id) {
    localStorage.setItem('idAutoincremental', id);
}

// Test: Verificar si localStorage está limpio antes de comenzar
beforeEach(() => {
    localStorage.clear(); // Limpiar localStorage antes de cada prueba
});

// Test: Obtener tareas cuando no hay tareas en localStorage
test('obtenerTareas cuando no hay tareas', () => {
    expect(obtenerTareas()).toEqual([]);
});

// Test: Guardar tareas en localStorage
test('guardarTareas debe guardar tareas correctamente', () => {
    const tareas = [
        { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción 1', fechaVencimiento: '2024-12-31', estado: 'pendiente' },
    ];
    guardarTareas(tareas);
    expect(localStorage.setItem).toHaveBeenCalledWith('tareas', JSON.stringify(tareas));
});

// Test: Eliminar tarea de localStorage
test('eliminarTarea debe eliminar la tarea correctamente', () => {
    const tareas = [
        { id: 1, titulo: 'Tarea 1', descripcion: 'Descripción 1', fechaVencimiento: '2024-12-31', estado: 'pendiente' },
        { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción 2', fechaVencimiento: '2024-12-31', estado: 'completada' }
    ];
    guardarTareas(tareas);
    eliminarTarea(1);
    const tareasRestantes = obtenerTareas();
    expect(tareasRestantes).toEqual([
        { id: 2, titulo: 'Tarea 2', descripcion: 'Descripción 2', fechaVencimiento: '2024-12-31', estado: 'completada' }
    ]);
});

// Test: Obtener ID autoincremental cuando no existe en localStorage
test('obtenerIdAutoincremental cuando no existe ID en localStorage', () => {
    expect(obtenerIdAutoincremental()).toBe(0);
});

// Test: Obtener ID autoincremental cuando ya existe en localStorage
test('obtenerIdAutoincremental cuando existe ID en localStorage', () => {
    localStorage.setItem('idAutoincremental', '5');
    expect(obtenerIdAutoincremental()).toBe(5);
});

// Test: Actualizar ID autoincremental en localStorage
test('setIdAutoincremental debe actualizar correctamente el ID', () => {
    setIdAutoincremental(10);
    expect(localStorage.setItem).toHaveBeenCalledWith('idAutoincremental', '10');
});

// Test: Incrementar ID autoincremental correctamente
test('debería incrementar el ID al agregar una tarea', () => {
    localStorage.setItem('idAutoincremental', '2');
    const idAntes = obtenerIdAutoincremental();
    setIdAutoincremental(idAntes + 1);
    expect(obtenerIdAutoincremental()).toBe(idAntes + 1);
});
