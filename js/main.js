document.addEventListener('DOMContentLoaded', function() {
    // Aplicar tema guardado
    applyHeaderTheme();
    
    // Marcar la página actual en la navegación y siempre resaltar Dashboard
    highlightCurrentPage();
    
    // Inicializar los listeners para los menús desplegables
    initDropdowns();
    
    // Inicializar el botón de cambio de tema
    initThemeToggle();
});

// Resaltar página actual en la navegación
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Quitar clase activa de todos los enlaces (excepto Dashboard)
        if (link.id !== 'dashboard-link') {
            link.classList.remove('active');
        }
        
        // Verificar si el href coincide con la página actual
        const linkPath = link.getAttribute('href');
        if (linkPath === fileName) {
            link.classList.add('active');
        }
    });
    
    // Siempre resaltar el Dashboard
    const dashboardLink = document.getElementById('dashboard-link');
    if (dashboardLink) {
        dashboardLink.classList.add('active');
    }
}

// Inicializar menús desplegables
function initDropdowns() {
    // Menú de idiomas
    const langBtn = document.querySelector('.language-btn');
    const langDropdown = document.querySelector('.language-dropdown');
    
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langDropdown.classList.toggle('show');
            
            // Cerrar otros menús desplegables
            document.querySelector('.profile-dropdown')?.classList.remove('show');
        });
        
        // Manejar clic en las opciones de idioma
        const langOptions = document.querySelectorAll('.language-option');
        langOptions.forEach(option => {
            option.addEventListener('click', function() {
                const language = this.getAttribute('data-lang');
                const langText = this.textContent;
                
                // Actualizar texto del botón
                langBtn.querySelector('span').textContent = langText;
                
                // Cerrar dropdown
                langDropdown.classList.remove('show');
                
                // Aquí podrías añadir lógica para cambiar el idioma
                // Por ahora solo guardamos la preferencia
                localStorage.setItem('language', language);
            });
        });
    }
    
    // Menú de perfil
    const profileBtn = document.querySelector('.profile-btn');
    const profileDropdown = document.querySelector('.profile-dropdown');
    
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
            
            // Cerrar otros menús desplegables
            document.querySelector('.language-dropdown')?.classList.remove('show');
        });
    }
    
    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', function() {
        document.querySelector('.language-dropdown')?.classList.remove('show');
        document.querySelector('.profile-dropdown')?.classList.remove('show');
    });
}

// Inicializar botón de cambio de tema
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            toggleHeaderTheme();
        });
    }
}

// Cambiar tema claro/oscuro SÓLO para el header
function toggleHeaderTheme() {
    const header = document.querySelector('.header');
    header.classList.toggle('dark-header');
    
    // Actualizar el ícono del botón
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        if (header.classList.contains('dark-header')) {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
    
    // Guardar preferencia en localStorage
    const isDarkHeader = header.classList.contains('dark-header');
    localStorage.setItem('darkHeader', isDarkHeader);
}

// Aplicar tema guardado SÓLO para el header
function applyHeaderTheme() {
    const isDarkHeader = localStorage.getItem('darkHeader') === 'true';
    const header = document.querySelector('.header');
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (isDarkHeader) {
        header.classList.add('dark-header');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    } else {
        header.classList.remove('dark-header');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
    }
    
    // Aplicar idioma guardado
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        const langBtn = document.querySelector('.language-btn span');
        if (langBtn) {
            const langOptions = document.querySelectorAll('.language-option');
            langOptions.forEach(option => {
                if (option.getAttribute('data-lang') === savedLanguage) {
                    langBtn.textContent = option.textContent;
                }
            });
        }
    }
}