// src/utils/whatsapp.ts

export const validateWhatsAppNumber = async (phone: string) => {
  // URL DE PRODUÇÃO DO SEU N8N
  const N8N_URL = "https://planejabolso-n8n.kirvi2.easypanel.host/webhook/verifica-zap";

  try {
    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');

    const response = await fetch(N8N_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number: cleanPhone })
    });

    const data = await response.json();
    return data; // Retorna { exists: true/false, whatsapp: "..." }

  } catch (error) {
    console.error("Erro ao validar WhatsApp:", error);
    // Em caso de erro de conexão, deixamos passar (ou bloqueamos, você decide)
    return { exists: false };
  }
};
