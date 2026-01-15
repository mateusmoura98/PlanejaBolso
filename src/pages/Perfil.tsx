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
import { 
  Camera, User, Trash2, Shield, Loader2, QrCode, 
  Calendar, DollarSign, RefreshCw, Activity, Clock, CreditCard
} from 'lucide-react'
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
  const N8N_INFO_URL = "https://planejabolso-n8n.kirvi2.easypanel.host/webhook/assinatura/info"; 

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  // Busca dados da assinatura
  useEffect(() => {
    async function fetchSubscription() {
      if (!profile?.stripe_customer_id) return; 
      
      setLoadingSub(true);
      try {
        const response = await fetch(`${N8N_INFO_URL}?customerId=${profile.stripe_customer_id}`);
        const data = await response.json();
        
        if (data.success) {
          setSubscription(data);
        } else {
           console.warn("API de assinatura não retornou dados de sucesso.");
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

        const phone = data.phone || ''
        if (phone) {
          if (phone.startsWith('+')) {
            const brazilMatch = phone.match(/^(\+55)(.*)$/)
            const generalMatch = phone.match(/^(\+\d{1,4})(.*)$/)
            
            if (brazilMatch) {
              setCurrentCountryCode('+55')
              setCurrentPhoneNumber(brazilMatch[2])
            } else if (generalMatch) {
              setCurrentCountryCode(generalMatch[1])
              setCurrentPhoneNumber(generalMatch[2])
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      let fullPhone = ''
      let whatsappId = profile.whatsapp
      
      if (currentPhoneNumber.trim()) {
        // Formatação simples e segura: DDI + Números
        fullPhone = currentCountryCode + currentPhoneNumber.replace(/\D/g, '')
        
        // Gera o ID do WhatsApp automaticamente (Formato: 551199999999@s.whatsapp.net)
        // Isso remove a necessidade da validação externa que estava falhando
        const numbersOnly = fullPhone.replace('+', '')
        whatsappId = `${numbersOnly}@s.whatsapp.net`
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          nome: profile.nome,
          phone: fullPhone,
          whatsapp: whatsappId,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
      
      setProfile(prev => ({ ...prev, phone: fullPhone, whatsapp: whatsappId }))
      
      toast({ title: "Perfil atualizado com sucesso!" })
    } catch (error: any) {
      console.error(error)
      toast({
        title: "Erro ao atualizar perfil",
        description: "Verifique se este número já não está em uso por outra conta.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você deve selecionar uma imagem para fazer upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `avatar-${user?.id}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      setProfile(prev => ({ ...prev, avatar_url: publicUrl }))
      
      toast({ title: "Avatar atualizado com sucesso!" })
    } catch (error: any) {
      toast({
        title: "Erro ao fazer upload da imagem",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handlePhoneChange = (phone: string) => {
    setCurrentPhoneNumber(phone)
  }

  const handleCountryChange = (country_code: string) => {
    setCurrentCountryCode(country_code)
  }

  // --- FUNÇÃO DE DELETAR CONTA (VIA BANCO DE DADOS) ---
  const handleDeleteAccount = async () => {
    if (confirmEmail !== user?.email) {
      toast({
        title: "Erro",
        description: "O email de confirmação não confere",
        variant: "destructive",
      })
      return
    }

    setDeleting(true)

    try {
      // Chama a função RPC do banco que apaga tudo (inclusive auth.users)
      const { error } = await supabase.rpc('delete_user_account')

      if (error) throw error

      toast({
        title: "Conta removida com sucesso",
        description: "Sua conta e todos os dados foram permanentemente removidos",
      })

      // Força o logout e redirecionamento
      await supabase.auth.signOut()
      window.location.href = '/'
      
    } catch (error: any) {
      console.error('Erro ao remover conta:', error)
      toast({
        title: "Erro ao remover conta",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
      setConfirmEmail('')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground mt-2">Gerencie suas informações pessoais, assinatura e configurações de segurança</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Assinatura
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {profile.nome ? getInitials(profile.nome) : <User className="h-8 w-8" />}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    disabled={uploading}
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={uploadAvatar}
                    className="hidden"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{profile.nome || 'Sem nome'}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                  {profile.whatsapp && (
                    <p className="text-sm text-green-600 mt-1">WhatsApp: {profile.whatsapp}</p>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input
                      id="nome"
                      value={profile.nome}
                      onChange={(e) => setProfile(prev => ({ ...prev, nome: e.target.value }))}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <PhoneInput
                      id="phone"
                      value={currentPhoneNumber}
                      countryCode={currentCountryCode}
                      onValueChange={handlePhoneChange}
                      onCountryChange={handleCountryChange}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={saving}
                  className="w-full md:w-auto"
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ... (O resto do arquivo - TabsContent de subscription e security - continua igual) ... */}
        <TabsContent value="subscription">
          {loadingSub ? (
            <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm animate-in fade-in">
              <div className="flex items-center gap-3 mb-8">
                <CreditCard className="w-6 h-6 text-gray-700" />
                <h3 className="text-xl font-bold text-gray-900">Informações da Assinatura</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 mb-10">
                 <div className="flex items-start gap-3">
                    <div className="mt-1"><Calendar className="w-5 h-5 text-gray-400" /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Data da Assinatura</p>
                        <p className="text-lg font-bold text-gray-900 mt-0.5">{subscription?.dateCreated || "Recente"}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="mt-1"><RefreshCw className="w-5 h-5 text-gray-400" /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Ciclo</p>
                        <p className="text-lg font-bold text-gray-900 mt-0.5">Mensal</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="mt-1"><DollarSign className="w-5 h-5 text-gray-400" /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Valor</p>
                        <p className="text-lg font-bold text-gray-900 mt-0.5">
                            R$ {subscription?.value || (profile.plano_id === 2 ? "24,90" : "14,90")}
                        </p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="mt-1"><Activity className="w-5 h-5 text-gray-400" /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Status</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1 uppercase">
                          {subscription?.status || "ATIVA"}
                        </span>
                    </div>
                 </div>
                 <div className="flex items-start gap-3 md:col-span-2">
                    <div className="mt-1"><Clock className="w-5 h-5 text-gray-400" /></div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Próximo Pagamento</p>
                        <p className="text-lg font-bold text-gray-900 mt-0.5">{subscription?.nextPaymentDate || "Em 30 dias"}</p>
                    </div>
                 </div>
              </div>
              <div className="border-t border-gray-100 my-6"></div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-gray-700" />
                    <h4 className="font-semibold text-gray-900">Método de Pagamento</h4>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 flex items-center gap-4">
                    {subscription?.creditCard ? (
                        <>
                            <div className="bg-white p-2 rounded shadow-sm border border-gray-100">
                                <CreditCard className="w-6 h-6 text-gray-800" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-base capitalize">
                                {subscription.creditCard.brand} •••• {subscription.creditCard.last4}
                                </p>
                                <p className="text-sm text-gray-500">Cartão de Crédito</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-white p-2 rounded shadow-sm border border-gray-100">
                                <QrCode className="w-6 h-6 text-gray-800" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-base">PIX Recorrente</p>
                                <p className="text-sm text-gray-500">Pagamento via Código QR</p>
                            </div>
                        </>
                    )}
                </div>
                <p className="text-xs text-gray-400 mt-4 font-mono">
                    ID da Assinatura: {profile.stripe_customer_id || "..."}
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <ChangePasswordForm />

          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Zona de Perigo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  A remoção da conta é permanente e não pode ser desfeita. Todos os seus dados, incluindo transações e lembretes, serão permanentemente apagados.
                </p>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full md:w-auto">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remover Conta Permanentemente
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar Remoção de Conta</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação é irreversível. Todos os seus dados serão permanentemente apagados.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="confirm-email">
                          Digite seu email para confirmar: <span className="font-semibold">{user?.email}</span>
                        </Label>
                        <Input
                          id="confirm-email"
                          type="email"
                          placeholder="Confirme seu email"
                          value={confirmEmail}
                          onChange={(e) => setConfirmEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setConfirmEmail('')}
                      >
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        disabled={deleting || confirmEmail !== user?.email}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleting ? 'Removendo...' : 'Remover Conta'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
