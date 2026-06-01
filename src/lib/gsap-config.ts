import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  
  CustomEase.create("smoothReveal", "M0,0 C0.16,1 0.3,1 1,1");
  
  ScrollTrigger.config({ limitCallbacks: true });
}

export { gsap, ScrollTrigger, CustomEase };