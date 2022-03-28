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

export default modal;