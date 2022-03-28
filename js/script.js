import tabs from './modules/tabs';
import modal from './modules/modal';
import calcCalories from './modules/calcCalories';
import menuCard from './modules/menuCard';
import form from './modules/form';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener("DOMContentLoaded", () => {
    const timerModalId = setTimeout(() => openModal('.modal'), 10000);

    tabs(".tabcontent", '.tabheader__item', '.tabheader__items', "tabheader__item_active");
    modal('[data-modal]','.modal', timerModalId);
    timer('.timer', "2022-04-01");
    menuCard();
    form('form', timerModalId);
    slider({
        containerSelector: '.offer__slider',
        slideSelector: '.offer__slide',
        nextSelector: '.offer__slider-next',
        prevSelector: '.offer__slider-prev',
        currentId: '#current',
        totalId: '#total',
        wrapperSelector: '.offer__slider-wrapper',
        fieldSelector: '.offer__slider-inner'
    });
    calcCalories();


});