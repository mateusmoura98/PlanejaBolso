// ==============================================
// META PIXEL - CONFIGURAÇÃO SIMPLIFICADA
// Sem página de planos - Rastreamento direto no checkout
// ==============================================
// Pixel ID: 1840024750012329

export const PIXEL_CONFIG = {
  PIXEL_ID: '1840024750012329',
  ACCESS_TOKEN: 'EAFss479W3ZA8BQmAeyVqaKb80yHMiYpT2uCLxnGB9lFYK3ouDdZB54ikc9MXvAuVjldItrzb8bumDEXS7t6cEnzotEROZCmmUDCxWmZBD6WyP5u11ZAdigK13C9d7HK52S1ZCcWWY1YR9UHUZBsucBMM4TdmFtIioDHFNMjnGbGxl6GXpLbJtR4Aurwulkj78hcKAZDZD',
  API_VERSION: 'v19.0'
};

// Tipos de eventos
export type PixelEvent = 
  | 'PageView'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Purchase';

// Interface para dados do evento
interface EventData {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  content_ids?: string[];
  contents?: Array<{
    id: string;
    quantity: number;
    item_price: number;
  }>;
  payment_info_available?: number;
}

// Declaração do fbq global
declare global {
  interface Window {
    fbq: (
      command: 'track' | 'init' | 'trackCustom',
      eventName: string,
      data?: EventData
    ) => void;
    _fbq: typeof window.fbq;
  }
}

// ==============================================
// INICIALIZAR O PIXEL
// ==============================================
export const initPixel = () => {
  if (typeof window === 'undefined') return;
  if (window.fbq) return;

  // Código do pixel
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js'
  );

  window.fbq('init', PIXEL_CONFIG.PIXEL_ID);
  window.fbq('track', 'PageView');
  
  console.log('✅ Meta Pixel inicializado:', PIXEL_CONFIG.PIXEL_ID);
};

// ==============================================
// RASTREAR EVENTO (BROWSER)
// ==============================================
export const trackPixelEvent = (eventName: PixelEvent, data?: EventData) => {
  if (typeof window === 'undefined' || !window.fbq) {
    console.warn('⚠️ Meta Pixel não inicializado');
    return;
  }

  console.log('📊 Meta Pixel Event:', eventName, data);
  window.fbq('track', eventName, data);
};

// ==============================================
// ENVIAR EVENTO VIA API (SERVER SIDE)
// ==============================================
export const sendServerSideEvent = async (
  eventName: PixelEvent,
  userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  },
  customData?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
  }
) => {
  try {
    const url = `https://graph.facebook.com/${PIXEL_CONFIG.API_VERSION}/${PIXEL_CONFIG.PIXEL_ID}/events`;
    
    // Hash dos dados do usuário (SHA256)
    const hashData = async (data: string) => {
      if (!data) return '';
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data.toLowerCase().trim());
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const user_data: any = {};
    
    if (userData.email) user_data.em = [await hashData(userData.email)];
    if (userData.phone) user_data.ph = [await hashData(userData.phone.replace(/\D/g, ''))];
    if (userData.firstName) user_data.fn = [await hashData(userData.firstName)];
    if (userData.lastName) user_data.ln = [await hashData(userData.lastName)];
    if (userData.city) user_data.ct = [await hashData(userData.city)];
    if (userData.state) user_data.st = [await hashData(userData.state)];
    if (userData.zip) user_data.zp = [await hashData(userData.zip)];
    if (userData.country) user_data.country = [await hashData(userData.country)];

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          user_data,
          custom_data: customData || {}
        }
      ],
      access_token: PIXEL_CONFIG.ACCESS_TOKEN
    };

    console.log('📊 Enviando evento Server-Side:', eventName);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Evento Server-Side enviado:', result);
      return { success: true, data: result };
    } else {
      console.error('❌ Erro no evento Server-Side:', result);
      return { success: false, error: result };
    }
    
  } catch (error) {
    console.error('❌ Erro na API do Facebook:', error);
    return { success: false, error };
  }
};

// ==============================================
// EVENTOS DO FUNIL (SIMPLIFICADO)
// ==============================================
export const pixelEvents = {
  // 1️⃣ Iniciou checkout (quando carrega a página de checkout)
  initiateCheckout: (planName: string, planValue: number) => {
    trackPixelEvent('InitiateCheckout', {
      content_name: planName,
      value: planValue,
      currency: 'BRL',
      content_ids: [planName === 'Individual' ? 'plan_individual' : 'plan_familia'],
      contents: [{
        id: planName === 'Individual' ? 'plan_individual' : 'plan_familia',
        quantity: 1,
        item_price: planValue
      }]
    });
  },

  // 2️⃣ Selecionou método de pagamento
  addPaymentInfo: (paymentMethod: 'CREDIT_CARD' | 'PIX', planValue: number) => {
    trackPixelEvent('AddPaymentInfo', {
      content_name: `Payment: ${paymentMethod}`,
      value: planValue,
      currency: 'BRL',
      payment_info_available: 1
    });
  },

  // 3️⃣ CONVERSÃO! Compra concluída (Browser)
  purchase: (planName: string, planValue: number, transactionId?: string) => {
    trackPixelEvent('Purchase', {
      content_name: planName,
      value: planValue,
      currency: 'BRL',
      content_ids: [transactionId || 'unknown'],
      contents: [{
        id: planName === 'Individual' ? 'plan_individual' : 'plan_familia',
        quantity: 1,
        item_price: planValue
      }]
    });
  },

  // 3️⃣B CONVERSÃO! Compra concluída (Server-Side via API)
  purchaseServerSide: async (
    email: string,
    phone: string,
    holderName: string,
    planName: string,
    planValue: number,
    transactionId?: string
  ) => {
    const [firstName, ...lastNameParts] = holderName.split(' ');
    const lastName = lastNameParts.join(' ');

    return await sendServerSideEvent(
      'Purchase',
      {
        email,
        phone,
        firstName,
        lastName,
        country: 'br'
      },
      {
        value: planValue,
        currency: 'BRL',
        content_name: planName,
        content_category: 'Subscription',
        content_ids: [transactionId || 'unknown']
      }
    );
  }
};
