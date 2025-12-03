import { Link } from 'react-router-dom';
import { useQuestionListViewModel } from '../viewmodel/useQuestionListViewModel';

const QuestionListView = () => {
    const { questions, loading, deleteOne } = useQuestionListViewModel();

    if (loading) return <h3>Cargando...</h3>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Banco de Preguntas</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <Link to="/questions/create">
                    <button style={{ marginRight: '10px' }}>+ Nueva Pregunta</button>
                </Link>
                <Link to="/register">
                    <button>Registro de Usuarios</button>
                </Link>
                <Link to="/certificates/validate">
                    <button style={{ backgroundColor: '#722ed1', color: 'white' }}>Validar Certificado</button>
                </Link>
            </div>

            <table border={1} cellPadding={10} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#eee' }}>
                        <th>Pregunta</th>
                        <th>Respuestas (Verde = Correcta)</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q) => (
                        <tr key={q.id}>
                            <td>{q.questionText}</td>
                            <td>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {q.answers.map((ans) => (
                                        <li 
                                            key={ans.id} 
                                            style={{ 
                                                color: ans.isCorrect ? 'green' : 'black',
                                                fontWeight: ans.isCorrect ? 'bold' : 'normal'
                                            }}
                                        >
                                            {ans.isCorrect ? '✅ ' : '• '} 
                                            {ans.text}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <button 
                                    onClick={() => deleteOne(q.id)}
                                    style={{ 
                                        backgroundColor: '#ff4d4f', 
                                        color: 'white', 
                                        border: 'none', 
                                        padding: '5px 10px',
                                        cursor: 'pointer',
                                        borderRadius: '4px'
                                    }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuestionListView;