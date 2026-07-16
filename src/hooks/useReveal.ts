import { useEffect } from 'react';

/**
 * Adds `is-visible` to any element with the `reveal` class when it enters
 * the viewport. Uses a single shared IntersectionObserver per invocation.
 *
 * Re-scans on every render so that elements added later by local state
 * changes (tab/filter switches) are also observed and revealed.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')
    );
    if (els.length === 0) return;

    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay;
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add('is-visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}
