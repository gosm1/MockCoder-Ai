import React from 'react';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewByIdForSesion } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import InterviewPage from '@/components/InterviewPage';
import Agent from '@/components/Agent';


const Page = async ({ params }: RouteParams ) => {
    const { id } =  params;
    const user = await getCurrentUser();
    const interview = await getInterviewByIdForSesion(id);

    if (!interview) redirect('/interviews');

    return (
        <main>
            <InterviewPage interview={interview} userid={user?.id} />
            <Agent userName={user?.name!} userId={user?.id!} interviewId={id} type="interview" questions={interview.questions} />

        </main>
        
    )
};

export default Page;