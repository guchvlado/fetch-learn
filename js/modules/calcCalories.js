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

export default calcCalories;