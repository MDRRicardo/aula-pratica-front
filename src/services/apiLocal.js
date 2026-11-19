// =============================================================
//  Ligação ao NOSSO backend (Express) usando fetch + REST
// =============================================================
const URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/tarefas'

// Função auxiliar: faz o pedido e trata erros HTTP
async function pedido(url, opcoes = {}) {
  const resposta = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes,
  })
  if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`)
  if (resposta.status === 204) return null   // 204 = sem conteúdo
  return resposta.json()
}

export function listar() {
  return pedido(URL)                                        // GET
}

export function criar(titulo) {
  return pedido(URL, {
    method: 'POST',
    body: JSON.stringify({ titulo }),
  })
}

export function atualizar(id, dados) {
  return pedido(`${URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(dados),
  })
}

export function apagar(id) {
  return pedido(`${URL}/${id}`, { method: 'DELETE' })
}
