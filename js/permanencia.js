document.addEventListener('DOMContentLoaded', () => {
  const cursoMap = {
    '12345': 1,       // Unity
    '123456': 2,      // Unreal
    '12345678': 3     // Game Design
  };

  Object.entries(cursoMap).forEach(([btnId, cursoId]) => {
    const btn = document.getElementById(btnId);

    if (!btn) return;

    // Chequear si ya está activo
    fetch(`http://localhost:3000/cursos/${cursoId}`)
      .then(res => res.json())
      .then(data => {
        if (data.activo) {
          actualizarBoton(btn);
        }
      });

    // Interceptar clic
    btn.addEventListener('click', async (e) => {
      e.preventDefault(); // Impide acción por defecto
      e.stopImmediatePropagation(); // Detiene todos los listeners

      // Doble seguridad: si es <a> o <form> lo frenamos también
      if (btn.tagName === 'A' || btn.closest('form')) {
        return false;
      }

      try {
        const res = await fetch(`http://localhost:3000/cursos/${cursoId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ activo: true })
        });

        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
        actualizarBoton(btn);

      } catch (err) {
        console.error('❌ Error activando curso:', err);
      }

      return false; // Extra prevención
    });
  });

  function actualizarBoton(btn) {
    btn.textContent = 'Curso activado';
    btn.disabled = true;
    btn.style.backgroundColor = '#4caf50';
    btn.style.cursor = 'not-allowed';
  }
});
