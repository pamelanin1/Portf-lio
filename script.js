/* ============================================================
   TYPEWRITER — TEXTO ROTATIVO NO HERO
============================================================ */

const texts = [
    "Estudante de TI!",
    "Apaixonada por Gatos!",
    "Amante da Natureza!",
];

const textElement = document.querySelector(".typewriter-text");

let textIndex = 0;
let charIndex  = 0;
let deleting   = false;

function typeWriter() {
    const currentText = texts[textIndex];

    if (!deleting) {
        // Digita caractere por caractere
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            deleting = true;
            setTimeout(typeWriter, 1800); // Pausa antes de apagar
            return;
        }
    } else {
        // Apaga caractere por caractere
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            textIndex = (textIndex + 1) % texts.length; // Avança para o próximo texto
        }
    }

    setTimeout(typeWriter, deleting ? 50 : 100);
}

window.addEventListener("load", typeWriter);

/* ============================================================
   TERMINAL — OBJETIVOS COM EFEITO DE DIGITAÇÃO
============================================================ */

const terminalLines = [
    "> carregando objetivos...",
    "> iniciar carreira na área de tecnologia",
    "> concluir minha graduação em TI com excelência",
    "> aprofundar conhecimentos em Front-End",
    "> conquistar independência financeira",
    "> aprender novas tecnologias ",
    "> futuramente cursar Medicina Veterinária 🩺",
    "> transformar meus sonhos em realidade 💖"
];

const terminalBody = document.querySelector(".terminal-body");

if (terminalBody) {
    terminalBody.innerHTML = "";

    let lineIndex = 0;

    function writeLine() {
        // Todas as linhas escritas: adiciona cursor piscando
        if (lineIndex >= terminalLines.length) {
            const cursor = document.createElement("p");
            cursor.classList.add("cursor");
            cursor.textContent = "▌";
            terminalBody.appendChild(cursor);
            return;
        }

        const p = document.createElement("p");
        p.classList.add("terminal-line");
        terminalBody.appendChild(p);

        let charIdx = 0;

        function typeChar() {
            if (charIdx < terminalLines[lineIndex].length) {
                p.textContent += terminalLines[lineIndex][charIdx];
                charIdx++;
                setTimeout(typeChar, 25);
            } else {
                lineIndex++;
                setTimeout(writeLine, 400); // Pausa entre linhas
            }
        }

        typeChar();
    }

    setTimeout(writeLine, 1000); // Delay inicial antes de começar
}

/* ============================================================
   PATINHAS — EFEITO NO CURSOR DO MOUSE
============================================================ */

const pawContainer = document.getElementById("paw-container");
let cooldown = false;

document.addEventListener("mousemove", (e) => {
    if (cooldown) return;

    cooldown = true;

    const paw = document.createElement("div");
    paw.classList.add("paw");
    paw.innerHTML = "🐾";
    paw.style.left = e.clientX - 10 + "px";
    paw.style.top  = e.clientY - 10 + "px";

    pawContainer.appendChild(paw);

    // Remove a patinha após a animação terminar
    setTimeout(() => paw.remove(), 800);

    // Cooldown para não criar patinhas a cada pixel
    setTimeout(() => { cooldown = false; }, 60);
});

/* ============================================================
   NAVBAR — SOMBRA AO ROLAR
============================================================ */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";
        navbar.style.background = "rgba(255,255,255,.95)";
    } else {
        navbar.style.boxShadow = "none";
        navbar.style.background = "rgba(255,255,255,.85)";
    }
});

/* ============================================================
   SCROLL REVEAL — REVELAR ELEMENTOS AO DESCER A PÁGINA
============================================================ */

const reveals = document.querySelectorAll(
    ".about-card, .skill-card, .contact-card, .terminal-window"
);

function reveal() {
    reveals.forEach(item => {
        const top = item.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {
            item.classList.add("show");
        }
    });
}

window.addEventListener("scroll", reveal);
reveal(); // Roda ao carregar para elementos já visíveis

/* ============================================================
   FOTO HERO — ZOOM INTERATIVO NO HOVER
============================================================ */

const photo = document.querySelector(".hero-image img");

if (photo) {
    photo.addEventListener("mousemove",  () => { photo.style.transform = "scale(1.04)"; });
    photo.addEventListener("mouseleave", () => { photo.style.transform = "scale(1)";    });
}

/* ============================================================
   SCROLL SUAVE — LINKS DE NAVEGAÇÃO INTERNA
============================================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Desconta altura da navbar fixa
                behavior: "smooth"
            });
        }
    });
});