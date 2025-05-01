
import { useEffect, useState } from "react";
import { AudioRecorder } from "@/types";

export const useAudioRecorder = (maxLengthSeconds = 30): AudioRecorder => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      setAudioChunks([]);
      setMediaRecorder(recorder);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((chunks) => [...chunks, e.data]);
        }
      };
      
      recorder.start(200);
      setIsRecording(true);
      setRecordingTime(0);
      
      const id = window.setInterval(() => {
        setRecordingTime((time) => {
          if (time >= maxLengthSeconds) {
            if (recorder.state === "recording") {
              recorder.stop();
              setIsRecording(false);
              clearInterval(id);
            }
            return maxLengthSeconds;
          }
          return time + 1;
        });
      }, 1000);
      
      setIntervalId(id);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = async (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorder || mediaRecorder.state !== "recording") {
        resolve(null);
        return;
      }

      mediaRecorder.onstop = () => {
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
        }
        
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        resolve(audioBlob);
        
        // Clean up the media stream
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.stop();
      setIsRecording(false);
    });
  };

  const resetRecording = () => {
    setAudioChunks([]);
    setRecordingTime(0);
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      
      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [intervalId, mediaRecorder]);

  return {
    isRecording,
    startRecording,
    stopRecording,
    recordingTime,
    resetRecording
  };
};
