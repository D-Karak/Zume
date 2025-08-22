import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"

// Text + icon (most common)
export function AIGenerateButton({ loading, onClick, text }: { loading?: boolean; onClick: () => void; text: string }) {
  return (
    <Button type="button" variant="outline" onClick={onClick} disabled={loading} className="gap-2">
      <Wand2 className="h-4 w-4" />
      {loading ? "Generating…" : text}
    </Button>
  )
}