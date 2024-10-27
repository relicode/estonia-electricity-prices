'use client'

import { useEffect } from 'react'

export default function ScrollIntoView() {
  useEffect(() => {
    document.getElementById(`prices-${new Date().getHours()}`)?.scrollIntoView(true)
  }, [])
}
