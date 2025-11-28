import type { 
    UserRegistrationData, 
    Question, 
    ExamSubmission, 
    ExamResult, 
    CertificatePayload,
    CertificateResponse,
    UserResponse
} from "./RegistrationModels";

const MAIN_API_URL = "http://localhost:3000/api/v1";
const USER_API_URL = "http://localhost:3001/api/v1";
const CERT_API_URL = "http://localhost:3002/api/v1";

export const RegistrationService = {
    getQuestions: async (): Promise<Question[]> => {
        const response = await fetch(`${MAIN_API_URL}/questions/randoms`);
        if (!response.ok) throw new Error("Error cargando preguntas");
        return await response.json();
    },

    submitExam: async (payload: ExamSubmission): Promise<ExamResult> => {
        const response = await fetch(`${MAIN_API_URL}/evaluate/check`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error("Error evaluando examen");
        return await response.json();
    },

    createUser: async (userData: UserRegistrationData): Promise<UserResponse> => {
        const response = await fetch(`${USER_API_URL}/user/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error creando usuario");
        return data; 
    },

    createCertificate: async (payload: CertificatePayload): Promise<CertificateResponse> => {
        const response = await fetch(`${CERT_API_URL}/createCertificate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Error generando certificado");
        return data;
    }
};