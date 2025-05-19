import InterviewCard from '@/components/InterviewCard';
import Sidebar from '@/components/Sidebar';
import { getCurrentUser, getInterviewById } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React from 'react';

const Page = async () => {
  const user = await getCurrentUser();
  const userInterviews = await getInterviewById(user?.id!);

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <div className="min-h-screen bg-[#0e0e13] text-white py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Your Interviews</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userInterviews && userInterviews.length > 0 ? (
                userInterviews.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    id={interview.id}
                    title={interview.role + " Interview"} 
                    date={new Date(interview.createdAt).toLocaleDateString()}
                    score="75"
                    category={interview.type || "Technical"}
                    techStack={interview.techstack } 
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-gray-400">No interviews found. Start a new interview to begin!</p>
                  <button className="mt-4 px-6 py-2 bg-purple-700 hover:bg-purple-600 rounded-full text-white font-medium transition-colors">
                    Start New Interview
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;