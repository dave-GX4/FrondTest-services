import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AnswerDTO, CreateQuestionRequest } from '../models/questionType';

export const useCreateQuestionViewModel = () => {
    const navigate = useNavigate();
    
    const [questionText, setQuestionText] = useState("");
    
    const [numOptions, setNumOptions] = useState<number>(3);
    
    const [answers, setAnswers] = useState<AnswerDTO[]>([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
    ]);

    const handleNumOptionsChange = (newCount: number) => {
        setNumOptions(newCount);
        
        const currentAnswers = [...answers];
        
        if (newCount > currentAnswers.length) {
            while (currentAnswers.length < newCount) {
                currentAnswers.push({ text: '', isCorrect: false });
            }
        } else {
            currentAnswers.splice(newCount);
            
            const hasCorrect = currentAnswers.some(a => a.isCorrect);
            if (!hasCorrect && currentAnswers.length > 0) {
                // Opcional: poner la primera como correcta por defecto si se borró la correcta
                // currentAnswers[0].isCorrect = true; 
            }
        }
        setAnswers(currentAnswers);
    };

    const handleAnswerTextChange = (index: number, text: string) => {
        const newAnswers = [...answers];
        newAnswers[index].text = text;
        setAnswers(newAnswers);
    };

    const handleCorrectChange = (index: number, isCorrectStr: string) => {
        const isCorrect = isCorrectStr === 'true';
        const newAnswers = [...answers];

        if (isCorrect) {
            newAnswers.forEach((ans, i) => {
                ans.isCorrect = (i === index);
            });
        } else {
            newAnswers[index].isCorrect = false;
        }

        setAnswers(newAnswers);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!questionText.trim()) return alert("Escribe la pregunta");
        const hasCorrect = answers.some(a => a.isCorrect);
        if (!hasCorrect) return alert("Debes marcar al menos una respuesta como Correcta");
        const emptyAnswers = answers.some(a => !a.text.trim());
        if (emptyAnswers) return alert("Completa el texto de todas las respuestas");

        const payload: CreateQuestionRequest = {
            questionText: questionText,
            answers: answers
        };

        try {
            const response = await fetch('http://localhost:3000/api/v1/questions/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.status === 201) {
                alert("¡Pregunta guardada!");
                navigate('/');
            } else {
                alert("Error al guardar");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    return {
        questionText, setQuestionText,
        numOptions, handleNumOptionsChange,
        answers, 
        handleAnswerTextChange,
        handleCorrectChange,
        handleSubmit
    };
};