// Chatbot Service with Gemini Flash Integration
// This service handles natural language processing and mortgage calculations

import GeminiService from './geminiService.js';

class ChatbotService {
  constructor() {
    this.context = {
      userData: {
        propertyPrice: null,
        downPayment: null,
        interestRate: null,
        loanTerm: null,
        step: 'greeting'
      },
      conversationHistory: []
    };
    this.geminiService = new GeminiService();
  }

  // Calculate mortgage payment using standard formula
  calculateMortgage(principal, downPayment, rate, years) {
    const loanAmount = principal - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    
    if (monthlyRate === 0) return loanAmount / numberOfPayments;
    
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  }

  // Extract numbers from text input
  extractNumber(input) {
    const cleaned = input.replace(/[$,%]/g, '');
    const number = parseFloat(cleaned);
    return isNaN(number) ? null : number;
  }

  // Natural language understanding for mortgage-related queries
  understandIntent(input, locale = 'en') {
    const lowerInput = input.toLowerCase();
    
    // Intent classification
    const intents = {
      greeting: ['hi', 'hello', 'hey', 'start', 'begin'],
      calculation: ['calculate', 'mortgage', 'payment', 'emi', 'monthly'],
      property_price: ['price', 'cost', 'home price', 'property value'],
      down_payment: ['down payment', 'downpayment', 'deposit', 'initial payment'],
      interest_rate: ['rate', 'interest', 'apr', 'percentage'],
      loan_term: ['years', 'term', 'duration', 'length'],
      help: ['help', 'support', 'assist', 'guide'],
      goodbye: ['bye', 'goodbye', 'exit', 'end', 'stop'],
      recalculate: ['recalculate', 'again', 'new', 'restart'],
      download: ['download', 'breakdown', 'report', 'summary']
    };

    // Check for intent matches
    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        return intent;
      }
    }

    // Check for number patterns
    if (/\$?\d{1,3}(,\d{3})*(\.\d{2})?/.test(input) || /\d+%/.test(input) || /\d+\s*years?/.test(input)) {
      return 'number_input';
    }

    return 'unknown';
  }

  // Process user input and generate response
  async processInput(userInput, locale = 'en') {
    // Add to conversation history
    this.context.conversationHistory.push({
      role: 'user',
      content: userInput,
      timestamp: new Date()
    });

    // Check if Gemini is configured
    if (this.geminiService.isConfigured()) {
      try {
        // Try Gemini Flash first
        const result = await this.geminiService.processInput(userInput, this.context, locale);
        
        // Update context with AI response
        this.context.userData = result.userData;
        this.context.userData.step = result.nextStep;
        
        this.context.conversationHistory.push({
          role: 'assistant',
          content: result.response,
          timestamp: new Date()
        });

        return {
          response: result.response,
          nextStep: result.nextStep,
          userData: { ...this.context.userData }
        };
      } catch (error) {
        console.error('Gemini processing failed, falling back to custom logic:', error);
      }
    }
    
    // Fallback to custom logic
    return this.fallbackProcessing(userInput, locale);
  }

  // Fallback processing when Gemini is not available
  fallbackProcessing(userInput, locale) {
    const intent = this.understandIntent(userInput, locale);
    const currentStep = this.context.userData.step;
    
    let response = '';
    let nextStep = currentStep;

    switch (currentStep) {
      case 'greeting':
        if (intent === 'greeting' || intent === 'calculation') {
          response = this.getResponse('property_price', locale);
          nextStep = 'property_price';
        } else if (intent === 'goodbye') {
          response = this.getResponse('goodbye', locale);
        } else {
          response = this.getResponse('clarify', locale);
        }
        break;

      case 'property_price':
        if (intent === 'number_input') {
          const price = this.extractNumber(userInput);
          if (price && price > 0) {
            this.context.userData.propertyPrice = price;
            response = this.getResponse('down_payment', locale);
            nextStep = 'down_payment';
          } else {
            response = this.getResponse('invalid_price', locale);
          }
        } else if (intent === 'help') {
          response = this.getResponse('help_property_price', locale);
        } else {
          response = this.getResponse('invalid_price', locale);
        }
        break;

      case 'down_payment':
        if (intent === 'number_input') {
          const downPayment = this.extractNumber(userInput);
          if (downPayment && downPayment >= 0 && downPayment < this.context.userData.propertyPrice) {
            this.context.userData.downPayment = downPayment;
            response = this.getResponse('interest_rate', locale);
            nextStep = 'interest_rate';
          } else {
            response = this.getResponse('invalid_down_payment', locale);
          }
        } else if (intent === 'help') {
          response = this.getResponse('help_down_payment', locale);
        } else {
          response = this.getResponse('invalid_down_payment', locale);
        }
        break;

      case 'interest_rate':
        if (intent === 'number_input') {
          const rate = this.extractNumber(userInput);
          if (rate && rate > 0 && rate < 20) {
            this.context.userData.interestRate = rate;
            response = this.getResponse('loan_term', locale);
            nextStep = 'loan_term';
          } else {
            response = this.getResponse('invalid_rate', locale);
          }
        } else if (intent === 'help') {
          response = this.getResponse('help_interest_rate', locale);
        } else {
          response = this.getResponse('invalid_rate', locale);
        }
        break;

      case 'loan_term':
        if (intent === 'number_input') {
          const years = parseInt(userInput);
          if (years && years > 0 && years <= 50) {
            this.context.userData.loanTerm = years;
            
            // Calculate mortgage
            const monthlyPayment = this.calculateMortgage(
              this.context.userData.propertyPrice,
              this.context.userData.downPayment,
              this.context.userData.interestRate,
              years
            );
            
            const totalPayment = monthlyPayment * years * 12;
            const totalInterest = totalPayment - (this.context.userData.propertyPrice - this.context.userData.downPayment);
            
            response = this.formatCalculationResult(monthlyPayment, totalInterest, totalPayment, locale);
            nextStep = 'results';
          } else {
            response = this.getResponse('invalid_term', locale);
          }
        } else if (intent === 'help') {
          response = this.getResponse('help_loan_term', locale);
        } else {
          response = this.getResponse('invalid_term', locale);
        }
        break;

      case 'results':
        if (intent === 'recalculate') {
          this.resetContext();
          response = this.getResponse('property_price', locale);
          nextStep = 'property_price';
        } else if (intent === 'download') {
          response = this.getResponse('download_ready', locale);
          nextStep = 'greeting';
        } else if (intent === 'help') {
          response = this.getResponse('support', locale);
          nextStep = 'support';
        } else {
          response = this.getResponse('thank_you', locale);
          nextStep = 'greeting';
        }
        break;

      case 'support':
        if (intent === 'greeting' || userInput.toLowerCase().includes('yes')) {
          response = this.getResponse('human_support', locale);
        } else {
          response = this.getResponse('no_support', locale);
        }
        nextStep = 'greeting';
        break;

      default:
        response = this.getResponse('fallback', locale);
        break;
    }

    // Update context
    this.context.userData.step = nextStep;
    this.context.conversationHistory.push({
      role: 'assistant',
      content: response,
      timestamp: new Date()
    });

    return {
      response,
      nextStep,
      userData: { ...this.context.userData }
    };
  }

  // Get localized response
  getResponse(key, locale) {
    const responses = {
      en: {
        property_price: "Great! What's the home price you're looking at?",
        down_payment: "Got it! How much are you planning for a down payment?",
        interest_rate: "Noted. What interest rate are you expecting? (e.g., 6.5%)",
        loan_term: "Thanks! Over how many years would you like to take the loan?",
        calculating: "Calculating your monthly payment... 💬",
        invalid_price: "Please enter a valid property price (e.g., $400,000)",
        invalid_down_payment: "Please enter a valid down payment amount (less than property price)",
        invalid_rate: "Please enter a valid interest rate (e.g., 6.5%)",
        invalid_term: "Please enter a valid loan term in years (e.g., 30)",
        download_ready: "Perfect! I've prepared your mortgage breakdown. Check your email or download it here.",
        support: "I'd be happy to connect you with our mortgage experts. Would you like to speak with a human advisor?",
        human_support: "Great! I'm connecting you with our mortgage advisor. They'll be with you shortly. In the meantime, you can also call us at (415) 523-8837.",
        no_support: "No problem! Feel free to reach out anytime. Is there anything else I can help you with?",
        thank_you: "Thank you for using our mortgage calculator! Is there anything else I can help you with?",
        goodbye: "No problem! Feel free to come back anytime. Have a great day!",
        clarify: "I'm here to help with mortgage calculations. Would you like to start? (Yes/No)",
        fallback: "I'm not sure I understood that. Could you please clarify?",
        help_property_price: "I need the total price of the home you want to buy. For example: $400,000",
        help_down_payment: "I need the amount you'll pay upfront. For example: $80,000",
        help_interest_rate: "I need the annual interest rate. For example: 6.5%",
        help_loan_term: "I need the loan duration in years. For example: 30"
      },
      es: {
        property_price: "¡Genial! ¿Cuál es el precio de la casa que estás viendo?",
        down_payment: "¡Entendido! ¿Cuánto planeas para el pago inicial?",
        interest_rate: "Anotado. ¿Qué tasa de interés esperas? (ej., 6.5%)",
        loan_term: "¡Gracias! ¿En cuántos años te gustaría tomar el préstamo?",
        calculating: "Calculando tu pago mensual... 💬",
        invalid_price: "Por favor ingresa un precio de propiedad válido (ej., $400,000)",
        invalid_down_payment: "Por favor ingresa un monto de pago inicial válido (menos que el precio de la propiedad)",
        invalid_rate: "Por favor ingresa una tasa de interés válida (ej., 6.5%)",
        invalid_term: "Por favor ingresa un plazo de préstamo válido en años (ej., 30)",
        download_ready: "¡Perfecto! He preparado tu desglose hipotecario. Revisa tu email o descárgalo aquí.",
        support: "Me encantaría conectarte con nuestros expertos hipotecarios. ¿Te gustaría hablar con un asesor humano?",
        human_support: "¡Genial! Te estoy conectando con nuestro asesor hipotecario. Estarán contigo en breve. Mientras tanto, también puedes llamarnos al (415) 523-8837.",
        no_support: "No hay problema. No dudes en contactarnos en cualquier momento. ¿Hay algo más en lo que pueda ayudarte?",
        thank_you: "¡Gracias por usar nuestra calculadora hipotecaria! ¿Hay algo más en lo que pueda ayudarte?",
        goodbye: "No hay problema. No dudes en volver en cualquier momento. ¡Que tengas un gran día!",
        clarify: "Estoy aquí para ayudar con cálculos hipotecarios. ¿Te gustaría empezar? (Sí/No)",
        fallback: "No estoy seguro de haber entendido eso. ¿Podrías aclarar?",
        help_property_price: "Necesito el precio total de la casa que quieres comprar. Por ejemplo: $400,000",
        help_down_payment: "Necesito el monto que pagarás por adelantado. Por ejemplo: $80,000",
        help_interest_rate: "Necesito la tasa de interés anual. Por ejemplo: 6.5%",
        help_loan_term: "Necesito la duración del préstamo en años. Por ejemplo: 30"
      },
      fr: {
        property_price: "Parfait ! Quel est le prix de la maison que vous regardez ?",
        down_payment: "Compris ! Combien prévoyez-vous pour l'acompte ?",
        interest_rate: "Noté. Quel taux d'intérêt attendez-vous ? (ex., 6.5%)",
        loan_term: "Merci ! Sur combien d'années souhaitez-vous prendre le prêt ?",
        calculating: "Calcul de votre paiement mensuel... 💬",
        invalid_price: "Veuillez entrer un prix de propriété valide (ex., $400,000)",
        invalid_down_payment: "Veuillez entrer un montant d'acompte valide (moins que le prix de la propriété)",
        invalid_rate: "Veuillez entrer un taux d'intérêt valide (ex., 6.5%)",
        invalid_term: "Veuillez entrer une durée de prêt valide en années (ex., 30)",
        download_ready: "Parfait ! J'ai préparé votre répartition hypothécaire. Vérifiez votre email ou téléchargez-la ici.",
        support: "Je serais ravi de vous connecter avec nos experts hypothécaires. Souhaitez-vous parler avec un conseiller humain ?",
        human_support: "Parfait ! Je vous connecte avec notre conseiller hypothécaire. Ils seront avec vous sous peu. En attendant, vous pouvez aussi nous appeler au (415) 523-8837.",
        no_support: "Aucun problème. N'hésitez pas à nous contacter à tout moment. Y a-t-il autre chose que je puisse faire pour vous ?",
        thank_you: "Merci d'avoir utilisé notre calculateur hypothécaire ! Y a-t-il autre chose que je puisse faire pour vous ?",
        goodbye: "Aucun problème. N'hésitez pas à revenir à tout moment. Passez une excellente journée !",
        clarify: "Je suis ici pour aider avec les calculs hypothécaires. Voulez-vous commencer ? (Oui/Non)",
        fallback: "Je ne suis pas sûr d'avoir compris cela. Pourriez-vous clarifier ?",
        help_property_price: "J'ai besoin du prix total de la maison que vous voulez acheter. Par exemple : $400,000",
        help_down_payment: "J'ai besoin du montant que vous paierez d'avance. Par exemple : $80,000",
        help_interest_rate: "J'ai besoin du taux d'intérêt annuel. Par exemple : 6.5%",
        help_loan_term: "J'ai besoin de la durée du prêt en années. Par exemple : 30"
      }
    };

    return responses[locale]?.[key] || responses.en[key] || "I'm sorry, I didn't understand that.";
  }

  // Format calculation results
  formatCalculationResult(monthlyPayment, totalInterest, totalPayment, locale) {
    const labels = {
      en: {
        calculating: "Calculating your monthly payment...",
        monthlyPayment: "Your estimated monthly payment is",
        breakdown: "Breakdown:",
        loanAmount: "Loan Amount",
        totalInterest: "Total Interest",
        totalPayment: "Total Payment",
        nextSteps: "Would you like to download a breakdown or recalculate?"
      },
      es: {
        calculating: "Calculando tu pago mensual...",
        monthlyPayment: "Tu pago mensual estimado es",
        breakdown: "Desglose:",
        loanAmount: "Monto del Préstamo",
        totalInterest: "Interés Total",
        totalPayment: "Pago Total",
        nextSteps: "¿Te gustaría descargar un desglose o recalcular?"
      },
      fr: {
        calculating: "Calcul de votre paiement mensuel...",
        monthlyPayment: "Votre paiement mensuel estimé est",
        breakdown: "Répartition :",
        loanAmount: "Montant du Prêt",
        totalInterest: "Intérêt Total",
        totalPayment: "Paiement Total",
        nextSteps: "Souhaitez-vous télécharger une répartition ou recalculer ?"
      }
    };

    const l = labels[locale] || labels.en;
    const loanAmount = this.context.userData.propertyPrice - this.context.userData.downPayment;

    return `${l.calculating} 💬\n\n` +
      `${l.monthlyPayment}: $${monthlyPayment.toFixed(2)}\n\n` +
      `${l.breakdown}\n` +
      `• ${l.loanAmount}: $${loanAmount.toLocaleString()}\n` +
      `• ${l.totalInterest}: $${totalInterest.toLocaleString()}\n` +
      `• ${l.totalPayment}: $${totalPayment.toLocaleString()}\n\n` +
      `${l.nextSteps}`;
  }

  // Reset conversation context
  resetContext() {
    this.context.userData = {
      propertyPrice: null,
      downPayment: null,
      interestRate: null,
      loanTerm: null,
      step: 'greeting'
    };
    this.context.conversationHistory = [];
  }

  // Get conversation history
  getConversationHistory() {
    return this.context.conversationHistory;
  }

  // Get current user data
  getUserData() {
    return { ...this.context.userData };
  }
}

export default ChatbotService; 