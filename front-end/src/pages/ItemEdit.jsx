import { useState, useEffect } from 'react';
import { itemService } from '../services/itemService';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../App.css';

export function ItemEdit() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    itemService.getById(id)
      .then(item => {
        if (item) {
          setName(item.name);
          setDescription(item.description || '');
        }
      })
      .catch(() => alert('Erro ao carregar dados do item.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('O nome é obrigatório!');

    setSubmitting(true);
    try {
      await itemService.update(id, { name, description });
      navigate('/');
    } catch (error) {
      alert('Erro ao atualizar item.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container"><p>Carregando dados do item...</p></div>;
  }

  return (
    <div className="container">
      <h1>Editar Item</h1>
      <Link to="/" className="btn btn-secondary" style={{ marginBottom: '20px', display: 'inline-block' }}>
        Voltar
      </Link>

      <form onSubmit={handleSubmit} className="form-group">
        <input 
          type="text" 
          placeholder="Nome do item" 
          value={name} 
          onChange={e => setName(e.target.value)}
          required
          className="input-field"
        />
        <textarea 
          placeholder="Descrição detalhada" 
          value={description} 
          onChange={e => setDescription(e.target.value)}
          className="textarea-field"
        />
        <button type="submit" disabled={submitting} className="btn">
          {submitting ? 'Salvando...' : 'Atualizar Registro'}
        </button>
      </form>
    </div>
  );
}