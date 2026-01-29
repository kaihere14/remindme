"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"

type Props = {
  navigateLink: string
  hidden: boolean
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined
  content: string
}

export function LandingButton({
  variant,
  content,
  hidden,
  navigateLink,
}: Props) {
  const openNewTab = () => {
    window.open(navigateLink, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button onClick={openNewTab} variant={variant}>
        {content}
      </Button>

      <Button
        onClick={openNewTab}
        variant="outline"
        size="icon"
        aria-label="Open in new tab"
        className={`cursor-pointer ${hidden ? "hidden" : ""}`}
      >
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
