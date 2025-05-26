function toggleTheme() {
  const themeBtn = document.getElementById('themeBtn');
  themeBtn.onclick = (e) => {
    const body = document.querySelector('body');
    if (body.dataset.bsTheme == 'dark') {
      body.dataset.bsTheme = 'light';

      themeBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
    } else {
      body.dataset.bsTheme = 'dark';

      body.style.backgroundImage =
        // 'linear-gradient(to right, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))';
        themeBtn.innerHTML = '<i class="bi bi-brightness-high"></i>';
    }
  };
}
toggleTheme();

function createWorksCards(works) {
  for (let i = 0; i < works.length; i++) {
    const element = works[i];
    const workCard = document.createElement('div');
    workCard.classList.add('card');
    workCard.setAttribute('data-category', element.category);
    workCard.innerHTML = `
  <img src=${element.cover} class="card-img-top img-fluid" alt=${
      element.title
    } height="300">
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <ul class="card-text">${element.tags
      .map((tag) => `<li class="badge text-bg-danger">${tag}</li>`)
      .join('')}</ul>
    <a href=${element.ghLink} class="btn btn-primary">View on Github</a>
  </div>
`;
    workCard.addEventListener('click', () => {
      openLightBox(element.title, element.snapShots);
    });
    document.querySelector('.cards-container').appendChild(workCard);
  }
  filterWorksCards(document.querySelectorAll('.cards-container .card'));
}

async function fetchWorks() {
  fetch('./data/works.json')
    .then((res) => res.json())
    .then((data) => {
      createWorksCards(data);
    });
}

fetchWorks();
function createSkillsCard(cards) {
  for (let i = 0; i < cards.length; i++) {
    const element = cards[i];
    const skillCard = document.createElement('div');
    skillCard.classList.add('skill-card');
    skillCard.setAttribute('data-lag', element.id.toString());
    const cardPic = document.createElement('img');
    cardPic.src = element.icon;
    cardPic.setAttribute('height', '100');
    const cardTitle = document.createElement('h6');
    cardTitle.textContent = element.title;
    const progressBarWrapper = document.createElement('div');
    progressBarWrapper.classList.add('progress');
    progressBarWrapper.style.width = '100%';
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressBar.classList.add('progress-bar-animated');
    progressBar.classList.add('progress-bar-striped');
    progressBar.style.width = element.level.toString();
    progressBar.style.backgroundColor =
      progressBar.style.width < '50 %' ? 'rgba(231, 43, 43, 0.716)' : 'green';
    progressBar.textContent = element.level;
    progressBarWrapper.appendChild(progressBar);
    skillCard.append(cardPic, cardTitle, progressBarWrapper);
    document.querySelector('#skills .skills-container').appendChild(skillCard);
  }
}
async function fetchSkillCards() {
  fetch('./data/skills.json')
    .then((res) => res.json())
    .then((data) => {
      createSkillsCard(data);
    });
}
fetchSkillCards();

const canvasoOn = (title, items) => {
  const titleEl = document.querySelector('.offcanvas-title');
  const bodyEl = document.querySelector('.offcanvas-body');

  if (!titleEl || !bodyEl) {
    console.warn('Offcanvas elements not found');
    return;
  }

  titleEl.textContent = title;

  // Create HTML for the gallery
  const galleryHTML = [items]
    .map((item) => {
      return `
        <div class="col-6 col-md-4 mb-3">
          <img src="${item.url}" class="img-fluid rounded shadow-sm" alt="Gallery Image" />
        </div>
      `;
    })
    .join('');

  // Wrap in a row
  bodyEl.innerHTML = `<div class="row">${galleryHTML}</div>`;
  const bsOffcanvas = new bootstrap.Offcanvas('#myOffcanvas');
  bsOffcanvas.show();
};

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  let smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    effects: true,
  });
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      smoother.scrollTo(targetEl, true, 'top top');
    });
  });
});

function filterWorksCards(items) {
  const filterBtns = document.querySelectorAll('.filter-button');
  filterBtns.forEach((btn) =>
    btn.addEventListener('click', () => {
      items.forEach((item) => {
        if (item.dataset.category == btn.dataset.id) {
          item.style.display = 'block';
          item.classList.add('fade-in-card');
          btn.classList.add('active');
          setTimeout(() => {
            item.classList.remove('fade-in-card');
          }, 1000);
        } else if (btn.dataset.id == 'All') {
          item.style.display = 'block';
          item.classList.add('fade-in-card');
          setTimeout(() => {
            item.classList.remove('fade-in-card');
          }, 1000);
        } else {
          item.style.display = 'none';
        }
      });
    })
  );
}

function openLightBox(title, images) {
  document.querySelector('.modal-container').innerHTML = `
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style="width:100vw;">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">${title}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
          <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
              <div class="carousel-inner">
                ${images
                  .map(
                    (image, index) => ` <div class="carousel-item ${
                      index == 0 ? 'active' : ''
                    }">
                  <img src="${image}" class="d-block w-100" alt="${title}" height="80%" style="object-fit:cover;">
              </div>`
                  )
                  .join('')}
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
          </div>
            
      </div>
    </div>
  </div>
  `;
  const myModal = new bootstrap.Modal('.modal');
  myModal.show();
  // const smoother = ScrollSmoother.get();
  // document.querySelector('.modal').addEventListener('hidden.bs.modal', () => {
  //   smoother.refresh();
  // });
}
