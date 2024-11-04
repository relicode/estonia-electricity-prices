'use client'

import { useEffect } from 'react'

export default function ScrollIntoView({ targetId }: { targetId: string }) {
  useEffect(() => {
    document.getElementById(targetId)?.scrollIntoView(true)
  }, [targetId])
  return null
}
