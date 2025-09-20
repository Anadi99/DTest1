import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Loading Deutchnames</h2>
          <p className="text-muted-foreground">Preparing your German learning experience...</p>
        </div>
      </div>
    </div>
  )
}
