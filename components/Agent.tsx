import React from 'react'
import { BorderBeam } from './magicui/border-beam'
import { cn } from '@/lib/utils';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED'
}


const Agent = ({ userName }: AgentProps) => {
  const callStatus = CallStatus.FINISHED;
  const isSpeaking = true;

  const message = [
    "what is your name?",
    "I am a robot",
  ]
  const lastMessage = message[message.length - 1];

  return (
    <main className="flex-1 p-4 lg:ml-64 flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-xl px-4">

        {/* Cards Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6 w-full">

          {/* AI Interviewer Card */}
          <div className="relative w-full max-w-[520px] min-h-[380px] bg-gradient-to-br from-[#1c1c1c] to-[#191021] rounded-2xl p-10 flex flex-col items-center justify-center shadow-xl border border-[#2a2a2a] overflow-hidden">
            
            {/* BorderBeam with constraints */}
            <div className="absolute inset-0 pointer-events-none">
              {isSpeaking && (
                <>
                  <BorderBeam
                    duration={6}
                    size={200}
                    className="from-transparent via-[#8051B7] to-transparent max-w-full"
                  />
                  <BorderBeam
                    duration={6}
                    delay={3}
                    size={200}
                    className="from-transparent via-[#9c40ff] to-transparent max-w-full"
                  />
                </>
              )}
            </div>

            {/* Pulsing ping animation when speaking */}
            <div className="relative mb-6">
              {isSpeaking && (
                <span
                  className="absolute animate-ping w-[130px] h-[130px] rounded-full bg-indigo-400 opacity-20 z-0"
                  style={{ animationDuration: '2s' }}
                ></span>
              )}
              <div className="w-32 h-32 rounded-full bg-indigo-500/10 border border-indigo-500 flex items-center justify-center z-10 relative">
                <svg className="w-16 h-16 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
              </div>
            </div>
            <h2 className="relative z-10 text-3xl font-bold text-indigo-300 mb-2">AI Interviewer</h2>
          </div>

          {/* User Card */}
          <div className="w-full max-w-[520px] min-h-[380px] bg-gradient-to-br from-[#1c1c1c] to-[#191021] rounded-2xl p-10 flex flex-col items-center justify-center shadow-xl border border-[#2a2a2a]">
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-6">
              <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-2">{userName || 'User'}</h2>
          </div>
        </div>

        {/* Message Area */}
        <div className="mb-4 w-full">
        {message.length > 0 &&
          <div className="bg-gradient-to-br from-[#1c1c1c] to-[#191021] border border-[#2a2a2a] rounded-xl p-6 text-center shadow-inner">
            <p key={lastMessage} className={cn("text-xl text-gray-200 transition-opacity duration-500", "animate-fade-in")}>
              {lastMessage}
            </p>

          </div>
          }
        </div>

        {/* Controls */}
        <div className="flex justify-center ">
          {callStatus === CallStatus.ACTIVE ? (
            <button className="px-10 py-4 rounded-full bg-red-600 hover:bg-red-700 transition text-white text-lg font-medium shadow-md">
              End
            </button>
          ) : callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? (
            <button className="px-10 py-4 rounded-full bg-green-600 hover:bg-green-700 transition text-white text-lg font-medium shadow-md">
              Restart
            </button>
          ) : null}
        </div>


      </div>
    </main>
  );
};

export default Agent;
