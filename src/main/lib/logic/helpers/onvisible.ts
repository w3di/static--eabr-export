const onVisible = (
  el: HTMLElement,
  callback: () => void,
  options?: IntersectionObserverInit,
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        callback();
        observer.unobserve(el);
      });
    },
    {
      threshold: 0.1,
      rootMargin: '-100px',
      ...options,
    },
  );

  observer.observe(el);
};

export { onVisible };
