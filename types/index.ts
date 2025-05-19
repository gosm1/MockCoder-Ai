type FormType = "sign-in" | "sign-up";

interface SignUpParams {
    uid : string,
    fullname : string,
    email : string,
    password : string
}   

interface SignInParams {
    email: string;
    idToken: string;
}

interface User {
    name: string;
    email: string;
    id: string;
}

interface AgentProps {
    userName: string;
    userId?: string;
    interviewId?: string;
    feedbackId?: string;
    type: "generate" | "interview";
    questions?: string[];
}

interface Interview {
    id: string;
    role: string;
    level: string;
    questions: string[];
    techstack: string[];
    createdAt: string;
    userId: string;
    type: string;
    finalized: boolean;
}

// interface RouteParams {
//     params: {
//         id: string;
//     };
//     searchParams?: Record<string, string>; // optional if not used
// }

type RouteParams = {
  params: {
    id: string;
  };
};


interface CreateFeedbackParams {
    interviewId: string;
    userId: string;
    transcript: { role: string; content: string }[];
    feedbackId?: string;
}

interface GetFeedbackByInterviewIdParams {
    interviewId: string;
    userId: string;
}

interface Feedback {
    id: string;
    interviewId: string;
    totalScore: number;
    categoryScores: Array<{
        name: string;
        score: number;
        comment: string;
    }>;
    strengths: string[];
    areasForImprovement: string[];
    finalAssessment: string;
    createdAt: string;
}