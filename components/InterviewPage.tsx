'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import TechIcons from '@/components/TechIcons';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type InterviewPageProps = {
  interview: Interview;
  userid: string | undefined;
};



const InterviewPage = ({ interview, userid }: InterviewPageProps) => {
  const formatDate = (dateString : any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getCategoryBadgeColor = (category : string) => {
    switch (category) {
      case 'Technical':
        return 'bg-indigo-600/90 text-indigo-100 border border-indigo-500/30';
      case 'Mixed':
        return 'bg-purple-600/90 text-purple-100 border border-purple-500/30';
      case 'Behavioral':
        return 'bg-blue-600/90 text-blue-100 border border-blue-500/30';
      case 'System Design':
        return 'bg-emerald-600/90 text-emerald-100 border border-emerald-500/30';
      default:
        return 'bg-indigo-600/90 text-indigo-100 border border-indigo-500/30';
    }
  };

  return (
    <main className="flex bg-[#0e0e13]">
      <Sidebar />

      <div className="lg:ml-64  w-full text-white py-6 px-4 sm:px-6 lg:px-12 relative">
        {/* Background gradients (hidden on mobile) */}
        

        {/* Breadcrumb */}
        <div className="flex items-center text-xs sm:text-sm text-gray-400 mb-6 backdrop-blur-sm bg-white/5 w-fit px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
          <Link href="/interviews" className="hover:text-white transition-colors flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Interviews
          </Link>
          <svg className="w-4 h-4 mx-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-white font-medium truncate max-w-[160px] sm:max-w-xs">{interview.role}</span>
        </div>

        {/* Header card */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6  relative overflow-hidden shadow-xl">
          {/* Decorative light (desktop only) */}
          <div className="hidden md:block absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="hidden md:block absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 relative z-10">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-600/40 to-purple-600/40 flex items-center justify-center border border-white/20 shadow-md overflow-hidden group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-2xl sm:text-3xl font-bold text-white">{interview.role?.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-indigo-200 bg-clip-text mb-1">
                  {interview.role} Interview
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <div className={cn("px-3 py-1 rounded-full text-xs font-semibold shadow-md", getCategoryBadgeColor(interview.type))}>
                    {interview.type}
                  </div>
                  <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-200 border border-white/10 shadow">
                    <span className="inline-block mr-1 w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    {formatDate(interview.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-6  pt-4  border-t border-white/10 relative z-10">
            <h3 className="text-xs sm:text-sm uppercase tracking-wide text-indigo-200 font-semibold mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <TechIcons techstack={interview.techstack} />
            </div>
          </div>
        </div>

        {/* Optional: You can mount the Agent here */}
        {/* <Agent /> */}
      </div>
    </main>
  );
};

export default InterviewPage;
