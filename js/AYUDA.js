document.addEventListener("DOMContentLoaded", () => {
  // Hacemos la solicitud a JSON Server para obtener los cursos
  fetch("http://localhost:3000/cursos")
    .then(response => response.json())  // Convertimos la respuesta en JSON
    .then(cursos => {
      // Buscar el curso con id: "1"
      const curso = cursos.find(c => c.id === "1");

      // Verificamos si el curso con id: "1" tiene activo: true
      if (curso && curso.activo === true) {
        // Si el curso está activo, mostramos el botón "Ver Curso"
        const botonVerCurso = document.getElementById("view-course-12345");
        botonVerCurso.style.display = "block"; // Mostrar el botón
      }
    })
    .catch(error => {
      console.error("Error al cargar los datos:", error);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  // Hacemos la solicitud a JSON Server para obtener los cursos
  fetch("http://localhost:3000/cursos")
    .then(response => response.json())  // Convertimos la respuesta en JSON
    .then(cursos => {
      // Buscar el curso con id: "1"
      const curso = cursos.find(c => c.id === "2");

      // Verificamos si el curso con id: "1" tiene activo: true
      if (curso && curso.activo === true) {
        // Si el curso está activo, mostramos el botón "Ver Curso"
        const botonVerCurso = document.getElementById("view-course-123456");
        botonVerCurso.style.display = "block"; // Mostrar el botón
      }
    })
    .catch(error => {
      console.error("Error al cargar los datos:", error);
    });
});
document.addEventListener("DOMContentLoaded", () => {
  // Hacemos la solicitud a JSON Server para obtener los cursos
  fetch("http://localhost:3000/cursos")
    .then(response => response.json())  // Convertimos la respuesta en JSON
    .then(cursos => {
      // Buscar el curso con id: "3"
      const curso = cursos.find(c => c.id === "3");

      // Verificamos si el curso con id: "3" tiene activo: true
      if (curso && curso.activo === true) {
        // Si el curso está activo, mostramos el botón "Ver Curso"
        const botonVerCurso = document.getElementById("9876");
        botonVerCurso.style.display = "block"; // Mostrar el botón
      }
    })
    .catch(error => {
      console.error("Error al cargar los datos:", error);
    });
});
