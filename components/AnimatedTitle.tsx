'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { faker } from '@faker-js/faker'

function generateRandomChar() {
  return faker.string.alphanumeric(1).toLowerCase()
}

function generateRandomString(length: number) {
  return Array.from({ length }, () => generateRandomChar()).join('')
}

const characterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
}

export function AnimatedTitle() {
  const shouldReduceMotion = useReducedMotion()
  const [domain, setDomain] = useState(generateRandomString(5))
  
  const updateRandomChar = useCallback(() => {
    const index = Math.floor(Math.random() * 5)
    setDomain(prev => prev.substring(0, index) + generateRandomChar() + prev.substring(index + 1))
  }, [])

  useEffect(() => {
    if (!shouldReduceMotion) {
      const interval = setInterval(() => {
        updateRandomChar()
      }, 1000 + Math.random() * 1000) // Random interval between 1s and 2s

      return () => clearInterval(interval)
    }
  }, [shouldReduceMotion, updateRandomChar])

  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center" aria-label={`${domain}.vercel.app`}>
      <span className="sr-only">{domain}</span>
      {domain.split('').map((char, index) => (
        <AnimatePresence key={index} mode="wait">
          <motion.span
            key={`${char}-${index}`}
            variants={characterVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="font-mono inline-block"
            aria-hidden="true"
          >
            {char}
          </motion.span>
        </AnimatePresence>
      ))}
      <span className="font-mono">.vercel.app</span>
    </h1>
  )
}

