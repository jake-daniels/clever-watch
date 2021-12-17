import { useLayoutEffect, useState } from 'react'

export function useScrollPosition() {
  const [position, setPosition] = useState(0)

  useLayoutEffect(() => {
    const handleScroll = () => {
      setPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return position
}
