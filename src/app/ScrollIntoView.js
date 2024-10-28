'use client'

import { useEffect } from 'react'
import { parseDate } from '../utils.js'

export default function ScrollIntoView() {
  useEffect(() => {
    console.log(`prices-${parseDate(new Date())}-${new Date().getHours()}`)
    document.getElementById(`prices-${parseDate()}-${new Date().getHours()}`)?.scrollIntoView(true)
  }, [])
}
