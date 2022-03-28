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

export default menuCard;