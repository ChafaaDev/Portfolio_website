// document.addEventListener('DOMContentLoaded', showHeader)

// function showHeader(){
//     document.querySelector('.main-header').classList.add('shoWup')
// }
// const images = ['laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg', 
//                 'Screenshot 2025-02-26 211540.png', 'Screenshot 2025-03-06 155034.png','Screenshot 2025-03-29 225232.png'
// ]
// let index = 0; 
// function Slider(){
//     const slide = document.querySelector('.slider img')
//     slide.src = `./images/${images[index]}`
//     index ++;
//     if(index >= images.length) index = 0;
    
// }
// setInterval(Slider, 3000)
import Swiper from "./node_modules/swiper/swiper-bundle.min.mjs"
// import AOS from "./node_modules/aos/dist/aos"

// AOS.init()
const swiper = new Swiper('.swiper',{
    
   

     direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const observer = new IntersectionObserver((entries) =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            entry.target.classList.add('active')
        }
    })
})
document.querySelectorAll('.reveal').forEach((el)=>observer.observe(el))

function toggleTheme(){
  const themeBtn = document.getElementById('themeBtn');
    themeBtn.onclick = (e)=>{
      const body = document.querySelector('body')
        if(body.dataset.bsTheme == 'dark') {
          body.dataset.bsTheme = ("light")
          // body.style.backgroundColor ='#ffffff8e'
          themeBtn.innerHTML = '<i class="bi bi-moon-fill"></i>'
        }
        else{
            body.dataset.bsTheme = ("dark")
            // body.style.backgroundImage = 'url("./images/developer-8829735_1920.jpg")'
            themeBtn.innerHTML = '<i class="bi bi-brightness-high"></i>'
            // document.querySelector('main').style.backgroundColor = '#ffff'
        }
    }
}
toggleTheme()



function createSkillsCard(source){
  for(let i = 0; i < source.length ; i++){
    const element = source[i]
    const card = document.createElement('div')
    card.classList.add('skill-card')
    const icon = document.createElement('img')
    icon.src = element.icon
    icon.setAttribute('height','250')
    const title = document.createElement('h3')
    title.textContent = element.title
    card.append(icon, title)
    document.querySelector('#skills .scroll-track').appendChild(card)
  }
}

function openModal(){
  document.getElementById('openModal').onclick  = ()=>{
    document.querySelector('.contact-form').showModal()
  } 
}
openModal()
function closeModal(){
  document.getElementById('closeModal').onclick  = ()=>{
      
      document.querySelector('.contact-form').close()
      document.querySelector('.contact-form').classList.add('hidden')
      setTimeout(()=>{
          document.querySelector('.contact-form').classList.remove('hidden')
      }, 300)
  }
}
closeModal()
fetch('./data/skills.json')
.then(res => res.json())
.then(data=>{
  createSkillsCard(data)
  createSkillsCard(data)
})
//  document.querySelector('header').addEventListener('load',(e)=>{
//   if(e.target == open){
//      e.target.dataset.aos = 'flip-left'
//    e.target.dataset.aosEasing = "ease-out-cubic"
//    e.target.dataset.aosDuration = '3000'
//   }
 
//  })
document.querySelector('#skills .scroll-track').onmouseover =  (e)=>{
 e.target.style.animationPlayState = 'paused'
}
document.querySelector('#skills .scroll-track').onmouseleave =  (e)=>{
 e.target.style.animationPlayState = 'running'
}