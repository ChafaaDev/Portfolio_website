function toggleTheme() {
    const docEl = document.documentElement;
    if (docEl.dataset.bsTheme == 'dark') {
      docEl.dataset.bsTheme = 'light';
      document.getElementById('about').style.color = "#ffff"
    } else {
      docEl.dataset.bsTheme = 'dark';

      docEl.style.backgroundImage = themeBtn.innerHTML =
        '<i class="bi bi-brightness-high"></i>';
      document
        .querySelector('.services-container')
        .classList.remove('light-mode');
      document
        .querySelector('#works .cards-container')
        .classList.remove('light-mode');
    }
}


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
    <a href=${
      element.ghLink
    } target="_blank" class="btn btn-primary">${document.documentElement.getAttribute('lang')=='en'?'View on ':'Voir sur'} Github</a>
    <span class='extend-icon'><i class="bi bi-arrows-angle-expand"></i></span>
  </div>
`;
    workCard.querySelector('.extend-icon').addEventListener('click', () => {
      openLightBox(element.title, element.snapShots);
    });
    document.querySelector('.cards-container').appendChild(workCard);
  }
  filterWorksCards(document.querySelectorAll('#works .cards-container .card'));
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
    // const skillCard = document.createElement('div');
    // skillCard.classList.add('skill-card');
    // const cardPic = document.createElement('img');
    // cardPic.src = element.icon;
    const logo = document.createElement('span')
    logo.innerHTML = element.icon;
    logo.style.fontSize = '30px'
    // cardPic.setAttribute('height', '100');
    // const cardTitle = document.createElement('h6');
    // cardTitle.textContent = element.title;
    const progressBarWrapper = document.createElement('div');
    progressBarWrapper.classList.add('progress');
    progressBarWrapper.style.width = '100%';
    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    // progressBar.classList.add('progress-bar-animated');
    // progressBar.classList.add('progress-bar-striped');
    progressBar.style.width = element.level.toString();
    progressBar.style.backgroundColor =
    progressBar.style.width < '50 %' ? 'rgba(232, 154, 10, 0.755)' : '#0b5ed7';
    progressBar.textContent = element.level;
    progressBarWrapper.append(logo, progressBar);
    // skillCard.appendChild(progressBarWrapper);
    if(element.category=='Front'){
    document.querySelector('.front-skills').appendChild(progressBarWrapper);
    }else{
    document.querySelector('.back-skills ').appendChild(progressBarWrapper);
    }
  }
}
async function fetchSkillCards() {
  fetch('./data/skills.json')
    .then((res) => res.json())
    .then((data) => {
      createSkillsCard(data);
    });
}


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
    normalizeScroll: true,
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
          <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="true">
              <div class="carousel-inner">
                ${images
                  .map(
                    (image, index) => ` <div class="carousel-item ${
                      index == 0 ? 'active' : ''
                    }">
                  <img src="${image}" class="d-block w-100" alt="${title}"  width="100%"  height="700" style="object-fit:contain;object-position:top;">
              </div>`
                  )
                  .join('')}
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
               <i class="bi bi-chevron-left" id='leftBtn'></i>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
              <i class="bi bi-chevron-right" id='rightBtn'></i>
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
function createServicesCards(){
  const services = ['web design', 'Frontend', 'Backend', 'code maintance', 'SEO']
  const list = services.map(service=> ` <div class="card text-bg-dark">
     <img src="https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg" class="img-fluid" alt="" height='200'>
      <div class="card-img-overlay">
        <h5 class="card-title">${service}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small>Last updated 3 mins ago</small></p>
      </div>
    </div>`).join('')
    document.querySelector('.services-container').innerHTML = list
}

fetchSkillCards()


 