'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

interface AgentProps {
  userName: string;
  userId?: string;
  type: 'generate' | 'interview';
}

interface SavedMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const Agent = ({ userName, userId, type }: AgentProps) => {
  const router = useRouter();

  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);


  useEffect(() => {
    // Check if the user's microphone is active
    const checkMicStatus = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasMicrophone = devices.some(device => device.kind === 'audioinput');
        
        if (hasMicrophone) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          setIsMicActive(true);
        } else {
          setIsMicActive(false);
        }
      } catch (error) {
        setIsMicActive(false);
      }
    };

    checkMicStatus();
  }, []);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage: SavedMessage = {
          role: message.role,
          content: message.transcript,
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (_error: Error) => {};

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    };
  }, []);

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      router.push('/');
    }
  }, [callStatus]);

  const handleStartCall = async () => {
    try {
      setCallStatus(CallStatus.CONNECTING);
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } catch (_) {
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleEndCall = () => {
    try {
      setCallStatus(CallStatus.FINISHED);
      vapi.stop();
    } catch (_) {
      // Swallow call end error
    }
  };

  const lastMessage = messages[messages.length - 1]?.content || 'Say something to start the conversation.';

  return (
    <main className="flex-1 lg:ml-64 flex flex-col items-center justify-center bg-[#0e0e13] min-h-screen">
      <div className="w-full max-w-6xl px-4 py-10">
        {/* Glass container for the entire interface */}
        <div className="relative w-full backdrop-blur-md bg-white/[0.02] rounded-3xl border border-white/10 shadow-2xl overflow-hidden p-6 md:p-8">
          {/* Background gradients */}
          <div className="absolute -top-80 -right-20 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-80 -left-20 w-96 h-96 bg-indigo-700/20 rounded-full blur-3xl"></div>
          
          {/* Top control bar */}
          <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold text-white">Voice Interview</h1>
              <div className={cn(
                "ml-4 px-3 py-1 rounded-full text-xs font-medium flex items-center",
                callStatus === CallStatus.INACTIVE ? "bg-slate-700/50 text-slate-300" : 
                callStatus === CallStatus.CONNECTING ? "bg-amber-500/20 text-amber-300" : 
                callStatus === CallStatus.ACTIVE ? "bg-emerald-500/20 text-emerald-300" : 
                "bg-rose-500/20 text-rose-300"
              )}>
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full mr-1.5",
                  callStatus === CallStatus.INACTIVE ? "bg-slate-400" : 
                  callStatus === CallStatus.CONNECTING ? "bg-amber-400 animate-pulse" : 
                  callStatus === CallStatus.ACTIVE ? "bg-emerald-400 animate-pulse" : 
                  "bg-rose-400"
                )}></span>
                {callStatus === CallStatus.INACTIVE ? "Ready" : 
                  callStatus === CallStatus.CONNECTING ? "Connecting" : 
                  callStatus === CallStatus.ACTIVE ? "Live" : 
                  "Ended"}
              </div>
            </div>
            
            {/* Control button */}
            {callStatus === CallStatus.ACTIVE ? (
              <button
                onClick={handleEndCall}
                className="px-4 py-1.5 rounded-full bg-rose-500/80 hover:bg-rose-600 transition-all duration-300 text-white text-sm font-medium flex items-center space-x-2"
              >
                <span>End Call</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleStartCall}
                disabled={callStatus === CallStatus.CONNECTING}
                className={cn(
                  "px-4 py-1.5 rounded-full bg-emerald-500/80 hover:bg-emerald-600 transition-all duration-300 text-white text-sm font-medium flex items-center space-x-2",
                  callStatus === CallStatus.CONNECTING && "opacity-60 cursor-not-allowed"
                )}
              >
                <span>Start Call</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Message area - Moved to the top for better focus */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-indigo-500/10 blur"></div>
            <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl border border-white/5 p-5 min-h-24 flex flex-col">
              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-2">Current Message</h3>
              <p className={cn(
                "text-base md:text-lg text-gray-200 flex-1 leading-relaxed",
                callStatus === CallStatus.ACTIVE && "animate-fade-in"
              )}>
                {lastMessage}
              </p>
            </div>
          </div>
          
          {/* Participants area - Compact horizontal layout */}
          <div className="flex flex-row justify-center items-stretch space-x-4 md:space-x-8 mb-6">
            {/* AI Interviewer */}
            <div className="flex   flex-col items-center space-y-2 bg-gradient-to-b from-indigo-900/20 to-purple-900/30 rounded-xl px-4 py-6 md:px-10 md:py-20 w-full border border-indigo-500/10">
              <div className={cn(
                "relative w-16 h-16 rounded-full overflow-hidden", 
                isSpeaking ? "ring-2 ring-purple-500 ring-offset-1 ring-offset-[#0e0e13]" : ""
              )}>
                
                {/* Pulsing when speaking */}
                {isSpeaking && (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 animate-pulse"></div>
                )}

                {/* AI Avatar */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900/40 to-purple-900/40">
                  <svg className="w-8 h-8 text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-sm font-medium text-white">AI Interviewer</h2>
              
              {/* Small visualizer */}
              {isSpeaking && (
                <div className="flex items-center justify-center h-2 space-x-0.5">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-0.5 bg-purple-500/70 rounded-full animate-soundbar"
                      style={{
                        height: `${Math.random() * 8 + 3}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
            
            {/* User */}
            <div className="flex flex-col items-center space-y-2 bg-gradient-to-b from-slate-800/30 to-slate-900/30 rounded-xl px-4 py-6 md:px-12 md:py-20 w-full  border border-slate-700/10">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800/60 to-slate-900/60">
                  <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <h2 className="text-sm font-medium text-white">{userName || 'User'}</h2>
            </div>
        </div>

          
          {/* Call quality indicators */}
          <div className="flex justify-center items-center mb-8 text-xs text-gray-400 space-x-6">
          <div className="flex items-center">
              <svg className={`w-4 h-4 mr-1 ${isMicActive ? 'text-emerald-400' : 'text-red-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>{isMicActive ? 'Mic Active' : 'Mic Inactive'}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Audio Quality: High</span>
            </div>
          </div>
          
          {/* Conversation history */}
          {messages.length > 1 && (
            <div className="relative">
              <details className="group">
                <summary className="list-none flex items-center cursor-pointer">
                  <div className="flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                    <svg className="w-4 h-4 mr-2 transform transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>View conversation history ({messages.length - 1})</span>
                  </div>
                </summary>
                
                <div className="mt-4 max-h-60 overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                  {messages.slice(0, -1).map((msg, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "p-3 rounded-lg text-sm",
                        msg.role === 'user' 
                          ? "bg-slate-800/40 border-l-2 border-slate-600/50 ml-8" 
                          : "bg-indigo-900/20 border-l-2 border-indigo-500/50 mr-8"
                      )}
                    >
                      <p className="text-xs text-gray-500 mb-1">
                        {msg.role === 'user' ? userName : 'AI Interviewer'}
                      </p>
                      <p className="text-gray-300">{msg.content}</p>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>
        
        {/* Session information */}
        <div className="mt-4 flex justify-center items-center text-xs text-gray-500">
          <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Voice session is encrypted end-to-end</span>
        </div>
      </div>
    </main>
  );
};

export default Agent;