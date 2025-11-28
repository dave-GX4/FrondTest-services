export interface UserRegistrationData {
    name: string;
    email: string;
    password: string;
}

export interface Question {
    id: string;
    questionText: string;
    answers: { id: string; text: string }[];
}

export interface AnswerPayload {
    questionId: string;
    selectedAnswerId: string;
}

export interface ExamSubmission {
    name: string;
    answers: AnswerPayload[];
}

export interface ExamResult {
    status: boolean;
    message: string;
    data: {
        score: number;
        certificate_code?: string;
    };
}

export interface UserResponse {
    id: string;
    name: string;
    email: string;
}

export interface CertificatePayload {
    userId: string;
    name: string;
    status: boolean;
}

export interface CertificateResponse {
    id: string;
    key: string;
    userId: string;
    creationDate: string;
}