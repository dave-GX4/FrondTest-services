import React, { useState } from 'react';
import { useRegistrationViewModel } from '../viewmodel/useRegistrationViewModel';

// --- SUBCOMPONENTES ---

// PASO 1: Formulario de Datos (Sin cambios, guarda en memoria)
const UserFormStep = ({ onSubmit, initialData }: any) => {
    const [form, setForm] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) return alert("Llena todos los campos");
        if (form.password.length < 10) return alert("La contraseña debe tener al menos 10 caracteres");
        
        onSubmit(form);
    };

    return (
        <div className="card">
            <h2>Paso 1: Tus Datos</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    name="name" placeholder="Nombre completo" 
                    value={form.name} onChange={handleChange} 
                    style={inputStyle} 
                />
                <input 
                    name="email" type="email" placeholder="Correo electrónico" 
                    value={form.email} onChange={handleChange} 
                    style={inputStyle}
                />
                <input 
                    name="password" type="password" placeholder="Contraseña (min 10 carácteres)" 
                    value={form.password} onChange={handleChange} 
                    style={inputStyle}
                />
                <button type="submit" style={btnStyle}>Continuar al Examen</button>
            </form>
        </div>
    );
};

// PASO 2: Examen (Sin cambios, responde preguntas)
const ExamStep = ({ questions, selectedAnswers, onSelect, onSubmit, loading }: any) => {
    return (
        <div className="card">
            <h2>Paso 2: Evaluación</h2>
            <p>Responde correctamente para poder registrarte.</p>
            
            {questions.map((q: any, index: number) => (
                <div key={q.id} style={{ marginBottom: '20px', textAlign: 'left' }}>
                    <p><strong>{index + 1}. {q.questionText}</strong></p>
                    {q.answers.map((ans: any) => (
                        <label key={ans.id} style={{ display: 'block', margin: '5px 0', cursor: 'pointer' }}>
                            <input 
                                type="radio" 
                                name={`q-${q.id}`} 
                                value={ans.id}
                                checked={selectedAnswers[q.id] === ans.id}
                                onChange={() => onSelect(q.id, ans.id)}
                            />
                            <span style={{ marginLeft: '8px' }}>{ans.text}</span>
                        </label>
                    ))}
                </div>
            ))}

            <button onClick={onSubmit} disabled={loading} style={btnStyle}>
                {loading ? 'Validando...' : 'Validar Respuestas'}
            </button>
        </div>
    );
};

// PASO 3: Resultados (ACTUALIZADO: Botón para Generar Clave)
const ResultStep = ({ result, onGenerate, onRetry, loading }: any) => {
    const isApproved = result?.status === true;

    return (
        <div className="card" style={{ textAlign: 'center' }}>
            <h2 style={{ color: isApproved ? 'green' : 'red' }}>
                {isApproved ? '¡Aprobado!' : 'No Aprobado'}
            </h2>
            <p style={{ fontSize: '1.2rem' }}>Puntaje obtenido: <strong>{result?.data?.score}</strong></p>
            <p>{result?.message}</p>

            {isApproved ? (
                <div>
                    <p>¡Felicidades! Has aprobado la evaluación.</p>
                    <p>Para finalizar tu registro, genera tu clave de certificado única.</p>
                    
                    <button 
                        onClick={onGenerate} 
                        disabled={loading} 
                        style={{...btnStyle, backgroundColor: '#28a745'}}
                    >
                        {loading ? 'Creando Usuario y Certificado...' : 'Generar Clave y Finalizar'}
                    </button>
                </div>
            ) : (
                <div>
                    <p>No alcanzaste el puntaje necesario para el registro.</p>
                    <button onClick={onRetry} style={{...btnStyle, backgroundColor: '#ff4d4f'}}>
                        Regresar al Registro
                    </button>
                </div>
            )}
        </div>
    );
};

// PASO 4: Final (NUEVO: Muestra la clave generada)
const FinalStep = ({ certificate, onFinish }: any) => {
    return (
        <div className="card" style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#007bff' }}>¡Registro Exitoso!</h1>
            <p>Tu usuario ha sido creado correctamente.</p>
            
            <div style={{ 
                background: '#f0f8ff', 
                padding: '20px', 
                margin: '20px 0', 
                border: '2px dashed #007bff', 
                borderRadius: '8px' 
            }}>
                <h3>Tu Clave de Certificado</h3>
                {/* Ajusta 'certificate.key.value' según la estructura exacta que devuelva tu API */}
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', wordBreak: 'break-all', fontFamily: 'monospace' }}>
                    {certificate?.key?.value || certificate?.key || "CLAVE-GENERADA"}
                </p>
                <small style={{ color: '#666' }}>
                    Guarda esta clave, es tu comprobante de aprobación.
                </small>
            </div>

            <button onClick={onFinish} style={btnStyle}>
                Ir al Inicio
            </button>
        </div>
    );
};

const RegistrationWizardView = () => {
    const vm = useRegistrationViewModel();

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: '#e0e0e0', zIndex: -1 }}></div>
                {[1, 2, 3, 4].map(step => (
                    <div key={step} style={{
                        width: '35px', height: '35px', borderRadius: '50%',
                        background: vm.currentStep >= step ? '#007bff' : '#fff',
                        color: vm.currentStep >= step ? '#fff' : '#999',
                        border: `2px solid ${vm.currentStep >= step ? '#007bff' : '#e0e0e0'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                        fontSize: '14px'
                    }}>
                        {step}
                    </div>
                ))}
            </div>

            {vm.error && (
                <div style={{ background: '#ffe6e6', color: '#d8000c', padding: '10px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #d8000c' }}>
                    {vm.error}
                </div>
            )}

            {vm.loading && vm.currentStep === 1 && <p style={{textAlign: 'center'}}>Cargando examen...</p>}

            {vm.currentStep === 1 && (
                <UserFormStep 
                    onSubmit={vm.handleSaveUserData} 
                    initialData={vm.userData} 
                />
            )}

            {vm.currentStep === 2 && (
                <ExamStep 
                    questions={vm.questions}
                    selectedAnswers={vm.selectedAnswers}
                    onSelect={vm.handleSelectAnswer}
                    onSubmit={vm.handleSubmitExam}
                    loading={vm.loading}
                />
            )}

            {vm.currentStep === 3 && vm.examResult && (
                <ResultStep 
                    result={vm.examResult}
                    onGenerate={vm.handleGenerateKeyAndRegister}
                    onRetry={vm.handleReset}
                    loading={vm.loading}
                />
            )}

            {vm.currentStep === 4 && vm.certificate && (
                <FinalStep 
                    certificate={vm.certificate}
                    onFinish={vm.handleFinish}
                />
            )}
        </div>
    );
};

const inputStyle = { padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' };
const btnStyle = { 
    padding: '12px 24px', 
    backgroundColor: '#007bff', 
    color: 'white', 
    border: 'none', 
    borderRadius: '5px', 
    fontSize: '16px', 
    cursor: 'pointer', 
    marginTop: '10px',
    transition: 'background 0.3s'
};

export default RegistrationWizardView;