'use client'

import { Button } from '@/components/ui/Button'

import { useEffect, useState, useCallback, useRef } from 'react'
import Image from "next/image"

function secondsToDhms(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

export default function Main() {
  const [timer, setTimer] = useState(0)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) return
    intervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1)
    }, 1000)
  }, [])

  const stopTimer = useCallback(() => {
    if (intervalRef.current === null) return
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  useEffect(() => {
    startTimer()
    return () => stopTimer()
  }, [startTimer, stopTimer])

  const toggleMic = () => setIsMicOn(prev => !prev)
  const toggleCamera = () => setIsCameraOn(prev => !prev)
  const endSession = () => {
    stopTimer()
    alert("Session ended!")
  }

  return (
    <main className="flex flex-col h-screen bg-black text-white">
      <div className="flex flex-grow">
        <section className="w-3/4 bg-neutral-800" aria-label="Main content area">
          {/* Main content goes here */}
        </section>
        <aside className="w-1/4 bg-neutral-700" aria-label="Sidebar">
          <div className="relative aspect-video bg-neutral-900">
            <span className="absolute top-1 left-1 bg-neutral-900/20 px-2 py-1 rounded-xl font-bold">Sharing</span>
            <Image src="/assets/slide_example.jpg" alt="Shared content" layout="fill" objectFit="cover" />
          </div>
        </aside>
      </div>
      <footer className="flex justify-between items-center px-4 h-[10%] bg-neutral-900">
        <h1 className="bg-neutral-700 rounded-xl py-4 px-10">Team meeting</h1>
        <div className="flex space-x-3">
          <Button onClick={toggleMic}>
            {isMicOn ? '🎙️ Mute' : '🎙️ Unmute'}
          </Button>
          <Button variant="primary" onClick={toggleCamera}>
            {isCameraOn ? '📷 Turn Off Camera' : '📷 Turn On Camera'}
          </Button>
          <Button variant="danger" onClick={endSession}>End Session</Button>
        </div>
        <div className="bg-neutral-700 rounded-xl py-4 px-10 font-semibold" aria-label="Session duration">
          {secondsToDhms(timer)}
        </div>
      </footer>
    </main>
  )
}