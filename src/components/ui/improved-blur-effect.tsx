"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

export default function ImprovedBlurEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Настройка WebGL рендерера
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Создаем сцену и камеру
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      0.1,
      1000,
    )
    camera.position.z = 1

    // Создаем SVG текст
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1418 429" fill="none">
        <path d="M10.9 131.29V26.8H47.35V133.99C47.35 146.77 50.95 156.76 58.15 163.96C65.35 170.98 74.8 174.49 86.5 174.49C98.38 174.49 107.83 170.98 114.85 163.96C122.05 156.76 125.65 146.77 125.65 133.99V26.8H162.1V131.29C162.1 154.51 154.99 173.14 140.77 187.18C126.55 201.22 108.46 208.24 86.5 208.24C64.36 208.24 46.18 201.22 31.96 187.18C17.92 173.14 10.9 154.51 10.9 131.29ZM312.574 122.11V205H276.394V126.97C276.394 119.23 274.054 113.02 269.374 108.34C264.874 103.48 258.934 101.05 251.554 101.05C244.174 101.05 238.054 103.48 233.194 108.34C228.514 113.02 226.174 119.23 226.174 126.97V205H189.724V71.35H223.204V83.5C233.284 73.42 246.334 68.38 262.354 68.38C277.834 68.38 290.074 73.24 299.074 82.96C308.074 92.68 312.574 105.73 312.574 122.11ZM339.564 205V71.35H376.014V205H339.564ZM334.434 22.75C334.434 16.27 336.684 10.87 341.184 6.55C345.684 2.22999 351.174 0.069983 357.654 0.069983C364.134 0.069983 369.624 2.22999 374.124 6.55C378.804 10.87 381.144 16.27 381.144 22.75C381.144 29.05 378.804 34.36 374.124 38.68C369.624 43 364.134 45.16 357.654 45.16C351.174 45.16 345.684 43 341.184 38.68C336.684 34.36 334.434 29.05 334.434 22.75ZM504.144 71.35H537.624V253.6H501.174V192.04C491.274 202.84 477.954 208.24 461.214 208.24C442.674 208.24 427.194 201.58 414.774 188.26C402.534 174.76 396.414 158.02 396.414 138.04C396.414 118.06 402.534 101.5 414.774 88.36C427.194 75.04 442.674 68.38 461.214 68.38C480.654 68.38 494.964 74.95 504.144 88.09V71.35ZM491.994 165.31C498.474 158.65 501.714 149.56 501.714 138.04C501.714 126.52 498.474 117.52 491.994 111.04C485.694 104.56 477.684 101.32 467.964 101.32C457.884 101.32 449.604 104.74 443.124 111.58C436.644 118.42 433.404 127.33 433.404 138.31C433.404 149.11 436.644 157.93 443.124 164.77C449.784 171.61 458.064 175.03 467.964 175.03C477.504 175.03 485.514 171.79 491.994 165.31ZM564.328 146.14V71.35H600.778V149.11C600.778 156.85 603.118 163.06 607.798 167.74C612.658 172.42 618.778 174.76 626.158 174.76C633.358 174.76 639.298 172.42 643.978 167.74C648.658 162.88 650.998 156.67 650.998 149.11V71.35H687.448V146.14C687.448 164.5 681.598 179.44 669.898 190.96C658.378 202.48 643.798 208.24 626.158 208.24C608.158 208.24 593.308 202.57 581.608 191.23C570.088 179.71 564.328 164.68 564.328 146.14ZM837.049 150.46H743.359C745.519 158.92 749.839 165.49 756.319 170.17C762.979 174.67 771.169 176.92 780.889 176.92C794.029 176.92 806.449 172.42 818.149 163.42L833.269 188.26C817.249 201.58 799.429 208.24 779.809 208.24C759.289 208.6 741.829 201.94 727.429 188.26C713.209 174.4 706.279 157.75 706.639 138.31C706.279 119.05 713.029 102.49 726.889 88.63C740.749 74.77 757.309 68.02 776.569 68.38C794.929 68.38 809.959 74.32 821.659 86.2C833.539 98.08 839.479 112.84 839.479 130.48C839.479 136.96 838.669 143.62 837.049 150.46ZM743.359 124.81H804.109C803.929 116.71 801.049 110.23 795.469 105.37C790.069 100.33 783.319 97.81 775.219 97.81C767.479 97.81 760.729 100.24 754.969 105.1C749.209 109.96 745.339 116.53 743.359 124.81ZM0.1 388.82L25.21 369.92C37.81 387.2 52.39 395.84 68.95 395.84C76.87 395.84 83.08 394.13 87.58 390.71C92.08 387.11 94.33 382.25 94.33 376.13C94.33 371.09 92.8 367.22 89.74 364.52C86.68 361.64 80.65 358.13 71.65 353.99L52.48 345.35C23.68 332.57 9.28 315.47 9.28 294.05C9.28 278.93 14.86 266.78 26.02 257.6C37.18 248.24 51.31 243.56 68.41 243.56C81.73 243.56 93.43 246.62 103.51 252.74C113.59 258.68 121.51 266.87 127.27 277.31L102.43 296.48C93.25 282.8 81.91 275.96 68.41 275.96C61.93 275.96 56.62 277.49 52.48 280.55C48.34 283.61 46.27 287.84 46.27 293.24C46.27 297.74 47.71 301.43 50.59 304.31C53.65 307.01 59.14 310.16 67.06 313.76L87.31 322.67C102.61 329.51 113.77 336.98 120.79 345.08C127.81 353 131.32 362.9 131.32 374.78C131.32 390.8 125.47 403.76 113.77 413.66C102.07 423.38 87.13 428.24 68.95 428.24C54.01 428.24 40.51 424.73 28.45 417.71C16.57 410.69 7.12 401.06 0.1 388.82ZM145.25 358.04C144.89 338.96 151.82 322.49 166.04 308.63C180.26 294.77 197.18 288.02 216.8 288.38C236.42 288.02 253.34 294.77 267.56 308.63C281.96 322.49 288.98 338.96 288.62 358.04C288.98 377.12 281.96 393.68 267.56 407.72C253.16 421.58 236.15 428.33 216.53 427.97C196.91 428.33 179.99 421.58 165.77 407.72C151.73 393.68 144.89 377.12 145.25 358.04ZM241.37 384.23C248.03 377.39 251.36 368.75 251.36 358.31C251.36 347.87 248.03 339.14 241.37 332.12C234.89 325.1 226.7 321.59 216.8 321.59C206.72 321.59 198.44 325.1 191.96 332.12C185.48 338.96 182.24 347.69 182.24 358.31C182.24 368.75 185.48 377.39 191.96 384.23C198.44 391.07 206.72 394.49 216.8 394.49C226.7 394.49 234.89 391.07 241.37 384.23ZM308.978 425V222.5H345.428V425H308.978ZM372.038 366.14V291.35H408.488V369.11C408.488 376.85 410.828 383.06 415.508 387.74C420.368 392.42 426.488 394.76 433.868 394.76C441.068 394.76 447.008 392.42 451.688 387.74C456.368 382.88 458.708 376.67 458.708 369.11V291.35H495.158V366.14C495.158 384.5 489.308 399.44 477.608 410.96C466.088 422.48 451.508 428.24 433.868 428.24C415.868 428.24 401.018 422.57 389.318 411.23C377.798 399.71 372.038 384.68 372.038 366.14ZM607.769 394.49V425C599.129 427.16 590.759 428.24 582.659 428.24C565.559 428.24 552.329 424.01 542.969 415.55C533.789 407.09 529.199 394.58 529.199 378.02V322.13H508.139V291.35H529.199V257.6H565.649V291.35H603.449V322.13H565.649V374.78C565.649 382.34 567.539 387.74 571.319 390.98C575.279 394.04 581.669 395.57 590.489 395.57C593.549 395.57 599.309 395.21 607.769 394.49ZM626.133 425V291.35H662.583V425H626.133ZM621.003 242.75C621.003 236.27 623.253 230.87 627.753 226.55C632.253 222.23 637.743 220.07 644.223 220.07C650.703 220.07 656.193 222.23 660.693 226.55C665.373 230.87 667.713 236.27 667.713 242.75C667.713 249.05 665.373 254.36 660.693 258.68C656.193 263 650.703 265.16 644.223 265.16C637.743 265.16 632.253 263 627.753 258.68C623.253 254.36 621.003 249.05 621.003 242.75ZM682.983 358.04C682.623 338.96 689.553 322.49 703.773 308.63C717.993 294.77 734.913 288.02 754.533 288.38C774.153 288.02 791.073 294.77 805.293 308.63C819.693 322.49 826.713 338.96 826.353 358.04C826.713 377.12 819.693 393.68 805.293 407.72C790.893 421.58 773.883 428.33 754.263 427.97C734.643 428.33 717.723 421.58 703.503 407.72C689.463 393.68 682.623 377.12 682.983 358.04ZM779.103 384.23C785.763 377.39 789.093 368.75 789.093 358.31C789.093 347.87 785.763 339.14 779.103 332.12C772.623 325.1 764.433 321.59 754.533 321.59C744.453 321.59 736.173 325.1 729.693 332.12C723.213 338.96 719.973 347.69 719.973 358.31C719.973 368.75 723.213 377.39 729.693 384.23C736.173 391.07 744.453 394.49 754.533 394.49C764.433 394.49 772.623 391.07 779.103 384.23ZM969.56 342.11V425H933.38V346.97C933.38 339.23 931.04 333.02 926.36 328.34C921.86 323.48 915.92 321.05 908.54 321.05C901.16 321.05 895.04 323.48 890.18 328.34C885.5 333.02 883.16 339.23 883.16 346.97V425H846.71V291.35H880.19V303.5C890.27 293.42 903.32 288.38 919.34 288.38C934.82 288.38 947.06 293.24 956.06 302.96C965.06 312.68 969.56 325.73 969.56 342.11ZM984.4 402.32L1002.76 380.18C1014.28 392.24 1026.79 398.27 1040.29 398.27C1045.33 398.27 1049.38 397.37 1052.44 395.57C1055.68 393.59 1057.3 390.8 1057.3 387.2C1057.3 384.5 1056.31 382.43 1054.33 380.99C1052.53 379.37 1048.93 377.39 1043.53 375.05L1029.22 369.11C1016.44 363.89 1007.17 358.22 1001.41 352.1C995.65 345.8 992.77 337.88 992.77 328.34C992.77 315.92 997.27 306.2 1006.27 299.18C1015.27 291.98 1027.15 288.38 1041.91 288.38C1061.71 288.38 1077.73 295.04 1089.97 308.36L1071.61 330.77C1062.61 322.31 1052.62 318.08 1041.64 318.08C1032.1 318.08 1027.33 321.23 1027.33 327.53C1027.33 330.05 1028.32 332.12 1030.3 333.74C1032.28 335.36 1035.97 337.25 1041.37 339.41L1054.33 344.81C1067.65 350.21 1077.19 355.97 1082.95 362.09C1088.89 368.21 1091.86 376.04 1091.86 385.58C1091.86 398.9 1086.91 409.34 1077.01 416.9C1067.29 424.46 1054.87 428.24 1039.75 428.24C1015.81 428.24 997.36 419.6 984.4 402.32ZM1174.3 353.72V323.21H1417.3V353.72H1174.3Z" fill="#FF3F1A"/>
      </svg>
    `

    // Создаем canvas для рендеринга SVG
    const canvas = document.createElement("canvas")
    canvas.width = 1500
    canvas.height = 1200
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      console.error("Failed to get canvas context")
      return
    }

    // Конвертируем SVG в изображение
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      // Рисуем SVG на canvas
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, canvas.height / 3.1)

      // Создаем текстуру из canvas
      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true

      // Создаем рендер-таргеты для эффектов
      const renderTargetParams = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
      }

      const renderTarget = new THREE.WebGLRenderTarget(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio,
        renderTargetParams,
      )

      // Создаем геометрию для текста
      // const aspectRatio = canvas.width / canvas.height
      const planeWidth = Math.min(window.innerWidth, 1600)
      const planeHeight = canvas.height * 2.8

      const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)

      // Создаем материал для текста
      const textMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      })

      // Создаем меш для текста
      const textMesh = new THREE.Mesh(geometry, textMaterial)
      scene.add(textMesh)

      // Создаем сцену для эффекта размытия
      const blurScene = new THREE.Scene()

      // Шейдер для эффекта размытия
      const blurShader = {
        uniforms: {
          tDiffuse: { value: null },
          resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          mousePos: { value: new THREE.Vector2(0.5, 0.5) },
          mouseRadius: { value: 0.5 }, // Радиус эффекта размытия
          blurStrength: { value: 0.65 }, // Сила размытия
          time: { value: 0.0 },
        },
        vertexShader: `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform vec2 mousePos;
    uniform float mouseRadius;
    uniform float blurStrength;
    uniform float time;
    
    varying vec2 vUv;
    
    // Функция для размытия по Гауссу
    vec4 gaussianBlur(sampler2D tex, vec2 uv, vec2 direction) {
      // Веса для 40-точечного размытия по Гауссу
float weights[40];
weights[0]  = 0.00001;
weights[1]  = 0.00004;
weights[2]  = 0.0001;
weights[3]  = 0.0003;
weights[4]  = 0.0007;
weights[5]  = 0.0015;
weights[6]  = 0.0029;
weights[7]  = 0.0052;
weights[8]  = 0.0088;
weights[9]  = 0.0139;
weights[10] = 0.0205;
weights[11] = 0.0287;
weights[12] = 0.0383;
weights[13] = 0.0487;
weights[14] = 0.0587;
weights[15] = 0.0668;
weights[16] = 0.0719;
weights[17] = 0.0735;
weights[18] = 0.0719;
weights[19] = 0.0668;
weights[20] = 0.0587;
weights[21] = 0.0487;
weights[22] = 0.0383;
weights[23] = 0.0287;
weights[24] = 0.0205;
weights[25] = 0.0139;
weights[26] = 0.0088;
weights[27] = 0.0052;
weights[28] = 0.0029;
weights[29] = 0.0015;
weights[30] = 0.0007;
weights[31] = 0.0003;
weights[32] = 0.0001;
weights[33] = 0.00004;
weights[34] = 0.00001;
weights[35] = 0.000002;
weights[36] = 0.000001;
weights[37] = 0.0000005;
weights[38] = 0.0000002;
weights[39] = 0.0000001;


      vec4 result = vec4(0.0);

      for (int i = -20; i <= 20; i++) {
        vec2 offset = float(i) * direction;
        result += texture2D(tex, uv + offset) * weights[i + 20];
      }

      return result;
    }

    
    void main() {
      // Получаем цвет из текстуры
      vec4 texColor = texture2D(tDiffuse, vUv);
      
      // Расстояние от текущего пикселя до позиции мыши
      vec2 screenUv = gl_FragCoord.xy / resolution;
      float dist = distance(screenUv, mousePos);
      
      // Если пиксель находится вне радиуса действия курсора, используем оригинальный цвет
      if (dist < 0.0) {
        gl_FragColor = texColor;
        return;
      }
      
      // Сила эффекта зависит от расстояния до курсора (более плавное затухание)
      // Используем smoothstep для более плавного перехода на границах
      float strength = smoothstep(mouseRadius, mouseRadius * 0.7, dist) * blurStrength;
      
      // Направление размытия - от центра курсора
      vec2 dir = normalize(screenUv - mousePos);
      
      // Применяем размытие по Гауссу в направлении от курсора
      vec2 blurDirection = dir * strength * -0.002;
      vec4 blurColor = gaussianBlur(tDiffuse, vUv, blurDirection);
      
      // Добавляем эффект растягивания текста
      vec4 stretchedColor = vec4(0.0);
      
      // Количество сэмплов для эффекта растягивания
      const int numSamples = 40;
      
      for (int i = 0; i < numSamples; i++) {
        float t = float(i) / float(numSamples - 1);
        
        // Смещение в направлении от курсора
        vec2 offset = dir * strength * t * 0.025;
        
        // Добавляем небольшую волну для 3D эффекта
        // offset.x += sin(time * 1.5 + vUv.y * 8.0) * 0.02 * strength;
        // offset.y += cos(time * 1.2 + vUv.x * 6.0) * 0.02 * strength;
        
        // Сэмплируем текстуру со смещением
        vec4 sampleColor = texture2D(tDiffuse, vUv - offset);
        
        // Добавляем к общему цвету с затуханием
        stretchedColor += sampleColor * (1.0 - t * 0.1);
      }
      
      // Нормализуем цвет
      stretchedColor /= float(numSamples) * 0.9;
      
      // Смешиваем размытие и растягивание
      vec4 finalColor = mix(blurColor, stretchedColor, 0.7);
      
      // Добавляем прозрачность для курсора
      finalColor.a *= 1.5; // Делаем эффект более прозрачным
      
      // Плавно смешиваем с оригинальным цветом на границе
      float edgeFactor = smoothstep(mouseRadius * 0.8, mouseRadius, dist);
      gl_FragColor = mix(finalColor, texColor, edgeFactor);
    }
  `,
      }

      // Создаем материал для эффекта размытия
      const blurMaterial = new THREE.ShaderMaterial({
        uniforms: blurShader.uniforms,
        vertexShader: blurShader.vertexShader,
        fragmentShader: blurShader.fragmentShader,
        transparent: true,
      })

      // Создаем полноэкранный квад для эффекта размытия
      const blurGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)
      const blurMesh = new THREE.Mesh(blurGeometry, blurMaterial)
      blurScene.add(blurMesh)

      // Создаем визуализацию курсора (полупрозрачный круг)
      const cursorRadius = Math.min(window.innerWidth, window.innerHeight) * blurShader.uniforms.mouseRadius.value
      const cursorGeometry = new THREE.CircleGeometry(cursorRadius, 32)
      const cursorMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0, // Очень прозрачный
        depthTest: false,
        blending: THREE.AdditiveBlending,
      })
      const cursor = new THREE.Mesh(cursorGeometry, cursorMaterial)
      cursor.position.z = -1 // Поверх всего
      scene.add(cursor)

      // Обработчик движения мыши
      const onMouseMove = (event: MouseEvent) => {
        // Получаем точные координаты внутри canvas
        const rect = renderer.domElement.getBoundingClientRect();
        
        // Ограничиваем координаты размерами canvas
        const mouseX = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
        const mouseY = Math.max(0, Math.min(event.clientY - rect.top, rect.height));
      
        // Для шейдера (нормализованные 0..1)
        const shaderX = mouseX / rect.width;
        const shaderY = 1.0 - (mouseY / rect.height); // Инвертируем Y
        
        blurMaterial.uniforms.mousePos.value.set(shaderX, shaderY);
      
        // Для визуального курсора Three.js
        cursor.position.set(
          (mouseX - rect.width/2),  // Центрируем (0,0) в середине canvas
          (rect.height/2 - mouseY), // Инвертируем Y
          10  // Поверх всего
        );
      };
      
      window.addEventListener("mousemove", onMouseMove)

      // Обработчик изменения размера окна
      const onResize = () => {
        const width = window.innerWidth
        const height = window.innerHeight

        renderer.setSize(width, height)

        // Обновляем камеру
        camera.left = -width / 2
        camera.right = width / 2
        camera.top = height / 2
        camera.bottom = -height / 2
        camera.updateProjectionMatrix()

        // Обновляем размер плоскости
        const newPlaneWidth = Math.min(width, 1600)
        const newPlaneHeight = newPlaneWidth *  2.5

        textMesh.geometry.dispose()
        const newGeometry = new THREE.PlaneGeometry(newPlaneWidth, newPlaneHeight)
        textMesh.geometry = newGeometry

        // Обновляем размер квада для эффекта размытия
        blurMesh.geometry.dispose()
        blurMesh.geometry = new THREE.PlaneGeometry(width, height)

        // Обновляем размер курсора
        cursor.geometry.dispose()
        const newCursorRadius = Math.min(width, height) * blurShader.uniforms.mouseRadius.value
        cursor.geometry = new THREE.CircleGeometry(newCursorRadius, 32)

        // Обновляем рендер-таргет
        renderTarget.setSize(width * window.devicePixelRatio, height * window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        // Обновляем разрешение в шейдерах
        blurMaterial.uniforms.resolution.value.set(width, height)
      }

      window.addEventListener("resize", onResize)

      // Функция анимации
      const animate = () => {
        requestAnimationFrame(animate)

        const time = performance.now() * 0.001
        blurMaterial.uniforms.time.value = time

        // Рендерим текст в текстуру
        renderer.setRenderTarget(renderTarget)
        renderer.render(scene, camera)

        // Устанавливаем текстуру как вход для шейдера размытия
        blurMaterial.uniforms.tDiffuse.value = renderTarget.texture

        // Рендерим финальный результат на экран
        renderer.setRenderTarget(null)
        renderer.render(blurScene, camera)
      }

      animate()
      setIsLoaded(true)

      // Функция очистки
      return () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("resize", onResize)
        URL.revokeObjectURL(url)

        // Очищаем ресурсы
        geometry.dispose()
        blurGeometry.dispose()
        cursorGeometry.dispose()
        textMaterial.dispose()
        blurMaterial.dispose()
        cursorMaterial.dispose()
        texture.dispose()
        renderTarget.dispose()
        renderer.dispose()
      }
    }

    // Загружаем SVG
    img.src = url

    // Центрируем камеру
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)

    // Возвращаем функцию очистки
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      URL.revokeObjectURL(url)
    }
  }, [containerRef])

  return (
    <div className="relative overflow-hidden" ref={containerRef}>
      {/* {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-lg">Загрузка...</div>
        </div>
      )}
      <div className="absolute bottom-4 left-4 text-sm text-gray-500">
        Перемещайте курсор над текстом для создания эффекта размытия
      </div> */}
    </div>
  )
}
