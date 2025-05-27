document.addEventListener("DOMContentLoaded", () => {
  const contenedorTareas = document.getElementById("contenedor-tareas");
  const botonesFiltro = document.querySelectorAll(".filtro");

  let tareas = [];

  fetch("/data/db.json")
    .then(response => response.json())
    .then(data => {
      tareas = data.cursos.filter(curso => curso.activo === true);
      mostrarTareas("All");
    });

  botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
      botonesFiltro.forEach(btn => btn.classList.remove("activo"));
      boton.classList.add("activo");
      mostrarTareas(boton.textContent.trim());
    });
  });

  function mostrarTareas(filtro) {
    contenedorTareas.innerHTML = "";

    const tareasFiltradas = tareas.filter(curso => {
      if (filtro === "All") return true;
      if (filtro === "Overdue") return curso.total < 100;
      if (filtro === "Pending") return curso.total === 100 && curso.estado !== true;
      if (filtro === "Completed") return curso.total === 100 && curso.estado === true;
      return false;
    });

    if (tareasFiltradas.length === 0) {
      contenedorTareas.innerHTML = "<p>No assignments found for this filter.</p>";
      return;
    }

    tareasFiltradas.forEach(curso => {
      const proyecto = curso.proyecto;

      let claseTarjeta = "tarjeta-tarea overdue";
      let estadoTexto = "⏳ Overdue";
      let botonHTML = `<button class="go-courses-btn submit-btn">📚 Go to Courses</button>`;

      if (curso.total === 100 && curso.estado === true) {
        claseTarjeta = "tarjeta-tarea tarjeta-completed";
        estadoTexto = "✅ Completed";
        botonHTML = ""; // No mostrar botón
      } else if (curso.total === 100 && curso.estado !== true) {
        claseTarjeta = "tarjeta-tarea tarjeta-pending";
        estadoTexto = "⚠️ Pending";
        botonHTML = `<button class="submit-btn" data-course-id="${curso.id}">📤 Submit Assignment</button>`;
      }

      const tarjeta = document.createElement("div");
      tarjeta.className = claseTarjeta;

      tarjeta.innerHTML = `
        <div class="estado">${estadoTexto}</div>
        <h3>${proyecto.titulo}</h3>
        <div class="categoria">🔵 ${capitalize(curso.tipo)} Development</div>
        <div class="fecha">📅 Due: ${formatearFecha(proyecto.fechaEntrega)}</div>
        <p class="descripcion">${proyecto.descripcion}</p>
        <div class="detalles">
          <span>🎯 Points: ${proyecto.puntos}</span>
          <span>📂 Type: ${proyecto.tipo}</span>
          <span>📘 Required Modules: ${proyecto.modulos.join(", ")}</span>
        </div>
        ${botonHTML}
      `;

      contenedorTareas.appendChild(tarjeta);
    });
  }

  function formatearFecha(fechaStr) {
    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(fechaStr).toLocaleDateString('en-US', opciones);
  }

  function capitalize(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
});
