import { DependencyList, EffectCallback, useEffect, useState } from 'react'

export function useAfterMountEffect(effect: EffectCallback, deps?: DependencyList) {
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      effect()
    }
  }, deps) /* eslint-disable-line */
}
