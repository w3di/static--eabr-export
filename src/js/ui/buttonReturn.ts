class ButtonReturn {
    el: HTMLElement;

    constructor(el: HTMLElement) {
        this.el = el;

        this.init();
    }

    init = () => {
        window.addEventListener('scroll', () => {
            const height = window.innerHeight || document.documentElement.clientHeight;
            const scroll = window.scrollY;

            this.show(scroll > height);
        });

    }

    show = (mode: boolean) => {
        if (mode) {
            this.el.classList.add('active');
        } else {
            this.el.classList.remove('active');
        }
    }
}

export {
    ButtonReturn,
}
