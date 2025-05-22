
function toggleTheme() {
  const themeBtn = document.getElementById("themeBtn");
  themeBtn.onclick = (e) => {
    const body = document.querySelector("body");
    if (body.dataset.bsTheme == "dark") {
      body.dataset.bsTheme = "light";
      // body.style.backgroundColor ='#ffffff8e'
     
      themeBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
    } else {
      body.dataset.bsTheme = "dark";
      // body.style.backgroundImage = 'url("./images/developer-8829735_1920.jpg")'
      themeBtn.innerHTML = '<i class="bi bi-brightness-high"></i>';
      // document.querySelector('main').style.backgroundColor = '#ffff'
    }
  };
}
toggleTheme();

function createWorksCards(works){
  for(let i = 0 ; i < works.length ; i++){
    const element = works[i]
    const workCard = document.createElement('div')
    workCard.innerHTML = `
  <img src=${element.cover} class="card-img-top img-fluid" alt=${element.getElementById}>
  <div class="card-body">
    <h5 class="card-title">${element.title}</h5>
    <p class="card-text">${element.tags.join(' ')}</p>
    <a href=${element.ghLink} class="btn btn-primary">View on Github</a>
    <button class="btn btn-secondary" id="seeMoreBtn" onclick="canvasoOn('${element.title}','${element.snapShots}')">See more</button>
  </div>
`
workCard.classList.add('card')

document.querySelector('.cards-container').appendChild(workCard)
  }
}

async function fetchWorks(){
  fetch('./data/works.json')
  .then(res => res.json())
  .then(data=>{
    createWorksCards(data)
  })
}

fetchWorks()
function createSkillsCard(cards){
  for(let i = 0; i < cards.length ; i++){
    const element = cards[i];
    const skillCard = document.createElement('div');
    skillCard.classList.add('skill-card')
    const cardPic = document.createElement('img')
    cardPic.src = element.icon;
    cardPic.setAttribute('height', '200');
    const cardTitle = document.createElement('h6');
    cardTitle.textContent = element.title;
    skillCard.append(cardPic, cardTitle)
    document.querySelector('#skills .skills-container').appendChild(skillCard)
  }
}
async function fetchSkillCards(){
  fetch('./data/skills.json')
  .then(res => res.json())
  .then(data=>{
    createSkillsCard(data)
  })
}
fetchSkillCards()
// fetchSkillCards()
 
  //   const canvasoOn = (title,cover, elements)=>{
  //   document.querySelector('.offcanvas-title').textContent = title;
  //   document.querySelector('.offcanvas-body').innerHTML = `<div>
  //   <figure class='figure' style='height:600px; width:100%;'>
  //    <img src=${cover} alt=${title} style='height:auto; width:100%; object-fit:cover;object-position:top;'/>
  //   </figure> 
  //   <div class="tags-list">${createAList(elements)}</div> 
  //   </div>`
  //   const bsOffcanvas = new bootstrap.Offcanvas('#myOffcanvas')
  //   bsOffcanvas.show()                                                                           
  // }
  const canvasoOn = (title, shots) =>{
    document.querySelector('.offcanvas-title').textContent = title;
    shots = []
    for(let i = 0 ; i < shots.length; i++){
      const element = shots[i];
        figure= ` <div class="container text-center">
        <div class="row g-2">
               <div class="p-3"><img class="img-fluid" src=${element} height="400"/></div><div class="col-6"></div></div>
 
        </div>
      </div>`
      document.querySelector('.offcanvas-body').innerHTML= figure;
    }
    
    // document.querySelector('.offcanvas-body').innerHTML =
    //  `<div class="container text-center"><div class="row g-2">
    //  ${[shots].map((item)=>
    //   `<div class="p-3"><img class="img-fluid" src="${item}" height="400"/></div><div class="col-6">`).join('')}</div></div>`
       
    
    // <div class="container text-center">
    //   <div class="row g-2">
    //     <div class="col-6">
    //       <div class="p-3">Custom column padding</div>
    //     </div>
    //     <div class="col-6">
    //       <div class="p-3">Custom column padding</div>
    //     </div>
    //     <div class="col-6">
    //       <div class="p-3">Custom column padding</div>
    //     </div>
    //     <div class="col-6">
    //       <div class="p-3">Custom column padding</div>
    //     </div>
    //   </div>
    // </div>`
    const bsOffcanvas = new bootstrap.Offcanvas('#myOffcanvas')
    bsOffcanvas.show() 
  }
  

function createAList(items){
  const offcanvas = document.getElementById('myOffcanvas')
  offcanvas.addEventListener('show.bs.offcanvas', ()=>{
    let list = document.querySelector('.tags-list')
     items = [];
 list.innerHTML = `${items.map(item=>`<span class="badge text-bg-info">${item}</span>`).join('')}`
  })
  
}
const backToTopBtn = document.getElementById('backToTopBtn')
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 300){
    backToTopBtn.style.display = 'block';
  }else{
     backToTopBtn.style.display = 'none';
  }
})
backToTopBtn.onclick = (e)=>{
  e.preventDefault();
  scrollTo({
    top:0,
    behavior:'smooth'
  })
}
document.getElementById('goToBottom').onclick = (e)=>{
  e.preventDefault();
  scrollTo({
    bottom:0,
    behavior:'smooth'
  })
}
