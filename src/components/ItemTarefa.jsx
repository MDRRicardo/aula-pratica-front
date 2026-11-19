// Componente pequeno e reutilizável: mostra UMA tarefa
export default function ItemTarefa({ tarefa, onAlternar, onRemover }) {
  return (
    <li className={tarefa.concluida ? 'item feita' : 'item'}>
      <label>
        <input
          type="checkbox"
          checked={tarefa.concluida}
          onChange={() => onAlternar(tarefa)}
        />
        {tarefa.titulo}
      </label>
      <button onClick={() => onRemover(tarefa.id)} aria-label="Apagar">🗑️</button>
    </li>
  )
}
