"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, Play, RotateCcw } from "lucide-react"

export function ScadaSimulator() {
  const [currentStart, setCurrentStart] = useState("")
  const [currentEnd, setCurrentEnd] = useState("")
  const [result, setResult] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSimulation = async () => {
    if (!currentStart || !currentEnd) {
      setResult("Please enter both current values.")
      return
    }

    const startValue = parseFloat(currentStart)
    const endValue = parseFloat(currentEnd)

    if (isNaN(startValue) || isNaN(endValue)) {
      setResult("Please enter valid numeric values.")
      return
    }

    setIsProcessing(true)
    setResult("")

    // Processing logic
    if (startValue > 0 && endValue === 0) {
      setResult("Line Break Detected.")
      
      // Simulate relay trip with delay
      setTimeout(() => {
        setResult("Line Break Detected.\nLine Shut Down Successfully in 2.1 seconds.")
        setIsProcessing(false)
      }, 2100)
    } else {
      setTimeout(() => {
        setResult("Line Healthy. No Fault Detected.")
        setIsProcessing(false)
      }, 1000)
    }
  }

  const handleReset = () => {
    setCurrentStart("")
    setCurrentEnd("")
    setResult("")
    setIsProcessing(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SCADA Line Break Simulator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Simple SCADA-like simulator for detecting line breaks based on current readings
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            Current Reading Simulation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentStart">Current Start (A)</Label>
              <Input
                id="currentStart"
                type="number"
                placeholder="e.g., 120"
                value={currentStart}
                onChange={(e) => setCurrentStart(e.target.value)}
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentEnd">Current End (A)</Label>
              <Input
                id="currentEnd"
                type="number"
                placeholder="e.g., 0"
                value={currentEnd}
                onChange={(e) => setCurrentEnd(e.target.value)}
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={handleSimulation} 
              disabled={isProcessing}
              className="flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Simulation
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={isProcessing}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          {result && (
            <Alert className={result.includes("Line Break Detected") ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-green-500 bg-green-50 dark:bg-green-900/20"}>
              <AlertDescription className={result.includes("Line Break Detected") ? "text-red-700 dark:text-red-300" : "text-green-700 dark:text-green-300"}>
                <pre className="whitespace-pre-wrap font-mono text-sm">{result}</pre>
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Simulation Logic:</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• If Current_start &gt; 0 and Current_end = 0 → Line Break Detected</li>
              <li>• Automatic relay trip simulation with 2.1 second delay</li>
              <li>• Otherwise → Line Healthy</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}