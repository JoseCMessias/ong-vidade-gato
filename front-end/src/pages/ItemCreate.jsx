import { useState } from 'react';
import { itemService } from '../services/itemService';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

export function ItemCreate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('O nome é obrigatório!');

    setSubmitting(true);
    try {
      await itemService.create({ name, description });
      navigate('/');
    } catch (error) {
      alert('Erro ao salvar item.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1>Cadastrar Novo Item</h1>
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
          {submitting ? 'Salvando...' : 'Salvar Registro'}
        </button>
      </form>
    </div>
  );
}