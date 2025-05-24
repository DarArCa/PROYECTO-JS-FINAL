document.addEventListener('DOMContentLoaded', function() {
    // Botones de "Más información" para girar las tarjetas
    const infoButtons = document.querySelectorAll('.info-btn');
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.course-card').querySelector('.card-inner');
            card.classList.toggle('flipped');
        });
    });
    
    // Botones para volver al frente de la tarjeta
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card-inner');
            card.classList.remove('flipped');
        });
    });
    
    // Botones de "Inscribirse"
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    const coursesContainer = document.getElementById('coursesContainer');
    const enrollmentContainer = document.getElementById('enrollmentContainer');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Ocultar la lista de cursos y mostrar la página de inscripción exitosa
            coursesContainer.style.display = 'none';
            enrollmentContainer.style.display = 'block';
            
            // Scroll al inicio de la página
            window.scrollTo(0, 0);
        });
    });
    
    // Botón para volver a los cursos
    const returnButton = document.querySelector('.return-courses-btn');
    if (returnButton) {
        returnButton.addEventListener('click', function() {
            // Ocultar la página de inscripción exitosa y mostrar la lista de cursos
            enrollmentContainer.style.display = 'none';
            coursesContainer.style.display = 'block';
        });
    }
});