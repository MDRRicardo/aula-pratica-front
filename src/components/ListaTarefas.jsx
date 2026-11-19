// Recebe dados por props e usa .map() para desenhar uma lista
import ItemTarefa from './ItemTarefa.jsx'

export default function ListaTarefas({ tarefas, onAlternar, onRemover }) {
  if (tarefas.length === 0) return <p>Nenhuma tarefa ainda 🎉</p>

  return (
    <ul className="lista">
      {tarefas.map((tarefa) => (
        // "key" ajuda o React a identificar cada item da lista
        <ItemTarefa
          key={tarefa.id}
          tarefa={tarefa}
          onAlternar={onAlternar}
          onRemover={onRemover}
        />
      ))}
    </ul>
  )
}
