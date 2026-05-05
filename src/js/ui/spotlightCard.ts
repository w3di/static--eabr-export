class SpotlightCard {
    el: HTMLElement;
    private spotlight: HTMLDivElement;
    private spotlightColor: string;

    constructor(el: HTMLElement) {
        this.el = el;
        this.spotlightColor = el.dataset.spotlightColor ?? 'rgba(0, 0, 0, 1)';

        this.spotlight = document.createElement('div');
        this.spotlight.classList.add('spotlight');
        this.spotlight.style.cssText = `
            pointer-events: none;
            position: absolute;
            inset: 0;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        `;

        this.el.style.position = 'relative';
        this.el.style.overflow = 'hidden';
        this.el.prepend(this.spotlight);

        this.setStaticSpotlight();

        window.addEventListener('resize', this.handleResize);
        this.el.addEventListener('mousemove', this.handleMouseMove);
        this.el.addEventListener('mouseenter', this.handleShow);
        this.el.addEventListener('mouseleave', this.handleHide);
        this.el.addEventListener('focus', this.handleShow);
        this.el.addEventListener('blur', this.handleHide);
    }

    private isMobile = () => window.matchMedia('(max-width: 1260px)').matches;

    private setStaticSpotlight = () => {
        if (!this.isMobile()) return;
        this.spotlight.style.background = `radial-gradient(circle at 80% 70%, ${this.spotlightColor}, transparent 30%)`;
        this.spotlight.style.opacity = '0.9';
    };

    // private handleMouseMove = (e: MouseEvent) => {
    //     if (this.isMobile()) return;
    //     const rect = this.el.getBoundingClientRect();
    //     const x = e.clientX - rect.left;
    //     const y = e.clientY - rect.top;
    //     this.spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, ${this.spotlightColor}, transparent 30%)`;
    // };

    private handleMouseMove = (e: MouseEvent) => {
        if (this.isMobile()) return;
        const rect = this.el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const radius = Math.max(rect.width, rect.height) * 0.3; // или фиксированное число, например 300px
        this.spotlight.style.background = `radial-gradient(circle ${radius}px at ${x}px ${y}px, ${this.spotlightColor}, transparent)`;
    };

    private handleShow = () => {
        if (this.isMobile()) return;
        this.spotlight.style.opacity = '0.7';
    };

    private handleHide = () => {
        if (this.isMobile()) return;
        this.spotlight.style.opacity = '0';
    };

    private handleResize = () => {
        if (this.isMobile()) {
            this.setStaticSpotlight();
        } else {
            this.spotlight.style.opacity = '0';
        }
    };
}

export { SpotlightCard };
