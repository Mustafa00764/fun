"use client"

import { useEffect, useRef, useState } from "react"

export default function DualDirectionBlur({text, fontSize, color}:any) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [dynamicFontSize, setDynamicFontSize] = useState(fontSize)
  const animationFrameRef = useRef<number | null>(null)
  const textImageRef = useRef<HTMLImageElement | null>(null)
  const isImageLoadedRef = useRef(false)

  const updateFontSize = () => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect()
      // const newFontSize = Math.min(width / 100 * 18.75, fontSize) // Пример пропорционального уменьшения
      setDynamicFontSize(width / 100 * 18.75)
    }
  }

  // Создание изображения текста
  const createTextImage = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const canvas = document.createElement("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerWidth / 100 * 34.8

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Очистка холста белым фоном
    ctx.fillStyle = "#0a0a0a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Отрисовка текста с нужным шрифтом
    ctx.font = `bold ${dynamicFontSize}px Cera Pro Medium, sans-serif`
    ctx.fillStyle = color
    ctx.textAlign = "left"
    ctx.textBaseline = "middle"
    const xOffset = 0

    // Разделение текста на строки по пробелам, если нужно
    const words = text.split(" ")
    if (words.length > 1) {
      ctx.fillText(words[0], xOffset, canvas.height / 2 - dynamicFontSize * 0.25)
      ctx.fillText(words.slice(1).join(" "), xOffset, canvas.height / 2 + dynamicFontSize * 0.6)
    } else {
      ctx.fillText(text, xOffset, canvas.height / 2)
    }

    // Создание изображения из холста
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      isImageLoadedRef.current = true
      textImageRef.current = img
    }
    img.src = canvas.toDataURL()
  }

  // Применение размытия в двух направлениях
  const applyDualDirectionBlur = () => {
    if (!canvasRef.current || !isImageLoadedRef.current || !textImageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Очистка основного холста
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Отрисовка оригинального изображения
    ctx.drawImage(textImageRef.current, 0, 0)

    // Получение позиции курсора
    const { x, y } = mousePosition.current

    // Параметры эффекта
    const radius = 250
    const frontSamples = 20
    const backSamples = 20
    const maxFrontOffset = 80
    const maxBackOffset = 80
    const fadeStart = 0.1

    // Создание временных холстов для переднего и заднего размытия
    const frontCanvas = document.createElement("canvas")
    frontCanvas.width = canvas.width
    frontCanvas.height = canvas.height
    const frontCtx = frontCanvas.getContext("2d")

    const backCanvas = document.createElement("canvas")
    backCanvas.width = canvas.width
    backCanvas.height = canvas.height
    const backCtx = backCanvas.getContext("2d")

    if (!frontCtx || !backCtx) return

    // Копирование оригинального изображения на оба холста
    frontCtx.drawImage(textImageRef.current, 0, 0)
    backCtx.drawImage(textImageRef.current, 0, 0)

    // Создание круглой области обрезки (маски)
    frontCtx.save()
    frontCtx.beginPath()
    frontCtx.arc(x, y, radius, 0, Math.PI * 2)
    frontCtx.closePath()
    frontCtx.clip()
    frontCtx.clearRect(0, 0, canvas.width, canvas.height)

    backCtx.save()
    backCtx.beginPath()
    backCtx.arc(x, y, radius, 0, Math.PI * 2)
    backCtx.closePath()
    backCtx.clip()
    backCtx.clearRect(0, 0, canvas.width, canvas.height)

    // Применение переднего размытия (тени перед текстом)
    for (let i = 0; i < frontSamples; i++) {
      const t = Math.pow(i / frontSamples, 1.5)
      const scale = 1 - t * (maxFrontOffset / radius) * 0.5
      const alpha = Math.pow(1 - t, 1.2) * 0.3

      frontCtx.globalAlpha = alpha

      // Отрисовка с уменьшающимся масштабом
      frontCtx.drawImage(
        textImageRef.current,
        x - radius,
        y - radius,
        radius * 2,
        radius * 2,
        x - radius * scale,
        y - radius * scale,
        radius * 2 * scale,
        radius * 2 * scale,
      )
    }

    // Применение заднего размытия (тени позади текста)
    for (let i = 0; i < backSamples; i++) {
      const t = Math.pow(i / backSamples, 1.5)
      const scale = 1 + t * (maxBackOffset / radius)
      const alpha = Math.pow(1 - t, 1.2) * 0.3

      backCtx.globalAlpha = alpha

      // Отрисовка с увеличивающимся масштабом
      backCtx.drawImage(
        textImageRef.current,
        x - radius,
        y - radius,
        radius * 2,
        radius * 2,
        x - radius * scale,
        y - radius * scale,
        radius * 2 * scale,
        radius * 2 * scale,
      )
    }

    frontCtx.restore()
    backCtx.restore()

    // Создание градиентной маски для мягких краев
    const gradientCanvas = document.createElement("canvas")
    gradientCanvas.width = canvas.width
    gradientCanvas.height = canvas.height
    const gradientCtx = gradientCanvas.getContext("2d")
    if (!gradientCtx) return

    // Создание радиального градиента с несколькими остановками для плавного перехода
    const gradient = gradientCtx.createRadialGradient(x, y, radius * fadeStart, x, y, radius)
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
    gradient.addColorStop(0.1, "rgba(0, 0, 0, 0.98)")
    gradient.addColorStop(0.2, "rgba(0, 0, 0, 0.95)")
    gradient.addColorStop(0.3, "rgba(0, 0, 0, 0.9)")
    gradient.addColorStop(0.4, "rgba(0, 0, 0, 0.8)")
    gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.7)")
    gradient.addColorStop(0.6, "rgba(0, 0, 0, 0.6)")
    gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.45)")
    gradient.addColorStop(0.8, "rgba(0, 0, 0, 0.3)")
    gradient.addColorStop(0.85, "rgba(0, 0, 0, 0.2)")
    gradient.addColorStop(0.9, "rgba(0, 0, 0, 0.1)")
    gradient.addColorStop(0.95, "rgba(0, 0, 0, 0.05)")
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

    gradientCtx.fillStyle = gradient
    gradientCtx.fillRect(0, 0, canvas.width, canvas.height)

    // Применение маски к обоим холстам
    frontCtx.globalCompositeOperation = "destination-in"
    frontCtx.drawImage(gradientCanvas, 0, 0)
    frontCtx.globalCompositeOperation = "source-over"

    backCtx.globalCompositeOperation = "destination-in"
    backCtx.drawImage(gradientCanvas, 0, 0)
    backCtx.globalCompositeOperation = "source-over"

    // Отрисовка оригинального изображения на главный холст
    ctx.drawImage(textImageRef.current, 0, 0)

    // Применение градиентной маски (удаление участков)
    ctx.globalCompositeOperation = "destination-out"
    ctx.drawImage(gradientCanvas, 0, 0)
    ctx.globalCompositeOperation = "source-over"

    // Отрисовка переднего и заднего размытия
    ctx.drawImage(frontCanvas, 0, 0)
    ctx.drawImage(backCanvas, 0, 0)
  }

  // Инициализация и анимация
  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0 || dimensions.height === 0) return

    // Создание изображения текста
    createTextImage()

    // Настройка основного холста
    if (canvasRef.current) {
      canvasRef.current.width = dimensions.width
      canvasRef.current.height = dimensions.height
    }

    // Анимационная функция
    const animate = () => {
      if (isImageLoadedRef.current) {
        applyDualDirectionBlur()
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Запуск анимации
    animate()

    // Очистка
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dimensions, dynamicFontSize, text, color, fontSize])

  // Отслеживание позиции мыши
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !e.touches[0]) return

      const rect = containerRef.current.getBoundingClientRect()
      mousePosition.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }

      // Блокировка прокрутки при касании холста
      e.preventDefault()
    }

    // Установка изначальной позиции курсора в центр
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      mousePosition.current = { x: width / 2, y: height / 2 }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [fontSize])

  // Обновление размеров при изменении окна
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return

      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
      updateFontSize()  
    }

    // Установка начальных размеров
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })
      updateFontSize()
    }


    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [fontSize])

  return (
    <div
      ref={containerRef}
      className="w-full h-[34.7vw] relative"
      aria-label={`Interactive text display: ${text}`}
      role="img"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      {/* Индикатор курсора — очень незаметный */}
      <div
        className="absolute w-6 h-6 border border-gray-300 rounded-full pointer-events-none opacity-5"
        style={{
          transform: `translate(${mousePosition.current.x - 12}px, ${mousePosition.current.y - 12}px)`,
        }}
      />
    </div>
  )
}
