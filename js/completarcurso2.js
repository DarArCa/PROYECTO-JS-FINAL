document.addEventListener("DOMContentLoaded", async function () {
  const viewCourseButton = document.getElementById("view-course-123456");
  const courseContainer = document.getElementById("course-container-2");

  const modules = [
    {
      title: "Getting Started",
      description: "Installing Unreal, setting up the project, and navigating the interface.",
      videoUrl: "/multimedia/12.mp4"
    },
    {
      title: "Systems & Feedback",
      description: "Risk vs. reward, player feedback systems, and difficulty balancing.",
      videoUrl: "/multimedia/12.mp4"
    },
    {
      title: "Blueprint Basics",
      description: "Learn to use Unreal Engine’s Blueprint visual scripting.",
      videoUrl: "/multimedia/12.mp4"
    },
    {
      title: "Deploy & Test",
      description: "Build and test your game. Package and export the final product.",
      videoUrl: "/multimedia/12.mp4"
    }
  ];
/*estoy perdido por aca */
  let currentTopic = 0;
  const modulesList = courseContainer.querySelectorAll(".module");
  const courseTitle = courseContainer.querySelector("#course-title-2");
  const courseDescription = courseContainer.querySelector("#course-description-2");
  const courseVideo = courseContainer.querySelector("#course-video-2");
  const completeBtn = courseContainer.querySelector("#complete-btn-2");
  const nextBtn = courseContainer.querySelector("#next-btn-2");
  const previousBtn = courseContainer.querySelector("#previous-btn-2");

  let cursoActivo = null;
  let completedModules = new Set();

  async function cargarCursoActivo() {
    const res = await fetch("http://localhost:3000/cursos");
    const cursos = await res.json();
    cursoActivo = cursos.find(c => c.id === "2"); // curso 2: unreal
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

      const circle = li.querySelector(".circle");
      if (circle) {
        if (completedModules.has(index)) {
          circle.style.backgroundColor = "#4caf50";
        } else {
          circle.style.backgroundColor = "#ccc";
        }
      }
    });

    completeBtn.textContent = completedModules.has(currentTopic)
      ? "Completed"
      : "Mark as Complete";
    completeBtn.classList.toggle("completed", completedModules.has(currentTopic));

    previousBtn.disabled = currentTopic === 0;
    nextBtn.disabled = currentTopic === modules.length - 1;
  }

  async function updateCourseOnServer() {
    const completadosArray = Array.from(completedModules);
    const total = completadosArray.length * 25;

    await fetch(`http://localhost:3000/cursos/2`, {
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
    otherContent.forEach(el => el.style.display = "none");

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
