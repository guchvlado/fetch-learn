window.addEventListener("DOMContentLoaded", () => {
    const tabsContent = document.querySelectorAll(".tabcontent"),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabHeader = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
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

    //timer

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


    // modal

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
            
            element.innerHTML = `<img src="${this.image}" alt="${this.altImage}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;

            this.parentNode.append(element);
        }
    }

    new MenuItem("Vegy dish", "loremloremloremloremloreml oremloremloremlorem loremloremlorem loremloremlorem", "img/tabs/vegy.jpg", "vegy", 234, ".menu .container").render();
    new MenuItem("Post dish", "loremloremloremloremloreml oremloremloremlorem loremloremlorem loremloremlorem", "img/tabs/post.jpg", "post", 130, ".menu .container").render();
    new MenuItem("Elite dish", "loremloremloremloremlorem loremloremloremlorem loremloremlorem loremloremlorem", "img/tabs/elite.jpg", "elite", 500, ".menu .container").render();

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

    forms.forEach((item) => {postForm(item)});

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
            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            fetch('server.php', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(obj)
            })
            .then(data => data.text())
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

});