'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import LuckyButton from './LuckyButton'

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      window.open(`https://${encodeURIComponent(searchTerm)}.vercel.app`, '_blank')
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="mb-4">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="mb-4"
        />
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-2">
          <Button type="submit" variant="secondary" className="w-full sm:w-auto">
            Search
          </Button>
          <div className="w-full sm:w-auto">
            <LuckyButton />
          </div>
        </div>
      </form>
      <div className="text-center text-sm text-muted-foreground">
        Quick links:{' '}
        <Link href="/random" className="underline hover:text-muted-foreground/80">random</Link>
        {' '}/{' '}
        <Link href="/r" className="underline hover:text-muted-foreground/80">r</Link>
      </div>
    </div>
  )
}

