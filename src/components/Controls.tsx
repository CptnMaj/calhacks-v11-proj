// ./components/UnifiedChatComponent.tsx
"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Button } from "@/components/ui/button2";
import { Card } from "@/components/ui/card2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "./ui/Navbar";
import axios from "axios";
import {
  Mic,
  RefreshCw,
  Play,
  Pause,
  Upload,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UnifiedChatComponent() {
  const {
    connect,
    disconnect,
    readyState,
    messages: voiceMessages,
  } = useVoice();

  // State variables
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>(
    []
  );
  const [selectedCameraId, setSelectedCameraId] = useState<string>("");
  const [isGridVisible, setIsGridVisible] = useState(true);

  // ChatPDF State
  const [pdfSourceId, setPdfSourceId] = useState<string | null>(null);
  const [chatResponse, setChatResponse] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

  // Combined Messages State
  const [combinedMessages, setCombinedMessages] = useState<
    { type: "voice" | "pdf" | "system"; content: string }[]
  >([]);

  // Refs for video element and file input
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      toast.info("Timer has ended.");
      // Add a system message indicating the timer has ended
      setCombinedMessages((prev) => [
        ...prev,
        { type: "system", content: "Timer has ended." },
      ]);
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
        } else {
          setError("No cameras found.");
          setCombinedMessages((prev) => [
            ...prev,
            { type: "system", content: "No cameras found." },
          ]);
        }
      } catch (err) {
        console.error("Error enumerating devices.", err);
        setError("Unable to access media devices.");
        setCombinedMessages((prev) => [
          ...prev,
          { type: "system", content: "Unable to access media devices." },
        ]);
      }
    };
    getCameras();
  }, []);

  // Access webcam and microphone based on selected camera
  useEffect(() => {
    const getMedia = async () => {
      if (!selectedCameraId) return;

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
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setError("Unable to access webcam and/or microphone.");
        setCombinedMessages((prev) => [
          ...prev,
          {
            type: "system",
            content: "Unable to access webcam and/or microphone.",
          },
        ]);
      }
    };
    getMedia();

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
      toast.info("Voice session ended.");
      // Add a system message indicating the session has ended
      setCombinedMessages((prev) => [
        ...prev,
        { type: "system", content: "Voice session ended." },
      ]);
    } else {
      connect()
        .then(() => {
          toast.success("Voice session started.");
          // Add a system message indicating the session has started
          setCombinedMessages((prev) => [
            ...prev,
            { type: "system", content: "Voice session started." },
          ]);
        })
        .catch((err) => {
          console.error("Error starting voice session:", err);
          toast.error("Failed to start voice session.");
          // Add an error message to the chat
          setCombinedMessages((prev) => [
            ...prev,
            { type: "system", content: "Failed to start voice session." },
          ]);
        });
    }
  };

  // Handle file upload to ChatPDF and generate questions
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setChatResponse("");
    setPdfSourceId(null);

    const formData = new FormData();
    formData.append("file", file);

    const options = {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_CHATPDF_API_KEY!,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        "https://api.chatpdf.com/v1/sources/add-file",
        formData,
        options
      );
      setPdfSourceId(response.data.sourceId);
      toast.success("PDF uploaded successfully.");

      // Add a system message indicating successful upload
      setCombinedMessages((prev) => [
        ...prev,
        { type: "system", content: "PDF uploaded successfully." },
      ]);

      // Generate questions immediately after successful upload
      await generateQuestions(response.data.sourceId);
    } catch (error: any) {
      console.error(
        "Error uploading PDF:",
        error.response ? error.response.data : error.message
      );
      setChatResponse("Error uploading PDF. Please try again.");
      toast.error("Error uploading PDF. Please try again.");

      // Add an error message to the chat
      setCombinedMessages((prev) => [
        ...prev,
        { type: "system", content: "Error uploading PDF. Please try again." },
      ]);
    } finally {
      setIsUploading(false);
    }
  };

  // Generate questions based on the uploaded PDF
  const generateQuestions = async (sourceId: string) => {
    setIsGeneratingQuestions(true);
    setChatResponse("");

    const data = {
      sourceId: sourceId,
      messages: [
        {
          role: "user",
          content:
            "Based on the content of this PDF, generate 5 precise and important questions that cover the main topics discussed in the document. Ensure the questions are specific and directly related to the key information presented in the PDF.",
        },
      ],
    };

    try {
      const response = await axios.post(
        "https://api.chatpdf.com/v1/chats/message",
        data,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_CHATPDF_API_KEY!,
            "Content-Type": "application/json",
          },
        }
      );
      setChatResponse(response.data.content);
      toast.success("Questions generated successfully.");

      // Add the generated questions to the chat
      setCombinedMessages((prev) => [
        ...prev,
        { type: "pdf", content: response.data.content },
      ]);
    } catch (error: any) {
      console.error(
        "Error generating questions:",
        error.response ? error.response.data : error.message
      );
      setChatResponse(
        "Error generating questions. Please try uploading the PDF again."
      );
      toast.error("Error generating questions. Please try again.");

      // Add an error message to the chat
      setCombinedMessages((prev) => [
        ...prev,
        {
          type: "system",
          content:
            "Error generating questions. Please try uploading the PDF again.",
        },
      ]);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Handle incoming voice messages
  useEffect(() => {
    if (voiceMessages.length > 0) {
      // Assuming voiceMessages is an array of messages from HumeAI
      const latestMessage = voiceMessages[voiceMessages.length - 1];
      setCombinedMessages((prev) => [
        ...prev,
        { type: "voice", content: Object.keys(latestMessage).toString() },
      ]);
    }
  }, [voiceMessages]);

  // Other handlers
  const handleRestart = () => {
    // Implement restart functionality here
    // For example, reset states or reconnect voice session
    setTimer(0);
    setIsTimerRunning(false);
    setCombinedMessages([]);
    setChatResponse("");
    setPdfSourceId(null);
    toast.info("Application restarted.");
  };

  const handleTimerStart = () => {
    if (timer > 0) {
      setIsTimerRunning(true);
      toast.info("Timer started.");
    }
  };

  const handleCameraChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCameraId(event.target.value);
  };

  const toggleGridVisibility = () => {
    setIsGridVisible(!isGridVisible);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Video Grid and Controls */}
          <div
            className={`${
              isGridVisible ? "lg:w-2/3" : "lg:w-1/4"
            } flex flex-col space-y-6 transition-all duration-300`}
          >
            {/* Video Grid */}
            <div className="relative">
              <Button
                onClick={toggleGridVisibility}
                className="absolute top-0 right-0 z-10 mb-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full p-2"
                variant="outline"
                size="sm" // Smaller button
              >
                {isGridVisible ? (
                  <ChevronUp className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                )}
              </Button>
              <AnimatePresence>
                {isGridVisible && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-3 gap-2"
                  >
                    {[...Array(9)].map((_, i) => (
                      <Card
                        key={i}
                        className="aspect-video bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                      >
                        {i === 0 ? (
                          <>
                            {error ? (
                              <div className="flex items-center justify-center h-full">
                                <p className="text-red-500 text-sm">{error}</p>
                              </div>
                            ) : (
                              <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover"
                              ></video>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full bg-gray-700"></div>
                        )}
                      </Card>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Controls */}
            <Card className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 px-3 py-1 text-sm"
                    onClick={handleRestart}
                    size="sm" // Smaller button
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Restart</span>
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Timer (min)"
                      className="w-28 text-sm px-2 py-1"
                      onChange={(e) =>
                        setTimer(parseInt(e.target.value) * 60 || 0)
                      }
                      disabled={isTimerRunning}
                      min={0}
                    />
                    <Button
                      onClick={
                        isTimerRunning
                          ? () => {
                              setIsTimerRunning(false);
                              toast.info("Timer stopped.");
                            }
                          : handleTimerStart
                      }
                      variant={isTimerRunning ? "destructive" : "outline"}
                      disabled={timer === 0 && !isTimerRunning}
                      className="flex items-center space-x-2 px-3 py-1 text-sm"
                      size="sm" // Smaller button
                    >
                      {isTimerRunning ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      <span>{isTimerRunning ? "Stop" : "Start"} Timer</span>
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Label
                    htmlFor="cameraSelect"
                    className="text-sm font-semibold"
                  >
                    Select Camera
                  </Label>
                  <select
                    id="cameraSelect"
                    value={selectedCameraId}
                    onChange={handleCameraChange}
                    className="p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {availableCameras.map((camera) => (
                      <option key={camera.deviceId} value={camera.deviceId}>
                        {camera.label || `Camera ${camera.deviceId}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          </div>
          {/* Right Side: Unified Chat Interface */}
          <div
            className={`${
              isGridVisible ? "lg:w-1/3" : "lg:w-3/4"
            } flex flex-col space-y-6 transition-all duration-300`}
          >
            {/* Unified Chat */}
            <Card className="p-4 flex flex-col h-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
              {/* Voice Control and PDF Upload */}
              <div className="flex flex-col space-y-4 mb-4">
                {/* Voice Session Toggle */}
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  onClick={handleVoiceSessionToggle}
                  size="sm" // Smaller button
                >
                  <Mic className="w-4 h-4" />
                  <span>
                    {readyState === VoiceReadyState.OPEN
                      ? "End Voice Session"
                      : "Start Voice Session"}
                  </span>
                </Button>
                {/* PDF Upload */}
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="fileInput" className="text-sm font-semibold">
                    Add PDF For Questions
                  </Label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="fileInput"
                      type="file"
                      accept=".pdf"
                      onChange={onFileChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                      onClick={triggerFileInput}
                      disabled={isUploading || isGeneratingQuestions}
                      size="sm" // Smaller button
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload PDF</span>
                    </Button>
                    {(isUploading || isGeneratingQuestions) && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {isUploading
                          ? "Uploading..."
                          : isGeneratingQuestions
                          ? "Generating..."
                          : ""}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* Chat Messages */}
              <div className="flex-grow overflow-auto bg-gray-50 dark:bg-gray-700 rounded-md p-4 shadow-inner">
                {combinedMessages.length > 0 ? (
                  <div className="space-y-4">
                    {combinedMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${
                          msg.type === "voice"
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                            : msg.type === "pdf"
                            ? "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100"
                        }`}
                      >
                        <pre className="whitespace-pre-wrap">{msg.content}</pre>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Engage with voice or upload a PDF to see generated content
                    here.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
