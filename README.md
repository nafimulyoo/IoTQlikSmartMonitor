# IoTQlik Smart AI Monitor

Welcome to the IoTQlik Smart AI Monitor repository, an innovative web application designed to enable intuitive interaction with IoT data through natural language queries. Leveraging the power of OpenAI's API for Natural Language Processing (NLP), IoTQlik offers a user-friendly interface built with Next.js, TypeScript, Shadcn, DaisyUI, and Supabase. This project aims to simplify the complexity of IoT systems, making data accessible and actionable for users of all technical levels.

## Features

- **Natural Language Processing**: Utilize OpenAI's API to interpret and process natural language queries.
- **Next.js Framework**: Built with Next.js for server-side rendering and optimal performance.
- **TypeScript**: Ensures type safety and enhances development experience.
- **Shadcn & DaisyUI**: A beautiful, responsive UI design for a seamless user experience.
- **Supabase Backend**: Robust and scalable backend with Supabase for real-time database interactions.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager)
- An account on Supabase for backend services
- Access to OpenAI API for NLP capabilities

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/YourGitHub/IoTQlik-Smart-AI-Monitor.git
cd IoTQlik-Smart-AI-Monitor
```

2. **Install Dependencies**

```bash
npm install
```
Environment Configuration
Create a .env.local file at the root of your project and add your OpenAI API key and Supabase details:

```env
NEXT_PUBLIC_OPENAI_API_KEY=YourOpenAIKeyHere
NEXT_PUBLIC_SUPABASE_URL=YourSupabaseURLHere
NEXT_PUBLIC_SUPABASE_ANON_KEY=YourSupabaseAnonKeyHere
```

3. **Run the Development Server**

```bash
npm run dev
Your IoTQlik Smart AI Monitor is now running on http://localhost:3000.
```

## Usage
After setting up the project, you can start querying your IoT data using natural language. Simply type in your query in the provided input field, and IoTQlik Smart AI Monitor will process and present the data, leveraging the IoT data structure configured in your Supabase backend.

