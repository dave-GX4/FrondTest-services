export interface QuestionOption {
    id?: string;
    text: string;
}

export interface Question {
    id: string;
    questionText: string;
    answers: QuestionOption[];
    correctAnswer: string;
}

export interface CreateQuestionDTO {
    questionText: string;
    answers: { text: string }[];
    correctAnswerIndex: number;
}

export interface AnswerResponse {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface AnswerDTO {
    text: string;
    isCorrect: boolean;
}

export interface CreateQuestionRequest {
    questionText: string;
    answers: AnswerDTO[];
}

export interface QuestionResponse {
    id: string;
    questionText: string;
    answers: AnswerResponse[];
}

