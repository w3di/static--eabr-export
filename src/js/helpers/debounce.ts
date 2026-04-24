function debounce(func: Function, delay: number) {
    let timeoutId: number;
    return function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
    };
}

export {
    debounce,
}
