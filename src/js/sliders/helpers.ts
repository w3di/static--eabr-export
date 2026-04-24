import Swiper from "swiper";

const removeInlineStyles = (el: Swiper) => {
    el.wrapperEl.removeAttribute('style');

    el.slides.forEach((item: Element) => {
        item.removeAttribute('style');
    })
};

export {
    removeInlineStyles,
}
