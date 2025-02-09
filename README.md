# Green API Web Client  
A web-based client for interacting with the [Green API](https://green-api.com/) service. This interface allows users to send and receive WhatsApp messages, manage chats, and interact with Green API features through a user-friendly UI.
---
## Features
- Send and receive WhatsApp messages via Green API
- Authentication using API credentials (ID and API Token)
- Real-time message updates

---

## Getting Started
### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

---

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Gumerov-Vadim/green-api-web.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ``` 

### Running the Application
- Start development server:
```bash
  npm run dev
```
- Build for production:
```bash
npm run build
```
- Preview production build locally:
```bash
npm run preview
```

### Live Demo
Access the deployed version: [https://green-api-web.netlify.app/](https://green-api-web.netlify.app/)

---

### Configuration
1. Obtain your API credentials from [Green API Console](https://console.green-api.com/)
2. Create .env file using the template:
VITE_API_URL= "apiUrl"

---

## Tech Stack

### Core Libraries
- **React**: A JavaScript library for building user interfaces.
- **React DOM**: Serves as the entry point to the DOM and server renderers for React.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Green API**: API for interacting with WhatsApp.

### UI Components
- **Lexical**: A performant and extensible text editor framework.
- **React Phone Number Input**: A customizable input component for international phone numbers.

### Development Tools
- **Vite**: A fast build tool and development server.
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

---
