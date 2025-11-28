import { useState } from 'react';
import { RegistrationService } from '../models/RegistrationService';
import type { UserRegistrationData, Question, ExamResult, AnswerPayload, CertificateResponse } from '../models/RegistrationModels';
import { useNavigate } from 'react-router-dom';

export const useRegistrationViewModel = () => {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [userData, setUserData] = useState<UserRegistrationData>({
        name: '', email: '', password: ''
    });
    
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

    const [examResult, setExamResult] = useState<ExamResult | null>(null);
    const [certificate, setCertificate] = useState<CertificateResponse | null>(null);

    const handleSaveUserData = async (data: UserRegistrationData) => {
        setLoading(true);
        setError(null);
        try {
            setUserData(data);
            const q = await RegistrationService.getQuestions();
            setQuestions(q);
            setCurrentStep(2);
        } catch (err) {
            setError("Error al cargar el examen.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAnswer = (qId: string, aId: string) => {
        setSelectedAnswers(prev => ({ ...prev, [qId]: aId }));
    };

    const handleSubmitExam = async () => {
        setLoading(true);
        setError(null);
        try {
            const answersArray: AnswerPayload[] = Object.entries(selectedAnswers).map(([q, a]) => ({
                questionId: q, selectedAnswerId: a
            }));

            const result = await RegistrationService.submitExam({
                name: userData.name,
                answers: answersArray
            });

            setExamResult(result);
            setCurrentStep(3);
        } catch (err) {
            setError("Error al calificar el examen.");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateKeyAndRegister = async () => {
        setLoading(true);
        setError(null);
        try {
            const createdUser = await RegistrationService.createUser(userData);

            console.log("Usuario creado:", createdUser);

            const userIdString = (createdUser.id as any).value || createdUser.id;

            const certData = await RegistrationService.createCertificate({
                userId: userIdString,
                name: createdUser.name,
                status: true
            });

            setCertificate(certData);
            setCurrentStep(4);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Error en el proceso de registro final.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setUserData({ name: '', email: '', password: '' });
        setQuestions([]);
        setSelectedAnswers({});
        setExamResult(null);
        setCertificate(null);
        setError(null);
        setCurrentStep(1);
    };

    const handleFinish = () => {
        navigate('/');
    };

    return {
        currentStep,
        loading,
        error,
        userData,
        questions,
        selectedAnswers,
        examResult,
        certificate,
        handleSaveUserData,
        handleSelectAnswer,
        handleSubmitExam,
        handleGenerateKeyAndRegister,
        handleReset,
        handleFinish
    };
};