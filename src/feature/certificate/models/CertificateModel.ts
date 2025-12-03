// Define la estructura de los datos que se envían
export interface CertificateInput {
    userId: string;
    key: string;
}

// Define la respuesta que esperamos del servidor
export interface CertificateResponse {
    verified: boolean;
    message: string;
    detail?: string;
}