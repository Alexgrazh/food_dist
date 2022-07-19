document.addEventListener("DOMContentLoaded", () => {
   const tabs = document.querySelectorAll('.tabheader__item'),
         tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParent = document.querySelector('.tabheader__items');
         

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.style.display = 'none';
      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active')
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].style.display = 'block';
      tabs[i].classList.add('tabheader__item_active')
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   })

   //timer

   const deadLine = '2022-7-28';

      function getTimeRemaining (endTime) {  
         const t = Date.parse(endTime) - Date.parse(new Date()),
               days = Math.floor(t / (1000 * 60 * 60 * 24)),
               hours = Math.floor((t / (1000 * 60 * 60) % 24)),
               minutes = Math.floor((t / 1000 * 60) % 60),
               seconds = Math.floor((t / 1000) % 60);
               
               
               return {
                  'total' : t,
                  'days' : days,
                  'hours': hours,
                  'minutes' : minutes,
                  'seconds' : seconds
               };
         }
         
      
       /*
       //------- коли дата не дійсна або закінчилась акція
       function getTimeRemaining (endTime) {  
         let days, hours, minutes,seconds;
         const t = Date.parse(endTime) - Date.parse(new Date());

         if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
         } else {
            
             days = Math.floor(t / (1000 * 60 * 60 * 24)),
               hours = Math.floor((t / (1000 * 60 * 60) % 24)),
               minutes = Math.floor((t / 1000 * 60) % 60),
               seconds = Math.floor((t / 1000) % 60);  
         }
         return {
            'total' : t,
            'days' : days,
            'hours': hours,
            'minutes' : minutes,
            'seconds' : seconds
         };
       }
       
       
       */

       function getZero (num) {
         if( num>= 0 && num < 10) {
            return `0${num}`;
         } else {
            return num;
         }
       }

      function setClock(selector, endTime) {
         const timer = document.querySelector(selector),
               days = timer.querySelector('#days'),
               hours = timer.querySelector('#hours'),
               minutes = timer.querySelector('#minutes'),
               seconds = timer.querySelector('#seconds'),
               timeInterval = setInterval(updateClock, 1000)

               updateClock()

               function updateClock() {
                  const t = getTimeRemaining(endTime);

                  days.innerHTML = getZero(t.days);
                  hours.innerHTML = getZero(t.hours);
                  minutes.innerHTML = getZero(t.minutes);
                  seconds.innerHTML = getZero(t.seconds);

                  if(t.total <= 0) {
                     clearInterval(timeInterval)
                  }
               }
      }

      setClock('.timer', deadLine)

      //modal

      const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

  // використовуєм класси для карточок

  class MenuCard {
   constructor(src, alt, title, descr, price, parentSelector, ...classes) {
       this.src = src;
       this.alt = alt;
       this.title = title;
       this.descr = descr;
       this.price = price;
       this.classes = classes;
       this.parent = document.querySelector(parentSelector);
       this.transfer = 27;
       this.changeToUAH(); 
   }

   changeToUAH() {
       this.price = this.price * this.transfer; 
   }

   render() {
       const element = document.createElement('div');

       if (this.classes.length === 0) {
           this.classes = "menu__item";
           element.classList.add(this.classes);
       } else {
           this.classes.forEach(className => element.classList.add(className));
       }

       element.innerHTML = `
           <img src=${this.src} alt=${this.alt}>
           <h3 class="menu__item-subtitle">${this.title}</h3>
           <div class="menu__item-descr">${this.descr}</div>
           <div class="menu__item-divider"></div>
           <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
           </div>
       `;
       this.parent.append(element);
   }
}

getResource('http://localhost:3000/menu')
   .then(data => {
       data.forEach(({img, altimg, title, descr, price}) => {
           new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
       });
   });

// getResource('http://localhost:3000/menu')
//     .then(data => createCard(data));

// function createCard(data) {
//     data.forEach(({img, altimg, title, descr, price}) => {
//         const element = document.createElement('div');

//         element.classList.add("menu__item");

//         element.innerHTML = `
//             <img src=${img} alt=${altimg}>
//             <h3 class="menu__item-subtitle">${title}</h3>
//             <div class="menu__item-descr">${descr}</div>
//             <div class="menu__item-divider"></div>
//             <div class="menu__item-price">
//                 <div class="menu__item-cost">Цена:</div>
//                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
//             </div>
//         `;
//         document.querySelector(".menu .container").append(element);
//     });
// }


//Forms

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
    bindPostData(item);
});

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);
    
        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset();
        });
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}

/* 
//slider 1 
 const slidse = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current');

let slideIndex = 1;

showSlides(slideIndex);

function nextSlides(){
   if(slidse.length < 10) {
      total.textContent = `0${slidse.length}`
   } else {
      total.textContent = slidse.length;
   }
}
nextSlides()
   


function showSlides(n) {
   if(n > slidse.length) {
      slideIndex = 1;
   }

   if(n < 1) {
      slideIndex = slidse.length;
   }

   slidse.forEach(item => item.style.display = 'none');

   slidse[slideIndex - 1].style.display = 'block';

   function prevSlides() {
      if(slidse.length < 10) {
         current.textContent = `0${slideIndex}`
      } else {
         current.textContent = slideIndex;
      }
   }
      
   prevSlides() 
}


function plusSlidse(n) {
   showSlides(slideIndex += n)
}

prev.addEventListener('click', () => {
   plusSlidse(-1)
})

next.addEventListener('click', () => {
   plusSlidse(1)
})

*/

//SLIDER 2 

const slides = document.querySelectorAll('.offer__slide'),
      slider = document.querySelector('.offer__slider'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__clider-ineer'),
      width = window.getComputedStyle(slidesWrapper).width;

   let slideIndex = 1;

   let offset = 0;

 if(slides.length < 10) {
         total.textContent = `0${slides.length}`
         current.textContent = `0${slideIndex}`
 } else {
         total.textContent = slides.length;
         current.textContent = slideIndex;
      }
  

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';


slidesWrapper.style.overflow = 'hidden';


slides.forEach(slide => {
   slide.style.width = width;
})

slider.style.position = 'reletive';

const indicators = document.createElement('ol'),
      dots = [];
indicators.classList.add('carousel-indicators')

indicators.style.cssText = `
   position: absolute;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 15;
   display: flex;
   justify-content: center;
   margin-right: 15%;
   margin-left: 15%;
   list-style: none;
`;

slider.append(indicators);

for(let i = 0; i < slides.length; i++) {
   const dot = document.createElement('li');
   dot.setAttribute('data-slide-to', i + 1);
   dot.style.cssText = `
   box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #000;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;`;
    if(i == 0) {
      dot.style.opasity = 1
    }

    
    indicators.append(dot);
    dots.push(dot);
}

function deleteNoDigits(str){
   return +str.replace(/\D/g, '')
}

next.addEventListener('click', () => {

      if(offset == deleteNoDigits(width) * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += deleteNoDigits(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`

      if(slideIndex == slides.length) {
         slideIndex = 1;
      }else {
         slideIndex++
      }

      if(slides.length < 10) {
         current.textContent = `0${slideIndex}`
      } else {
         current.textContent = slideIndex;
      } 
})

prev.addEventListener('click', () => {

   if( offset == 0) {
      offset = deleteNoDigits(width) * (slides.length - 1)
   } else {
      offset -= deleteNoDigits(width);
   }

   slidesField.style.transform = `translateX(-${offset}px)`

   if( slideIndex == 1) {
      
      slideIndex = slides.length
   }else {
      slideIndex--
   }

   if(slides.length < 10) {
      current.textContent = `0${slideIndex}`
   } else {
      current.textContent = slideIndex;
   }

   dots.forEach(dot => dot.style.opasity = '.5')
   dots[slideIndex - 1].style.opasity = 1;
});
dots.forEach(dot => {
   dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNoDigits(width) * (slideTo - 1)

      slidesField.style.transform = `translateX(-${offset}px)`

if(slides.length < 10) {
      current.textContent = `0${slideIndex}`
   } else {
      current.textContent = slideIndex;
   }

      dots.forEach(dot => dot.style.opasity = '.5')
      dots[slideIndex - 1].style.opasity = 1;
   })
})


//calc

const result = document.querySelector('.calculating__result span');
let sex,
    height,
    weight, 
    age,
    ratio;

   if(localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   }else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }

   if(localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.55);
   }
    
      function initLocalSettings (selector , activaClass) {
         const elements = document.querySelectorAll(selector);
         elements.forEach(elem => {
            elem.classList.remove(activaClass);
               if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                  elem.classList.add(activaClass)
               }
               if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                  elem.classList.add(activaClass)
               }
         })
      }
      initLocalSettings('#gender div' , 'calculating__choose-item_active');
      initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'; 
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div' , 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
         
            if(input.value.match(/\D/g)) {
               input.style.border = '1px solid red';
            }else {
               input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

    
     


      
});
      



