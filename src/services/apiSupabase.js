// =============================================================
//  Ligação a um BaaS (Backend as a Service): SUPABASE
//  Não escrevemos servidor nenhum! O Supabase dá-nos uma base
//  de dados Postgres + API pronta. Usamos o SDK oficial.
// =============================================================
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const chave = import.meta.env.VITE_SUPABASE_ANON_KEY

// Só cria o cliente se as variáveis estiverem preenchidas
const supabase = url && chave ? createClient(url, chave) : null

function cliente() {
  if (!supabase) throw new Error('Configura VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env')
  return supabase
}

// O SDK devolve sempre { data, error }
function verificar({ data, error }) {
  if (error) throw new Error(error.message)
  return data
}

export async function listar() {
  return verificar(await cliente().from('tarefas').select('*').order('id'))
}

export async function criar(titulo) {
  return verificar(await cliente().from('tarefas').insert({ titulo }).select().single())
}

export async function atualizar(id, dados) {
  return verificar(await cliente().from('tarefas').update(dados).eq('id', id).select().single())
}

export async function apagar(id) {
  verificar(await cliente().from('tarefas').delete().eq('id', id))
  return null
}
