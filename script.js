document.addEventListener("DOMContentLoaded", () => {
    const darkModeBtn = document.getElementById("toggle-dark-mode");
    
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        darkModeBtn.textContent = "☀️";
    }

    darkModeBtn.addEventListener("click", () => {
        let currentTheme = document.documentElement.getAttribute("data-theme");
        if (currentTheme === "dark") {
            document.documentElement.removeAttribute("data-theme");
            darkModeBtn.textContent = "🌙";
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            darkModeBtn.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        }
    });

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });
    });
    
    const slides = document.querySelectorAll(".carrusel-slide");
    const nextBtn = document.getElementById("next-slide");
    const prevBtn = document.getElementById("prev-slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add("active");
    }

    nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4000);

    const filterButtons = document.querySelectorAll(".filter-btn");
    const carreras = document.querySelectorAll(".carrera");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            carreras.forEach(carrera => {
                const duracion = carrera.getAttribute("data-duracion");
                if (filterValue === "todos" || filterValue === duracion) {
                    carrera.classList.remove("hide");
                } else {
                    carrera.classList.add("hide");
                }
            });
        });
    });

    const animatedElements = document.querySelectorAll(".scroll-anim");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.1 
    });

    animatedElements.forEach(el => observer.observe(el));
});
