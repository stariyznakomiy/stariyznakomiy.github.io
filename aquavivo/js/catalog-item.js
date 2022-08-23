
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.card__slide');
  for (let slide of slides) {
    slide.addEventListener('click', (e) => {
      for (let slide of slides) {
        slide.classList.remove('card__slide-select');
      }
      slide.classList.add('card__slide-select');
      const img = slide.querySelector('img');
      const elem = document.querySelector('.card__image');
      elem.src = img.src;
      elem.srcset = img.srcset;
      elem.closest('.card__image-active').href = img.src;
      elem.closest('.card__slide-active').classList.remove('card__image-hidden');
      elem.closest('.card__slide-active').querySelector('.card__video-active').innerHTML = '';
    })
  }

  const videos = document.querySelectorAll('.card__video-container');
  for (let video of videos) {
    video.addEventListener('click', (e) => {
      const elem = document.querySelector('.card__video-active');
      elem.innerHTML = video.innerHTML;
      const videoElem = elem.querySelector('video');
      elem.closest('.card__slide-active').classList.add('card__image-hidden');
      videoElem.controls = true;
      elem.querySelector('.card__play').remove();
    })


  }

  let zoom = document.querySelectorAll('.image-zoom');
  zoom.forEach(function (el) {

    el.addEventListener('mouseenter', function (e) {
      const target = e.target.closest('.image-zoom');
      rect = target.getBoundingClientRect();
      target.style.setProperty('--image', `url(${target.querySelector('img').getAttribute('src')})`);
      target.style.setProperty('--x', Math.floor(((e.clientX - rect.left) / rect.width * 100) * 100) / 100 + '%');
      target.style.setProperty('--y', Math.floor(((e.clientY - rect.top) / rect.height * 100) * 100) / 100 + '%');
      target.classList.add('-active');
      target.classList.add('-enter');
    });

    el.addEventListener('mousemove', function (e) {
      const target = e.target.closest('.image-zoom');
      if (target.classList.contains('-active')) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--x', Math.floor(((e.clientX - rect.left) / rect.width * 100) * 100) / 100 + '%');
        target.style.setProperty('--y', Math.floor(((e.clientY - rect.top) / rect.height * 100) * 100) / 100 + '%');
      }
      if (e.target.closest('.card__tab')) {
        e.target.closest('.card__tab').classList.add('card__tab-opacity');
      } else {
        target.querySelectorAll('.card__tab').forEach(el => {
          el.classList.remove('card__tab-opacity');
        });
      }
    });

    el.addEventListener('mouseleave', function (e) {
      let target = e.target.closest('.image-zoom');
      if (target.classList.contains('-active')) {
        target.classList.remove('-enter');
      }
    });
  });

  const rates = document.querySelectorAll(".card__stars");
  for (let rate of rates) {
    const stars = rate.children;
    const num = Number(rate.dataset.rate);
    for (let i = 0; i < Math.floor(num); i++) {
      stars[i].style.fill = "#DD2D41";
    }

    if (!Number.isInteger(num)) {
      const id = makeid();

      rate.insertAdjacentHTML(
        "afterbegin",
        `<svg width="0" height="0" viewBox="0 0 12 13">
              <defs>
                <linearGradient id="${id}">
                <stop offset="${Math.round(
          (num % Math.floor(num)) * 100
        )}%" stop-color="#DD2D41" />
                <stop offset="${Math.round(
          (num % Math.floor(num)) * 100
        )}%" stop-color="#D2D2D2" />
                </linearGradient>
              </defs>
            </svg>`
      );
      stars[Math.ceil(num)].style.fill = `url(#${id})`;
    }
  }


  function makeid() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  const timers = document.querySelectorAll('.timer');
  for (let timer of timers) {
    const ceils = timer.querySelectorAll('.timer__ceil');
    const deadline = new Date(timer.dataset.end);
    let timerId = null;
    function declensionNum(num, words) {
      return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    function countdownTimer() {
      const diff = deadline - new Date();
      if (diff <= 0) {
        clearInterval(timerId);
      }
      const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
      const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
      const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
      const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
      const daysText = days < 10 ? '0' + days : days.toString();
      const hoursText = hours < 10 ? '0' + hours : hours.toString();
      const minText = minutes < 10 ? '0' + minutes : minutes.toString();
      const secText = seconds < 10 ? '0' + seconds : seconds.toString();



      function anim(elem, elemText, is2) {
        const text = is2 ? elemText.slice(1) : elemText.slice(0, 1);
        const prev = elem.querySelector('.ceil__prev');
        const next = elem.querySelector('.ceil__new');
        if (text !== elem.querySelector('.ceil__prev').textContent) {
          elem.classList.add('ceil-swap');
          next.textContent = text;
          setTimeout(() => {
            elem.classList.remove('ceil-swap');
            prev.textContent = text;
            prev.style.transition = '0s';
            next.style.transition = '0s';
          }, 500)
          setTimeout(() => {
            prev.style.transition = '0.5s';
            next.style.transition = '0.5s';
          }, 700)
        } else {
          next.textContent = text;
          prev.textContent = text;
        }
      }

      anim($days1, daysText, false);
      anim($days2, daysText, true);
      anim($hours1, hoursText, false);
      anim($hours2, hoursText, true);
      anim($minutes1, minText, false);
      anim($minutes2, minText, true);
      anim($seconds1, secText, false);
      anim($seconds2, secText, true);

      ceils[0].closest('.timer__block').querySelector('.timer__value').textContent = declensionNum(days, ['день', 'дня', 'дней']);
      ceils[2].closest('.timer__block').querySelector('.timer__value').textContent = declensionNum(hours, ['час', 'часа', 'часов']);
    }
    const $days1 = ceils[0];
    const $days2 = ceils[1];
    const $hours1 = ceils[2];
    const $hours2 = ceils[3];
    const $minutes1 = ceils[4];
    const $minutes2 = ceils[5];
    const $seconds1 = ceils[6];
    const $seconds2 = ceils[7];
    countdownTimer();
    timerId = setInterval(countdownTimer, 1000);
  }


  const tabList = document.querySelectorAll('.card__type-list');

  for (let list of tabList) {
    const links = list.querySelectorAll('.card__type-link');
    const more = list.querySelector('.card__type-more');

    window.addEventListener('resize', initList);

    function initList() {
      let width = 0;
      let num = 0;
      for (let link of links) {
        link.style.display = 'block';
        width += link.offsetWidth + 10;
      }

      while (width > list.offsetWidth) {
        num++;
        width = width - links[links.length - num].offsetWidth;
      }

      if (num !== 0) {
        for (let i = links.length - num; i < links.length; i++) {
          links[i].style.display = 'none';
        }

        const number = more.querySelector('.card__type-num');

        number.textContent = num;

        more.addEventListener('click', () => {
          for (let i = links.length - num; i < links.length; i++) {
            links[i].style.display = 'block';
          }
          more.style.display = "none";
        });
        more.style.display = 'block';
      } else {
        more.style.display = "none";
      }
    }

    initList();
  }

  const images = document.querySelectorAll('.items__image');
  for (let image of images) {
    const min = image.querySelector('.items__min-image');
    const big = image.querySelector('.items__big-image');
    if (window.innerWidth < 1000) {
      document.addEventListener('click', (e) => {
        if (e.target.closest('.items__min-image') === min) {
          big.classList.toggle('items__big-remove');
        } else if (e.target.closest('.items__big-image')) {
          null;
        } else {
          big.classList.remove('items__big-remove');
        }
      });
    }
  };

  const selectSingles = document.querySelectorAll('.__select');
  for (let selectSingle of selectSingles) {
    const selectSingle_title = selectSingle.querySelector('.__select__title');
    const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');

    selectSingle_title.addEventListener('click', () => {
      if ('active' === selectSingle.getAttribute('data-state')) {
        selectSingle.setAttribute('data-state', '');
      } else {
        selectSingle.setAttribute('data-state', 'active');
      }
    });

    for (let i = 0; i < selectSingle_labels.length; i++) {
      selectSingle_labels[i].addEventListener('click', (evt) => {
        selectSingle_title.textContent = evt.target.textContent;
        selectSingle.setAttribute('data-state', '');
      });
    }
  }

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
          tech.style.background = trig.dataset.bgcolor;
        } else {
          ico.style.borderBottomColor = '#ffffff';
          tech.style.background = '#ffffff';
        }

        if (trig.dataset.color) {
          tech.style.color = trig.dataset.color;
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

  const searchTrig = document.querySelector('.header-toolbar__search');

  searchTrig.addEventListener('click', () => {
    const header = document.querySelector('.wrap-header');
    header.classList.toggle('is-search-show');
  });

  const searchClose = document.querySelector('.search-close');
  searchClose.addEventListener('click', () => {
    const header = document.querySelector('.wrap-header');
    header.classList.remove('is-search-show');
  });

  const calls = document.querySelectorAll('.trigger-call');
  const tabCalls = document.querySelectorAll('.card__left-call');
  const writes = document.querySelectorAll('.trigger-review');
  const ones = document.querySelectorAll('.trigger-one');
  const towns = document.querySelectorAll('.trigger-town');
  const shares = document.querySelectorAll('.card__button-main');
  initModal(calls, 'call');
  initModal(tabCalls, 'call');
  initModal(writes, 'review');
  initModal(ones, 'one');
  initModal(towns, 'town');
  initModal(shares, 'share');




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

  const modals = document.querySelectorAll('.modal');
  for (let modal of modals) {
    modal.addEventListener('click', (e) => {
      if (!e.target.closest('.modal__wrapper')) {
        e.target.closest('.modal').classList.remove('modal-active');
        document.body.style.overflowY = "auto";
      }
    });
  }

  const descTrig = document.querySelector('.items__desc');
  const compTrig = document.querySelector('.items__complect');

  descTrig.addEventListener('click', () => {
    const desc = document.querySelector('.description');
    const comlect = document.querySelector('.items__list');
    desc.style.display = "block";
    comlect.style.display = "none";
  });

  compTrig.addEventListener('click', () => {
    const desc = document.querySelector('.description');
    const comlect = document.querySelector('.items__list');
    desc.style.display = "none";
    comlect.style.display = "block";
  });

  const formRate = document.querySelector(".modal__stars");
  const stars = formRate.children;
  for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener("mouseenter", (e) => {
      for (let i = 0; i < e.target.dataset.value; i++) {
        stars[i].style.fill = "#DD2D41";
      }
    });

    stars[i].addEventListener("mouseleave", (e) => {
      for (let i = 0; i < stars.length; i++) {
        stars[i].style.fill = "";
      }
    });

    stars[i].addEventListener("click", (e) => {
      const num = e.target.closest("svg").dataset.value;
      for (let i = 0; i < stars.length; i++) {
        num > i
          ? stars[i].classList.add("modal__star-active")
          : stars[i].classList.remove("modal__star-active");
      }
      const item = document.querySelector('.modal__rate-num');
      item.textContent = num + " " + declensionNum(num, ['звезда', 'звезды', 'звёзд']);
    });
  }

  const quantities = document.querySelectorAll('.items__quantity');
  for (let quantity of quantities) {
    const plus = quantity.querySelector('.items__plus');
    const minus = quantity.querySelector('.items__minus');
    const num = quantity.querySelector('.items__num');

    plus.addEventListener('click', () => {
      num.value++;
    });

    minus.addEventListener('click', () => {
      Number(num.value) === 0 ? num.value = 0 : num.value--;
    })
  }

  const file = document.querySelector('.modal__file');
  file.addEventListener('change', (e) => {
    const list = document.querySelector('.modal__file-names');
    if (!list) {
      file.parentElement.insertAdjacentHTML('beforeend', `
    <ul class="modal__file-names">
    </ul>
    `);
    };

    const newList = document.querySelector('.modal__file-names');
    for (let item of file.files) {
      if (item.size < 500000) {
        newList.insertAdjacentHTML('beforeend', `
        <li class="modal__file-name">${item.name}
                    <span onclick="event.stopPropagation(); this.parentElement.remove();" class="modal__file-close">
                      <svg width="12" height="12" stroke="#D41E33" fill="none">
                        <use xlink:href="../images/catalog/catalog-item/sprite.svg#close" />
                      </svg>
                    </span>
                  </li>
        `);
      }
    }
  });


  [].forEach.call(
    document.querySelectorAll('input[type="tel"]'),
    function (input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) {
          event.preventDefault();
          keyInput();
        }
        var matrix = "+7 (___) ___-__-__",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i);
        }
        var reg = matrix
          .substr(0, this.value.length)
          .replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
          })
          .replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (
          !reg.test(this.value) ||
          this.value.length < 5 ||
          (keyCode > 47 && keyCode < 58)
        )
          this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      function keyInput() {
        input.selectionStart = input.value.length;
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
    }
  );

  $("#form-1").validate({
    submitHandler: function () {
      const active = document.querySelector('.modal-active');
      active.classList.remove('modal-active');
      document.getElementById('form-1').reset();
      const modal = document.querySelector('.modal__ok');
      modal.classList.add('modal-active');
      setTimeout(() => modal.classList.remove('modal-active'), 5000);
    },
    rules: {
      "name": {
        required: true,
      },
      "phone": {
        required: true,
      },
      "check": {
        required: true,
      },
    },
    messages: {
      "name": {
        required: 'Заполните поле!'
      },
      "phone": {
        required: 'Заполните поле!'
      },
      "check": {
        required: 'Примите условия!'
      },
    }
  });

  $("#form-2").validate({
    submitHandler: function () {
      const active = document.querySelector('.modal-active');
      active.classList.remove('modal-active');
      document.getElementById('form-2').reset();
      const modal = document.querySelector('.modal__ok');
      modal.classList.add('modal-active');
      setTimeout(() => modal.classList.remove('modal-active'), 5000);
    },
    rules: {
      "name": {
        required: true,
      },
      "email": {
        required: true,
        email: true,
      },
    },
    messages: {
      "name": {
        required: 'Заполните поле!'
      },
      "email": {
        required: 'Заполните поле!',
        email: 'Введите корректные E-mail',
      },
    }
  });

  $("#form-3").validate({
    submitHandler: function () {
      const active = document.querySelector('.modal-active');
      active.classList.remove('modal-active');
      document.getElementById('form-3').reset();
      const modal = document.querySelector('.modal__ok');
      modal.classList.add('modal-active');
      setTimeout(() => modal.classList.remove('modal-active'), 5000);
    },
    rules: {
      "name": {
        required: true,
      },
      "phone": {
        required: true,
      },
      "check": {
        required: true,
      },
    },
    messages: {
      "name": {
        required: 'Заполните поле!'
      },
      "phone": {
        required: 'Заполните поле!'
      },
      "check": {
        required: 'Примите условия!'
      },
    }
  });

  $("#form-4").validate({
    submitHandler: function () {
      const active = document.querySelector('.modal-active');
      active.classList.remove('modal-active');
      document.getElementById('form-4').reset();
      const modal = document.querySelector('.modal__ok');
      modal.classList.add('modal-active');
      setTimeout(() => modal.classList.remove('modal-active'), 5000);
    },
    rules: {
      "name": {
        required: true,
      },
      "phone": {
        required: true,
      },
      "thingh": {
        required: true,
      },
      "lonk": {
        required: true,
      },
      "check": {
        required: true,
      },
    },
    messages: {
      "name": {
        required: 'Заполните поле!'
      },
      "phone": {
        required: 'Заполните поле!'
      },
      "thingh": {
        required: 'Заполните поле!'
      },
      "lonk": {
        required: 'Заполните поле!'
      },
      "check": {
        required: 'Примите условия!'
      },
    }
  });


  const lines = document.querySelectorAll('.reviews__link');
  const reviewsNum = Number(document.querySelector('.reviews__quantity').textContent);
  for (let line of lines) {
    const num = Number(line.querySelector('.reviews__star-num').textContent);
    const item = line.querySelector('.reviews__line');

    item.style.background = `linear-gradient(90deg, #DD2D41 ${num / reviewsNum * 100}%, #F4EDEE ${num / reviewsNum * 100}%)`
  }

  const triggersGallery = document.querySelectorAll('[data-gallery-trig]');

  initModal(triggersGallery, 'gallery');

  for (let trig of triggersGallery) {
    trig.addEventListener('click', (e) => {
      const slider = document.querySelector('.gallery__slider').querySelector('.swiper-wrapper');
      const atr = trig.dataset.galleryTrig;
      const items = document.querySelectorAll(`[data-gallery="${atr}"]`);
      const image = document.querySelector('.gallery__active').querySelector('img');
      slider.innerHTML = '';

      for (let item of items) {
        if (item.constructor.name === 'HTMLImageElement') {
          slider.insertAdjacentHTML('beforeend', `
          <div class="gallery__slide swiper-slide">
            <img src="${item.src}" alt="slide-3" class="gallery__image-slide">
          </div>
          `)
        }
        if (item.constructor.name === 'HTMLVideoElement') {
          slider.insertAdjacentHTML('beforeend', `
          <div class="gallery__slide swiper-slide">
              <div class="gallery__video-container">
                <video class="gallery__video" poster="${item.poster}">
                  <source src="${item.querySelector('source[type="video/mp4"]').src}" type="video/mp4">
                  Ваш браузер не поддерживает видео
                </video>
                <span class="gallery__play card__play"></span>
              </div>
            </div>
          `)
        }
        slider3.update();
      }
      const srcElem = trig.querySelector('img');
      const sourceElem = trig.querySelector('source');
      const arr = Array.from(items).map((item) => item.constructor.name === 'HTMLVideoElement' ? item.querySelector('source').src : item.src);
      let num = 0;

      if (srcElem) {
        const src = srcElem.src;
        const srcSet = trig.querySelector('img').srcset;
        num = arr.indexOf(src);
        image.src = src;
        image.srcset = srcSet;
      } else if (sourceElem) {
        const source = sourceElem.src;
        num = arr.indexOf(source);
      }


      slider3.slideTo(num);
    })
  }

  const another = document.querySelector('.cheap__another');
  const block = document.querySelector('.cheap__block');
  const cheapClose = document.querySelector('.cheap__close');

  another.addEventListener('click', (e) => {
    block.classList.add('cheap__block-active');
  });


  cheapClose.addEventListener('click', (e) => {
    block.classList.remove('cheap__block-active');
  });

  const triggers = document.querySelectorAll('.more-info');

  for (let trig of triggers) {
    const block = document.querySelector(`[data-tooltip="${trig.dataset.toolbar}"]`);
    const tech = block.querySelector('.tech__block');
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
      if (!isBlock) {
        closeTooltip();
        window.removeEventListener('scroll', getPosition);
      }
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
        tech.style.background = trig.dataset.bgcolor;
      } else {
        ico.style.borderBottomColor = '#ffffff';
        tech.style.background = '#ffffff';
      }

      if (trig.dataset.color) {
        tech.style.color = trig.dataset.color;
      }
    }

    function closeTooltip() {
      block.classList.remove('tooltip-active');
      ico.classList.remove('tech__arrow-active');
    }
  };


  const cheapSlides = document.querySelectorAll('.cheap__slide');

  for (let item of cheapSlides) {
    item.addEventListener('click', (e) => {
      for (let item of cheapSlides) {
        item.classList.remove('cheap__slide-active');
      }
      item.classList.add('cheap__slide-active');
    })
  }

  const cardBlock = document.querySelector('.card__block');
  const top = document.querySelector('.top');

  window.addEventListener('scroll', Visible);

  function Visible() {
    const targetPosition = {
      bottom: window.pageYOffset + cardBlock.getBoundingClientRect().bottom
    },
      windowPosition = {
        top: window.pageYOffset
      };

    if (targetPosition.bottom < windowPosition.top) {
      top.classList.add('top-active')
    } else {
      top.classList.remove('top-active')
    }
  };


  const slider = new Swiper('.card__slider', {
    direction: 'vertical',
    effect: "coverflow",
    slidesPerView: 'auto',
    spaceBetween: 6,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 0,
      modifier: 1,
      slideShadows: false,
    },
    navigation: {
      prevEl: '.card__arrow-prev',
      nextEl: '.card__arrow-next'
    },
    pagination: {
      el: '.card__pagination',
      clickable: true,
    },

    mousewheel: true,

    breakpoints: {
      320: {
        slidesPerView: 1,
        effect: "fade",
        direction: 'horizontal',
        spaceBetween: 0,
      },
      1000: {
        slidesPerView: 'auto',
        effect: "coverflow",
        direction: 'vertical',
        spaceBetween: 6,
      }
    }
  });

  const slider1 = new Swiper('.item-slider-1', {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 38,
    navigation: {
      prevEl: '.slider__prev-1',
      nextEl: '.slider__next-1',
    },
    breakpoints: {
      320: {
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
        },
      },
      1000: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        freeMode: {
          enabled: false,
        },
      }
    }
  });

  const slider2 = new Swiper('.item-slider-2', {
    slidesPerView: 4,
    loop: true,
    spaceBetween: 38,
    navigation: {
      prevEl: '.slider__prev-2',
      nextEl: '.slider__next-2',
    },
    breakpoints: {
      320: {
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
        },
      },
      1000: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        freeMode: {
          enabled: false,
        },
      }
    }
  });


  const slider3 = new Swiper('.gallery__slider', {
    slidesPerView: 7,
    spaceBetween: 16,
    navigation: {
      prevEl: '.gallery__prev',
      nextEl: '.gallery__next',
    },
    slideToClickedSlide: true,
    on: {
      slideChange: function (swiper) {
        const item = swiper.slides[swiper.activeIndex];
        for (let item of swiper.slides) {
          item.classList.remove('gallery__slide-active')
        }
        item.classList.add('gallery__slide-active');
        const active = document.querySelector('.gallery__active');
        if (item.querySelector('img')) {
          active.innerHTML = item.innerHTML;
        }
        if (item.querySelector('video')) {
          active.innerHTML = item.innerHTML;
          active.querySelector('video').controls = true;
          active.querySelector('.card__play').remove();
        }
      },
      click: function (swiper, event) {
        const item = event.target.closest('.swiper-slide');
        if (item) {
          for (let item of swiper.slides) {
            item.classList.remove('gallery__slide-active')
            item.classList.remove('swiper-slide-active')
          }
          item.classList.add('gallery__slide-active');
          item.classList.add('swiper-slide-active');
          const active = document.querySelector('.gallery__active');
          if (item.querySelector('img')) {
            active.innerHTML = item.innerHTML;
          }
          if (item.querySelector('video')) {
            active.innerHTML = item.innerHTML;
            active.querySelector('video').controls = true;
            active.querySelector('.card__play').remove();
          }
        }
      }
    },
    breakpoints: {
      320: {
        slidesPerView: "auto",
      },
      1000: {
        slidesPerView: 7,
      }
    }
  });

  const slider4 = new Swiper('.cheap__slider', {
    slidesPerView: 3,
    navigation: {
      prevEl: '.cheap__prev',
      nextEl: '.cheap__next',
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      }
    }
  });

  const techBlocks = document.querySelectorAll('.tech__block');

  for (let block of techBlocks) {
    const slider5 = new Swiper(block.querySelector('.tech__slider'), {
      slidesPerView: 1,
      spaceBetween: 80,
      pagination: {
        el: block.querySelector('.tech__pagination'),
        clickable: true,
      },

    });
  };

  const slider6 = new Swiper('.dop__labels-slider', {
    freeMode: true,
    slidesPerView: 'auto',
    spaceBetween: 10,
  })

})

