# 🔑 Gemini Flash API Setup Guide

This guide will help you set up the Gemini Flash API integration for your mortgage chatbot.

## 📋 Prerequisites

1. **Google Account**: You need a Google account to access the Gemini API
2. **API Key**: Get your API key from Google AI Studio
3. **Node.js Project**: Your Next.js project should be ready

## 🚀 Step-by-Step Setup

### 1. Get Your Gemini API Key

1. **Visit Google AI Studio**: Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. **Sign In**: Use your Google account to sign in
3. **Create API Key**: Click "Create API Key" button
4. **Copy the Key**: Save your API key securely

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Create the environment file
touch .env.local
```

Add your API key to `.env.local`:

```env
# Gemini Flash API Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here

# Optional: Analytics and Monitoring
NEXT_PUBLIC_CHATBOT_ENABLED=true
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id_here
```

### 3. Install Dependencies

Make sure you have the required dependencies:

```bash
npm install
```

### 4. Test the Integration

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:3000`

3. **Test the chatbot**:
   - Click the chat button in the bottom right
   - Try saying "Hi" or "I want to calculate my mortgage"
   - The chatbot should now use Gemini Flash for responses

## 🔧 How It Works

### API Integration Flow

```
User Input → ChatbotService → GeminiService → Gemini Flash API → Response
```

### Fallback System

If the Gemini API is not configured or fails:

```
User Input → ChatbotService → Fallback Logic → Custom Response
```

### Environment Detection

The system automatically detects if the API key is configured:

```javascript
// Check if API is available
if (this.geminiService.isConfigured()) {
  // Use Gemini Flash
  const result = await this.geminiService.processInput(userInput, context, locale);
} else {
  // Use fallback logic
  return this.fallbackProcessing(userInput, locale);
}
```

## 🛠️ Configuration Options

### API Settings

You can customize the Gemini API settings in `src/lib/geminiService.js`:

```javascript
generationConfig: {
  temperature: 0.7,        // Creativity (0.0 - 1.0)
  topK: 40,               // Diversity
  topP: 0.95,             // Nucleus sampling
  maxOutputTokens: 1024,   // Response length
}
```

### Safety Settings

The API includes safety filters:

```javascript
safetySettings: [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_MEDIUM_AND_ABOVE"
  },
  // ... more safety settings
]
```

## 🧪 Testing

### Test Cases

1. **Basic Greeting**:
   ```
   User: "Hi"
   Expected: Welcome message in user's language
   ```

2. **Mortgage Calculation**:
   ```
   User: "I want to calculate my mortgage"
   Expected: Property price request
   ```

3. **Number Input**:
   ```
   User: "$400,000"
   Expected: Down payment request
   ```

4. **Error Handling**:
   ```
   User: "Invalid input"
   Expected: Helpful error message
   ```

### Debug Mode

Enable debug logging by adding to `.env.local`:

```env
NEXT_PUBLIC_DEBUG_MODE=true
```

## 🔒 Security Best Practices

### API Key Security

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Rotate keys regularly** for production
4. **Monitor usage** to prevent abuse

### Rate Limiting

The current implementation includes basic rate limiting:

```javascript
// Add rate limiting if needed
const rateLimit = {
  maxRequests: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
};
```

## 📊 Monitoring

### Logs to Watch

```bash
# Check for API errors
grep "Gemini API Error" logs/

# Monitor response times
grep "API Response Time" logs/

# Track fallback usage
grep "falling back to custom logic" logs/
```

### Metrics to Track

- **API Success Rate**: % of successful Gemini API calls
- **Response Time**: Average API response time
- **Fallback Rate**: % of requests using fallback logic
- **Error Rate**: % of failed API calls

## 🚨 Troubleshooting

### Common Issues

1. **"API key not configured"**
   - Check your `.env.local` file
   - Verify the API key is correct
   - Restart your development server

2. **"Network error"**
   - Check your internet connection
   - Verify the API endpoint is accessible
   - Check if the API key has proper permissions

3. **"Invalid response format"**
   - The API response format may have changed
   - Check the Gemini API documentation
   - Update the response parsing logic

### Debug Steps

1. **Check Environment Variables**:
   ```bash
   echo $NEXT_PUBLIC_GEMINI_API_KEY
   ```

2. **Test API Key**:
   ```bash
   curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-exp:generateContent?key=YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
   ```

3. **Check Browser Console**:
   - Open Developer Tools (F12)
   - Look for errors in the Console tab
   - Check Network tab for API calls

## 🔄 Updates and Maintenance

### Regular Tasks

1. **Monitor API Usage**: Check your Google AI Studio dashboard
2. **Update Dependencies**: Keep your packages updated
3. **Review Logs**: Check for errors or performance issues
4. **Test Functionality**: Regular testing of chatbot features

### Version Updates

When updating the Gemini API:

1. **Check API Changes**: Review the [Gemini API documentation](https://ai.google.dev/docs)
2. **Update Endpoints**: Modify the API URL if needed
3. **Test Thoroughly**: Ensure all features still work
4. **Update Documentation**: Keep this guide current

## 📞 Support

If you encounter issues:

1. **Check the logs** for error messages
2. **Verify your API key** is correct and active
3. **Test with a simple request** to isolate the issue
4. **Check the [Gemini API documentation](https://ai.google.dev/docs)** for updates

---

**Happy coding! 🚀** 