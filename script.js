// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;

    followerX += distX * 0.1;
    followerY += distY * 0.1;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateFollower);
}

animateFollower();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .project-item');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Header scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const sections = document.querySelectorAll('.about-text, .about-image, .project-item');
sections.forEach(section => {
    observer.observe(section);
});

// Project hover effects
const projectItems = document.querySelectorAll('.project-item');

projectItems.forEach(item => {
    const thumb = item.querySelector('.project-thumb');

    item.addEventListener('mouseenter', () => {
        thumb.style.filter = 'grayscale(0)';
    });

    item.addEventListener('mouseleave', () => {
        thumb.style.filter = 'grayscale(0.3)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 800);
    }
});

// Text reveal animation on scroll
const textElements = document.querySelectorAll('.about-text p, .section-label');

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, { threshold: 0.5 });

textElements.forEach(el => textObserver.observe(el));

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add stagger effect to project items
const projectList = document.querySelectorAll('.project-item');
projectList.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Moving images auto-scroll
const movingStrip = document.querySelector('.moving-strip');
if (movingStrip) {
    const images = movingStrip.innerHTML;
    movingStrip.innerHTML += images;
}

// Magnetic button effect
const buttons = document.querySelectorAll('.btn-primary, .cta-btn');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Image lazy loading with fade effect
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '1';
            img.style.transition = 'opacity 0.6s ease';

            img.onload = () => {
                img.style.opacity = '1';
            };

            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Prevent context menu on images
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Analytics click log
const trackableElements = document.querySelectorAll('a, button, .project-item');

trackableElements.forEach(el => {
    el.addEventListener('click', function () {
        console.log('Clicked:', this.textContent || this.getAttribute('href'));
    });
});

/* ================= VIDEO MODAL SYSTEM ================= */

const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeBtn = document.getElementById("closeVideo");
const viewButtons = document.querySelectorAll(".project-view");

viewButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const videoSrc = btn.dataset.video;
        modalVideo.src = videoSrc;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        modalVideo.play();
    });
});

function closeModal() {
    modal.classList.remove("active");
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";
    document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

/* ================= ROTATING TEXT ================= */

const words = [
    "Video Editor",
    "Photographer",
    "Cinematographer",
    "Freelancer",
    "Content Writer"
];

const textEl = document.getElementById("rotating-text");
let index = 0;

function rotateText() {
    textEl.classList.remove("fade-word");
    void textEl.offsetWidth;
    textEl.textContent = words[index];
    textEl.classList.add("fade-word");
    index = (index + 1) % words.length;
}

rotateText();
setInterval(rotateText, 2500);

console.log('Portfolio loaded successfully! 🎨');
