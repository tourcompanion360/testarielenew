// Stripe Client Configuration
// Connect your Stripe account by adding your credentials to .env.local

/*
  Add these to your .env.local file:
  
  STRIPE_SECRET_KEY=your_stripe_secret_key
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
  STRIPE_WEBHOOK_SECRET=your_webhook_secret
*/

// Placeholder for Stripe client
// Uncomment and install stripe package when ready to connect

// import Stripe from 'stripe';
// 
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2023-10-16',
// });

// Pricing plans
export const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    description: 'Inizia gratuitamente',
    features: [
      'Accesso a 2 corsi base',
      '5 generazioni immagini AI/mese',
      'Chat AI limitata',
      'Prompt library base',
    ],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro Creator',
    price: 29,
    interval: 'month',
    description: 'Per creator seri',
    features: [
      'Tutti i corsi disponibili',
      '100 generazioni immagini AI/mese',
      '20 generazioni video AI/mese',
      'Chat AI illimitata',
      'Tutti i prompt della libreria',
      'Certificati di completamento',
      'Supporto prioritario',
    ],
    highlighted: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 79,
    interval: 'month',
    description: 'Per team e agenzie',
    features: [
      'Tutto in Pro Creator',
      'Generazioni illimitate',
      'API access',
      'White-label export',
      'Analytics avanzate',
      'Account team (5 utenti)',
      'Onboarding dedicato',
    ],
    highlighted: false,
  },
];

// Mock checkout function
export async function createCheckoutSession(planId: string, userId: string) {
  console.log('Mock checkout:', planId, userId);

  return {
    sessionId: 'mock_session_' + Date.now(),
    url: '#checkout-mock',
  };
}

// Mock subscription check
export async function getSubscription(userId: string) {
  console.log('Mock get subscription:', userId);

  return {
    planId: 'free',
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  };
}

// Real implementation (uncomment when ready)
/*
export async function createCheckoutSession(planId: string, userId: string) {
  const plan = pricingPlans.find(p => p.id === planId);
  if (!plan) throw new Error('Plan not found');

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: plan.name,
            description: plan.description,
          },
          unit_amount: plan.price * 100,
          recurring: {
            interval: plan.interval as 'month' | 'year',
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/student?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: {
      userId,
      planId,
    },
  });

  return {
    sessionId: session.id,
    url: session.url,
  };
}
*/
