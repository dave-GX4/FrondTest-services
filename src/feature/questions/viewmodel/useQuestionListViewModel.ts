import { useEffect, useState } from 'react';
import type { QuestionResponse } from '../models/questionType';

export const useQuestionListViewModel = () => {
    const [questions, setQuestions] = useState<QuestionResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAll = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/v1/questions/list');
            if (res.ok) {
                const data: QuestionResponse[] = await res.json();
                setQuestions(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteOne = async (id: string) => {
        console.log("ID a eliminar:", id)

        if(!confirm("¿Eliminar pregunta permanentemente?")) return;
        
        try {
            await fetch(`http://localhost:3000/api/v1/questions/delete/${id}`, {
                method: 'DELETE'
            });
            setQuestions(prev => prev.filter(q => q.id !== id));
        } catch (error) {
            alert("Error al eliminar");
        }
    };

    useEffect(() => { fetchAll() }, []);

    return { questions, loading, deleteOne };
};