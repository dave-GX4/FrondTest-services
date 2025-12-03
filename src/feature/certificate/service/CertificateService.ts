import type { CertificateInput, CertificateResponse } from "../models/CertificateModel";

export const verifyCertificate = async (input: CertificateInput): Promise<CertificateResponse> => {
    const response = await fetch('http://localhost:3002/api/v1/findCertificate', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
    });

    const data = await response.json();

    if (!response.ok) {
        // Lanzamos un error con la info del backend si falla (ej. 400 o 500)
        throw new Error(data.message || "Error al verificar el certificado");
    }

    return data as CertificateResponse;
};