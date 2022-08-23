document.addEventListener('DOMContentLoaded', function () {
   // Dynamic Adapt v.1
   // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
   // e.x. data-da=".item,992,2"
   // Andrikanych Yevhen 2020
   // https://www.youtube.com/c/freelancerlifestyle

   "use strict";
   function DynamicAdapt(type) {
      this.type = type;
   }
   DynamicAdapt.prototype.init = function () {
      const _this = this;
      // массив объектов
      this.оbjects = [];
      this.daClassname = "_dynamic_adapt_";
      // массив DOM-элементов
      this.nodes = document.querySelectorAll("[data-da]");
      // наполнение оbjects объктами
      for (let i = 0; i < this.nodes.length; i++) {
         const node = this.nodes[i];
         const data = node.dataset.da.trim();
         const dataArray = data.split(",");
         const оbject = {};
         оbject.element = node;
         оbject.parent = node.parentNode;
         оbject.destination = document.querySelector(dataArray[0].trim());
         оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
         оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
         оbject.index = this.indexInParent(оbject.parent, оbject.element);
         this.оbjects.push(оbject);
      }
      this.arraySort(this.оbjects);
      // массив уникальных медиа-запросов
      this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
         return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
      }, this);
      this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
         return Array.prototype.indexOf.call(self, item) === index;
      });
      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      for (let i = 0; i < this.mediaQueries.length; i++) {
         const media = this.mediaQueries[i];
         const mediaSplit = String.prototype.split.call(media, ',');
         const matchMedia = window.matchMedia(mediaSplit[0]);
         const mediaBreakpoint = mediaSplit[1];
         // массив объектов с подходящим брейкпоинтом
         const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
         });
         matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
         });
         this.mediaHandler(matchMedia, оbjectsFilter);
      }
   };
   DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
      if (matchMedia.matches) {
         for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
         }
      } else {
         //for (let i = 0; i < оbjects.length; i++) {
         for (let i = оbjects.length - 1; i >= 0; i--) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
               this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
         }
      }
   };
   // Функция перемещения
   DynamicAdapt.prototype.moveTo = function (place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
         destination.insertAdjacentElement('beforeend', element);
         return;
      }
      if (place === 'first') {
         destination.insertAdjacentElement('afterbegin', element);
         return;
      }
      destination.children[place].insertAdjacentElement('beforebegin', element);
   }
   // Функция возврата
   DynamicAdapt.prototype.moveBack = function (parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
         parent.children[index].insertAdjacentElement('beforebegin', element);
      } else {
         parent.insertAdjacentElement('beforeend', element);
      }
   }
   // Функция получения индекса внутри родителя
   DynamicAdapt.prototype.indexInParent = function (parent, element) {
      const array = Array.prototype.slice.call(parent.children);
      return Array.prototype.indexOf.call(array, element);
   };
   // Функция сортировки массива по breakpoint и place 
   // по возрастанию для this.type = min
   // по убыванию для this.type = max
   DynamicAdapt.prototype.arraySort = function (arr) {
      if (this.type === "min") {
         Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
               if (a.place === b.place) {
                  return 0;
               }

               if (a.place === "first" || b.place === "last") {
                  return -1;
               }

               if (a.place === "last" || b.place === "first") {
                  return 1;
               }

               return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
         });
      } else {
         Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
               if (a.place === b.place) {
                  return 0;
               }

               if (a.place === "first" || b.place === "last") {
                  return 1;
               }

               if (a.place === "last" || b.place === "first") {
                  return -1;
               }

               return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
         });
         return;
      }
   };
   const da = new DynamicAdapt("max");
   da.init();

})



let _slideUp = (target, duration = 500, showmore = 0) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = `${target.offsetHeight}px`;
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
         target.hidden = !showmore ? true : false;
         !showmore ? target.style.removeProperty('height') : null;
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         !showmore ? target.style.removeProperty('overflow') : null;
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
         // Создаем событие 
         document.dispatchEvent(new CustomEvent("slideUpDone", {
            detail: {
               target: target
            }
         }));
      }, duration);
   }
}
let _slideDown = (target, duration = 500, showmore = 0) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.hidden = target.hidden ? false : null;
      showmore ? target.style.removeProperty('height') : null;
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
         // Создаем событие 
         document.dispatchEvent(new CustomEvent("slideDownDone", {
            detail: {
               target: target
            }
         }));
      }, duration);
   }
}

let _slideToggle = (target, duration = 500) => {
   if (target.hidden) {
      return _slideDown(target, duration);
   } else {
      return _slideUp(target, duration);
   }
}

document.addEventListener('DOMContentLoaded', function () {


   // copy ========================================================================================================================================================
   const codes = document.querySelectorAll('.code-copy');
   for (let code of codes) {
      code.addEventListener('click', (e) => {
         e.stopPropagation();
         const str = code.closest('.code').querySelector('.code-copied').textContent;
         const area = document.createElement('textarea');
         const wrap = document.querySelector('.wrap')
         wrap.appendChild(area);
         area.value = str;
         area.select();
         document.execCommand("copy");
         wrap.removeChild(area);

         const block = document.querySelector('.copied-code');
         const trig = code;
         const ico = document.querySelector('.tech__arrow');
         const tech = block.querySelectorAll('.tech__block');

         function getPosition() {
            const pos = trig.getBoundingClientRect();
            let left = pos.x + (trig.offsetWidth - block.offsetWidth) / 2;
            let right = pos.x + (trig.offsetWidth + block.offsetWidth) / 2;

            if (left < 0) {
               left = 15 + 'px';
            } else {
               left = left + 'px';
            }

            if (right > window.innerWidth) {
               left = 'auto';
               right = 15;
            }

            let top = pos.top + trig.offsetHeight;
            if (top < 0) {
               top = pos.top - trig.offsetHeight;
            }

            ico.style.left = pos.x - trig.offsetWidth / 2 + 'px';
            ico.style.top = top + 5 + 'px';
            ico.classList.add('tech__arrow-active');

            block.style.right = right + 'px';
            block.style.left = left;
            block.style.top = top + 'px';
            block.classList.add('tooltip-active');
         }
         function getOptions() {
            if (trig.dataset.bgcolor) {
               ico.style.borderBottomColor = trig.dataset.bgcolor;
               // tech.style.background = trig.dataset.bgcolor;
            } else {
               ico.style.borderBottomColor = '#ffffff';
               // tech.style.background = '#ffffff';
            }

            if (trig.dataset.color) {
               // tech.style.color = trig.dataset.color;
            }
         }

         function closeTooltip() {
            block.classList.remove('tooltip-active');
            ico.classList.remove('tech__arrow-active');
            window.removeEventListener('scroll', getPosition);
         }

         window.addEventListener('scroll', getPosition);
         getPosition();
         getOptions();

         setTimeout(closeTooltip, 2000);
      })
   }

   // slider ========================================================================================================================================================

   const sliderRelated = new Swiper('.item-basket__related-slider ', {
      observer: true,
      slidesPerView: 4,
      loop: true,
      spaceBetween: 20,
      navigation: {
         prevEl: '.related-slider-arrow-prev',
         nextEl: '.related-slider-arrow-next',
      },

      breakpoints: {
         320: {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
            freeMode: {
               enabled: false,
            },
            pagination: {
               el: ".item-basket__related-slider-pagination",
               type: "bullets",
               dynamicBullets: true,
               dynamicMainBullets: 4,
            },
         },
         410: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            freeMode: {
               enabled: false,
            },
            pagination: {
               el: ".item-basket__related-slider-pagination",
               type: "bullets",
               dynamicBullets: true,
               dynamicMainBullets: 4,
            },
         },
         550: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            freeMode: {
               enabled: false,
            },
            pagination: {
               el: ".item-basket__related-slider-pagination",
               type: "fraction",
            },
         },
         768: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            freeMode: {
               enabled: false,
            },
            pagination: {
               el: ".item-basket__related-slider-pagination",
               type: "fraction",
            },

         }
      },

      on: {
         observerUpdate: function () {

         },
      },
      on: {
         resize: function () {
         },
      },

   });


   // modal ========================================================================================================================================================
   const cartClear = document.querySelectorAll('.cart-del');
   const optionsButton = document.querySelectorAll('.item-basket__options-button');
   initModal(cartClear, 'clear');
   initModal(optionsButton, 'option');

   function initModal(items, text) {
      for (let call of items) {
         call.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.querySelector(`.modal__${text}`);
            modal.classList.add('modal-active');
            document.body.style.overflowY = "hidden";
         })
      }
   }

   const closes = document.querySelectorAll('.modal__close');

   for (let close of closes) {
      close.addEventListener('click', (e) => {
         e.target.closest('.modal').classList.remove('modal-active');
         document.body.style.overflowY = "auto";
      })
   }

   const cancel = document.querySelector('.modal__button-cancel');

   cancel.addEventListener('click', (e) => {
      e.target.closest('.modal').classList.remove('modal-active');
      document.body.style.overflowY = "auto";
   })

   const optionButton = document.querySelector('.modal__option-button ');

   optionButton.addEventListener('click', (e) => {
      e.target.closest('.modal').classList.remove('modal-active');
      document.body.style.overflowY = "auto";
   })

   for (let close of closes) {
      close.addEventListener('click', (e) => {
         e.target.closest('.modal').classList.remove('modal-active');
         document.body.style.overflowY = "auto";
      })
   }

   const modals = document.querySelectorAll('.modal');
   for (let modal of modals) {
      modal.addEventListener('click', (e) => {
         if (!e.target.closest('.modal__wrapper')) {
            e.target.closest('.modal').classList.remove('modal-active');
            document.body.style.overflowY = "auto";
         }
      });
   }


   // tooltip ========================================================================================================================================================
   const triggers = document.querySelectorAll('.more-info');

   for (let trig of triggers) {
      const block = document.querySelector(`[data-tooltip="${trig.dataset.toolbar}"]`);
      const tech = block.querySelectorAll('.tech__block');
      const ico = document.querySelector('.tech__arrow');
      const close = block.querySelector('.tech__close');
      let isBlock = false;


      if (trig.dataset.effect !== 'click') {
         trig.addEventListener('mouseenter', () => {
            getPosition();
            window.addEventListener('scroll', getPosition);
            getOptions();
         });
         trig.addEventListener('poinerenter', () => {
            getPosition();
            window.addEventListener('scroll', getPosition);
            getOptions();
         });
      } else {
         trig.addEventListener('click', () => {
            getPosition();
            window.addEventListener('scroll', getPosition);
         });
      }

      trig.addEventListener('click', () => {
         if (!isBlock) {
            getPosition();
            window.addEventListener('scroll', getPosition);
            isBlock = true;
            return
         }

         if (isBlock) {
            closeTooltip();
            window.removeEventListener('scroll', getPosition);
            isBlock = false;
            return
         }
      });

      block.addEventListener('mouseenter', () => {
         isBlock = true;
      });
      block.addEventListener('pointerenter', () => {
         isBlock = true;
      });

      if (close) {
         close.addEventListener('click', () => {
            closeTooltip();
            isBlock = false;
            window.removeEventListener('scroll', getPosition);
         });
      };

      trig.addEventListener('mouseleave', () => {
         closeTooltip();
         window.removeEventListener('scroll', getPosition);
         isBlock = false;
      });
      block.addEventListener('mouseleave', () => {
         closeTooltip();
         isBlock = false;
         window.removeEventListener('scroll', getPosition);
      });

      function getPosition() {
         const pos = trig.getBoundingClientRect();
         let left = pos.x + (trig.offsetWidth - block.offsetWidth) / 2;
         let right = pos.x + (trig.offsetWidth + block.offsetWidth) / 2;

         if (left < 0) {
            left = 15 + 'px';
         } else {
            left = left + 'px';
         }

         if (right > window.innerWidth) {
            left = 'auto';
            right = 15;
         }

         let top = pos.top + trig.offsetHeight;
         if (top < 0) {
            top = pos.top - trig.offsetHeight;
         }

         ico.style.left = trig.dataset.offset ? Number(trig.dataset.offset) + pos.x + 3 - trig.offsetWidth / 2 + 'px' : pos.x + 3 - trig.offsetWidth / 2 + 'px';
         ico.style.top = top + 6 + 'px';
         ico.classList.add('tech__arrow-active');

         block.style.right = right + 'px';
         block.style.left = left;
         block.style.top = top + 'px';
         block.classList.add('tooltip-active');
      }

      function getOptions() {
         if (trig.dataset.bgcolor) {
            ico.style.borderBottomColor = trig.dataset.bgcolor;
            tech.forEach((item) => {
               item.style.background = trig.dataset.bgcolor;
            })

         } else {
            ico.style.borderBottomColor = '#ffffff';
            tech.forEach((item) => {
               item.style.background = '#ffffff';
            })
         }

         if (trig.dataset.color) {
            tech.forEach((item) => {
               item.style.background = trig.dataset.color;
            })
            // tech.style.color = trig.dataset.color;
         }
      }

      function closeTooltip() {
         block.classList.remove('tooltip-active');
         ico.classList.remove('tech__arrow-active');
      }
   };

   //========================================================================================================================================================
   const images = document.querySelectorAll('.items__image');


   for (let image of images) {
      const min = image.querySelector('.items__min-image');
      const big = image.querySelector('.items__big-image');

      document.addEventListener('click', (e) => {
         if (e.target.closest('.items__min-image') === min) {
            big.classList.toggle('items__big-remove');
         } else if (e.target.closest('.items__big-image')) {
            null;
         } else {
            big.classList.remove('items__big-remove');
         }
      });

   };

   // window.addEventListener('resize', function (e) {
   //    for (let image of images) {
   //       const min = image.querySelector('.items__min-image');
   //       const big = image.querySelector('.items__big-image');
   //       if (window.innerWidth < 1000) {
   //          document.addEventListener('click', (e) => {
   //             if (e.target.closest('.items__min-image') === min) {
   //                big.classList.toggle('items__big-remove');
   //             } else if (e.target.closest('.items__big-image')) {
   //                null;
   //             } else {
   //                // big.classList.remove('items__big-remove');
   //             }
   //          });
   //       }
   //    };
   // });



   // Модуь формы "колличество"========================================================================================================================================================

   const quantities = document.querySelectorAll('.item-basket__quantity');
   for (let quantity of quantities) {
      const plus = quantity.querySelector('.item-basket__plus');
      const minus = quantity.querySelector('.item-basket__minus');
      const num = quantity.querySelector('.item-basket__num');

      plus.addEventListener('click', () => {
         num.value++;
      });

      minus.addEventListener('click', () => {
         num.value--;
         if (num.value < 1) num.value = 1;
      })
   }

   // click ========================================================================================================================================================

   document.addEventListener('click', documentClick);
   function documentClick(e) {
      const el = e.target
      if (el.closest('.item-basket__open')) {
         const elem = el.closest('.item-basket__open')
         const text = elem.querySelectorAll('span')
         const main = elem.closest('.item-basket')
         const compound = main.querySelector('.item-basket__compound')
         elem.style.pointerEvents = 'none'
         setTimeout(() => {
            elem.style.removeProperty('pointer-events');
         }, 500);
         elem.classList.toggle('_active')
         text.forEach(span => {
            span.toggleAttribute("hidden");
         });
         _slideToggle(compound);
      }
      if (el.closest('.modal__option-button ')) {
         const main = document.querySelector('.item-basket__options')
         const body = main.querySelector('.item-basket__options-body')
         const install = main.querySelector('.item-option-connect')
         install.classList.add('_active')
         body.classList.add('_active')
      }
      if (el.closest('.item-basket__options-delete')) {
         const body = el.closest('.item-basket__options-body')
         const item = el.closest('.item-basket__options-item')
         if (item.classList.contains('_active')) {
            item.classList.remove('_active')
         }
         if (!body.querySelector('.item-basket__options-item._active')) {
            body.classList.remove('_active')
         }
      }
      if (el.closest('.item-basket__related-button')) {
         const elem = el.closest('.item-basket__related-button')
         const title = el.closest('.item-basket__related-title')
         const svg = title.querySelector('.card__button-icon');
         const text = elem.querySelectorAll('.item-basket__related-button-icon')
         const main = elem.closest('.item-basket__related')
         const arrows = main.querySelectorAll('.related-slider-arrow')
         elem.style.pointerEvents = 'none'
         setTimeout(() => {
            elem.style.removeProperty('pointer-events');
         }, 500);
         if (svg) {
            svg.classList.toggle('_active')
         }
         arrows.forEach(arrow => {
            arrow.classList.toggle('_active')
         })
         const slider = main.querySelector('.item-basket__related-slider')
         elem.classList.toggle('_active')
         text.forEach(span => {
            span.toggleAttribute("hidden");
         });
         _slideToggle(slider);
      }
      if (el.closest('.modal__option-title')) {
         const elem = el.closest('.modal__option-title')
         const main = elem.closest('.modal')
         const list = main.querySelector('.modal__option-list')
         elem.classList.toggle('_active')
         _slideToggle(list);
      }
   }
})

