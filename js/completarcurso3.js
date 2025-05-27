document.addEventListener("DOMContentLoaded", async function () {
  const viewCourseButton = document.getElementById("9876");
  const courseContainer = document.getElementById("course-container-3");

  const modules = [
    {
      title: "Design Docs",
      description: "Learn how to create effective game design documents.",
      videoUrl: "/multimedia/12.mp4"
    },
    {
      title: "Playtesting",
      description: "Understand how to gather feedback and test gameplay.",
      videoUrl: "/multimedia/12.mp4"
    },
    {
      title: "Iteration",
      description: "Refine and improve your designs based on feedback.",
      videoUrl: "/multimedia/12.mp4"
    },
    {
      title: "Portfolio Prep",
      description: "Prepare your final projects for your design portfolio.",
      videoUrl: "/multimedia/12.mp4"
    }
  ];

  let currentTopic = 0;
  const modulesList = document.querySelectorAll("#modules-list-3 .module");
  const courseTitle = document.getElementById("course-title-3");
  const courseDescription = document.getElementById("course-description-3");
  const courseVideo = document.getElementById("course-video-3");
  const completeBtn = document.getElementById("complete-btn-3");
  const nextBtn = document.getElementById("next-btn-3");
  const previousBtn = document.getElementById("previous-btn-3");

  let cursoActivo = null;
  let completedModules = new Set();

  async function cargarCurso() {
    const res = await fetch("http://localhost:3000/cursos");
    const cursos = await res.json();
    cursoActivo = cursos.find(c => c.id === "3");

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

      if (index === currentTopic) li.classList.add("active");
      if (completedModules.has(index)) li.classList.add("completed");
    });

    completeBtn.textContent = completedModules.has(currentTopic) ? "Completed" : "Mark as Complete";
    completeBtn.classList.toggle("completed", completedModules.has(currentTopic));

    previousBtn.disabled = currentTopic === 0;
    nextBtn.disabled = currentTopic === modules.length - 1;
  }

  async function updateCourseOnServer() {
    const completadosArray = Array.from(completedModules);
    const total = completadosArray.length * 25;

    await fetch(`http://localhost:3000/cursos/3`, {
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

    document.querySelectorAll('.course-fullpage').forEach(el => {
      el.style.display = "none";
    });

    await cargarCurso();
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
    e.preventDefault();

    if (completedModules.has(currentTopic)) {
      completedModules.delete(currentTopic);
    } else {
      completedModules.add(currentTopic);
    }

    await updateCourseOnServer();
    updateContent();
  });
});
