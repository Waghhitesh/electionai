# Election Process Education Assistant

An enterprise-grade, AI-powered assistant designed to educate voters on election processes, polling locations, and candidate information using Google's state-of-the-art AI and Civic Data services.

## 🗳️ Chosen Vertical
**Election Process Education**
This project focuses on democratizing access to official election information, ensuring voters are well-informed, prepared, and empowered to participate in the democratic process.

## 🧠 Approach and Logic
The solution employs a **Retrieval-Augmented Generation (RAG)** architecture:
1.  **User Input:** The user provides a query and their residential address.
2.  **Data Retrieval:** The backend queries the **Google Civic Information API** to fetch hyper-local data (polling sites, upcoming elections, contests).
3.  **Context Augmentation:** This raw data is cleaned and injected into the prompt context for the AI.
4.  **Intelligence Layer:** **Google Gemini 2.5 Pro** processes the augmented prompt, using the official data as the "ground truth" to provide accurate, non-hallucinated answers.
5.  **Streaming Delivery:** The response is delivered to a responsive Next.js frontend with high accessibility standards.

## 🛠️ How it Works
-   **Frontend:** Built with Next.js 15, utilizing React hooks for state management and modern CSS for a premium, accessible user experience.
-   **Backend:** A FastAPI server handles requests, implements rate limiting for security, and orchestrates the flow between Google services.
-   **Integration:**
    *   **Google Civic Information API:** Provides the official data backbone.
    *   **Google Gemini AI:** Acts as the natural language interface.
    *   **Google Cloud Run:** Hosts the entire stack in a scalable, serverless environment.

## 🛡️ Enterprise-Grade Security & Reliability
This project implements several advanced features to ensure production-readiness:
- **Strict Input Validation:** Uses Pydantic `Field` for character-level sanitization and length constraints.
- **Security Middleware:** Custom HTTP middleware injecting security headers (HSTS, CSP, XSS-Protection).
- **Automated CI/CD:** Integrated GitHub Actions for continuous testing and linting on every push.
- **Advanced Logging:** Comprehensive backend logging for rapid debugging and monitoring on Google Cloud.
- **Universal Accessibility:** Implements "Skip to Content" links, high-contrast focus rings, and official Google Translate integration for global inclusivity.

## 🛡️ Security and Ethics
-   **PII Protection:** Addresses are used only for the API call and are not stored permanently.
-   **Neutrality:** The AI system is strictly instructed to remain politically neutral and provide only factual, process-oriented information.
-   **Rate Limiting:** Protects the backend from abuse and ensures stability.

## ⚙️ Assumptions Made
-   Users have a valid residential address within supported regions (primarily US-based for full Civic API coverage).
-   Internet connectivity is available for real-time API calls.
-   Users are seeking factual information about election procedures and logistics.

## 🚀 Automated Testing
Run the following to verify the solution's integrity:
```bash
cd election-assistant/backend
pytest tests/
```


## 🚀 Deployment
Deployed using **Google Cloud Run** for high availability and performance.
- Backend: [Live API Link]
- Frontend: [Live UI Link]
