// ./components/Controls.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Button } from "@/components/ui/button2";
import { Card } from "@/components/ui/card2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Messages from "./Messages"; // Import the Messages component

// Main function for Controls component
export default function Controls() {
  const { connect, disconnect, readyState } = useVoice();

  // State variables from previous Page
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>(
    []
  );
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");

  // Refs for video element and cards
  const videoRef = useRef<HTMLVideoElement>(null);
  const firstCardRef = useRef(null);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  // Enumerate available cameras
  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setAvailableCameras(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedCameraId(videoDevices[0].deviceId);
        }
      } catch (err) {
        console.error("Error enumerating devices.", err);
        setError("Unable to access media devices.");
      }
    };
    getCameras();
  }, []);

  // Access webcam and microphone based on selected camera
  useEffect(() => {
    const getMedia = async () => {
      if (!selectedCameraId) return;

      // Stop existing media tracks
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedCameraId } },
          audio: true,
        });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setError("Unable to access webcam and/or microphone.");
      }
    };
    getMedia();

    // Cleanup on component unmount
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [selectedCameraId]);

  // Handle voice session connection and disconnection
  const handleVoiceSessionToggle = () => {
    if (readyState === VoiceReadyState.OPEN) {
      disconnect();
    } else {
      connect()
        .then(() => {
          /* handle success */
        })
        .catch(() => {
          /* handle error */
        });
    }
  };

  // Other handlers
  const handleSpeakToggle = () => {
    setIsSpeaking(!isSpeaking);
  };

  const handleRestart = () => {
    // Implement restart functionality here
  };

  const handleTimerStart = () => {
    if (timer > 0) {
      setIsTimerRunning(true);
    }
  };

  const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCameraId(event.target.value);
  };

  return (
    <div className="container relative h-screen md:flex md:flex-row lg:grid lg:max-w-full lg:grid-cols-[3.5fr_1.5fr] lg:px-0">
      {/* Sidebar Section */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex flex-col h-full">
          {/* Top Grid of Cards */}
          <div className="flex-grow grid grid-cols-3 gap-4 mb-4">
            {[...Array(9)].map((_, i) => (
              <Card
                ref={i === 0 ? firstCardRef : null}
                key={i}
                className="bg-zinc-800 rounded-lg shadow-md aspect-video flex items-center justify-center"
              >
                {i === 0 ? (
                  // Embed the webcam video in the first card
                  <>
                    {error ? (
                      <p className="text-red-500 text-sm">{error}</p>
                    ) : (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover rounded-md"
                      ></video>
                    )}
                  </>
                ) : (
                  // Other cards can have their own content or remain empty
                  <div className="bg-zinc-700 w-full h-full rounded-md"></div>
                )}
              </Card>
            ))}
          </div>
          {/* Bottom Controls */}
          <div className="flex flex-col space-y-2">
            {/* Speak, Restart, Timer Controls */}
            <div className="flex space-x-2">
              <Button
                variant={isSpeaking ? "destructive" : "outline"}
                className="text-sm px-4 py-2 bg-zinc-900"
                onClick={handleSpeakToggle}
              >
                {isSpeaking ? "Stop Speaking" : "Speak"}
              </Button>
              <Button
                variant="outline"
                className="text-sm px-4 py-2 bg-zinc-900"
                onClick={handleRestart}
              >
                Restart
              </Button>
              <div className="flex gap-3">
                <Input
                  type="number"
                  placeholder="Timer (minutes)"
                  className="text-sm px-4 py-2 w-40 text-zinc-900"
                  onChange={(e) => setTimer(parseInt(e.target.value) * 60 || 0)}
                  disabled={isTimerRunning} // Disable input while timer is running
                />
                {!isTimerRunning ? (
                  <Button
                    onClick={handleTimerStart}
                    variant="outline"
                    disabled={timer === 0}
                    className="text-sm px-4 py-2 bg-zinc-900"
                  >
                    Start Timer
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsTimerRunning(false)}
                    variant="outline"
                    className="text-sm px-4 py-2 bg-red-600"
                  >
                    Stop Timer
                  </Button>
                )}
              </div>
            </div>
            {/* Camera Chooser */}
            <div className="flex flex-col space-y-2 mt-4">
              <Label htmlFor="cameraSelect" className="text-center text-xl">
                Select Camera
              </Label>
              <select
                id="cameraSelect"
                value={selectedCameraId}
                onChange={handleCameraChange}
                className="text-sm px-4 py-2 bg-zinc-800 text-white rounded-md"
              >
                {availableCameras.map((camera) => (
                  <option key={camera.deviceId} value={camera.deviceId}>
                    {camera.label || `Camera ${camera.deviceId}`}
                  </option>
                ))}
              </select>
            </div>
            {/* Add Slides Section */}
            <div className="flex flex-col space-y-2 mt-4">
              <Label htmlFor="Slides" className="text-center text-xl">
                Add Slides (.pdf, .txt, .pptx)
              </Label>
              <Input id="Slides" type="file" accept=".pdf, .txt, .pptx" />
            </div>
            {/* Voice Session Controls */}
            <div className="flex flex-col space-y-2 mt-4">
              <Button
                variant="outline"
                className="text-sm px-4 py-2 bg-zinc-900"
                onClick={handleVoiceSessionToggle}
              >
                {readyState === VoiceReadyState.OPEN
                  ? "End Session"
                  : "Start Session"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content Section */}
      <div className="lg:p-8 h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-full max-w-md space-y-4">
          {/* Replace generatedText with Messages component */}
          <Messages />
        </div>
      </div>
    </div>
  );
}
