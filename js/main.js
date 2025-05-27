// Cuando el DOM esté completamente cargado, ejecutamos las funciones principales
document.addEventListener('DOMContentLoaded', function() {
    applyHeaderTheme(); // Aplica el tema guardado (oscuro o claro) al header
    highlightCurrentPage(); // Resalta el enlace activo en el menú de navegación
    initDropdowns(); // Inicializa la lógica de los menús desplegables
    initThemeToggle(); // Configura el botón de cambio de tema del header
});

// Función que resalta el enlace correspondiente a la página actual
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'index.html'; // Obtiene el nombre del archivo
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.id !== 'dashboard-link') {
            link.classList.remove('active'); // Elimina 'active' de todos los enlaces excepto Dashboard
        }

        const linkPath = link.getAttribute('href');
        const linkFileName = linkPath.split('/').pop(); // Compara solo el nombre del archivo
        if (linkFileName === fileName) {
            link.classList.add('active'); // Activa el enlace si coincide con la página actual
        }
    });

    // Siempre resalta el enlace de Dashboard
    const dashboardLink = document.getElementById('dashboard-link');
    if (dashboardLink) {
        dashboardLink.classList.add('active');
    }
}

// Configura los eventos de apertura/cierre de los menús desplegables de idioma y perfil
function initDropdowns() {
    // Menú de idiomas
    const langBtn = document.querySelector('.language-btn');
    const langDropdown = document.querySelector('.language-dropdown');

    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que el clic se propague
            langDropdown.classList.toggle('show'); // Abre o cierra el menú

            // Cierra el menú de perfil si está abierto
            document.querySelector('.profile-dropdown')?.classList.remove('show');
        });

        // Opciones de idioma
        const langOptions = document.querySelectorAll('.language-option');
        langOptions.forEach(option => {
            option.addEventListener('click', function() {
                const language = this.getAttribute('data-lang');
                const langText = this.textContent;

                langBtn.querySelector('span').textContent = langText; // Cambia el texto del botón
                langDropdown.classList.remove('show'); // Cierra el menú
                localStorage.setItem('language', language); // Guarda preferencia
            });
        });
    }

    // Menú de perfil
    const profileBtn = document.querySelector('.profile-btn');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show'); // Alterna el menú de perfil

            // Cierra el de idioma si está abierto
            document.querySelector('.language-dropdown')?.classList.remove('show');
        });
    }

    // Cierra ambos menús si se hace clic fuera de ellos
    document.addEventListener('click', function() {
        document.querySelector('.language-dropdown')?.classList.remove('show');
        document.querySelector('.profile-dropdown')?.classList.remove('show');
    });
}

// Configura el botón de cambio de tema (claro/oscuro)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            toggleHeaderTheme(); // Cambia el tema y actualiza ícono
        });
    }
}

// Alterna entre tema claro y oscuro solo para el header
function toggleHeaderTheme() {
    const header = document.querySelector('.header');
    header.classList.toggle('dark-header'); // Aplica o remueve clase dark-header

    updateThemeIcon(); // Cambia el ícono del botón

    // Guarda la preferencia en localStorage
    const isDarkHeader = header.classList.contains('dark-header');
    localStorage.setItem('darkHeader', isDarkHeader);
}

// Actualiza el ícono del botón de tema (sol/luna)
function updateThemeIcon() {
    const themeToggle = document.querySelector('.theme-toggle');
    const isDarkHeader = document.querySelector('.header').classList.contains('dark-header');

    if (themeToggle) {
        themeToggle.innerHTML = ''; // Limpia el contenido previo
        const icon = document.createElement('i');
        icon.className = isDarkHeader ? 'fas fa-sun' : 'fas fa-moon'; // Ícono según tema
        themeToggle.appendChild(icon); // Añade el ícono al botón
    }
}

// Aplica el tema y el idioma guardado desde localStorage al cargar la página
function applyHeaderTheme() {
    const isDarkHeader = localStorage.getItem('darkHeader') === 'true';
    const header = document.querySelector('.header');

    if (header) {
        if (isDarkHeader) {
            header.classList.add('dark-header');
        } else {
            header.classList.remove('dark-header');
        }

        updateThemeIcon(); // Actualiza el ícono según el tema
    }

    // Aplica el idioma guardado
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        const langBtn = document.querySelector('.language-btn span');
        if (langBtn) {
            const langOptions = document.querySelectorAll('.language-option');
            langOptions.forEach(option => {
                if (option.getAttribute('data-lang') === savedLanguage) {
                    langBtn.textContent = option.textContent; // Cambia el texto según idioma guardado
                }
            });
        }
    }
}

// Añade clase para mostrar la página completamente cargada (útil para animaciones CSS)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
