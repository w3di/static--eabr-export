class AsideObserver {
    el: HTMLElement;
    content: HTMLElement;

    constructor(el: HTMLElement) {
        this.el = el;
        this.content = el.querySelector('[data-aside-line="content"]');

        if (this.content) this.init();

    }

    init() {
        window.addEventListener('scroll', () => {
            const top = this.el.getBoundingClientRect().top;
            this.el.classList.toggle('active', top < 0);
        });
    }
}

export {
    AsideObserver,
}
