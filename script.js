document.addEventListener("DOMContentLoaded", () => {

  /* CONFIG */
  const CONFIG = {
    carouselImages: [
      "https://picsum.photos/1200/400?1",
      "https://picsum.photos/1200/400?2",
      "https://picsum.photos/1200/400?3"
    ],
    fanClubLink: "https://seufanclub.com",
    socialLink: "https://seulinkbio.com",
    giftLink: "https://i.imgur.com/xxxx.jpg",
    giftStart: "2026-01-26T01:00:00"
  };

  /* PRELOAD */
  CONFIG.carouselImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  /* TRANSLATIONS */
  const translations = {
    en: {
      fanclub: "My Fan Club",
      social: "My social media",
      giftText: "Click here to open the gift — FREE 🔞🔥",
      expired: "This gift has expired. For more exclusive free gifts, follow on social media.🔥🎁",
      remaining: "Time remaining"
    },
    pt: {
      fanclub: "Meu fã clube",
      social: "Minhas redes sociais",   
	  giftText: "Clique aqui para abrir o presente — GRÁTIS 🔞🔥",
      expired: "Este presente expirou. Para mais presentes exclusivos gratuitos, siga nas redes sociais.🔥🎁",
      remaining: "Tempo restante"
    },
    es: {
      fanclub: "Mi club de fans",
      social: "Mis redes sociales",
      giftText: "Haz clic aquí para abrir el regalo — GRATIS 🔞🔥",
      expired: "Este presente expirou. Para mais presentes exclusivos gratuitos, siga nas redes sociais.🔥🎁",
      remaining: "Tiempo restante"
    }
  };

  const ageTranslations = {
    en: {
      title: "Age confirmation",
      text: "To continue, this content is intended exclusively for adults over 18 years old.",
      yes: "Yes, I am over 18",
      no: "No",
      blocked: "This content is prohibited for minors."
    },
    pt: {
      title: "Confirmação de idade",
      text: "Para continuar, este conteúdo é destinado exclusivamente a maiores de 18 anos.",
      yes: "Sim, sou maior de 18",
      no: "Não",
      blocked: "Este conteúdo é proibido para menores de 18 anos."
    },
    es: {
      title: "Confirmación de edad",
      text: "Este contenido es solo para mayores de 18 años.",
      yes: "Sí, soy mayor",
      no: "No",
      blocked: "Este contenido está prohibido para menores."
    }
  };

  let currentLang = "en";

  /* CAROUSEL */
  let idx = 0;
  const img = document.getElementById("carouselImage");

  function show(i) {
    idx = (i + CONFIG.carouselImages.length) % CONFIG.carouselImages.length;
    img.src = CONFIG.carouselImages[idx];
  }

  show(0);
  document.querySelector(".next").onclick = () => show(idx + 1);
  document.querySelector(".prev").onclick = () => show(idx - 1);
  setInterval(() => show(idx + 1), 4000);

  /* LINKS */
  fanClubBtn.href = CONFIG.fanClubLink;
  socialBtn.href = CONFIG.socialLink;
  giftLink.href = CONFIG.giftLink;

  /* EXPIRATION */
  const start = new Date(CONFIG.giftStart);
  const end = new Date(start.getTime() + 86400000);
  const countdown = document.getElementById("countdown");
  const expiredMsg = document.getElementById("expiredMessage");

  let isExpired = false;

  function updateCountdown() {
    const diff = end - new Date();
    if (diff <= 0) {
      countdown.textContent = "00:00:00";
      isExpired = true;
      giftLink.classList.add("expired-visual");
      expiredMsg.classList.remove("hidden");
      return;
    }
    const h = String(Math.floor(diff / 3600000)).padStart(2,"0");
    const m = String(Math.floor((diff % 3600000)/60000)).padStart(2,"0");
    const s = String(Math.floor((diff % 60000)/1000)).padStart(2,"0");
    countdown.textContent = `${h}:${m}:${s}`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* AGE CONFIRMATION */
  let ageConfirmed = false;
  const ageModal = document.getElementById("ageModal");

  function handleGiftClick(e) {
    if (isExpired || !ageConfirmed) {
      e.preventDefault();
      ageModal.classList.remove("hidden");
    }
  }

  giftLink.addEventListener("click", handleGiftClick);
  giftAction.addEventListener("click", handleGiftClick);

  ageYes.onclick = () => {
    ageConfirmed = true;
    ageModal.classList.add("hidden");
  };

  /* LANG */
  function applyLang() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.textContent = translations[currentLang][el.dataset.i18n];
    });
    document.querySelectorAll("[data-age]").forEach(el => {
      el.textContent = ageTranslations[currentLang][el.dataset.age];
    });
  }

  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.onclick = () => {
      currentLang = btn.dataset.lang;
      applyLang();
    };
  });

  applyLang();
});




