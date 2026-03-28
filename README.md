# 🚀 Nexus Jobs | AI-Powered Job Board Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A modern, highly scalable job board platform leveraging Artificial Intelligence to intelligently match candidates with jobs and automate applicant ranking for employers. 

## ✨ Overview

Aether Careers is designed with a focus on delivering a seamless, Apple-esque user experience while handling complex backend workflows. It serves two primary users: **Job Seekers** and **Employers**. 

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
   git clone [https://github.com/yourusername/nexus-jobs.git](https://github.com/AliAhmed2007/aether-careers.git)
   cd aether-careers
