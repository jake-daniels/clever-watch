import { useRef, useState } from 'react'
import { useAfterMountEffect } from './use-after-mount-effect'
import { useScrollPosition } from './use-scroll-position'

const REM = 16 // px
const UNINITIALIZED_OFFSET = -1

export function useFixedInViewport(paddingRem: number) {
  const ref = useRef<HTMLDivElement>(null)

  const scrollPosition = useScrollPosition()

  const [offsetTop, setOffsetTop] = useState<number>(UNINITIALIZED_OFFSET)

  useAfterMountEffect(() => {
    if (ref.current && ref.current.offsetTop > 0 && offsetTop === UNINITIALIZED_OFFSET) {
      setOffsetTop(ref.current.offsetTop)
    }
  }, [ref.current?.offsetTop])

  const threshold = offsetTop - paddingRem * REM
  const isFixed = offsetTop !== UNINITIALIZED_OFFSET && scrollPosition >= threshold

  return { ref, isFixed }
}
