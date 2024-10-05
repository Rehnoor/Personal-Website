import { Gradient } from './Gradient.js'
// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

let isLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

const body = document.body;
const modeToggle = document.getElementById('mode-toggle');

// Apply the initial mode
if (!isLight) {
    body.classList.add('dark-mode');
    updateModeToggleText();
    const gitLogo = document.getElementById("git-logo");
    gitLogo.src = "icons/github-mark-white.png";
    const liLogo = document.getElementById("in-logo");
    liLogo.src = "icons/In-White-128@2x.png";
    const nameLogo = document.getElementById("logo-pic");
    nameLogo.src = "icons/RSRed.png";
}

modeToggle.addEventListener('click', () => {
    if (isLight) { // if current mode is light, you will be toggling to dark
        isLight = false;
        const gitLogo = document.getElementById("git-logo");
        gitLogo.src = "icons/github-mark-white.png";
        const liLogo = document.getElementById("in-logo");
        liLogo.src = "icons/In-White-128@2x.png";
        const nameLogo = document.getElementById("logo-pic");
        nameLogo.src = "icons/RSRed.png";
    } else { // if your current mode is not light (dark) then you will be toggling to light
        isLight = true;
        const gitLogo = document.getElementById("git-logo");
        gitLogo.src = "icons/github-mark.png"
        const liLogo = document.getElementById("in-logo");
        liLogo.src = "icons/In-Blue-128@2x.png";
        const nameLogo = document.getElementById("logo-pic");
        nameLogo.src = "icons/RSBlue.png";
    }
    body.classList.toggle('dark-mode');
    updateModeToggleText();
    gradient.initGradient('#gradient-canvas'); // Reinitialize gradient
});

function updateModeToggleText() {
    modeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// Initialize mode toggle text
updateModeToggleText();

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Animations
gsap.from(".hero-content", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out"
});


// Function to initialize animations with ScrollTrigger
function initAnimations() {
    // Updated animation for skill cards
    gsap.utils.toArray(".skill-card").forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.2 // Stagger effect
        });
    });

    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 80%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });

    // Parallax effect for hero section
    gsap.to(".hero", {
        scrollTrigger: {
            scrub: true
        },
        y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
        ease: "none"
    });
}

// Wait for the DOM content to be fully loaded before initializing animations
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();

    let form = document.getElementById("contact-form");

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("Thank you for submitting!");
    })
});

// Create your gradient instance and initialize it
const gradient = new Gradient();
gradient.initGradient('#gradient-canvas');