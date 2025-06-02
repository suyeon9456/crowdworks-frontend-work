import { useCallback, useRef } from 'react';

type ScrollOptions = {
  duration?: number;
};

const smoothScroll = (container: HTMLElement, to: number, duration = 500) => {
  const start = container.scrollTop;
  const change = to - start;
  const startTime = performance.now();

  const easeInOutQuad = (progress: number): number =>
    progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    container.scrollTop = start + change * easeInOutQuad(progress);

    if (elapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

export const useScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateScrollOffset = useCallback(
    (container: HTMLDivElement, target: HTMLElement): number => {
      const containerTop = container.getBoundingClientRect().top;
      const targetTop = target.getBoundingClientRect().top;
      return targetTop - containerTop + container.scrollTop;
    },
    [],
  );

  const handleScroll = useCallback(
    (id: string, options: ScrollOptions = {}) => {
      const container = containerRef.current;
      const target = document.getElementById(`json-text-${id}`);

      if (!container || !target) return;

      const offset = calculateScrollOffset(container, target);
      smoothScroll(container, offset, options.duration ?? 600);
    },
    [calculateScrollOffset],
  );

  return {
    containerRef,
    handleScroll,
  };
};
