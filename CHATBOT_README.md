# 🤖 Better Mortgage Chatbot

A sophisticated AI-powered chatbot for mortgage calculations and customer support, built with React and integrated with Gemini Flash for natural language understanding.

## ✨ Features

### 🎯 Core Functionality
- **Natural Language Processing**: Understands user intent and context
- **Multilingual Support**: Works in English, Spanish, and French
- **Mortgage Calculations**: Real-time EMI and payment calculations
- **Conversation Flow**: Guided step-by-step mortgage assessment
- **Error Handling**: Graceful fallbacks and validation
- **Human Escalation**: Seamless handoff to human advisors

### 🧠 AI Capabilities
- **Intent Recognition**: Identifies user goals (calculate, help, support)
- **Context Awareness**: Maintains conversation state and user data
- **Smart Validation**: Validates inputs and provides helpful feedback
- **Natural Responses**: Human-like conversation flow

### 🎨 User Experience
- **Modern UI**: Clean, responsive chat interface
- **Real-time Typing**: Visual feedback during processing
- **Message History**: Persistent conversation tracking
- **Accessibility**: Screen reader compatible
- **Mobile Friendly**: Works on all device sizes

## 🏗️ Architecture

### Components
```
src/
├── components/
│   └── Chatbot.js              # Main chatbot UI component
├── lib/
│   ├── chatbotService.js       # AI logic and conversation management
│   ├── geminiService.js        # Gemini Flash API integration
│   └── i18n.js                # Multilingual translations
└── app/
    └── layout.js              # Global chatbot integration
```

### Service Layer
- **ChatbotService**: Core AI logic and conversation management
- **Intent Recognition**: Natural language understanding
- **Calculation Engine**: Mortgage payment formulas
- **Response Generation**: Contextual, localized responses

## 🚀 User Flow

### 1. Welcome & Greeting
```
User: "Hi"
Bot: "👋 Hello! I'm here to help you with mortgage calculations. Want to start?"
```

### 2. Property Price Collection
```
User: "$400,000"
Bot: "Great! What's the home price you're looking at?"
```

### 3. Down Payment
```
User: "$80,000"
Bot: "Got it! How much are you planning for a down payment?"
```

### 4. Interest Rate
```
User: "6.5%"
Bot: "Noted. What interest rate are you expecting? (e.g., 6.5%)"
```

### 5. Loan Term
```
User: "30 years"
Bot: "Thanks! Over how many years would you like to take the loan?"
```

### 6. Results & Breakdown
```
Bot: "Calculating your monthly payment... 💬

Your estimated monthly payment is: $2,016.00

Breakdown:
• Loan Amount: $320,000
• Total Interest: $405,760
• Total Payment: $725,760

Would you like to download a breakdown or recalculate?"
```

## 🔧 Technical Implementation

### Natural Language Understanding
```javascript
// Intent classification
const intents = {
  greeting: ['hi', 'hello', 'hey', 'start', 'begin'],
  calculation: ['calculate', 'mortgage', 'payment', 'emi', 'monthly'],
  property_price: ['price', 'cost', 'home price', 'property value'],
  // ... more intents
};
```

### Mortgage Calculation
```javascript
calculateMortgage(principal, downPayment, rate, years) {
  const loanAmount = principal - downPayment;
  const monthlyRate = rate / 100 / 12;
  const numberOfPayments = years * 12;
  
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return monthlyPayment;
}
```

### Multilingual Support
```javascript
// Localized responses
const responses = {
  en: { property_price: "Great! What's the home price you're looking at?" },
  es: { property_price: "¡Genial! ¿Cuál es el precio de la casa que estás viendo?" },
  fr: { property_price: "Parfait ! Quel est le prix de la maison que vous regardez ?" }
};
```

## 🎯 MVP Goals Achieved

### ✅ Core Functions
- [x] Welcome message and user greeting
- [x] Intent understanding and classification
- [x] Input collection and validation
- [x] Mortgage calculation engine
- [x] Results presentation and explanation
- [x] Fallback handling and error recovery
- [x] Human escalation support

### ✅ Advanced Features
- [x] Multilingual support (EN/ES/FR)
- [x] Natural language processing
- [x] Context-aware conversations
- [x] Real-time validation
- [x] Conversation history
- [x] Mobile-responsive design

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 19 + Next.js 15 |
| UI Framework | Tailwind CSS |
| State Management | React Hooks + Context |
| AI/NLP | Custom Intent Recognition |
| Calculations | JavaScript Math Engine |
| Internationalization | Custom i18n System |
| Deployment | Vercel/Netlify Ready |

## 📱 User Interface

### Chat Window Features
- **Floating Button**: Fixed position, always accessible
- **Expandable Interface**: Smooth open/close animations
- **Message Bubbles**: Clear user/bot distinction
- **Typing Indicators**: Real-time feedback
- **Scroll Auto**: Automatic scroll to latest messages
- **Input Validation**: Real-time error checking

### Visual Design
- **Brand Colors**: Better.com blue (#1a73e8)
- **Modern Icons**: SVG-based, scalable
- **Smooth Animations**: CSS transitions
- **Responsive Layout**: Mobile-first design
- **Accessibility**: ARIA labels and keyboard navigation

## 🔄 Conversation States

### State Machine
```
greeting → property_price → down_payment → interest_rate → loan_term → results
    ↓
support ← human_escalation
```

### Error Handling
- **Invalid Input**: Clear error messages with examples
- **Network Issues**: Graceful degradation
- **Service Errors**: Fallback responses
- **Validation**: Real-time input checking

## 🌍 Multilingual Support

### Supported Languages
- **English** (🇺🇸) - Primary language
- **Spanish** (🇪🇸) - Español
- **French** (🇫🇷) - Français

### Translation Keys
```javascript
// Chatbot translations
chatbotTitle, chatbotSubtitle, chatbotWelcome
chatbotPropertyPrice, chatbotDownPayment, chatbotInterestRate
chatbotLoanTerm, chatbotCalculating, chatbotMonthlyPayment
// ... 30+ translation keys
```

## 🚀 Deployment

### Environment Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
```env
# Required: Gemini Flash API Key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Analytics and Monitoring
NEXT_PUBLIC_CHATBOT_ENABLED=true
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 📊 Analytics & Monitoring

### Metrics to Track
- **Conversation Completion Rate**: % of users who complete mortgage calculation
- **Error Rate**: Failed calculations or misunderstandings
- **Language Distribution**: Most used languages
- **Escalation Rate**: % of users requesting human support
- **Session Duration**: Average time spent with chatbot

### Implementation
```javascript
// Track user interactions
const trackEvent = (event, data) => {
  // Analytics implementation
  console.log('Chatbot Event:', event, data);
};
```

## 🔮 Future Enhancements

### Planned Features
- [x] **Gemini Flash Integration**: Enhanced AI capabilities ✅
- [ ] **Voice Support**: Speech-to-text and text-to-speech
- [ ] **Document Upload**: PDF analysis for mortgage documents
- [ ] **Advanced Analytics**: Detailed conversation insights
- [ ] **A/B Testing**: Conversation flow optimization
- [ ] **Integration APIs**: CRM and loan management systems

### Technical Improvements
- [ ] **WebSocket Support**: Real-time messaging
- [ ] **Offline Mode**: Basic functionality without internet
- [ ] **Progressive Web App**: Installable chatbot
- [ ] **Advanced NLP**: Machine learning models
- [ ] **Multi-modal**: Image and document processing

## 🧪 Testing

### Test Cases
```javascript
// Unit tests for calculation engine
test('calculateMortgage returns correct monthly payment', () => {
  const result = calculateMortgage(400000, 80000, 6.5, 30);
  expect(result).toBeCloseTo(2016.00, 2);
});

// Integration tests for conversation flow
test('complete mortgage calculation flow', async () => {
  const chatbot = new ChatbotService();
  // Test full conversation flow
});
```

### Manual Testing
1. **Language Switching**: Test all supported languages
2. **Input Validation**: Test edge cases and invalid inputs
3. **Calculation Accuracy**: Verify mortgage formulas
4. **Mobile Responsiveness**: Test on various screen sizes
5. **Accessibility**: Screen reader compatibility

## 📚 API Reference

### ChatbotService Methods
```javascript
// Process user input
const result = await chatbotService.processInput(userInput, locale);

// Reset conversation
chatbotService.resetContext();

// Get conversation history
const history = chatbotService.getConversationHistory();

// Get current user data
const userData = chatbotService.getUserData();
```

### Component Props
```javascript
<Chatbot 
  // Automatically integrated via layout.js
  // No props required
/>
```

## 🤝 Contributing

### Development Guidelines
1. **Follow React best practices**
2. **Add translations for new features**
3. **Test multilingual functionality**
4. **Update documentation**
5. **Maintain accessibility standards**

### Code Style
```javascript
// Use consistent naming
const chatbotService = new ChatbotService();
const { t, locale } = useTranslation();

// Handle errors gracefully
try {
  const result = await processInput(input);
} catch (error) {
  console.error('Chatbot error:', error);
  // Provide fallback response
}
```

## 📄 License

This chatbot implementation is part of the Better Mortgage application and follows the same licensing terms.

---

**Built with ❤️ for Better Mortgage customers** 