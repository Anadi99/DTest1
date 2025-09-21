import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <LoadingSpinner 
        size="lg" 
        text="Loading Deutchnames - Preparing your German learning experience..."
      />
    </div>
  )
}
