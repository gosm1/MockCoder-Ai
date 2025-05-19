import Sidebar from '@/components/Sidebar';
import { getCurrentUser, getInterviewById } from '@/lib/actions/auth.action';
import { getFeedbackByInterviewId, getInterviewByIdForSesion } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import React from 'react';


const page = async ({ params }: RouteParams) => {
  const { id } = params;
  const user = await getCurrentUser();

  if (!user) redirect('/login'); // Protect route if no user

  const interview = await getInterviewByIdForSesion(id);
  if (!interview) redirect('/interviews');

  const feedback = await getFeedbackByInterviewId({ interviewId: id, userId: user.id });
  if (!feedback) redirect('/interviews'); // or show some message if no feedback

  // Calculate total score as sum of category scores
  const totalScore = feedback.categoryScores.reduce((sum, cat) => sum + cat.score, 0);


  // Badge and progress bar color helpers
  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 text-green-400';
    if (score >= 60) return 'bg-yellow-500/20 text-yellow-400';
    if (score >= 40) return 'bg-orange-500/20 text-orange-400';
    return 'bg-red-500/20 text-red-400';
  };
  const getProgressBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Color for total score out of 500
  // We'll normalize totalScore to percentage and then apply colors
  const totalScorePercent = (totalScore / 500) * 100;
  const getTotalScoreColor = (scorePercent: number) => {
    if (scorePercent >= 80) return 'text-green-400';
    if (scorePercent >= 60) return 'text-yellow-400';
    if (scorePercent >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <div className="min-h-screen bg-[#0e0e13] text-white py-8 px-6">
          <div className="min-h-screen text-white">
            {/* Background gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
              {/* Header Section */}
              <div className="relative overflow-hidden rounded-2xl bg-white/[0.05] border border-white/10 p-8 mb-8">
                <div className="absolute -top-40 -right-10 w-64 h-64 bg-purple-700/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-10 w-64 h-64 bg-indigo-700/20 rounded-full blur-3xl"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-white">{interview.role} interview</h1>
                      <div className="mt-2 flex flex-wrap items-center gap-4">
                        <div className="flex items-center text-sm text-gray-300">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{interview.createdAt.substring(0, 10)}</span>
                        </div>
                        <div className="px-3 py-1 rounded-md text-xs font-medium bg-purple-700/40">
                          {interview.type}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`text-4xl font-bold ${getTotalScoreColor(totalScorePercent)}`}>
                      {totalScore}
                    </div>
                    <div className="text-gray-400 text-sm">Score out of 500</div>
                  </div>
                </div>
              </div>

              {/* Overview content */}
              <div className="space-y-6">
                {/* Score Summary */}
                <div className="relative overflow-hidden rounded-2xl bg-white/[0.05] border border-white/10 p-6">
                  <div className="absolute -top-40 -right-10 w-64 h-64 bg-purple-700/10 rounded-full blur-3xl"></div>
                  <h2 className="text-xl font-semibold mb-4">Score Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feedback.categoryScores.map((category) => (
                      <div key={category.name} className="bg-white/5 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{category.name}</h3>
                          <span
                            className={`${getScoreBadgeColor(category.score)} px-2 py-1 rounded text-xs font-medium`}
                          >
                            {category.score}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2 mb-1">
                          <div
                            className={`${getProgressBarColor(category.score)} h-2 rounded-full`}
                            style={{ width: `${category.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Areas For Improvement */}
                {feedback.areasForImprovement.length > 0 && (
                  <div className="relative overflow-hidden rounded-2xl bg-white/[0.05] border border-white/10 p-6">
                    <h2 className="text-xl font-semibold mb-4">Areas for Improvement</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {feedback.areasForImprovement.map((area, index) => (
                        <li key={index}>{area}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Final Assessment */}
                <div className="relative overflow-hidden rounded-2xl bg-white/[0.05] border border-white/10 p-6">
                  <div className="absolute -bottom-40 -left-10 w-64 h-64 bg-indigo-700/10 rounded-full blur-3xl"></div>
                  <h2 className="text-xl font-semibold mb-4">Final Assessment</h2>
                  <p className="text-gray-300">{feedback.finalAssessment}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
