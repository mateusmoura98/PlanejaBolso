import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

export interface ReportTransaction {
  id: number
  created_at: string
  quando: string | null
  estabelecimento: string | null
  valor: number | null
  detalhes: string | null
  tipo: string | null
  category_id: string
  categorias?: {
    id: string
    nome: string
  }
}

export interface ReportFilters {
  startDate: string
  endDate: string
  type: string
  categoryId: string
  period: 'day' | 'month' | 'year' | 'custom' | 'all' // Adicionado 'all' para prever a opção "Todos os períodos"
}

export function useReports() {
  const { user } = useAuth()
  const [filters, setFilters] = useState<ReportFilters>({
    startDate: '',
    endDate: '',
    type: '',
    categoryId: '',
    period: 'month'
  })

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['report-transactions', user?.id, filters],
    queryFn: async () => {
      if (!user?.id) return []
      
      let query = supabase
        .from('transacoes')
        .select(`
          *,
          categorias!transacoes_category_id_fkey (
            id,
            nome
          )
        `)

      // --- CORREÇÃO DOS FILTROS DE DATA ---
      let queryStartDate = filters.startDate;
      let queryEndDate = filters.endDate;

      // Se não houver datas customizadas, calculamos as datas com base no período selecionado
      if (!queryStartDate && !queryEndDate && filters.period !== 'all' && filters.period !== 'custom') {
        const hoje = new Date();
        
        if (filters.period === 'day') {
          // Início e fim do dia de hoje
          const inicioDoDia = new Date(hoje.setHours(0, 0, 0, 0));
          const fimDoDia = new Date(hoje.setHours(23, 59, 59, 999));
          queryStartDate = inicioDoDia.toISOString();
          queryEndDate = fimDoDia.toISOString();

        } else if (filters.period === 'month') {
          // Primeiro e último dia do mês atual
          const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
          const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0, 23, 59, 59, 999);
          queryStartDate = primeiroDia.toISOString();
          queryEndDate = ultimoDia.toISOString();

        } else if (filters.period === 'year') {
          // Primeiro e último dia do ano atual
          const primeiroDiaAno = new Date(hoje.getFullYear(), 0, 1);
          const ultimoDiaAno = new Date(hoje.getFullYear(), 11, 31, 23, 59, 59, 999);
          queryStartDate = primeiroDiaAno.toISOString();
          queryEndDate = ultimoDiaAno.toISOString();
        }
      }

      // Aplica as datas calculadas na query do Supabase
      if (queryStartDate) {
        query = query.gte('quando', queryStartDate)
      }
      if (queryEndDate) {
        query = query.lte('quando', queryEndDate)
      }
      // --- FIM DA CORREÇÃO ---

      // Apply type filter
      if (filters.type) {
        query = query.eq('tipo', filters.type)
      }

      // Apply category filter
      if (filters.categoryId) {
        query = query.eq('category_id', filters.categoryId)
      }

      const { data, error } = await query.order('quando', { ascending: false })

      if (error) {
        console.error('Erro ao buscar transações para relatório:', error)
        throw error
      }

      return data as ReportTransaction[]
    },
    enabled: !!user?.id,
  })

  // Calculate summary data
  const summaryData = useMemo(() => {
    const receitas = transactions
      .filter(t => t.tipo === 'receita')
      .reduce((acc, t) => acc + (t.valor || 0), 0)
    
    const despesas = transactions
      .filter(t => t.tipo === 'despesa')
      .reduce((acc, t) => acc + (t.valor || 0), 0)
    
    const saldo = receitas - despesas

    // Group by category
    const byCategory = transactions.reduce((acc, transaction) => {
      const categoryName = transaction.categorias?.nome || 'Sem categoria'
      const valor = transaction.valor || 0
      
      if (!acc[categoryName]) {
        acc[categoryName] = { receitas: 0, despesas: 0, total: 0 }
      }
      
      if (transaction.tipo === 'receita') {
        acc[categoryName].receitas += valor
      } else {
        acc[categoryName].despesas += valor
      }
      
      acc[categoryName].total = acc[categoryName].receitas - acc[categoryName].despesas
      
      return acc
    }, {} as Record<string, { receitas: number; despesas: number; total: number }>)

    // Group by type for chart data
    const chartData = [
      { name: 'Receitas', value: receitas, color: '#22c55e' },
      { name: 'Despesas', value: despesas, color: '#ef4444' }
    ]

    return {
      receitas,
      despesas,
      saldo,
      byCategory,
      chartData,
      totalTransactions: transactions.length
    }
  }, [transactions])

  return {
    transactions,
    isLoading,
    filters,
    setFilters,
    summaryData
  }
}
