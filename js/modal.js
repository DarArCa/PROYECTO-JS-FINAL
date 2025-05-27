let selectedCourseId = null;

// Abrir el modal solo desde botones Submit Assignment
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("submit-btn") && e.target.dataset.courseId) {
    selectedCourseId = e.target.dataset.courseId;

    const card = e.target.closest(".tarjeta-tarea");
    document.getElementById("modalTitle").textContent = card.querySelector("h3").textContent;
    document.getElementById("modalDescription").textContent = card.querySelector(".descripcion").textContent;
    document.getElementById("modalPoints").textContent = card.querySelector(".detalles span:nth-child(1)").textContent;
    document.getElementById("modalType").textContent = card.querySelector(".detalles span:nth-child(2)").textContent;
    document.getElementById("modalDueDate").textContent = card.querySelector(".fecha").textContent.replace("📅 Due: ", "");

    document.getElementById("notes").value = ""; // Limpiar notas
    document.getElementById("submitAssignment").disabled = true;
    document.getElementById("submitAssignment").classList.add("submit-disabled");
    document.getElementById("errorMsg").style.display = "none";

    document.getElementById("assignmentModal").style.display = "flex";
  }

  // Botón Go to Courses
  if (e.target.classList.contains("go-courses-btn")) {
    window.location.href = "/html/cursos.html";
  }
});

// Cerrar modal desde la X o botón Cancelar
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("assignmentModal").style.display = "none";
});
document.getElementById("cancelModal").addEventListener("click", () => {
  document.getElementById("assignmentModal").style.display = "none";
});

// Habilitar botón de envío si hay texto
document.getElementById("notes").addEventListener("input", () => {
  const text = document.getElementById("notes").value.trim();
  const btn = document.getElementById("submitAssignment");
  btn.disabled = text.length === 0;
  btn.classList.toggle("submit-disabled", text.length === 0);
});

// Enviar PATCH a JSON Server
document.getElementById("submitAssignment").addEventListener("click", async () => {
  const notes = document.getElementById("notes").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!selectedCourseId || notes === "") {
    errorMsg.style.display = "block";
    return;
  }

  try {
    await fetch(`http://localhost:3000/cursos/${selectedCourseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ estado: true })
    });

    document.getElementById("assignmentModal").style.display = "none";
    location.reload();
  } catch (error) {
    console.error("Error al actualizar el curso:", error);
    errorMsg.textContent = "⚠️ Error al enviar. Intenta nuevamente.";
    errorMsg.style.display = "block";
  }
});
