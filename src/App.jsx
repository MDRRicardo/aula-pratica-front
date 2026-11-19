// =============================================================
//  App.jsx — o componente principal
//  Conceitos: useState (estado), useEffect (efeitos), async/await,
//  props (passar dados/funções para componentes filhos).
// =============================================================
import { useEffect, useState } from 'react'
import FormTarefa from './components/FormTarefa.jsx'
import ListaTarefas from './components/ListaTarefas.jsx'
import { api, BACKEND } from './services/api.js'

export default function App() {
  // ESTADO: quando muda, o React volta a desenhar o ecrã
  const [tarefas, setTarefas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  // EFEITO: corre UMA vez quando o componente aparece ([] = sem dependências)
  useEffect(() => {
    carregarTarefas()
  }, [])

  async function carregarTarefas() {
    try {
      setCarregando(true)
      const dados = await api.listar()      // pedido ao backend
      setTarefas(dados)
      setErro(null)
    } catch (e) {
      setErro('Não foi possível ligar ao backend: ' + e.message)
    } finally {
      setCarregando(false)
    }
  }

  async function adicionar(titulo) {
    const nova = await api.criar(titulo)
    setTarefas([...tarefas, nova])          // nunca alterar o array diretamente!
  }

  async function alternar(tarefa) {
    const atualizada = await api.atualizar(tarefa.id, { concluida: !tarefa.concluida })
    setTarefas(tarefas.map((t) => (t.id === tarefa.id ? atualizada : t)))
  }

  async function remover(id) {
    await api.apagar(id)
    setTarefas(tarefas.filter((t) => t.id !== id))
  }

  return (
    <main className="container">
      <h1>📝 Lista de Tarefas</h1>
      <p className="backend">
        Ligado a: <strong>{BACKEND === 'supabase' ? 'Supabase (BaaS)' : 'API local (Express)'}</strong>
      </p>

      <FormTarefa onAdicionar={adicionar} />

      {/* Renderização condicional */}
      {carregando && <p>A carregar...</p>}
      {erro && <p className="erro">{erro}</p>}
      {!carregando && !erro && (
        <ListaTarefas tarefas={tarefas} onAlternar={alternar} onRemover={remover} />
      )}
    </main>
  )
}
