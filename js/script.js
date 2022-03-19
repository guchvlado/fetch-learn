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
          modalCloseButton = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');

          
    function openModal() {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
        clearInterval(timerModalId);
    }
    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = '';   
    }
            
    modalOpenButtons.forEach((button) => {
        button.addEventListener('click', openModal);
    });
    modalCloseButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        console.log(e.target);
        if (e.target && e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });

    const timerModalId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // classes / menu item


    class MenuItem {
        constructor(title, text, image, altImage, price, parentNode) {
            this.title = title;
            this.text = text;
            this.image = image;
            this.altImage = altImage;
            this.price = price;
            this.parentNode = parentNode;
        }

        getTitle() {
            const titleElement = document.createElement("h3");
            titleElement.classList.add('menu__item-subtitle');
            titleElement.textContent = this.title;
            return titleElement;
        }

        getImage() {
            const imageElement = document.createElement("img");
            imageElement.src = this.image;
            imageElement.alt = this.alt;
            return imageElement;
        }

        getText() {
            const textElement = document.createElement("div");
            textElement.classList.add('menu__item-descr');
            textElement.textContent = this.text;
            return textElement;
        }

        getDivider() {
            const dividerElement = document.createElement("div");
            dividerElement.classList.add('menu__item-divider');
            return dividerElement;
        }

        getPrice() {
            const priceElement = document.createElement("div"),
                  costTitleElement = document.createElement("div"),
                  totalElement = document.createElement("div");

            priceElement.classList.add('menu__item-price');
            costTitleElement.classList.add('menu__item-cost');
            totalElement.classList.add('menu__item-total');

            totalElement.innerHTML = `<span>${this.price}</span> грн/день`;

            priceElement.append(costTitleElement);
            priceElement.append(totalElement);

            return priceElement;
        }

        render() {
            const parent = document.querySelector(this.parentNode);
            const element = document.createElement("div");
            element.classList.add('menu__item');
            element.append(this.getImage());
            element.append(this.getTitle());
            element.append(this.getText());
            element.append(this.getDivider());
            element.append(this.getPrice());

            parent.append(element);
        }
    }

    new MenuItem("title", "loremloremloremloremlorem", "img/tabs/vegy.jpg", "vegy", 234, ".menu .container").render();
});
