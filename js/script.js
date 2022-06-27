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
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

  modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal) 
  });


   function openModal () {
         modal.classList.add('show');
          modal.classList.remove('hide');
          document.body.style.overflow = 'hidden';
          clearInterval(modalTimeId)
    }

  function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      // Либо вариант с toggle - но тогда назначить класс в верстке
      document.body.style.overflow = '';
  }
  
  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          closeModal();
      }
  });

  document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) { 
          closeModal();
      }
  });

  //const modalTimeId = setTimeout(openModal, 5000);

  window.addEventListener('scroll', () => {
   if(window.pageYOffset + document.documentElement.clientHeight >= documentElement.scrollHeiht){
      openModal()
   }
  })

  // використовуєм класси для карточок

  class  MenuCard {
      constructor(src, alt, title, descr , price, parentSelector) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.parent = document.querySelector(parentSelector)
         this.price = price;
         this.transfer = 27;
         this.changeToUAH();
         
      }

      changeToUAH() {
         this.price = this.price  *  this.transfer
      }

      render() {
         const element = document.createElement('div')
         element.innerHTML = `
          <div class="menu__item">
               <img src=${this.src} alt=${this.alt}>
               <h3 class="menu__item-subtitle">${this.title}"</h3>
               <div class="menu__item-descr">${this.descr}"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
               </div>
         </div>
         `
         this.parent.append(element);
      }
  }

      new MenuCard(
         "img/tabs/vegy.jpg",
         "vegy",
         "Меню 'Фитнес'",
         "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
         10,
         ".menu .container"

      ).render();

      class offerNew {
         constructor(title, text, parentSelectore) {
            this.title = title;
            this.text = text;
            this.parent = document.querySelector(parentSelectore)
         }
         render() {
           const  element = createElement('div');

           element.innerHTML = `
         <div class="offer__advantages">
               <h2>${this.title}</h2>
               <div class="offer__advantages-text">
                     ${this.text}
               </div>
               <h2>${this.title}</h2>
               <div class="offer__advantages-text">
               ${this.text}
               </div>
            </div>
           `
           this.parent.append(element);
         }
      }

     
     new offerNew(
      'Что мы можем вам предложить?',
      ' Наша основная идея - это правильное питание. Оно может быть простым и вкусным. Мы не просто доставка, мы сервис! Мы взяли на себя все расчеты БЖУ, калорийности, объемов порций и прочие важные, но скучные аспекты. Вам остается только полезная, сытная и правильная еда, которую мы привозим прямо под дверь.',
      ".container .offer__advantages"

     ).render()
});

