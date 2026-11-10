document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS DEL INTRO
  const intro = document.getElementById("intro");
  const sorpresa = document.getElementById("sorpresa");
  const stars = document.getElementById("stars");
  const timer = document.getElementById("timer");
  const loadingBar = document.getElementById("loadingBar");
  const loadingText = document.getElementById("loadingText");
  const loadingSub = document.getElementById("loadingSub");
  const enterBtn = document.getElementById("enterBtn");

  // CREAR ESTRELLAS DINÁMICAS
  if (stars) {
    for (let i = 0; i < 70; i++) {
      const star = document.createElement("span");
      star.className = "star";
      star.textContent = Math.random() > 0.5 ? "✦" : "·";

      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.fontSize = `${8 + Math.random() * 14}px`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      star.style.animationDuration = `${1.5 + Math.random() * 3}s`;

      stars.appendChild(star);
    }
  }

  // INTRO DE 5 SEGUNDOS
  let secondsLeft = 5;
  let introFinished = false;

  const countdownInterval = window.setInterval(() => {
    secondsLeft = Math.max(0, secondsLeft - 1);

    if (timer) {
      timer.textContent = secondsLeft;
    }

    if (loadingBar) {
      loadingBar.style.width = `${(5 - secondsLeft) * 20}%`;
    }

    if (secondsLeft <= 0) {
      window.clearInterval(countdownInterval);
      introFinished = true;

      if (loadingText) {
        loadingText.textContent = "¡Todo listo para ti, Jazmín! 💗";
      }

      if (loadingSub) {
        loadingSub.textContent = "Una historia hecha con todo mi cariño.";
      }

      if (enterBtn) {
        enterBtn.classList.remove("hidden");
      }

      showSurprise();
    }
  }, 1000);

  function showSurprise() {
    if (sorpresa) {
      sorpresa.classList.remove("hidden");
    }

    if (intro) {
      intro.classList.add("fade-out");

      window.setTimeout(() => {
        intro.classList.add("hidden");
      }, 850);
    }
  }

  if (enterBtn) {
    enterBtn.addEventListener("click", () => {
      if (!introFinished) {
        window.clearInterval(countdownInterval);
        introFinished = true;
      }

      showSurprise();
    });
  }

  // CONTADOR EN VIVO (Aniversario el 8 de cada mes)
  function updateLiveCounter() {
    const counterEl = document.getElementById("liveCounter");
    if (!counterEl) return;

    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    
    let targetDate = new Date(year, month, 8, 0, 0, 0);
    if (now.getDate() < 8) {
      targetDate = new Date(year, month - 1, 8, 0, 0, 0);
    }

    const diffTime = Math.abs(now - targetDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    counterEl.textContent = `${diffDays} días, ${diffHours}h, ${diffMinutes}m y ${diffSeconds}s desde nuestro último día 8 ❤️`;
  }

  setInterval(updateLiveCounter, 1000);
  updateLiveCounter();

  // CARGAR GALERÍAS AUTOMÁTICAMENTE
  cargarGaleria("gallery-afinidad", "01-afinidad", 3, "Afinidad");
  cargarGaleria("gallery-bakeo", "02-bakeo", 28, "Bakeo 🍰");
  cargarGaleria("gallery-duo", "03-duo", 14, "Dúo 🎮");
  cargarGaleria("gallery-partidas", "04-partidas", 6, "Partida 🏆");
  cargarGaleria("gallery-recuerdos", "05-recuerdos", 3, "Recuerdo 🌙");

  function cargarGaleria(containerId, folderName, totalPhotos, labelName) {
    const container = document.getElementById(containerId);
    if (!container) return;

    for (let i = 1; i <= totalPhotos; i++) {
      const card = document.createElement("div");
      card.className = "card";
      card.onclick = function() { abrirCard(this); };

      card.innerHTML = `
        <div class="img-wrapper">
          <img src="${folderName}/${i}.jpg" alt="${labelName} ${i}">
        </div>
        <span>${labelName} ${i} 💜</span>
      `;
      container.appendChild(card);
    }
  }

  // REPRODUCTOR DE MÚSICA
  const musicPlayer = document.getElementById("musicPlayer");
  const bgMusic = document.getElementById("bgMusic");
  let isPlaying = false;

  if (musicPlayer && bgMusic) {
    musicPlayer.addEventListener("click", () => {
      if (isPlaying) {
        bgMusic.pause();
        musicPlayer.classList.add("paused");
        isPlaying = false;
      } else {
        bgMusic.play().catch(() => {});
        musicPlayer.classList.remove("paused");
        isPlaying = true;
      }
    });
  }

  // RULETA / RETOS DE DÚO
  const rouletteBtn = document.getElementById("rouletteBtn");
  const rouletteResult = document.getElementById("rouletteResult");

  const retosDuo = [
    "✨ ¡Premio! Tienes un combo de diamantes imaginarios y un abrazo.",
    "🎮 En la próxima partida, escoges el héroe y Tonycito obedece sin renegar.",
    "🌙 Noche de recordar cómo empezó nuestra afinidad en Mobile Legends.",
    "💖 Reto: Mandar un sticker tierno a las 3:00 a.m. (es broma, a dormir temprano).",
    "✨ Usagi y Orihime estarían orgullosas de lo bien que jugamos juntos.",
    "🌸 Te toca recibir un apapacho virtual gigante de tu querido menso."
  ];

  if (rouletteBtn && rouletteResult) {
    rouletteBtn.addEventListener("click", () => {
      const randomIndex = Math.floor(Math.random() * retosDuo.length);
      rouletteResult.style.opacity = 0;
      setTimeout(() => {
        rouletteResult.textContent = retosDuo[randomIndex];
        rouletteResult.style.opacity = 1;
      }, 200);
    });
  }

  // CORAZONES AL DAR CLIC
  document.addEventListener("click", (e) => {
    if (e.target.closest('#imageModal')) return;

    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > 0.5 ? "💜" : "✨";
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  });

  // AVISAR SI FALTA UNA IMAGEN
  const allImages = document.querySelectorAll(".card img, .hero-kagura");
  allImages.forEach((img) => {
    img.addEventListener("error", () => {
      img.alt = "Imagen no encontrada. Revisa la numeración en la carpeta.";
      img.style.objectFit = "contain";
      img.style.padding = "10px";
    });
  });

  // CARTA FINAL INTERACTIVA
  const letterBtn = document.getElementById("letterBtn");
  const letterContent = document.getElementById("letterContent");

  if (letterBtn && letterContent) {
    letterBtn.addEventListener("click", () => {
      const isHidden = letterContent.classList.contains("hidden");

      letterContent.classList.toggle("hidden", !isHidden);
      letterBtn.textContent = isHidden
        ? "Cerrar mi carta 💗"
        : "Abrir mi carta 💌";

      letterBtn.setAttribute("aria-expanded", String(isHidden));

      if (isHidden) {
        window.setTimeout(() => {
          letterContent.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 100);
      }
    });
  }
});

// FUNCIÓN PARA CAMBIAR ENTRE PESTAÑAS (TABS)
function mostrarTab(id, btn) {
  document.querySelectorAll('.contenido').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }
  if (btn) {
    btn.classList.add('active');
  }

  window.scrollTo({
    top: target.offsetTop - 90,
    behavior: 'smooth'
  });
}

// ABRIR FOTO EN GRANDE (PANTALLA COMPLETA)
function abrirCard(cardElement) {
  const imgElement = cardElement.querySelector("img");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  
  if (modal && modalImg && imgElement) {
    modal.style.display = "flex";
    modalImg.src = imgElement.src;

    if (modal.requestFullscreen) {
      modal.requestFullscreen().catch(() => {});
    } else if (modal.webkitRequestFullscreen) {
      modal.webkitRequestFullscreen();
    }
  }
}

// CERRAR FOTO EN GRANDE
function cerrarModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "none";

    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
}