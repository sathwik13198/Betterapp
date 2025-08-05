// Gemini Flash API Service
// This service integrates with Google's Gemini Flash API for enhanced AI capabilities

class GeminiService {
  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
  }

  // Check if API key is configured
  isConfigured() {
    return !!this.apiKey;
  }

  // Generate response using Gemini Flash
  async generateResponse(userInput, context, locale = 'en') {
    if (!this.isConfigured()) {
      throw new Error('Gemini API key not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables.');
    }

    try {
      const prompt = this.buildPrompt(userInput, context, locale);
      
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text.trim();
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  // Build context-aware prompt for mortgage chatbot
  buildPrompt(userInput, context, locale) {
    const systemPrompt = this.getSystemPrompt(locale);
    const conversationHistory = this.formatConversationHistory(context.conversationHistory);
    const currentStep = context.userData.step;
    const userData = context.userData;

    return `${systemPrompt}

Current conversation step: ${currentStep}
User data collected so far:
- Property Price: ${userData.propertyPrice || 'Not provided'}
- Down Payment: ${userData.downPayment || 'Not provided'}
- Interest Rate: ${userData.interestRate || 'Not provided'}
- Loan Term: ${userData.loanTerm || 'Not provided'}

Conversation History:
${conversationHistory}

User Input: "${userInput}"

Please respond in ${locale === 'es' ? 'Spanish' : locale === 'fr' ? 'French' : 'English'} and follow the conversation flow. Be helpful, friendly, and guide the user through the mortgage calculation process.`;
  }

  // Get system prompt based on language
  getSystemPrompt(locale) {
    const prompts = {
      en: `You are a helpful mortgage assistant for Better.com. Your role is to help users calculate their mortgage payments by collecting necessary information step by step.

Key responsibilities:
1. Greet users warmly and explain your purpose
2. Collect property price, down payment, interest rate, and loan term
3. Calculate mortgage payments accurately
4. Provide detailed breakdowns of costs
5. Offer to recalculate or connect to human support
6. Handle errors gracefully with helpful guidance

Conversation flow:
- greeting → property_price → down_payment → interest_rate → loan_term → results

Be conversational, helpful, and always validate inputs before proceeding. If user input is unclear, ask for clarification.`,

      es: `Eres un asistente hipotecario útil para Better.com. Tu función es ayudar a los usuarios a calcular sus pagos hipotecarios recopilando la información necesaria paso a paso.

Responsabilidades principales:
1. Saluda a los usuarios cálidamente y explica tu propósito
2. Recopila precio de la propiedad, pago inicial, tasa de interés y plazo del préstamo
3. Calcula los pagos hipotecarios con precisión
4. Proporciona desgloses detallados de costos
5. Ofrece recalcular o conectar con soporte humano
6. Maneja errores con gracia y orientación útil

Flujo de conversación:
- greeting → property_price → down_payment → interest_rate → loan_term → results

Sé conversacional, útil y siempre valida las entradas antes de proceder. Si la entrada del usuario no está clara, pide aclaración.`,

      fr: `Vous êtes un assistant hypothécaire utile pour Better.com. Votre rôle est d'aider les utilisateurs à calculer leurs paiements hypothécaires en recueillant les informations nécessaires étape par étape.

Responsabilités principales :
1. Saluez chaleureusement les utilisateurs et expliquez votre objectif
2. Recueillez le prix de la propriété, l'acompte, le taux d'intérêt et la durée du prêt
3. Calculez les paiements hypothécaires avec précision
4. Fournissez des répartitions détaillées des coûts
5. Offrez de recalculer ou de connecter avec le support humain
6. Gérez les erreurs avec grâce et orientation utile

Flux de conversation :
- greeting → property_price → down_payment → interest_rate → loan_term → results

Soyez conversationnel, utile et validez toujours les entrées avant de procéder. Si l'entrée de l'utilisateur n'est pas claire, demandez des éclaircissements.`
    };

    return prompts[locale] || prompts.en;
  }

  // Format conversation history for context
  formatConversationHistory(history) {
    if (!history || history.length === 0) return 'No previous conversation.';
    
    return history.map(msg => 
      `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
    ).join('\n');
  }

  // Calculate mortgage payment (fallback if API fails)
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

  // Process user input with Gemini Flash
  async processInput(userInput, context, locale = 'en') {
    try {
      // Try Gemini Flash first
      if (this.isConfigured()) {
        const aiResponse = await this.generateResponse(userInput, context, locale);
        return this.parseAIResponse(aiResponse, context, locale);
      } else {
        // Fallback to custom logic if API not configured
        return this.fallbackProcessing(userInput, context, locale);
      }
    } catch (error) {
      console.error('Gemini processing error:', error);
      // Fallback to custom logic
      return this.fallbackProcessing(userInput, context, locale);
    }
  }

  // Parse AI response and extract structured data
  parseAIResponse(aiResponse, context, locale) {
    // Extract numbers from AI response
    const numbers = this.extractNumbersFromText(aiResponse);
    
    // Determine next step based on AI response and context
    const currentStep = context.userData.step;
    let nextStep = currentStep;
    let userData = { ...context.userData };

    // Update user data based on current step and extracted numbers
    switch (currentStep) {
      case 'property_price':
        if (numbers.length > 0 && numbers[0] > 0) {
          userData.propertyPrice = numbers[0];
          nextStep = 'down_payment';
        }
        break;
      case 'down_payment':
        if (numbers.length > 0 && numbers[0] >= 0 && numbers[0] < userData.propertyPrice) {
          userData.downPayment = numbers[0];
          nextStep = 'interest_rate';
        }
        break;
      case 'interest_rate':
        if (numbers.length > 0 && numbers[0] > 0 && numbers[0] < 20) {
          userData.interestRate = numbers[0];
          nextStep = 'loan_term';
        }
        break;
      case 'loan_term':
        if (numbers.length > 0 && numbers[0] > 0 && numbers[0] <= 50) {
          userData.loanTerm = numbers[0];
          nextStep = 'results';
        }
        break;
    }

    return {
      response: aiResponse,
      nextStep,
      userData
    };
  }

  // Extract numbers from text
  extractNumbersFromText(text) {
    const numberPattern = /\$?(\d{1,3}(,\d{3})*(\.\d{2})?)|(\d+(\.\d+)?)%?/g;
    const matches = text.match(numberPattern);
    return matches ? matches.map(match => this.extractNumber(match)).filter(num => num !== null) : [];
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

    return `${l.calculating} 💬\n\n` +
      `${l.monthlyPayment}: $${monthlyPayment.toFixed(2)}\n\n` +
      `${l.breakdown}\n` +
      `• ${l.loanAmount}: $${(monthlyPayment * 12 * 30 - totalInterest).toLocaleString()}\n` +
      `• ${l.totalInterest}: $${totalInterest.toLocaleString()}\n` +
      `• ${l.totalPayment}: $${totalPayment.toLocaleString()}\n\n` +
      `${l.nextSteps}`;
  }

  // Fallback processing when Gemini is not available
  fallbackProcessing(userInput, context, locale) {
    // Use the existing ChatbotService logic
    const intent = this.understandIntent(userInput, locale);
    const currentStep = context.userData.step;
    
    let response = '';
    let nextStep = currentStep;
    let userData = { ...context.userData };

    switch (currentStep) {
      case 'greeting':
        if (intent === 'greeting' || intent === 'calculation') {
          response = this.getFallbackResponse('property_price', locale);
          nextStep = 'property_price';
        } else if (intent === 'goodbye') {
          response = this.getFallbackResponse('goodbye', locale);
        } else {
          response = this.getFallbackResponse('clarify', locale);
        }
        break;

      case 'property_price':
        if (intent === 'number_input') {
          const price = this.extractNumber(userInput);
          if (price && price > 0) {
            userData.propertyPrice = price;
            response = this.getFallbackResponse('down_payment', locale);
            nextStep = 'down_payment';
          } else {
            response = this.getFallbackResponse('invalid_price', locale);
          }
        } else {
          response = this.getFallbackResponse('invalid_price', locale);
        }
        break;

      case 'down_payment':
        if (intent === 'number_input') {
          const downPayment = this.extractNumber(userInput);
          if (downPayment && downPayment >= 0 && downPayment < userData.propertyPrice) {
            userData.downPayment = downPayment;
            response = this.getFallbackResponse('interest_rate', locale);
            nextStep = 'interest_rate';
          } else {
            response = this.getFallbackResponse('invalid_down_payment', locale);
          }
        } else {
          response = this.getFallbackResponse('invalid_down_payment', locale);
        }
        break;

      case 'interest_rate':
        if (intent === 'number_input') {
          const rate = this.extractNumber(userInput);
          if (rate && rate > 0 && rate < 20) {
            userData.interestRate = rate;
            response = this.getFallbackResponse('loan_term', locale);
            nextStep = 'loan_term';
          } else {
            response = this.getFallbackResponse('invalid_rate', locale);
          }
        } else {
          response = this.getFallbackResponse('invalid_rate', locale);
        }
        break;

      case 'loan_term':
        if (intent === 'number_input') {
          const years = parseInt(userInput);
          if (years && years > 0 && years <= 50) {
            userData.loanTerm = years;
            
            // Calculate mortgage
            const monthlyPayment = this.calculateMortgage(
              userData.propertyPrice,
              userData.downPayment,
              userData.interestRate,
              years
            );
            
            const totalPayment = monthlyPayment * years * 12;
            const totalInterest = totalPayment - (userData.propertyPrice - userData.downPayment);
            
            response = this.formatCalculationResult(monthlyPayment, totalInterest, totalPayment, locale);
            nextStep = 'results';
          } else {
            response = this.getFallbackResponse('invalid_term', locale);
          }
        } else {
          response = this.getFallbackResponse('invalid_term', locale);
        }
        break;

      case 'results':
        if (intent === 'recalculate') {
          // Reset context
          userData = {
            propertyPrice: null,
            downPayment: null,
            interestRate: null,
            loanTerm: null,
            step: 'greeting'
          };
          response = this.getFallbackResponse('property_price', locale);
          nextStep = 'property_price';
        } else if (intent === 'download') {
          response = this.getFallbackResponse('download_ready', locale);
          nextStep = 'greeting';
        } else {
          response = this.getFallbackResponse('thank_you', locale);
          nextStep = 'greeting';
        }
        break;

      default:
        response = this.getFallbackResponse('fallback', locale);
        break;
    }

    return {
      response,
      nextStep,
      userData
    };
  }

  // Get fallback response when API is not available
  getFallbackResponse(key, locale) {
    const responses = {
      en: {
        greeting: "👋 Hello! I'm here to help you with mortgage calculations. Want to start?",
        property_price: "Great! What's the home price you're looking at?",
        down_payment: "Got it! How much are you planning for a down payment?",
        interest_rate: "Noted. What interest rate are you expecting? (e.g., 6.5%)",
        loan_term: "Thanks! Over how many years would you like to take the loan?",
        invalid_price: "Please enter a valid property price (e.g., $400,000)",
        invalid_down_payment: "Please enter a valid down payment amount (less than property price)",
        invalid_rate: "Please enter a valid interest rate (e.g., 6.5%)",
        invalid_term: "Please enter a valid loan term in years (e.g., 30)",
        download_ready: "Perfect! I've prepared your mortgage breakdown. Check your email or download it here.",
        thank_you: "Thank you for using our mortgage calculator! Is there anything else I can help you with?",
        goodbye: "No problem! Feel free to come back anytime. Have a great day!",
        clarify: "I'm here to help with mortgage calculations. Would you like to start? (Yes/No)",
        fallback: "I'm not sure I understood that. Could you please clarify?"
      },
      es: {
        greeting: "👋 ¡Hola! Estoy aquí para ayudarte con cálculos hipotecarios. ¿Quieres empezar?",
        property_price: "¡Genial! ¿Cuál es el precio de la casa que estás viendo?",
        down_payment: "¡Entendido! ¿Cuánto planeas para el pago inicial?",
        interest_rate: "Anotado. ¿Qué tasa de interés esperas? (ej., 6.5%)",
        loan_term: "¡Gracias! ¿En cuántos años te gustaría tomar el préstamo?",
        invalid_price: "Por favor ingresa un precio de propiedad válido (ej., $400,000)",
        invalid_down_payment: "Por favor ingresa un monto de pago inicial válido (menos que el precio de la propiedad)",
        invalid_rate: "Por favor ingresa una tasa de interés válida (ej., 6.5%)",
        invalid_term: "Por favor ingresa un plazo de préstamo válido en años (ej., 30)",
        download_ready: "¡Perfecto! He preparado tu desglose hipotecario. Revisa tu email o descárgalo aquí.",
        thank_you: "¡Gracias por usar nuestra calculadora hipotecaria! ¿Hay algo más en lo que pueda ayudarte?",
        goodbye: "No hay problema. No dudes en volver en cualquier momento. ¡Que tengas un gran día!",
        clarify: "Estoy aquí para ayudar con cálculos hipotecarios. ¿Te gustaría empezar? (Sí/No)",
        fallback: "No estoy seguro de haber entendido eso. ¿Podrías aclarar?"
      },
      fr: {
        greeting: "👋 Bonjour ! Je suis ici pour vous aider avec les calculs hypothécaires. Voulez-vous commencer ?",
        property_price: "Parfait ! Quel est le prix de la maison que vous regardez ?",
        down_payment: "Compris ! Combien prévoyez-vous pour l'acompte ?",
        interest_rate: "Noté. Quel taux d'intérêt attendez-vous ? (ex., 6.5%)",
        loan_term: "Merci ! Sur combien d'années souhaitez-vous prendre le prêt ?",
        invalid_price: "Veuillez entrer un prix de propriété valide (ex., $400,000)",
        invalid_down_payment: "Veuillez entrer un montant d'acompte valide (moins que le prix de la propriété)",
        invalid_rate: "Veuillez entrer un taux d'intérêt valide (ex., 6.5%)",
        invalid_term: "Veuillez entrer une durée de prêt valide en années (ex., 30)",
        download_ready: "Parfait ! J'ai préparé votre répartition hypothécaire. Vérifiez votre email ou téléchargez-la ici.",
        thank_you: "Merci d'avoir utilisé notre calculateur hypothécaire ! Y a-t-il autre chose que je puisse faire pour vous ?",
        goodbye: "Aucun problème. N'hésitez pas à revenir à tout moment. Passez une excellente journée !",
        clarify: "Je suis ici pour aider avec les calculs hypothécaires. Voulez-vous commencer ? (Oui/Non)",
        fallback: "Je ne suis pas sûr d'avoir compris cela. Pourriez-vous clarifier ?"
      }
    };

    const langResponses = responses[locale] || responses.en;
    
    return langResponses[key] || langResponses.fallback;
  }
}

export default GeminiService; 