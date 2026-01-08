import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { PhoneInput } from '@/components/ui/phone-input'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChangePasswordForm } from '@/components/profile/ChangePasswordForm'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { toast } from '@/hooks/use-toast'
import { Camera, User, Trash2, Settings, CreditCard, Shield, Loader2, QrCode } from 'lucide-react'
import { validateWhatsAppNumber } from '@/utils/whatsapp'
import { useNavigate } from 'react-router-dom'

interface Profile {
  nome: string
  phone: string
  whatsapp?: string
  avatar_url?: string
  stripe_customer_id?: string
  plano_id?: number
}

export default function Perfil() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Profile>({
    nome: '',
    phone: '',
  })
  const [currentCountryCode, setCurrentCountryCode] = useState('+55')
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [confirmEmail, setConfirmEmail] = useState('')
  const [deleting, setDeleting] = useState(false)

  // --- ESTADOS PARA A ASSINATURA ---
  const [subscription, setSubscription] = useState<any>(null);
  const [loadingSub, setLoadingSub] = useState(false);
  
  // URL DO SEU WEBHOOK N8N
  const N8N_INFO_URL = "https://planejabolso-n8n.kirvi2.easypanel.host/webhook-test/assinatura/info"; 

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  // Busca dados da assinatura
  useEffect(() => {
    async function fetchSubscription() {
      // Se não tiver ID do Asaas, nem tenta buscar (evita erro)
      if (!profile?.stripe_customer_id) return; 
      
      setLoadingSub(true);
      try {
        const response = await fetch(`${N8N_INFO_URL}?customerId=${profile.stripe_customer_id}`);
        const data = await response.json();
        
        if (data.success) {
          setSubscription(data);
        } else {
           // Se a API falhar, não faz nada (deixa o fallback do perfil)
           console.warn("API de assinatura não retornou dados.");
        }
      } catch (error) {
        console.error("Erro ao buscar assinatura:", error);
      } finally {
        setLoadingSub(false);
      }
    }

    if (profile.stripe_customer_id) {
        fetchSubscription();
    }
  }, [profile.stripe_customer_id]);


  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('nome, phone, whatsapp, avatar_url, stripe_customer_id, plano_id')
        .eq('id', user?.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      
      if (data) {
        setProfile({
          nome: data.nome || '',
          phone: data.phone || '',
          whatsapp: data.whatsapp || '',
          avatar_url: data.avatar_url,
          stripe_customer_id: data.stripe_customer_id,
          plano_id: data.plano_id
        })
        
        // ... (código de formatação do telefone mantido)
        const phone = data.phone || ''
        if (phone) {
          if (phone.startsWith('+')) {
            const brazilMatch = phone.match(/^(\+55)(.*)$/)
            if (brazilMatch) {
              setCurrentCountryCode('+55')
              setCurrentPhoneNumber(brazilMatch[2])
            } else {
              setCurrentCountryCode('+55')
              setCurrentPhoneNumber(phone)
            }
          } else {
            setCurrentCountryCode('+55')
            setCurrentPhoneNumber(phone)
          }
        } else {
          setCurrentCountryCode('+55')
          setCurrentPhoneNumber('')
        }
      }
    } catch (error: any) {
      toast({
        title: "Erro ao carregar perfil",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // ... (funções handleSubmit, uploadAvatar, handleDeleteAccount mantidas iguais)
  // Vou resumir para focar na correção da tela de assinatura

  const handleSubmit = async (e: React.FormEvent) => {
      // (Seu código original de salvar perfil)
      e.preventDefault();
      // ...
  }
  const uploadAvatar = async (e: any) => { /* ... */ }
  const handleDeleteAccount = async () => { /* ... */ }
  const handlePhoneChange = (v: string) => setCurrentPhoneNumber(v)
  const handleCountryChange = (v: string) => setCurrentCountryCode(v)
  const getInitials = (n: string) => n.substring(0,2).toUpperCase()


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* ... (Header e Tabs iguais) ... */}
      
      <Tabs defaultValue="profile" className="w-full">
        {/* ... (TabsList igual) ... */}
        
        <TabsContent value="profile">
             {/* ... (Formulário de Perfil igual) ... */}
        </TabsContent>

        <TabsContent value="subscription">
          {loadingSub ? (
            <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-green-600" /></div>
          ) : (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-in fade-in">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Sua Assinatura</h3>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="bg-green-100 p-3 rounded-full">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">
                    {/* LÓGICA DE FALLBACK: Se a API falhar, mostra o plano que está no banco */}
                    {subscription?.planName || (profile.plano_id === 2 ? "Plano Família" : "Plano Individual")}
                  </p>
                  <p className="text-sm text-gray-500">
                    R$ {subscription?.value || (profile.plano_id === 2 ? "24,90" : "14,90")} / mês
                  </p>
                </div>
              </div>

              {/* LÓGICA DO CARTÃO / PIX */}
              {subscription?.creditCard ? (
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Forma de Pagamento</p>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-700 capitalize text-lg">
                      {subscription.creditCard.creditCardBrand || "Cartão"}
                    </span>
                    <span className="text-gray-500 font-mono text-lg">•••• {subscription.creditCard.creditCardNumber}</span>
                  </div>
                </div>
              ) : (
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Forma de Pagamento</p>
                  <div className="flex items-center gap-3">
                    {/* Se não tiver dados de cartão, assume que é PIX ou mostra padrão */}
                    <QrCode className="w-5 h-5 text-gray-500" />
                    <span className="font-bold text-gray-700 text-lg">PIX ou Boleto</span>
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-bold text-green-600 uppercase">{subscription?.status || "ATIVA"}</span>
              </div>
            </div>
          )}
        </TabsContent>

        {/* ... (TabsContent Security igual) ... */}
      </Tabs>
    </div>
  )
}
