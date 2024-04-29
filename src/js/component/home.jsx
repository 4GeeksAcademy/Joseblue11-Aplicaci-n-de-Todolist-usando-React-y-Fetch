// Explicacion del paso por paso como hice el proyecto. para mis profesores Jose Caro, Yorkfran Abreu , 
// para Deimian Vazques, Hecho por Jose Antonio Tovar con Amor, Dedicacion y horas de sin dormir jajaajja
// Saludos

//   1. **Importaciones**:
import React, { useState, useEffect } from "react";
//- Importamos `React`, `useState` y `useEffect` para utilizar los hooks de React.

import rigoImage from "../../img/rigo-baby.jpg";
//Importamos `rigoImage` que es una imagen que se utilizará en el componente.

const BASE_URL = "https://playground.4geeks.com/todo";
//Definimos la constante `BASE_URL` que será la URL base para hacer las solicitudes a la API.

// 2. **Componente `Home`**:
const Home = () => {
// Definimos el componente `Home` utilizando una función de flecha.

// 3. **Estado inicial**:
// Utilizamos el hook `useState` para definir tres estados:
  const [tasks, setTasks] = useState([]);
  // `tasks`: un arreglo que almacenará las tareas.
  const [newTaskText, setNewTaskText] = useState("");
  // `newTaskText`: un string que almacenará el texto de la nueva tarea.
  const [editingTask, setEditingTask] = useState(null);
  // `editingTask`: un objeto que almacenará la tarea que se está editando.
  const [editedTaskText, setEditedTaskText] = useState("");
  // `editedTaskText`: un string que almacenará el texto editado de la tarea.



//4. **Efecto de montaje**:
//Utilizamos el hook `useEffect` para llamar a la función `getAllTasks` cuando el componente se monta.
  useEffect(() => {
    getAllTasks();
  }, []);

//  5. **Función `getAllTasks`**:
// Esta función se encarga de obtener todas las tareas del servidor.
// Utilizamos `fetch` para hacer una solicitud GET a la API.
// Manejamos la respuesta de la API, verificando si es exitosa o si ocurre algún error.
// Si la respuesta es exitosa, actualizamos el estado `tasks` con los datos recibidos.

  const getAllTasks = () => {
    fetch(`${BASE_URL}/users/Joseblue11`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar las tareas");
        }
        return response.json();
      })
      .then((data) => {
        if (data.todos) {
          setTasks(data.todos);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };


//  6. **Función `createTask`**:
// Esta función se encarga de crear una nueva tarea en el servidor.
// Primero verificamos que el texto de la nueva tarea no esté vacío.
// Utilizamos `fetch` para hacer una solicitud POST a la API, enviando los datos de la nueva tarea.
// Manejamos la respuesta de la API, verificando si es exitosa o si ocurre algún error.
// Si la respuesta es exitosa, limpiamos el campo de texto de la nueva tarea y llamamos a `getAllTasks` para actualizar la lista de tareas.
  
  const createTask = () => {
    if (newTaskText.trim() === "") return;

    fetch(`${BASE_URL}/todos/Joseblue11`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: newTaskText }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al crear la tarea");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tarea creada:", data);
        setNewTaskText("");
        getAllTasks();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };


// 7. **Función `updateTask`**:
// Esta función se encarga de actualizar una tarea existente en el servidor.
// Utilizamos `fetch` para hacer una solicitud PUT a la API, enviando los datos actualizados de la tarea.
// Manejamos la respuesta de la API, verificando si es exitosa o si ocurre algún error.
// Si la respuesta es exitosa, limpiamos los estados `editingTask` y `editedTaskText`, y llamamos a `getAllTasks` para actualizar la lista de tareas.

  const updateTask = (id, updatedTask) => {
    fetch(`${BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar la tarea");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tarea actualizada:", data);
        setEditingTask(null);
        setEditedTaskText("");
        getAllTasks();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };



// 8. **Función `deleteTask`**:
// Esta función se encarga de eliminar una tarea existente del servidor.
// Utilizamos `fetch` para hacer una solicitud DELETE a la API, pasando el ID de la tarea a eliminar.
// Manejamos la respuesta de la API, verificando si es exitosa o si ocurre algún error.
// Si la respuesta es exitosa, llamamos a `getAllTasks` para actualizar la lista de tareas.

  const deleteTask = (id) => {
    fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar la tarea");
        }
        console.log("Tarea eliminada con éxito");
        getAllTasks();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };


//  9. **Función `startEditing`**:
// Esta función se encarga de iniciar el modo de edición de una tarea.
// Actualizamos los estados `editingTask` y `editedTaskText` con la tarea que se va a editar.

  const startEditing = (task) => {
    setEditingTask(task);
    setEditedTaskText(task.label);
  };

// 10. **Función `cancelEditing`**:
//Esta función se encarga de cancelar el modo de edición.
//Limpiamos los estados `editingTask` y `editedTaskText`.

const cancelEditing = () => {
    setEditingTask(null);
    setEditedTaskText("");
  };


// 11. **Función `saveEditedTask`**:
//Esta función se encarga de guardar los cambios de la tarea editada.
//Llamamos a la función `updateTask` con el ID de la tarea editada y el nuevo texto.

  const saveEditedTask = () => {
    updateTask(editingTask.id, { label: editedTaskText });
  };


// 12. **Renderizado del componente**:
// Renderizamos el componente, mostrando un encabezado, una imagen y un formulario para crear y editar tareas.
// Utilizamos un condicional para mostrar el campo de entrada editable cuando una tarea está siendo editada.
// Mostramos la lista de tareas, incluyendo los botones de editar y eliminar.
// Mostramos un pequeño resumen con la cantidad de tareas pendientes.

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>Aplicación de Todolist usando React y Fetch</h1>
      <img
        className="img-1 d-flex"
        src={rigoImage}
        style={{ width: "19rem", height: "16rem" }}
      />
      <div className="input-items d-flex align-items-center justify-content-center align-content-center flex-wrap flex-direction-row w-100">
        <div className="input-group input-group-lg w-100">
          <label className="input-group-text rounded-0" htmlFor="inputTask">
            <i className="fas fa-tasks"></i>
          </label>
          <input
            type="text"
            id="inputTask"
            className="form-control rounded-0"
            placeholder="¿Qué necesita hacerse?"
            maxLength={40}
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createTask();
              }
            }}
          />
        </div>
        <ul className="list-group d-flex w-100">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="list-group-item rounded-0 border w-50 text-muted d-flex justify-content-between align-items-center"
            >
              {editingTask && editingTask.id === task.id ? (
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    value={editedTaskText}
                    onChange={(e) => setEditedTaskText(e.target.value)}
                    className="form-control rounded-0 mr-2"
                  />
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={saveEditedTask}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={cancelEditing}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  {task.label}
                  <div>
                    <button
                      className="btn btn-sm btn-primary mr-2"
                      onClick={() => startEditing(task)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
          <li className="list-group-item rounded-0 border w-50 text-muted">
            <small>
              {tasks.length} {tasks.length === 1 ? "tarea" : "tareas"} pendientes
            </small>
          </li>
        </ul>
        <p>
          Hecho con amor por Jose Antonio Tovar!
        </p>
      </div>
    </div>
  );
};

export default Home 
