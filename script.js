// ================= Typing Effect =================
const words = [
    "Software Engineer",
    "Full Stack Developer",
    "Python Developer",
    "Machine Learning Enthusiast"
];
let i = 0, j = 0, isDeleting = false;

function type(){
  let word = words[i];
  document.getElementById("typing").textContent = word.substring(0, j);

  if(!isDeleting && j < word.length) j++;
  else if(isDeleting && j > 0) j--;
  else{
    isDeleting = !isDeleting;
    if(!isDeleting) i = (i + 1) % words.length;
  }

  setTimeout(type, isDeleting ? 60 : 100);
}

type();


// ================= Scroll Animation =================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));


// ================= Open Modal =================
function openProject(title, desc, link){
  const modal = document.getElementById("projectModal");

  modal.classList.add("show");

  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalLink").href = link;
}


// ================= Close Modal =================
function closeModal(){
  document.getElementById("projectModal").classList.remove("show");
}


// ================= Close when clicking outside =================
window.onclick = function(e){
  const modal = document.getElementById("projectModal");
  if(e.target === modal){
    modal.classList.remove("show");
  }
};

const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(btn => btn.classList.remove("active"));

        contents.forEach(content => content.classList.remove("active"));

        tab.classList.add("active");

        document
            .getElementById(tab.dataset.tab)
            .classList.add("active");

    });

});

(function initProjectCards(){
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card) => {
      const exploreBtn = card.querySelector('[data-action="explore"]');
      const backBtn = card.querySelector('[data-action="back"]');

      exploreBtn.addEventListener('click', () => {
        card.classList.add('is-flipped');
      });

      backBtn.addEventListener('click', () => {
        card.classList.remove('is-flipped');
      });
    });
  })();
(function initCertModal(){
  const backdrop = document.getElementById('certModalBackdrop');
  const closeBtn = document.getElementById('certModalClose');
  const imageWrap = document.getElementById('certModalImageWrap');

  const cards = document.querySelectorAll('.cert-card');

  function openModal(card){
    const { title, image } = card.dataset;

    // Clear out any previously shown certificate
    imageWrap.innerHTML = '';

    if (image){
      const isPdf = image.toLowerCase().endsWith('.pdf');

      if (isPdf){
        const iframe = document.createElement('iframe');
        iframe.src = image;
        iframe.title = title || 'Certificate';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        imageWrap.appendChild(iframe);
      } else {
        const img = document.createElement('img');
        img.src = image;
        img.alt = title || 'Certificate';
        imageWrap.appendChild(img);
      }
    }

    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => openModal(card));
  });

  closeBtn.addEventListener('click', closeModal);

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('is-open')) closeModal();
  });
})();