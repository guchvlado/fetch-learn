function slider({containerSelector, slideSelector, nextSelector, prevSelector, currentId, totalId, wrapperSelector, fieldSelector}) {

    const sliderContainer = document.querySelector(containerSelector),
        sliderItems = sliderContainer.querySelectorAll(slideSelector),
        prevSliderButton = sliderContainer.querySelector(prevSelector),
        nextSliderButton = sliderContainer.querySelector(nextSelector),
        currentSlide = sliderContainer.querySelector(currentId),
        totalSlide = sliderContainer.querySelector(totalId),
        sliderWrapper = sliderContainer.querySelector(wrapperSelector),
        sliderField = sliderContainer.querySelector(fieldSelector);
            
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

export default slider;