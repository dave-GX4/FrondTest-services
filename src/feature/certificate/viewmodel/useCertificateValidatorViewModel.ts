import { useState } from 'react';
import type { CertificateInput, CertificateResponse } from '../models/CertificateModel';
import { verifyCertificate } from '../service/CertificateService';

export const useCertificateValidatorViewModel = () => {
    // Estado del formulario
    const [formData, setFormData] = useState<CertificateInput>({
        userId: '',
        key: ''
    });

    // Estados de la UI
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<CertificateResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Manejar cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar resultados anteriores al escribir
        if (result || error) {
            setResult(null);
            setError(null);
        }
    };

    // Enviar el formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await verifyCertificate(formData);
            setResult(response);
        } catch (err: any) {
            setError(err.message);
            setResult({ verified: false, message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        result,
        error,
        handleChange,
        handleSubmit
    };
};