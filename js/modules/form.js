import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function form(formSelector, timerModalId) {
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

    const forms = document.querySelectorAll(formSelector);
    const messages = {
        loading: "img/spinner.svg",
        success: "Спасибо, мы вам перезвоним",
        failure: "Что-то пошло не так"
    };

    forms.forEach((item) => {
        postForm(item)
    });

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
        openModal('.modal', timerModalId);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 5000);
    }
}

export default form;