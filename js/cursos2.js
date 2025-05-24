// Llamada a backend para cursos (conservada)
fetch("http://localhost:3000/cursos")
  .then(response => response.json())
  .then(data => console.log(data));

document.addEventListener('DOMContentLoaded', () => {
  const enrollyButtons = document.querySelectorAll('.enrolly-btn');
  const coursesContainer = document.getElementById('coursesContainer');

  // Páginas individuales de cada curso
  const unityPage = document.getElementById('unityCoursePage');
  const unrealPage = document.getElementById('unrealCoursePage');
  const designPage = document.getElementById('designCoursePage');

  // Mostrar curso según el índice del botón
  enrollyButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      coursesContainer.style.display = 'none';
      [unityPage, unrealPage, designPage].forEach(p => p.style.display = 'none');

      if (index === 0) unityPage.style.display = 'block';
      if (index === 1) unrealPage.style.display = 'block';
      if (index === 2) designPage.style.display = 'block';

      window.scrollTo(0, 0);
    });
  });

  // Botones para volver a la vista general de cursos
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      [unityPage, unrealPage, designPage].forEach(p => p.style.display = 'none');
      coursesContainer.style.display = 'block';
      window.scrollTo(0, 0);
    });
  });

  // Acordeón animado para módulos (no tocado)
  document.querySelectorAll('.module-header').forEach(header => {
    header.addEventListener('click', () => {
      const module = header.parentElement;
      module.classList.toggle('active');
    });
  });
});
