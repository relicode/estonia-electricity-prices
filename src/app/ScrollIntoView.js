'use client'

import { useEffect } from 'react'
import { parseIdAttr } from '../utils.js'

export default function ScrollIntoView() {
  useEffect(() => {
    document.getElementById(parseIdAttr())?.scrollIntoView(true)
  }, [])
}
