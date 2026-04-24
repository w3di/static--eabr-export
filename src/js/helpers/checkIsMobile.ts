const checkIsMobile = (): boolean => {
    return document?.documentElement?.clientWidth < 1300;
}

export {
    checkIsMobile,
};
