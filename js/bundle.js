/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calcCalories.js":
/*!************************************!*\
  !*** ./js/modules/calcCalories.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calcCalories() {
    const calcResult = document.querySelector('.calculating__result span');

    let gender, height, weight, age, ratio;

    function initCalcSettings(genderSelector, ratioSelector, activeClass) {
        if (localStorage.getItem('gender')) {
            gender = localStorage.getItem('gender');
        }
        else {
            gender = 'female';
            localStorage.setItem('gender', gender);
        }

        if (localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        }
        else {
            ratio = 1.375;
            localStorage.setItem('ratio', ratio);
        }

        document.querySelectorAll(genderSelector).forEach((item) => {
            item.classList.remove(activeClass);
            if (item.getAttribute('id') === gender) {
                item.classList.add(activeClass);
            }
        });
        document.querySelectorAll(ratioSelector).forEach((item) => {
            item.classList.remove(activeClass);
            if (item.getAttribute('data-ratio') == ratio) {
                item.classList.add(activeClass);
            }
        });
    }

    function calcTotal() {
        if (!gender || !height || !weight || !age || !ratio) {
            calcResult.textContent = '____';
            return;
        }

        if (gender === 'female') {
            calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
        else {
            calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                }
                else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', gender);
                }

                elements.forEach(item => item.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    function getDynamicInformation(parentSelector) {
        const elements = document.querySelectorAll(`${parentSelector} input`);

        elements.forEach((elem) => {
            elem.addEventListener('input', (e) => {
                if (e.target.value.match(/\D/g)) {
                    e.target.style.border = "1px solid red";
                }
                else {
                    e.target.style.border = 'none';
                }
                switch(e.target.getAttribute('id')) {
                    case "height":
                        height = +e.target.value;
                        break;
                    case "weight":
                        weight = +e.target.value;
                        break;
                    case "age":
                        age = +e.target.value;
                        break;
                }
                calcTotal();
            });
        });
    }
    initCalcSettings('#gender div', '.calculating__choose_big div', 'calculating__choose-item_active');
    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    getDynamicInformation('.calculating__choose_medium');
    calcTotal();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calcCalories);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function form() {
        //AJAX

    // const requestWord = new XMLHttpRequest();

    // requestWord.open('GET', "js/data.json");
    // requestWord.setRequestHeader('Content-type', 'aplication/json; charset=utf-8');
    // requestWord.send();

    // requestWord.addEventListener('load', () => {
    //     if (requestWord.status === 200) {
    //         console.log(requestWord.response);
    //     } else {
    //         console.log("error");
    //     }
    // });

    const forms = document.querySelectorAll('form');
    const messages = {
        loading: "img/spinner.svg",
        success: "Спасибо, мы вам перезвоним",
        failure: "Что-то пошло не так"
    };

    forms.forEach((item) => {
        postForm(item)
    });

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: data
        });

        return await result.json();
    };

    function postForm(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const spinner = document.createElement('img');
            spinner.src = messages.loading;
            spinner.style.cssText = `
                    margin: 0 auto;
                    display: block;
                `;
            form.after(spinner);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    showThanksModal(messages.success);
                    console.log(data);
                }).catch(() => {
                    showThanksModal(messages.failure);
                }).finally(() => {
                    form.reset();
                    spinner.remove();
                });

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         showThanksModal(messages.success);
            //         console.log(request.response);
            //         form.reset();
            //     } else {
            //         showThanksModal(messages.failure);
            //     }
            //     setTimeout(() => {spinner.remove()}, 3000);
            // });
        });
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

        prevModalDialog.classList.add('hide');
        prevModalDialog.after(thanksModal);
        openModal();
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 5000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/menuCard.js":
/*!********************************!*\
  !*** ./js/modules/menuCard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function menuCard() {
    // classes / menu item


    class MenuItem {
        constructor(title, text, image, altImage, price, parentNode, ...classes) {
            this.title = title;
            this.text = text;
            this.image = image;
            this.altImage = altImage;
            this.price = price;
            this.parentNode = document.querySelector(parentNode);
            this.transfer = 130;
            this.classes = classes;
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement("div");

            if (this.classes.length === 0) {
                element.classList.add("menu__item");
            } else {
                this.classes.forEach(classItem => element.classList.add(classItem));
            }
            this.changeToRUB();

            element.innerHTML = `<img src="${this.image}" alt="${this.altImage}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>`;

            this.parentNode.append(element);
        }
    }
    const getData = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}. Status: ${result.status}`);
        }

        return await result.json();
    };

    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                title,
                descr,
                img,
                altimg,
                price
            }) => {
                new MenuItem(title, descr, img, altimg, price, '.menu .container').render();
            });
        });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuCard);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {

    const modalOpenButtons = document.querySelectorAll('[data-modal]'),
        //   modalCloseButton = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');


    function openModal() {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
        //clearInterval(timerModalId);
    }

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = '';
    }

    modalOpenButtons.forEach((button) => {
        button.addEventListener('click', openModal);
    });
    // modalCloseButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target && e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });

    // const timerModalId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    //Slider


    const sliderContainer = document.querySelector('.offer__slider'),
        sliderItems = sliderContainer.querySelectorAll('.offer__slide'),
        prevSliderButton = sliderContainer.querySelector('.offer__slider-prev'),
        nextSliderButton = sliderContainer.querySelector('.offer__slider-next'),
        currentSlide = sliderContainer.querySelector('#current'),
        totalSlide = sliderContainer.querySelector('#total'),
        sliderWrapper = sliderContainer.querySelector('.offer__slider-wrapper'),
        sliderField = sliderContainer.querySelector('.offer__slider-inner');
    let slideIndex = 1;
    let offset = 0;
    let dots = [];
    const width = window.getComputedStyle(sliderWrapper).width;

    sliderField.style.width = 100 * sliderItems.length + '%';
    sliderField.style.display = 'flex';
    sliderField.style.transition = '.5s all ease-out';
    sliderWrapper.style.overflow = 'hidden';

    sliderItems.forEach((slide) => {
        slide.style.width = width;
    });

    currentSlide.textContent = (slideIndex < 10) ? '0' + slideIndex : slideIndex;
    totalSlide.textContent = (sliderItems.length < 10) ? '0' + sliderItems.length : sliderItems.length;

    //dots

    function updateSlider(index) {
        dots.forEach(item => item.style.opacity = '.5');
        dots[index].style.opacity = '1';
        sliderField.style.transform = `translateX(-${offset}px)`;
        currentSlide.textContent = (index + 1 < 10) ? '0' + (index + 1) : (index + 1);
    }
    sliderContainer.style.position = 'relative';
    const carouselDots = document.createElement('ol');
    carouselDots.classList.add('carousel-indicators');
    sliderContainer.append(carouselDots);

    for (let i = 0; i < sliderItems.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-move-to', i + 1);
        dots.push(dot);

        dot.addEventListener('click', (e) => {
            const moveTo = e.target.getAttribute('data-move-to');
            offset = parseInt(width) * (moveTo - 1);
            slideIndex = moveTo;
            updateSlider(slideIndex - 1);
        });

        carouselDots.append(dot);
    }

    updateSlider(0);
    nextSliderButton.addEventListener('click', () => {
        if (offset == parseInt(width) * (sliderItems.length - 1)) {
            offset = 0;
        } else {
            offset += parseInt(width);
        }

        if (slideIndex == sliderItems.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        updateSlider(slideIndex - 1);
    });

    prevSliderButton.addEventListener('click', () => {
        if (offset === 0) {
            offset = parseInt(width) * (sliderItems.length - 1);
        } else {
            offset -= parseInt(width);
        }

        if (slideIndex == 1) {
            slideIndex = sliderItems.length;
        } else {
            slideIndex--;
        }
        updateSlider(slideIndex - 1);
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
    const tabsContent = document.querySelectorAll(".tabcontent"),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabHeader = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        // tabsContent[i].style.display = "block";
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add("tabheader__item_active");
    }

    tabHeader.addEventListener("click", (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
    const deadline = "2022-04-01";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero(number) {
        if (number >= 0 && number < 10) {
            return '0' + number;
        }
        else {
            return number;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) clearInterval(timeInterval);
        }
    }

    setClock('.timer', deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calcCalories__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calcCalories */ "./js/modules/calcCalories.js");
/* harmony import */ var _modules_menuCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menuCard */ "./js/modules/menuCard.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








window.addEventListener("DOMContentLoaded", () => {
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();
    (0,_modules_menuCard__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_calcCalories__WEBPACK_IMPORTED_MODULE_2__["default"])();


});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map