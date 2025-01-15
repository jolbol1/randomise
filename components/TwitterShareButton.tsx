import { Button } from "@/components/ui/button"
import { Twitter } from 'lucide-react'

interface TwitterShareButtonProps {
  url: string
  text: string
}

export function TwitterShareButton({ url, text }: TwitterShareButtonProps) {
  const handleShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <Button onClick={handleShare} variant="outline" size="sm" className="mt-2">
      <Twitter className="mr-2 h-4 w-4" />
      Share on Twitter
    </Button>
  )
}

