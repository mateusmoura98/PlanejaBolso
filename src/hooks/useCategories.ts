import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'

export interface Category {
  id: string
  created_at: string
  nome: string
  userid: string | null
}

export function useCategories() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      
      // CORREÇÃO: Removemos .eq('userid', user.id)
      // Agora ele respeita o RLS do banco e mostra categorias da família
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('nome', { ascending: true })

      if (error) {
        toast({
          title: "Erro ao carregar categorias",
          description: error.message,
          variant: "destructive",
        })
        throw error
      }

      return data as Category[]
    },
    enabled: !!user?.id,
  })

  const addCategory = useMutation({
    mutationFn: async (nome: string) => {
      const { data, error } = await supabase
        .from('categorias')
        .insert([{ nome, userid: user?.id }])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast({ title: "Categoria adicionada com sucesso!" })
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao adicionar categoria",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const updateCategory = useMutation({
    mutationFn: async ({ id, nome }: { id: string; nome: string }) => {
      const { data, error } = await supabase
        .from('categorias')
        .update({ nome })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast({ title: "Categoria atualizada com sucesso!" })
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar categoria",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('categorias')
        .delete()
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast({ title: "Categoria excluída com sucesso!" })
    },
    onError: (error: any) => {
      // Tratamento especial para erro de chave estrangeira
      if (error.code === '23503') {
        toast({
          title: "Não é possível excluir",
          description: "Esta categoria está sendo usada em transações.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Erro ao excluir categoria",
          description: error.message,
          variant: "destructive",
        })
      }
    },
  })

  return {
    categories,
    isLoading,
    addCategory,
    updateCategory,
    deleteCategory
  }
}
