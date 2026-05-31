class PosterVideo {
  private root: HTMLElement;
  private video: HTMLVideoElement;
  private play: HTMLButtonElement;
  private pause: HTMLButtonElement;
  private idleTimer: number | null = null;
  private idleDelay = 2500;

  constructor(root: HTMLElement) {
    this.root = root;
    this.video = root.querySelector<HTMLVideoElement>('[data-pv-el]')!;
    this.play = root.querySelector<HTMLButtonElement>('[data-pv-play]')!;
    this.pause = root.querySelector<HTMLButtonElement>('[data-pv-pause]')!;

    this.play.addEventListener('click', () => void this.video.play());
    this.pause.addEventListener('click', () => this.video.pause());
    this.video.addEventListener('play', this.onPlay);
    this.video.addEventListener('pause', this.onStop);
    this.video.addEventListener('ended', this.onStop);
    this.root.addEventListener('mousemove', this.onActivity);
    this.root.addEventListener('touchstart', this.onActivity, { passive: true });
    this.root.addEventListener('mouseleave', this.onLeave);
  }

  private onPlay = () => {
    this.root.classList.add('is-playing');
    this.scheduleIdle();
  };

  private onStop = () => {
    this.root.classList.remove('is-playing', 'is-idle');
    this.clearIdle();
  };

  private onActivity = () => {
    if (!this.root.classList.contains('is-playing')) return;
    this.root.classList.remove('is-idle');
    this.scheduleIdle();
  };

  private onLeave = () => {
    if (this.root.classList.contains('is-playing')) {
      this.clearIdle();
      this.root.classList.add('is-idle');
    }
  };

  private scheduleIdle = () => {
    this.clearIdle();
    this.idleTimer = window.setTimeout(() => {
      this.root.classList.add('is-idle');
    }, this.idleDelay);
  };

  private clearIdle = () => {
    if (this.idleTimer !== null) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  };
}

export { PosterVideo };
