"use client";

import { createContext, useContext, useState, useEffect } from 'react';

// Translation data
const translations = {
  en: {
    // Navigation
    home: "Home",
    aboutUs: "About Us",
    mortgageCalculator: "Mortgage Calculator",
    start: "Start",
    getStarted: "Get started",
    
    // Home page
    heroTitle: "The first AI-powered Mortgage",
    heroSubtitle: "Our tech unlocks lower rates, higher chances of approval, and a lightning‑fast process from approval to closing. Over $100 billion funded.",
    noHardCreditCheck: "3 min | No hard credit check",
    
    // Navigation descriptions
    homeDesc: "Back to the homepage.",
    aboutUsDesc: "Learn about our mission and team.",
    mortgageCalculatorDesc: "Estimate your monthly payment.",
    startDesc: "Begin your mortgage journey.",
    
    // Features
    oneDayMortgage: "One Day Mortgage®",
    oneDayMortgageDesc: "Go from locked rate to Commitment Letter in a single day. Traditional lenders take weeks.",
    betterHeloc: "Better HELOC",
    betterHelocDesc: "Access up to 90% of your home equity as cash in as little as 7 days.",
    insurance: "Insurance",
    insuranceDesc: "Shop, bundle, and save on insurance coverage for home, auto, life, and more.",
    
    // Trust section
    excellentRating: "Excellent",
    outOfFive: "out of 5",
    basedOnReviews: "Based on thousands of reviews",
    overBillionFunded: "Over $100 billion funded",
    
    // FAQ
    gotQuestions: "Got questions? We've got answers",
    aiMortgageQuestion: "How does AI mortgage lending work?",
    aiMortgageAnswer: "Our platform uses AI to streamline approvals, lower rates, and speed up the process from application to closing.",
    oneDayQuestion: "What is One Day Mortgage®?",
    oneDayAnswer: "Qualified customers can get a Commitment Letter in just one day after locking their rate.",
    getStartedQuestion: "How do I get started?",
    getStartedAnswer: "Click the 'Get started' button and complete the quick onboarding. No hard credit check required.",
    
    // Contact
    callUs: "Call us anytime at",
    email: "Email:",
    
    // Footer
    copyright: "© 2025 Better Home & Finance Holding Company.",
    
    // Chatbot
    chatbotTitle: "Better Mortgage Assistant",
    chatbotSubtitle: "AI-powered mortgage help",
    chatbotWelcome: "👋 Hello! I'm here to help you with mortgage calculations. Want to start?",
    chatbotPropertyPrice: "Great! What's the home price you're looking at?",
    chatbotDownPayment: "Got it! How much are you planning for a down payment?",
    chatbotInterestRate: "Noted. What interest rate are you expecting? (e.g., 6.5%)",
    chatbotLoanTerm: "Thanks! Over how many years would you like to take the loan?",
    chatbotCalculating: "Calculating your monthly payment...",
    chatbotMonthlyPayment: "Your estimated monthly payment is",
    chatbotBreakdown: "Breakdown:",
    chatbotLoanAmount: "Loan Amount",
    chatbotTotalInterest: "Total Interest",
    chatbotTotalPayment: "Total Payment",
    chatbotNextSteps: "Would you like to download a breakdown or recalculate?",
    chatbotInvalidPrice: "Please enter a valid property price (e.g., $400,000)",
    chatbotInvalidDownPayment: "Please enter a valid down payment amount (less than property price)",
    chatbotInvalidRate: "Please enter a valid interest rate (e.g., 6.5%)",
    chatbotInvalidTerm: "Please enter a valid loan term in years (e.g., 30)",
    chatbotDownloadReady: "Perfect! I've prepared your mortgage breakdown. Check your email or download it here.",
    chatbotSupport: "I'd be happy to connect you with our mortgage experts. Would you like to speak with a human advisor?",
    chatbotHumanSupport: "Great! I'm connecting you with our mortgage advisor. They'll be with you shortly. In the meantime, you can also call us at (415) 523-8837.",
    chatbotNoSupport: "No problem! Feel free to reach out anytime. Is there anything else I can help you with?",
    chatbotThankYou: "Thank you for using our mortgage calculator! Is there anything else I can help you with?",
    chatbotGoodbye: "No problem! Feel free to come back anytime. Have a great day!",
    chatbotClarify: "I'm here to help with mortgage calculations. Would you like to start? (Yes/No)",
    chatbotFallback: "I'm not sure I understood that. Could you please clarify?",
    chatbotPlaceholder: "Type your message...",
    
    // About Us page
    missionTitle: "We're making homeownership simpler, faster — and most importantly, more accessible for all Americans.",
    statusQuoTitle: "The status quo is broken",
    statusQuoText: "The traditional processes around homeownership are opaque and stressful. Fees aren't transparent and some are simply outrageous in size. Traditional mortgage lending is rife with unnecessary fees and slow, painful processes. It's a system set up to benefit insiders — not you. Better.com CEO, Vishal Garg, set out to change that.",
    changingThingsTitle: "How we're changing things",
    changingThingsText1: "Homeownership is a huge part of our economy. Housing overall is a $33 trillion business, and mortgages account for $15 trillion. Yet home finance operates in the same way it has for decades — through opaque systems and expensive intermediaries whose interests are misaligned with consumers'.",
    changingThingsText2: "That's why Better.com is redefining the homeownership process from the ground up. We're using technology to make it faster and more efficient, and humans to help make it friendly and enjoyable.",
    backedBy: "Backed by",
    companyTimeline: "Company Timeline",
    becomePartOfStory: "You become part of the story by joining tens of thousands of happy Better Mortgage borrowers.",
    
    // Timeline events
    timeline2014: "After Vishal Garg's first attempt to purchase his own dream home, he quickly realized that the homebuying process is unnecessarily broken. This inspired him to found a technology-first company led by engineers and data experts with the mission of digitizing and automating home finance to make it cheaper, easier, and faster for all.",
    timeline2015: "Better Mortgage funds its first mortgage loan entirely online (without a single phone call!).",
    timeline2016: "Better Mortgage becomes a Fannie Mae approved seller + servicer and establishes relationships with top mortgage investors.",
    timeline2017: "Better expands into the real estate market with Better Real Estate.",
    timeline2018: "Better Mortgage partners with Ally Bank to build Ally powered by Better.",
    timeline2019: "Better Mortgage launches its pilot partnership with American Express to deliver a seamless homebuying experience to AMEX customers.",
    timeline2021: "Better acquires Trussle — The UK's most innovative online mortgage broker.",
    timeline2022: "Better Mortgage becomes the first fintech to fund $100B home loans entirely online.",
    timeline2023: "Better Mortgage launches One Day Mortgage¹: The first offering to customers to go from application to full mortgage Commitment Letter within 24 hours vs. typical industry process of 30+ days. Better Mortgage launches the fully digital 3-day HELOC². Better Mortgage launches One Day Verified Approval Letter.",
    timelineToday: "You become part of the story by joining tens of thousands of happy Better Mortgage borrowers.",
  },
  es: {
    // Navigation
    home: "Inicio",
    aboutUs: "Sobre Nosotros",
    mortgageCalculator: "Calculadora de Hipoteca",
    start: "Comenzar",
    getStarted: "Comenzar",
    
    // Home page
    heroTitle: "La primera Hipoteca impulsada por IA",
    heroSubtitle: "Nuestra tecnología desbloquea tasas más bajas, mayores posibilidades de aprobación y un proceso ultrarrápido desde la aprobación hasta el cierre. Más de $100 mil millones financiados.",
    noHardCreditCheck: "3 min | Sin verificación de crédito dura",
    
    // Navigation descriptions
    homeDesc: "Volver a la página principal.",
    aboutUsDesc: "Conoce nuestra misión y equipo.",
    mortgageCalculatorDesc: "Estima tu pago mensual.",
    startDesc: "Comienza tu viaje hipotecario.",
    
    // Features
    oneDayMortgage: "Hipoteca de Un Día®",
    oneDayMortgageDesc: "Ve desde la tasa bloqueada hasta la Carta de Compromiso en un solo día. Los prestamistas tradicionales toman semanas.",
    betterHeloc: "Mejor HELOC",
    betterHelocDesc: "Accede hasta el 90% del valor de tu casa como efectivo en tan solo 7 días.",
    insurance: "Seguros",
    insuranceDesc: "Compra, agrupa y ahorra en cobertura de seguros para casa, auto, vida y más.",
    
    // Trust section
    excellentRating: "Excelente",
    outOfFive: "de 5",
    basedOnReviews: "Basado en miles de reseñas",
    overBillionFunded: "Más de $100 mil millones financiados",
    
    // FAQ
    gotQuestions: "¿Tienes preguntas? Tenemos respuestas",
    aiMortgageQuestion: "¿Cómo funciona el préstamo hipotecario con IA?",
    aiMortgageAnswer: "Nuestra plataforma usa IA para agilizar aprobaciones, reducir tasas y acelerar el proceso desde la solicitud hasta el cierre.",
    oneDayQuestion: "¿Qué es Hipoteca de Un Día®?",
    oneDayAnswer: "Los clientes calificados pueden obtener una Carta de Compromiso en solo un día después de bloquear su tasa.",
    getStartedQuestion: "¿Cómo empiezo?",
    getStartedAnswer: "Haz clic en el botón 'Comenzar' y completa el proceso rápido. Sin verificación de crédito dura requerida.",
    
    // Contact
    callUs: "Llámanos en cualquier momento al",
    email: "Email:",
    
    // Footer
    copyright: "© 2025 Better Home & Finance Holding Company.",
    
    // Chatbot
    chatbotTitle: "Asistente de Hipotecas Better",
    chatbotSubtitle: "Ayuda hipotecaria con IA",
    chatbotWelcome: "👋 ¡Hola! Estoy aquí para ayudarte con cálculos hipotecarios. ¿Quieres empezar?",
    chatbotPropertyPrice: "¡Genial! ¿Cuál es el precio de la casa que estás viendo?",
    chatbotDownPayment: "¡Entendido! ¿Cuánto planeas para el pago inicial?",
    chatbotInterestRate: "Anotado. ¿Qué tasa de interés esperas? (ej., 6.5%)",
    chatbotLoanTerm: "¡Gracias! ¿En cuántos años te gustaría tomar el préstamo?",
    chatbotCalculating: "Calculando tu pago mensual...",
    chatbotMonthlyPayment: "Tu pago mensual estimado es",
    chatbotBreakdown: "Desglose:",
    chatbotLoanAmount: "Monto del Préstamo",
    chatbotTotalInterest: "Interés Total",
    chatbotTotalPayment: "Pago Total",
    chatbotNextSteps: "¿Te gustaría descargar un desglose o recalcular?",
    chatbotInvalidPrice: "Por favor ingresa un precio de propiedad válido (ej., $400,000)",
    chatbotInvalidDownPayment: "Por favor ingresa un monto de pago inicial válido (menos que el precio de la propiedad)",
    chatbotInvalidRate: "Por favor ingresa una tasa de interés válida (ej., 6.5%)",
    chatbotInvalidTerm: "Por favor ingresa un plazo de préstamo válido en años (ej., 30)",
    chatbotDownloadReady: "¡Perfecto! He preparado tu desglose hipotecario. Revisa tu email o descárgalo aquí.",
    chatbotSupport: "Me encantaría conectarte con nuestros expertos hipotecarios. ¿Te gustaría hablar con un asesor humano?",
    chatbotHumanSupport: "¡Genial! Te estoy conectando con nuestro asesor hipotecario. Estarán contigo en breve. Mientras tanto, también puedes llamarnos al (415) 523-8837.",
    chatbotNoSupport: "No hay problema. No dudes en contactarnos en cualquier momento. ¿Hay algo más en lo que pueda ayudarte?",
    chatbotThankYou: "¡Gracias por usar nuestra calculadora hipotecaria! ¿Hay algo más en lo que pueda ayudarte?",
    chatbotGoodbye: "No hay problema. No dudes en volver en cualquier momento. ¡Que tengas un gran día!",
    chatbotClarify: "Estoy aquí para ayudar con cálculos hipotecarios. ¿Te gustaría empezar? (Sí/No)",
    chatbotFallback: "No estoy seguro de haber entendido eso. ¿Podrías aclarar?",
    chatbotPlaceholder: "Escribe tu mensaje...",
    
    // About Us page
    missionTitle: "Estamos haciendo la propiedad de vivienda más simple, rápida — y lo más importante, más accesible para todos los estadounidenses.",
    statusQuoTitle: "El status quo está roto",
    statusQuoText: "Los procesos tradicionales alrededor de la propiedad de vivienda son opacos y estresantes. Las tarifas no son transparentes y algunas son simplemente escandalosas en tamaño. El préstamo hipotecario tradicional está plagado de tarifas innecesarias y procesos lentos y dolorosos. Es un sistema configurado para beneficiar a los de adentro — no a ti. El CEO de Better.com, Vishal Garg, se propuso cambiar eso.",
    changingThingsTitle: "Cómo estamos cambiando las cosas",
    changingThingsText1: "La propiedad de vivienda es una gran parte de nuestra economía. La vivienda en general es un negocio de $33 billones, y las hipotecas representan $15 billones. Sin embargo, las finanzas de vivienda operan de la misma manera que lo han hecho durante décadas — a través de sistemas opacos e intermediarios costosos cuyos intereses están desalineados con los de los consumidores.",
    changingThingsText2: "Por eso Better.com está redefiniendo el proceso de propiedad de vivienda desde cero. Estamos usando tecnología para hacerlo más rápido y eficiente, y humanos para ayudar a hacerlo amigable y agradable.",
    backedBy: "Respaldado por",
    companyTimeline: "Cronología de la Empresa",
    becomePartOfStory: "Te conviertes en parte de la historia al unirte a decenas de miles de prestatarios felices de Better Mortgage.",
    
    // Timeline events
    timeline2014: "Después del primer intento de Vishal Garg de comprar su propia casa soñada, rápidamente se dio cuenta de que el proceso de compra de vivienda está innecesariamente roto. Esto lo inspiró a fundar una empresa tecnológica liderada por ingenieros y expertos en datos con la misión de digitalizar y automatizar las finanzas de vivienda para hacerlas más baratas, fáciles y rápidas para todos.",
    timeline2015: "Better Mortgage financia su primer préstamo hipotecario completamente en línea (¡sin una sola llamada telefónica!).",
    timeline2016: "Better Mortgage se convierte en un vendedor + servidor aprobado por Fannie Mae y establece relaciones con los principales inversores hipotecarios.",
    timeline2017: "Better se expande al mercado inmobiliario con Better Real Estate.",
    timeline2018: "Better Mortgage se asocia con Ally Bank para construir Ally powered by Better.",
    timeline2019: "Better Mortgage lanza su asociación piloto con American Express para ofrecer una experiencia de compra de vivienda sin problemas a los clientes de AMEX.",
    timeline2021: "Better adquiere Trussle — El corredor hipotecario en línea más innovador del Reino Unido.",
    timeline2022: "Better Mortgage se convierte en la primera fintech en financiar $100B en préstamos de vivienda completamente en línea.",
    timeline2023: "Better Mortgage lanza Hipoteca de Un Día¹: La primera oferta a los clientes para ir desde la solicitud hasta la Carta de Compromiso hipotecario completo dentro de 24 horas vs. el proceso típico de la industria de 30+ días. Better Mortgage lanza el HELOC² completamente digital de 3 días. Better Mortgage lanza la Carta de Aprobación Verificada de Un Día.",
    timelineToday: "Te conviertes en parte de la historia al unirte a decenas de miles de prestatarios felices de Better Mortgage.",
  },
  fr: {
    // Navigation
    home: "Accueil",
    aboutUs: "À Propos",
    mortgageCalculator: "Calculateur d'Hypothèque",
    start: "Commencer",
    getStarted: "Commencer",
    
    // Home page
    heroTitle: "La première Hypothèque alimentée par l'IA",
    heroSubtitle: "Notre technologie débloque des taux plus bas, de meilleures chances d'approbation et un processus ultra-rapide de l'approbation à la clôture. Plus de 100 milliards de dollars financés.",
    noHardCreditCheck: "3 min | Pas de vérification de crédit stricte",
    
    // Navigation descriptions
    homeDesc: "Retour à la page d'accueil.",
    aboutUsDesc: "Découvrez notre mission et notre équipe.",
    mortgageCalculatorDesc: "Estimez votre paiement mensuel.",
    startDesc: "Commencez votre parcours hypothécaire.",
    
    // Features
    oneDayMortgage: "Hypothèque d'Un Jour®",
    oneDayMortgageDesc: "Passez du taux verrouillé à la Lettre d'Engagement en une seule journée. Les prêteurs traditionnels prennent des semaines.",
    betterHeloc: "Meilleur HELOC",
    betterHelocDesc: "Accédez jusqu'à 90% de la valeur de votre maison en espèces en aussi peu que 7 jours.",
    insurance: "Assurance",
    insuranceDesc: "Achetez, regroupez et économisez sur la couverture d'assurance pour la maison, l'auto, la vie et plus.",
    
    // Trust section
    excellentRating: "Excellent",
    outOfFive: "sur 5",
    basedOnReviews: "Basé sur des milliers d'avis",
    overBillionFunded: "Plus de 100 milliards de dollars financés",
    
    // FAQ
    gotQuestions: "Des questions ? Nous avons des réponses",
    aiMortgageQuestion: "Comment fonctionne le prêt hypothécaire alimenté par l'IA ?",
    aiMortgageAnswer: "Notre plateforme utilise l'IA pour rationaliser les approbations, réduire les taux et accélérer le processus de la demande à la clôture.",
    oneDayQuestion: "Qu'est-ce que l'Hypothèque d'Un Jour® ?",
    oneDayAnswer: "Les clients qualifiés peuvent obtenir une Lettre d'Engagement en une seule journée après avoir verrouillé leur taux.",
    getStartedQuestion: "Comment commencer ?",
    getStartedAnswer: "Cliquez sur le bouton 'Commencer' et complétez l'intégration rapide. Aucune vérification de crédit stricte requise.",
    
    // Contact
    callUs: "Appelez-nous à tout moment au",
    email: "Email :",
    
    // Footer
    copyright: "© 2025 Better Home & Finance Holding Company.",
    
    // Chatbot
    chatbotTitle: "Assistant Hypothécaire Better",
    chatbotSubtitle: "Aide hypothécaire alimentée par l'IA",
    chatbotWelcome: "👋 Bonjour ! Je suis ici pour vous aider avec les calculs hypothécaires. Voulez-vous commencer ?",
    chatbotPropertyPrice: "Parfait ! Quel est le prix de la maison que vous regardez ?",
    chatbotDownPayment: "Compris ! Combien prévoyez-vous pour l'acompte ?",
    chatbotInterestRate: "Noté. Quel taux d'intérêt attendez-vous ? (ex., 6.5%)",
    chatbotLoanTerm: "Merci ! Sur combien d'années souhaitez-vous prendre le prêt ?",
    chatbotCalculating: "Calcul de votre paiement mensuel...",
    chatbotMonthlyPayment: "Votre paiement mensuel estimé est",
    chatbotBreakdown: "Répartition :",
    chatbotLoanAmount: "Montant du Prêt",
    chatbotTotalInterest: "Intérêt Total",
    chatbotTotalPayment: "Paiement Total",
    chatbotNextSteps: "Souhaitez-vous télécharger une répartition ou recalculer ?",
    chatbotInvalidPrice: "Veuillez entrer un prix de propriété valide (ex., $400,000)",
    chatbotInvalidDownPayment: "Veuillez entrer un montant d'acompte valide (moins que le prix de la propriété)",
    chatbotInvalidRate: "Veuillez entrer un taux d'intérêt valide (ex., 6.5%)",
    chatbotInvalidTerm: "Veuillez entrer une durée de prêt valide en années (ex., 30)",
    chatbotDownloadReady: "Parfait ! J'ai préparé votre répartition hypothécaire. Vérifiez votre email ou téléchargez-la ici.",
    chatbotSupport: "Je serais ravi de vous connecter avec nos experts hypothécaires. Souhaitez-vous parler avec un conseiller humain ?",
    chatbotHumanSupport: "Parfait ! Je vous connecte avec notre conseiller hypothécaire. Ils seront avec vous sous peu. En attendant, vous pouvez aussi nous appeler au (415) 523-8837.",
    chatbotNoSupport: "Aucun problème. N'hésitez pas à nous contacter à tout moment. Y a-t-il autre chose que je puisse faire pour vous ?",
    chatbotThankYou: "Merci d'avoir utilisé notre calculateur hypothécaire ! Y a-t-il autre chose que je puisse faire pour vous ?",
    chatbotGoodbye: "Aucun problème. N'hésitez pas à revenir à tout moment. Passez une excellente journée !",
    chatbotClarify: "Je suis ici pour aider avec les calculs hypothécaires. Voulez-vous commencer ? (Oui/Non)",
    chatbotFallback: "Je ne suis pas sûr d'avoir compris cela. Pourriez-vous clarifier ?",
    chatbotPlaceholder: "Tapez votre message...",
    
    // About Us page
    missionTitle: "Nous rendons la propriété immobilière plus simple, plus rapide — et surtout, plus accessible pour tous les Américains.",
    statusQuoTitle: "Le statu quo est cassé",
    statusQuoText: "Les processus traditionnels autour de la propriété immobilière sont opaques et stressants. Les frais ne sont pas transparents et certains sont simplement scandaleux en taille. Le prêt hypothécaire traditionnel est truffé de frais inutiles et de processus lents et douloureux. C'est un système conçu pour bénéficier aux initiés — pas à vous. Le PDG de Better.com, Vishal Garg, s'est donné pour mission de changer cela.",
    changingThingsTitle: "Comment nous changeons les choses",
    changingThingsText1: "La propriété immobilière est une grande partie de notre économie. Le logement dans l'ensemble est une entreprise de 33 billions de dollars, et les hypothèques représentent 15 billions de dollars. Pourtant, les finances immobilières fonctionnent de la même manière qu'elles l'ont fait pendant des décennies — à travers des systèmes opaques et des intermédiaires coûteux dont les intérêts sont mal alignés avec ceux des consommateurs.",
    changingThingsText2: "C'est pourquoi Better.com redéfinit le processus de propriété immobilière depuis le début. Nous utilisons la technologie pour le rendre plus rapide et plus efficace, et les humains pour aider à le rendre amical et agréable.",
    backedBy: "Soutenu par",
    companyTimeline: "Chronologie de l'Entreprise",
    becomePartOfStory: "Vous devenez partie de l'histoire en rejoignant des dizaines de milliers d'emprunteurs heureux de Better Mortgage.",
    
    // Timeline events
    timeline2014: "Après la première tentative de Vishal Garg d'acheter sa propre maison de rêve, il a rapidement réalisé que le processus d'achat de maison est inutilement cassé. Cela l'a inspiré à fonder une entreprise technologique dirigée par des ingénieurs et des experts en données avec la mission de numériser et d'automatiser les finances immobilières pour les rendre moins chères, plus faciles et plus rapides pour tous.",
    timeline2015: "Better Mortgage finance son premier prêt hypothécaire entièrement en ligne (sans un seul appel téléphonique !).",
    timeline2016: "Better Mortgage devient un vendeur + serviteur approuvé par Fannie Mae et établit des relations avec les principaux investisseurs hypothécaires.",
    timeline2017: "Better s'étend au marché immobilier avec Better Real Estate.",
    timeline2018: "Better Mortgage s'associe à Ally Bank pour construire Ally powered by Better.",
    timeline2019: "Better Mortgage lance son partenariat pilote avec American Express pour offrir une expérience d'achat de maison transparente aux clients AMEX.",
    timeline2021: "Better acquiert Trussle — Le courtier hypothécaire en ligne le plus innovant du Royaume-Uni.",
    timeline2022: "Better Mortgage devient la première fintech à financer 100 milliards de dollars de prêts immobiliers entièrement en ligne.",
    timeline2023: "Better Mortgage lance l'Hypothèque d'Un Jour¹ : La première offre aux clients pour passer de la demande à la Lettre d'Engagement hypothécaire complète en 24 heures vs. le processus typique de l'industrie de 30+ jours. Better Mortgage lance le HELOC² entièrement numérique de 3 jours. Better Mortgage lance la Lettre d'Approbation Vérifiée d'Un Jour.",
    timelineToday: "Vous devenez partie de l'histoire en rejoignant des dizaines de milliers d'emprunteurs heureux de Better Mortgage.",
  }
};

// Create context
const I18nContext = createContext();

// Provider component
export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('en');
  const [t, setT] = useState(translations.en);

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('locale') || 'en';
    setLocale(savedLocale);
    setT(translations[savedLocale] || translations.en);
  }, []);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    setT(translations[newLocale] || translations.en);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <I18nContext.Provider value={{ t, locale, changeLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook to use translations
export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
} 