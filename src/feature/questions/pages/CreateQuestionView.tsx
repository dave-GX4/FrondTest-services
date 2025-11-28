import { useCreateQuestionViewModel } from '../viewmodel/useCreateQuestionViewModel';

const CreateQuestionView = () => {
    const vm = useCreateQuestionViewModel();

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center' }}>Crear Nueva Pregunta</h2>
            
            <form onSubmit={vm.handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        ¿Cuál es la pregunta?
                    </label>
                    <input 
                        type="text" 
                        value={vm.questionText}
                        onChange={(e) => vm.setQuestionText(e.target.value)}
                        placeholder="Ej: ¿En qué año se descubrió América?"
                        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Cantidad de Respuestas:</label>
                    <select 
                        value={vm.numOptions}
                        onChange={(e) => vm.handleNumOptionsChange(Number(e.target.value))}
                        style={{ padding: '5px' }}
                    >
                        <option value={3}>3 Opciones</option>
                        <option value={4}>4 Opciones</option>
                        <option value={5}>5 Opciones</option>
                    </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {vm.answers.map((answer, index) => (
                        <div key={index} style={{ 
                            display: 'flex', 
                            gap: '10px', 
                            alignItems: 'center',
                            background: '#f9f9f9',
                            padding: '10px',
                            borderRadius: '5px'
                        }}>
                            <span style={{ fontWeight: 'bold' }}>#{index + 1}</span>
                            
                            <input 
                                type="text"
                                placeholder={`Respuesta ${index + 1}`}
                                value={answer.text}
                                onChange={(e) => vm.handleAnswerTextChange(index, e.target.value)}
                                style={{ flex: 1, padding: '8px' }}
                            />

                            <select 
                                value={answer.isCorrect ? 'true' : 'false'}
                                onChange={(e) => vm.handleCorrectChange(index, e.target.value)}
                                style={{ 
                                    padding: '8px', 
                                    borderColor: answer.isCorrect ? 'green' : '#ccc',
                                    color: answer.isCorrect ? 'white' : 'black',
                                    backgroundColor: answer.isCorrect ? 'green' : 'white',
                                    fontWeight: answer.isCorrect ? 'bold' : 'normal'
                                }}
                            >
                                <option value="false">Incorrecta</option>
                                <option value="true">Correcta ✅</option>
                            </select>
                        </div>
                    ))}
                </div>

                <button 
                    type="submit" 
                    style={{ 
                        marginTop: '30px', 
                        width: '100%', 
                        padding: '12px', 
                        background: '#007bff', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Guardar Pregunta
                </button>
            </form>
        </div>
    );
};

export default CreateQuestionView;