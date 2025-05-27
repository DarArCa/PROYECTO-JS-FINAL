document.addEventListener("DOMContentLoaded", async function () {
  const viewCourseButton = document.getElementById("view-course-12345");
  const courseContainer = document.getElementById("course-container");

  const modules = [
    {
      title: "Introduction to the Course",
      description: "Overview of what you will learn in this course and how to get the most out of it.",
      videoUrl: "/multimedia/12.mp4"
    },
    {
      title: "Getting Started with Tools",
      description: "Learn how to set up the necessary tools for the course.",
      videoUrl: "/multimedia/12.mp4"
    },
    {
      title: "Core Concepts",
      description: "Understanding the fundamental concepts and principles.",
      videoUrl: "/multimedia/12.mp4"
    },
    {
      title: "Advanced Techniques",
      description: "Dive deeper into advanced topics and methodologies.",
      videoUrl: "/multimedia/12.mp4"
    }
  ];

  let currentTopic = 0;
  const modulesList = document.querySelectorAll(".module");
  const courseTitle = document.getElementById("course-title");
  const courseDescription = document.getElementById("course-description");
  const courseVideo = document.getElementById("course-video");
  const completeBtn = document.getElementById("complete-btn");
  const nextBtn = document.getElementById("next-btn");
  const previousBtn = document.getElementById("previous-btn");

  let cursoActivo = null;
  let completedModules = new Set();

  async function cargarCursoActivo() {
    const res = await fetch("http://localhost:3000/cursos");
    const cursos = await res.json();
    cursoActivo = cursos.find(c => c.activo === true);
    if (!cursoActivo.completados) {
      cursoActivo.completados = [];
    }
    completedModules = new Set(cursoActivo.completados);
  }

  function updateContent() {
    const module = modules[currentTopic];
    courseTitle.textContent = module.title;
    courseDescription.textContent = module.description;
    courseVideo.src = module.videoUrl;

    modulesList.forEach((li, index) => {
      li.classList.remove("active", "completed");

      if (index === currentTopic) {
        li.classList.add("active");
      }

      if (completedModules.has(index)) {
        li.classList.add("completed");
      }
    });

    if (completedModules.has(currentTopic)) {
      completeBtn.textContent = "Completed";
      completeBtn.classList.add("completed");
    } else {
      completeBtn.textContent = "Mark as Complete";
      completeBtn.classList.remove("completed");
    }

    previousBtn.disabled = currentTopic === 0;
    nextBtn.disabled = currentTopic === modules.length - 1;
  }

  async function updateCourseOnServer() {
    const completadosArray = Array.from(completedModules);
    const total = completadosArray.length * 25;

    await fetch(`http://localhost:3000/cursos/${cursoActivo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        total,
        completados: completadosArray
      })
    });
  }

  viewCourseButton.addEventListener("click", async () => {
    viewCourseButton.style.display = "none";
    courseContainer.style.display = "flex";

    const otherContent = document.querySelectorAll('.course-fullpage');
    otherContent.forEach(el => {
      el.style.display = "none";
    });

    await cargarCursoActivo();
    updateContent();
  });

  modulesList.forEach((li, index) => {
    li.addEventListener("click", () => {
      currentTopic = index;
      updateContent();
    });
  });

  previousBtn.addEventListener("click", () => {
    if (currentTopic > 0) {
      currentTopic--;
      updateContent();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentTopic < modules.length - 1) {
      currentTopic++;
      updateContent();
    }
  });

  completeBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // ✅ evita que recargue la página

    if (completedModules.has(currentTopic)) {
      completedModules.delete(currentTopic);
    } else {
      completedModules.add(currentTopic);
    }

    await updateCourseOnServer();
    updateContent();
  });
});
