import { Link } from 'react-router-dom';
import { useCertificateValidatorViewModel } from '../viewmodel/useCertificateValidatorViewModel';

const CertificateValidatorView = () => {
    const { 
        formData, 
        handleChange, 
        handleSubmit, 
        loading, 
        result, 
        error 
    } = useCertificateValidatorViewModel();

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <Link to="/">
                <button style={{ marginBottom: '20px' }}>← Volver</button>
            </Link>

            <h1>Validar Certificado</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>User ID (UUID):</label>
                    <input
                        type="text"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        placeholder="Ej: 550e8400-e29b-41d4-a716-446655440000"
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Clave del Certificado:</label>
                    <input
                        type="text"
                        name="key"
                        value={formData.key}
                        onChange={handleChange}
                        placeholder="Ingrese la clave"
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        padding: '10px', 
                        backgroundColor: loading ? '#ccc' : '#1890ff', 
                        color: 'white', 
                        border: 'none', 
                        cursor: loading ? 'not-allowed' : 'pointer' 
                    }}
                >
                    {loading ? 'Verificando...' : 'Verificar Certificado'}
                </button>
            </form>

            {/* Sección de Resultados */}
            <div style={{ marginTop: '20px' }}>
                {error && (
                    <div style={{ padding: '15px', backgroundColor: '#fff1f0', border: '1px solid #ffa39e', color: '#cf1322' }}>
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {result && result.verified && (
                    <div style={{ padding: '15px', backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', color: '#389e0d' }}>
                        <h3>✅ Certificado Válido</h3>
                        <p>{result.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificateValidatorView;