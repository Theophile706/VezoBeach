import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LENS_SIZE = 180
const ZOOM = 2.2
const FOLLOW = 0.22
const MIN_IMAGE_WIDTH = 160

function isLoupeTarget(img: HTMLImageElement) {
  return (
    img.naturalWidth > 0 &&
    img.getBoundingClientRect().width >= MIN_IMAGE_WIDTH &&
    img.closest('header, footer, [data-no-loupe]') === null
  )
}

// Overlays and text sit above photos, so an image is matched by position within its section.
function findImageAt(x: number, y: number) {
  const topmost = document.elementFromPoint(x, y)
  if (!topmost || topmost.closest('[data-no-loupe]')) return null

  return (
    Array.from(document.querySelectorAll('img')).find((img) => {
      const rect = img.getBoundingClientRect()
      const scope = img.closest('section, article') ?? img.parentElement
      return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom &&
        scope !== null &&
        scope.contains(topmost) &&
        isLoupeTarget(img)
      )
    }) ?? null
  )
}

/**
 * Replaces the cursor over images with a circular magnifier (fine pointers only).
 * Opt out any subtree with `data-no-loupe`.
 */
export default function ImageLoupe() {
  const [src, setSrc] = useState<string | null>(null)
  const lensRef = useRef<HTMLDivElement>(null)
  const zoomedRef = useRef<HTMLImageElement>(null)
  const hoveredRef = useRef<HTMLImageElement | null>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const lensPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const root = document.documentElement
    let frame = 0

    const render = () => {
      const img = hoveredRef.current
      const lens = lensRef.current
      const zoomed = zoomedRef.current
      if (!img || !lens || !zoomed) return

      const rect = img.getBoundingClientRect()
      const boxW = img.offsetWidth
      const boxH = img.offsetHeight
      const fit = getComputedStyle(img).objectFit

      let contentW = boxW
      let contentH = boxH
      let offsetX = 0
      let offsetY = 0
      if (fit === 'cover' || fit === 'contain') {
        const ratio =
          fit === 'cover'
            ? Math.max(boxW / img.naturalWidth, boxH / img.naturalHeight)
            : Math.min(boxW / img.naturalWidth, boxH / img.naturalHeight)
        contentW = img.naturalWidth * ratio
        contentH = img.naturalHeight * ratio
        offsetX = (boxW - contentW) / 2
        offsetY = (boxH - contentH) / 2
      }

      const scale = rect.width / boxW
      const { x, y } = lensPosRef.current
      const u = x - rect.left - offsetX * scale
      const v = y - rect.top - offsetY * scale

      lens.style.transform = `translate3d(${x - LENS_SIZE / 2}px, ${y - LENS_SIZE / 2}px, 0)`
      zoomed.style.width = `${contentW * scale * ZOOM}px`
      zoomed.style.height = `${contentH * scale * ZOOM}px`
      zoomed.style.transform = `translate3d(${LENS_SIZE / 2 - u * ZOOM}px, ${LENS_SIZE / 2 - v * ZOOM}px, 0)`
    }

    const follow = () => {
      const pointer = pointerRef.current
      const lens = lensPosRef.current
      lens.x += (pointer.x - lens.x) * FOLLOW
      lens.y += (pointer.y - lens.y) * FOLLOW
      render()
      frame = requestAnimationFrame(follow)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
      hoveredRef.current = null
      root.classList.remove('loupe-active')
      setSrc(null)
    }

    const update = () => {
      const { x, y } = pointerRef.current
      const img = findImageAt(x, y)
      if (!img) {
        if (hoveredRef.current) stop()
        return
      }
      if (img === hoveredRef.current) return
      if (!hoveredRef.current) {
        lensPosRef.current = { x, y }
        root.classList.add('loupe-active')
        frame = requestAnimationFrame(follow)
      }
      hoveredRef.current = img
      setSrc(img.currentSrc || img.src)
    }

    const onPointerMove = (e: PointerEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY }
      update()
    }

    document.addEventListener('pointermove', onPointerMove)
    window.addEventListener('scroll', update, { capture: true, passive: true })
    root.addEventListener('mouseleave', stop)
    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', update, { capture: true })
      root.removeEventListener('mouseleave', stop)
      stop()
    }
  }, [])

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          key="loupe"
          ref={lensRef}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ width: LENS_SIZE, height: LENS_SIZE }}
          className="pointer-events-none fixed left-0 top-0 z-[60]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full overflow-hidden rounded-full border border-gold-500/80 bg-gray-100 shadow-2xl"
          >
            <img
              ref={zoomedRef}
              src={src}
              alt=""
              draggable={false}
              className="absolute left-0 top-0 max-w-none select-none"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
