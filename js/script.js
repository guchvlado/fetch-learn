import tabs from './modules/tabs';
import modal from './modules/modal';
import calcCalories from './modules/calcCalories';
import menuCard from './modules/menuCard';
import form from './modules/form';
import slider from './modules/slider';
import timer from './modules/timer';

window.addEventListener("DOMContentLoaded", () => {
    tabs();
    modal();
    timer();
    menuCard();
    form();
    slider();
    calcCalories();


});