import { useState, useEffect } from 'react';

export function useScroll() {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollY, setScrollY] = useState(window.pageYOffset);
  const [scrollX, setScrollX] = useState(window.pageXOffset);
  const [scrollDirection, setScrollDirection] = useState();

  const listener = () => {
    setScrollY(window.pageYOffset);
    setScrollX(window.pageXOffset);
    setScrollDirection(lastScrollTop > window.pageYOffset ? 'down' : 'up');
    setLastScrollTop(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  });

  return {
    scrollY,
    scrollX,
    scrollDirection,
  };
}
