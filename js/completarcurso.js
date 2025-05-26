// script.js

document.addEventListener("DOMContentLoaded", function() {
  // El botón que muestra el curso
  const viewCourseButton = document.getElementById("view-course-12345");
  
  // El contenedor del curso que estará oculto inicialmente
  const courseContainer = document.getElementById("course-container");

  // Los módulos de curso
  const modules = [
    {
      title: "Introduction to the Course",
      description: "Overview of what you will learn in this course and how to get the most out of it.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Getting Started with Tools",
      description: "Learn how to set up the necessary tools for the course.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Core Concepts",
      description: "Understanding the fundamental concepts and principles.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      title: "Advanced Techniques",
      description: "Dive deeper into advanced topics and methodologies.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  // Variables para actualizar el contenido
  let currentTopic = 0;  // Comenzamos con el primer tema
  const modulesList = document.querySelectorAll(".module");
  const courseTitle = document.getElementById("course-title");
  const courseDescription = document.getElementById("course-description");
  const courseVideo = document.getElementById("course-video");
  const completeBtn = document.getElementById("complete-btn");
  const nextBtn = document.getElementById("next-btn");
  const previousBtn = document.getElementById("previous-btn");

  // Actualiza el contenido del curso
  function updateContent() {
    const module = modules[currentTopic];
    courseTitle.textContent = module.title;
    courseDescription.textContent = module.description;
    courseVideo.src = module.videoUrl;

    // Resaltar el módulo activo
    modulesList.forEach(li => li.classList.remove("active"));
    modulesList[currentTopic].classList.add("active");

    // Habilitar o deshabilitar los botones Previous y Next
    previousBtn.disabled = currentTopic === 0;
    nextBtn.disabled = currentTopic === modules.length - 1;
  }

  // Muestra el curso cuando se hace clic en el botón "Ver Curso"
  viewCourseButton.addEventListener("click", () => {
    // Ocultamos el botón "Ver Curso" y mostramos el contenido
    viewCourseButton.style.display = "none";
    courseContainer.style.display = "flex";

    // Escondemos el resto de la interfaz de cursos (esto depende de tu página, lo que necesitas ocultar)
    const otherContent = document.querySelectorAll('.course-fullpage');
    otherContent.forEach(el => {
      el.style.display = "none"; // Esto oculta el contenido relacionado a "otros cursos"
    });

    updateContent();
  });

  // Handle module clicks
  modulesList.forEach((li, index) => {
    li.addEventListener("click", () => {
      currentTopic = index;
      updateContent();
    });
  });

  // Botón de "Previous Topic"
  previousBtn.addEventListener("click", () => {
    if (currentTopic > 0) {
      currentTopic--;
      updateContent();
    }
  });

  // Botón de "Next Topic"
  nextBtn.addEventListener("click", () => {
    if (currentTopic < modules.length - 1) {
      currentTopic++;
      updateContent();
    }
  });

  // Botón de "Mark as Complete"
  completeBtn.addEventListener("click", () => {
    completeBtn.classList.toggle("completed");
  });
});
