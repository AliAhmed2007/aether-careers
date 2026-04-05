<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know
# This is Nextjs 16 with some experiemental featuers you have to import in next.config.ts
# Please when you add a feature or solve a bug make sure to not disturb or corrupt any existing features
# Don't do anything else except what I prompted unless I told you to add things from your mind
# If there is something needs to be improved in the application improve it and tell me what you have done to improve it

Project Architecture & Folder Structure Guide

Architectural Philosophy: This codebase strictly adheres to a domain-driven, feature-based architecture. Code is co-located by its business domain (e.g., organizations, users) rather than its technical type (e.g., putting all components in one massive folder). Third-party services are wrapped and isolated.
/app

    What is it: The Next.js App Router root directory.

    Its purpose: Handles the routing, page layouts, global state providers, and global CSS (globals.css). It acts as the entry point for the browser.

    How to add features in them: You do not build heavy business logic here. To add a new page, create a page.tsx within a route folder (e.g., /app/dashboard/page.tsx). Inside that page, you will import and assemble components from the /features or /components directories.

    Its relation to other folders: It is the consumer. It consumes /features, /components, and /services to render the UI.

    Its spot and benefit: Sits at the very top of the execution tree. Benefit: Keeps routing logic completely separate from business logic.

/components

    What is it: The Global UI Component Library.

    Its purpose: Houses highly reusable, "dumb", generic UI components that are entirely agnostic to the business domain. Examples: buttons, inputs, modals, layout wrappers, and generic Shadcn UI components.

    How to add features in them: Create a new .tsx file for the UI element. CRITICAL RULE: Do not fetch data or import from /features here. If a component needs to know about a "User" or an "Organization", it belongs in /features, not here.

    Its relation to other folders: Consumed by /app and /features. Should only import from /lib (for utility functions like cn()).

    Its spot and benefit: Acts as the foundational building blocks of the UI, ensuring visual consistency without entangling business logic.

/data/env

    What is it: The Environment Variable configuration and validation module (often using Zod/T3 Env).

    Its purpose: Provides a type-safe, validated way to access environment variables. It strictly separates client.ts (variables safe for the browser, usually prefixed with NEXT_PUBLIC_) and server.ts (secrets like database URLs and API keys).

    How to add features in them: When you add a new .env variable, you must add its validation schema to either server.ts or client.ts depending on where it will be used.

    Its relation to other folders: Imported globally across the entire app anywhere an environment variable is needed.

    Its spot and benefit: Prevents the app from building or running if required environment variables are missing, and prevents accidentally leaking server secrets to the client bundle.

/drizzle

    What is it: The Database Schema and ORM configuration root.

    Its purpose: Holds the centralized database schema definitions, Drizzle config, database connection instantiation, and migration files.

    How to add features in them: Add new table definitions here (e.g., schema.ts). Do not put query execution logic (CRUD operations) here; those go in the respective /features/[domain]/db folders.

    Its relation to other folders: Provides the types and the database connection instance to /features/*/db and /inngest.

    Its spot and benefit: Centralizes the source of truth for the database structure, making schema changes trackable and type-safe across the app.

/features (The Core of the App)

    What is it: The Domain-Driven modules directory.

    Its purpose: Groups all code related to a specific business entity (domain) together.

    Its spot and benefit: This is the most important architectural pattern in the app. It prevents the codebase from becoming a tangled mess by ensuring that "Organization" logic isn't scattered across 10 different root folders.

/features/organizations (Example Domain)

    What is it: The isolated module for all logic, UI, and data pertaining to "Organizations".

    How to add features in them: If a feature strictly belongs to an organization, it is built entirely inside this folder.

        /features/organizations/components

            What it is/Purpose: React components strictly tied to organizations. E.g., SidebarOrganizationButton.tsx (Server Component) and _SidebarOrganizationButtonClient.tsx (Client Component).

            Relation: Uses global /components for styling, but injects Organization data.

        /features/organizations/db

            What it is/Purpose: All Drizzle queries (SELECT, INSERT, UPDATE, DELETE) specific to organizations.

            Relation: Imports the DB instance from /drizzle. Consumed by Server Actions or /app route handlers.

        /features/organizations/db/cache

            What it is/Purpose: Next.js caching logic (revalidateTag, unstable_cache, global/id tags) specific to organizations.

            Relation: Used directly alongside the DB queries to manage Next.js data cache invalidation when org data mutates.

/features/users

    What is it: The isolated module for "User" specific logic. Mirrors the structure of organizations (contains its own components, db, cache, etc.).

/hooks

    What is it: Global Custom React Hooks.

    Its purpose: Houses reusable logic for client components that is not tied to a specific feature domain. Examples: useIsDarkMode, useWindowSize, useDebounce.

    How to add features in them: Create a generic .ts file exporting a hook. If a hook is deeply specific to fetching Organization data, it should arguably go in /features/organizations/hooks instead.

    Its relation to other folders: Consumed by client components globally.

    Its spot and benefit: DRYs up repetitive React lifecycle or state management code.

/inngest

    What is it: The Background Jobs and Event-Driven queue system.

    Its purpose: Handles async tasks that shouldn't block the user's web request. Examples: sending emails, syncing data to third parties, cron jobs.

    How to add features in them: Define new Inngest functions and event payloads here.

    Its relation to other folders: Triggered by API routes in /app or Server Actions in /features. May interact directly with /features/*/db to update records after a background job completes.

    Its spot and benefit: Offloads heavy computing and guarantees execution resiliency outside of the Next.js request lifecycle.

/lib

    What is it: Global Utility functions.

    Its purpose: Pure JavaScript/TypeScript functions that do one thing and have no side effects. Examples: date formatting, currency formatting, string manipulation, tailwind-merge utilities.

    How to add features in them: Add a new .ts file for generic logic. Do not put React components or Database queries here.

    Its relation to other folders: Imported by literally any other folder in the app.

    Its spot and benefit: Keeps components and feature logic clean by abstracting away complex data formatting or mathematical operations.

/services

    What is it: Wrappers for Third-Party APIs and external services.

    Its purpose: To isolate vendor lock-in. If a third-party service changes its API, you only have to update the code in this folder, not scattered across 50 components.

/services/clerk

    What is it: The Authentication service wrapper.

    Its purpose: Centralizes all interactions with Clerk Auth.

    How to add features in them: * components/: Custom wrappers around Clerk's <SignIn />, <SignOutButton />, or custom Clerk providers.

        lib/: Auth utility functions like getCurrentAuth.ts which securely fetches the user session and standardizes the response for the rest of the app.

    Its relation to other folders: /features and /app will import from /services/clerk to check auth state, rather than importing @clerk/nextjs directly into deeply nested business logic.

    Its spot and benefit: Provides a clean interface for Authentication. If the project ever moves away from Clerk to Supabase Auth or NextAuth, only this folder needs a major rewrite.

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
