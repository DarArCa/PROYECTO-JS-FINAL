document.addEventListener("DOMContentLoaded", () => {
  const contenedorTareas = document.getElementById("contenedor-tareas");
  const botonesFiltro = document.querySelectorAll(".filtro");

  let tareas = [];

  fetch("/data/db.json")
    .then(response => response.json())
    .then(data => {
      // Solo cursos activos
      tareas = data.cursos.filter(curso => curso.activo);
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
      if (filtro === "Overdue") return true;
      // En este ejemplo no hay tareas en estado "Pending", "Completed", etc.
      // Por lo tanto, esos filtros no mostrarán nada
      return false;
    });

    if (tareasFiltradas.length === 0) {
      contenedorTareas.innerHTML = "<p>No assignments found for this filter.</p>";
      return;
    }

    tareasFiltradas.forEach(curso => {
      const proyecto = curso.proyecto;
      const tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta-tarea overdue";

      tarjeta.innerHTML = `
        <div class="estado">⏳ Overdue</div>
        <h3>${proyecto.titulo}</h3>
        <div class="categoria">🔵 ${curso.tipo.charAt(0).toUpperCase() + curso.tipo.slice(1)} Development</div>
        <div class="fecha">📅 Due: ${formatearFecha(proyecto.fechaEntrega)}</div>
        <p class="descripcion">${proyecto.descripcion}</p>
        <div class="detalles">
          <span>🎯 Points: ${proyecto.puntos}</span>
          <span>📂 Type: ${proyecto.tipo}</span>
          <span>📘 Required Modules: ${proyecto.modulos.join(", ")}</span>
        </div>
        <button class="submit-btn">📤 Submit Assignment</button>
      `;

      contenedorTareas.appendChild(tarjeta);
    });
  }

  function formatearFecha(fechaStr) {
    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(fechaStr).toLocaleDateString('en-US', opciones);
  }
});
