'use client';

import { useEffect, useRef } from 'react';
// import { Curtains, Plane } from 'curtainsjs';
import { gsap } from 'gsap';

export default function AnimatedWord() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // useEffect(() => {
  //   const curtains = new Curtains({
  //     container: canvasRef.current,
  //     watchScroll: false,
  //     pixelRatio: Math.min(1.5, window.devicePixelRatio),
  //   });

  //   const planeElements = document.querySelectorAll('.curtains-word');

  //   planeElements.forEach((el) => {
  //     const params = {
  //       vertexShader: `
  //         precision mediump float;

  //         attribute vec3 aVertexPosition;
  //         attribute vec2 aTextureCoord;

  //         uniform mat4 uMVMatrix;
  //         uniform mat4 uPMatrix;

  //         varying vec2 vTextureCoord;

  //         void main() {
  //           vec3 position = aVertexPosition;
  //           gl_Position = uPMatrix * uMVMatrix * vec4(position, 1.0);
  //           vTextureCoord = aTextureCoord;
  //         }
  //       `,
  //       fragmentShader: `
  //         precision mediump float;

  //         varying vec2 vTextureCoord;

  //         uniform sampler2D uSampler;

  //         void main() {
  //           vec4 color = texture2D(uSampler, vTextureCoord);
  //           gl_FragColor = color;
  //         }
  //       `,
  //       uniforms: {},
  //     };

  //     new Plane(curtains, el, params);
  //   });

  //   return () => {
  //     curtains.dispose();
  //   };
  // }, []);

  const handleHover = () => {
    // const textTop = containerRef.current?.querySelector('.text-top');
    // const textBottom = containerRef.current?.querySelector('.text-bottom');
    // const underline = containerRef.current?.querySelector('.underline');

    // if (textTop && textBottom && underline) {
    //   gsap.to(textTop, { y: '-100%', duration: 0.5, ease: 'power2.out' });
    //   gsap.to(textBottom, { y: '0%', duration: 0.5, ease: 'power2.out' });
    //   gsap.to(underline, { width: '100%', duration: 0.4, ease: 'power2.out' });
    // }
  };

  const handleLeave = () => {
    // const textTop = containerRef.current?.querySelector('.text-top');
    // const textBottom = containerRef.current?.querySelector('.text-bottom');
    // const underline = containerRef.current?.querySelector('.underline');

    // if (textTop && textBottom && underline) {
    //   gsap.to(textTop, { y: '0%', duration: 0.5, ease: 'power2.in' });
    //   gsap.to(textBottom, { y: '100%', duration: 0.5, ease: 'power2.in' });
    //   gsap.to(underline, { width: '0%', duration: 0.4, ease: 'power2.in' });
    // }
  };

  return (
    <div className="relative inline-block overflow-hidden group cursor-pointer" ref={containerRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <canvas ref={canvasRef} className="" />

      {/* Белый верхний текст */}
      <span className="block relative overflow-hidden h-[1em]">
        <span className="text-top block relative transition-transform" style={{ transform: 'translateY(0%)' }}>
          <span className="font-bold text-white text-2xl">Branding</span>
        </span>

        {/* Оранжевый нижний текст */}
        <span className="text-bottom absolute top-0 left-0 block transition-transform" style={{ transform: 'translateY(100%)' }}>
          <span className="font-bold text-orange-500 text-2xl">Branding</span>
        </span>
      </span>

      {/* Подчёркивание */}
      <span className="underline block h-[2px] w-0 bg-orange-500 mt-1 transition-all duration-300" />
    </div>
  );
}
