Markdown

# 🚀Aether Careers | AI-Powered Job Board Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A modern, highly scalable job board platform leveraging Artificial Intelligence to intelligently match candidates with jobs and automate applicant ranking for employers. 

![Project Hero Image / GIF Placeholder](docs/hero-image.png)
*Replace this with a high-quality, clean screenshot or a fast GIF showcasing the UI and dark/light mode toggle.*

## ✨ Overview

Nexus Jobs is designed with a focus on delivering a seamless, Apple-esque user experience while handling complex backend workflows. It serves two primary users: **Job Seekers** and **Employers**. 

By integrating modern AI models, the platform moves beyond traditional keyword matching. It allows seekers to search using natural language and provides employers with an automated ATS (Applicant Tracking System) that ranks incoming resumes against job requirements.

## 🔥 Key Features

### For Job Seekers
* **Natural Language Search:** Describe your ideal job, salary, and skills, and let the AI find the perfect match.
* **Smart Alerts:** Set AI prompts to act as filters, receiving daily customized email digests of new opportunities.
* **Automated Resume Summaries:** Upload a PDF resume and automatically generate a clean markdown summary of your skills and experience.

### For Employers
* **AI Applicant Ranking:** The system evaluates applicant cover letters and resumes against the specific job listing, assigning a 1-5 star "fit" rating.
* **Role-Based Access Control (RBAC):** Distinct roles (Admin, Applicant Manager, Job Listing Manager) to safely delegate platform responsibilities.
* **Tiered Subscriptions:** Integrated Stripe billing for various posting limits and "Featured Job" capabilities.
* **ATS Dashboard:** Manage the entire hiring pipeline (Applied, Interviewing, Hired, Denied) from a responsive, side-drawer UI.

## 🛠️ Tech Stack

* **Frontend:** React 19, Next.js 16 (Canary/Dynamic IO), TypeScript, Tailwind CSS v4, Shadcn UI
* **Backend & Database:** Node.js, Drizzle ORM, PostgreSQL (Dockerized)
* **Authentication & User Management:** Clerk
* **Background Jobs & Webhooks:** Ingest (Cron jobs, webhook retry logic)
* **AI Integration:** Google Gemini / Anthropic Claude (via AgentKit)
* **File Storage:** UploadThing
* **Emails:** Resend & React Email

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and Docker installed on your machine.

### Installation

1. **Clone the repository**
```bash
   git clone [https://github.com/yourusername/nexus-jobs.git](https://github.com/AliAhmed2007aether-careers.git)

    # Install dependencies
    npm install

    # Set up environment variables
    # Rename .env.example to .env and fill in the required keys.
    cp .env.example .env

    # Spin up the Database
    # Ensure Docker Desktop is running, then start the PostgreSQL container in the background:
    docker compose up -d

    # Run Database Migrations
    # Generate the Drizzle schemas and push them to your live local database:
    npm run db:generate
    npx drizzle-kit push

    # Start the Development Server
    npm run dev

    # Start the Ingest Server (Required for Webhooks & AI)
    # Open a second terminal window and run the Ingest local server to process background jobs:
    npm run ingest

   # Open Drizzle studio to manage your postegresql database
   # Open a third terminal window and run this run drizzle studio command but make sure you have done the migrations:
   npm run db:studio

```
## ⚙️ Environment Variables (.env)
Create a .env file at the root of your project and configure the following variables:

```env
# Database
DB_HOST=127.0.0.1
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=jobboard
DB_PORT=5433

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# UploadThing (File Storage for Resumes)
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# AI Providers (AgentKit handles routing)
GEMINI_API_KEY=your_gemini_api_key
# ANTHROPIC_API_KEY=your_anthropic_api_key

# Email Sending
RESEND_API_KEY=your_resend_api_key

# Base Application URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## 🧠 Architecture & Workflows

### The AI Ranking Engine

When a job seeker applies for a position, the heavy lifting is offloaded from the main Next.js thread to Ingest.

    - The upload triggers a webhook.

    - Ingest pulls the Job Description, the candidate's Cover Letter, and the generated Resume Summary.

    - AgentKit routes this payload to Gemini (or Claude), which acts as an expert hiring manager.

    - The AI returns a structured 1-5 star rating, which is written back to the PostgreSQL database for the employer to review.

### Database & Caching

The application utilizes Next.js 16's experimental Cached Components and cache tagging. Instead of invalidating entire routes, database updates trigger hyper-specific cache tag validations (e.g., revalidating only job-listing-123-applications), ensuring instant UI updates without heavy re-renders.

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome!

    - Fork the Project

    - Create your Feature Branch (git checkout -b feature/AmazingFeature)

    - Commit your Changes (git commit -m 'Add some AmazingFeature')

    - Push to the Branch (git push origin feature/AmazingFeature)

    - Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments:

    - Designed by Ali Ahmed and inspired by Kyle from WDS.
