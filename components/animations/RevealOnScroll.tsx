"use client"
import { useEffect, useRef, useState } from "react";

const RevealOnScroll = ({children}: { children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
        const scrollObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              scrollObserver.unobserve(entry.target);
            }
          }
        );
    
        if (ref.current) {
          scrollObserver.observe(ref.current);
    
          return () => {
            if (ref.current) {
              scrollObserver.unobserve(ref.current);
            }
          };
        }
      }, []);
  
    const classes = `transition-opacity duration-[1000ms]
        ${isVisible ? "opacity-100" : "opacity-0"
        }`;
  
    return (
        <div ref={ref} className={classes}>
            {children}
        </div>
    );
};

export default RevealOnScroll;