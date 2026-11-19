// =============================================================
//  Os componentes só conhecem estas 4 funções: listar, criar,
//  atualizar, apagar. Não sabem (nem precisam de saber) se os
//  dados vêm do Express ou do Supabase. Isto chama-se
//  "camada de serviço" (separação de responsabilidades).
// =============================================================
import * as apiLocal from './apiLocal.js'
import * as apiSupabase from './apiSupabase.js'

export const BACKEND = import.meta.env.VITE_BACKEND || 'local'

export const api = BACKEND === 'supabase' ? apiSupabase : apiLocal
