"use client"

import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
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
      <HoverBorderGradient onClick={openNewTab}>
        {content}
      </HoverBorderGradient>
    </div>
  )
}
