// Formulário controlado: o valor do input vive no estado do React
import { useState } from 'react'

export default function FormTarefa({ onAdicionar }) {
  const [titulo, setTitulo] = useState('')

  function submeter(evento) {
    evento.preventDefault()            // evita que a página recarregue
    if (!titulo.trim()) return
    onAdicionar(titulo.trim())         // avisa o componente pai (App)
    setTitulo('')                      // limpa o input
  }

  return (
    <form onSubmit={submeter} className="form">
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Nova tarefa..."
      />
      <button type="submit">Adicionar</button>
    </form>
  )
}
