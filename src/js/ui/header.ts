class Header {
    header: HTMLElement;
    navLinks: NodeListOf<HTMLElement>;
    dropdownItems: NodeListOf<HTMLElement>;
    timeout: any;

    constructor(el: HTMLElement) {
        this.header = el;
        this.navLinks = this.header.querySelectorAll('[data-nav-link]')
        this.dropdownItems = this.header.querySelectorAll('[data-dropdown]')
        this.timeout = null;

        this.init();
    }

    init() {
        // this.updateHeader()
        this.toggleDropdown()
    }

    // updateHeader() {
    //     let lastScrollY = window.scrollY;
    //     window.addEventListener('scroll', () => {
    //         const currentScrollY = window.scrollY;
    //         if (currentScrollY > lastScrollY && currentScrollY >= 105) {
    //             this.header.classList.add('hidden');
    //             removeClasses()
    //         } else if (currentScrollY < lastScrollY) {
    //             this.header.classList.remove('hidden');
    //         } else {
    //             this.header.classList.remove('hidden');
    //         }
    //
    //         lastScrollY = currentScrollY;
    //     })
    //
    //     const removeClasses = () => {
    //         this.navLinks.forEach(el => el.classList.remove('hidden'));
    //         this.dropdownItems.forEach((item) => item.classList.remove('active'));
    //     }
    // }

    toggleDropdown() {
        this.navLinks.forEach(link => {
            link.addEventListener('mouseenter', (evt) => {
                setDefault(link)
                setActive(link)
            })

            link.addEventListener('mouseleave', (evt) => {
                this.timeout = setTimeout(() => {
                    setDefault(link)
                }, 400)
            })
        })

        const setActive = (link: HTMLElement) => {
            const index = link.dataset.navLink
            link.classList.add('active');

            this.dropdownItems.forEach((item) => {
                if (item.dataset.dropdown === index) {
                    item.classList.add('active');

                    item.addEventListener('mouseenter', (evt) => {
                        if (this.timeout) {
                            clearTimeout(this.timeout)
                        }
                    })

                    item.addEventListener('mouseleave', (evt) => {
                        setDefault(link)
                    })
                }
            })

        }

        const setDefault = (link: HTMLElement) => {
            if (this.timeout) {
                clearTimeout(this.timeout)
            }
            this.navLinks.forEach(el => el.classList.remove('active'));
            // link.classList.remove('active');

            this.dropdownItems.forEach((item) => {
                item.classList.remove('active');
            })
        }
    }
}

export {
    Header,
}
