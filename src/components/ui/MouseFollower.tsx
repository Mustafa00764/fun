'use client';

import { useEffect, useRef } from 'react';

export default function MouseFollower() {
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (followerRef.current) {
          followerRef.current.style.transform = `translate3d(${e.clientX - 8.5}px, ${e.clientY - 8.5}px, 0)`;
        }
      };
  
      const handleMouseOver = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('.project')) {
          followerRef.current?.classList.add('hovered');
        }
      };
  
      const handleMouseOut = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('.project')) {
          followerRef.current?.classList.remove('hovered');
        }
      };
  
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('mouseout', handleMouseOut);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseover', handleMouseOver);
        window.removeEventListener('mouseout', handleMouseOut);
      };
    }, []);

  return (
    <div
      ref={followerRef}
      className="mouse-follower"
    />
  );
}
