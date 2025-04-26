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