import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ease = {
  outExpo: 'power4.out',
  outQuart: 'power3.out',
  inOutQuart: 'power3.inOut',
  elastic: 'elastic.out(1, 0.5)',
};

export { gsap, ScrollTrigger };
