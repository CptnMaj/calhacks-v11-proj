// frontend/components/PresentationModeSelector.tsx

'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function PresentationModeSelector() {
  const [isLivePresentation, setIsLivePresentation] = useState(false)
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([])
  const router = useRouter()

  const scenarios = [
    "Introduction",
    "Product Demo",
    "Q&A Session",
    "Technical Deep Dive",
    "Customer Testimonial",
    "De-escalation",
    "Closing Remarks"
  ]

  const handleScenarioToggle = (scenario: string) => {
    setSelectedScenarios(prev =>
      prev.includes(scenario)
        ? prev.filter(s => s !== scenario)
        : [...prev, scenario]
    )
  }

  const handleSubmit = () => {
    if (!isLivePresentation || selectedScenarios.length === 0) {
      // Shouldn't happen due to button disabling, but added as a safety
      return
    }

    console.log(`Submitting: Live-Presentation - ${isLivePresentation}, Scenarios - ${selectedScenarios.join(", ")}`)
    
    // Construct the query string based on selected scenarios
    const query = selectedScenarios.length > 0
      ? `?scenarios=${selectedScenarios.join(",")}`
      : ""

    // Navigate to the main presentation page with selected scenarios as query parameters
    router.push(`/main${query}`)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Presentation Mode Selector</h2>
        <div className="space-y-6">
          {/* Live-Presentation Toggle */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-700">Live-Presentation</span>
            <button
              onClick={() => setIsLivePresentation(!isLivePresentation)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLivePresentation ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              aria-pressed={isLivePresentation}
              aria-label="Toggle Live Presentation"
            >
              <span
                className={`transform bg-white border border-gray-300 rounded-full h-4 w-4 transition-transform ${
                  isLivePresentation ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Scenarios Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <label
                key={scenario}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedScenarios.includes(scenario)}
                  onChange={() => handleScenarioToggle(scenario)}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700">{scenario}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50">
        <button
          onClick={handleSubmit}
          className={`w-full flex justify-center items-center py-3 px-4 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            selectedScenarios.length === 0 || !isLivePresentation
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          disabled={selectedScenarios.length === 0 || !isLivePresentation}
          aria-disabled={selectedScenarios.length === 0 || !isLivePresentation}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
