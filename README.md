# React Jobs Finder

A modern, full-stack job board application built with React, TypeScript, Tailwind CSS, and Supabase. This application features user authentication, protected routes, and complete CRUD operations for managing job listings and company profiles.

**Full-stack version of [react-jobs-project](https://github.com/AW-2021/react-jobs-project)**

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Key Features Explained](#key-features-explained)
- [Development Workflow](#development-workflow)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Functionality
- **User Authentication**: Secure sign-up and sign-in using Supabase Auth
- **Protected Routes**: Route-level authentication guards to secure pages
- **Job Listings**: Browse and search through available job postings
- **Job Details**: View comprehensive information about each job listing
- **Add Jobs**: Create new job postings with company information
- **Edit Jobs**: Update existing job listings
- **Delete Jobs**: Remove job postings with confirmation
- **Company Management**: Manage company profiles linked to job postings
- **Responsive Design**: Mobile-first design that works on all devices
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Elegant loading indicators for async operations

### Technical Features
- **TypeScript**: Full type safety across the application
- **React Router**: Client-side routing with data loaders
- **Supabase Integration**: Backend-as-a-Service for auth and database
- **Local Development**: Complete local development setup with Supabase CLI
- **Database Migrations**: Version-controlled database schema changes
- **Foreign Key Constraints**: Relational data integrity
- **Real-time Updates**: (Optional) Live data synchronization
- **Error Handling**: Comprehensive error handling and user feedback

## Tech Stack

### Frontend
- **React 19.1** - UI library
- **TypeScript** - Type safety and developer experience
- **Vite 7.1** - Fast build tool and dev server
- **React Router 7.9** - Declarative routing with data loaders
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **React Spinners** - Loading indicators

### Backend
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication & authorization
  - Row Level Security (RLS)
  - Real-time subscriptions
  - RESTful API

### Development Tools
- **Supabase CLI** - Local development and migrations
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules

## Screenshots

> DESKTOP SCREENSHOTS 

### Sign In Page
![Sign In Page](./screenshots/desktop/signin.png)

### Sign Up Page
![Sign In Page](./screenshots/desktop/signup.png)

### Home Page
![Home Page](./screenshots/desktop/home.png)

### Navbar
![Home Page](./screenshots/desktop/navbar.png)

### Job Listings
![Job Listings](./screenshots/desktop/jobs.png)

### Job Details
![Job Details](./screenshots/desktop/job-detail.png)

### Add Job Form
![Add Job](./screenshots/desktop/add-job.png)

### Edit Job Form
![Edit Job](./screenshots/desktop/edit-job.png)

---

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Supabase CLI** (for local development)
- **Git** (for version control)

### Installing Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Windows (via Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
brew install supabase/tap/supabase
```

For other installation methods, visit the [Supabase CLI documentation](https://supabase.com/docs/guides/cli).

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AW-2021/React-Jobs-Finder.git
   cd React-Jobs-Finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Supabase CLI** (if not already installed)
   ```bash
   brew install supabase/tap/supabase
   ```

## Environment Setup

1. **Create environment file**

   Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```

2. **Add environment variables**

   For local development, add the following to `.env.local`:
   ```env
   VITE_SUPABASE_URL=http://127.0.0.1:55321
   VITE_SUPABASE_ANON_KEY=your_local_anon_key_here
   ```

   > **Note**: The `VITE_SUPABASE_ANON_KEY` will be generated when you start Supabase locally (see next section).

## Database Setup

### Starting Supabase Locally

1. **Initialize Supabase** (first time only)
   ```bash
   supabase init
   ```

2. **Start Supabase services**
   ```bash
   supabase start
   ```

   This command will:
   - Start a local PostgreSQL database
   - Run all migrations in `supabase/migrations/`
   - Start the Supabase Studio dashboard
   - Display your local credentials including the `anon key`

   **Copy the `anon key` from the output and add it to your `.env.local` file.**

   Example output:
   ```
   Started supabase local development setup.

         API URL: http://127.0.0.1:55321
      GraphQL URL: http://127.0.0.1:55321/graphql/v1
           DB URL: postgresql://postgres:postgres@127.0.0.1:55322/postgres
       Studio URL: http://127.0.0.1:55323
     Inbucket URL: http://127.0.0.1:55324
       JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
         anon key: eyJhbGc...  <-- Copy this key
   service_role key: eyJhbGc...
   ```

3. **Access Supabase Studio**

   Open [http://127.0.0.1:55323](http://127.0.0.1:55323) in your browser to access the Supabase Studio dashboard where you can:
   - View and edit database tables
   - Run SQL queries
   - Manage authentication users
   - View logs and metrics

### Database Migrations

The project includes pre-configured migrations in `supabase/migrations/`:

- `20260113131013_create_companies_table.sql` - Creates the companies table
- `20260113131107_create_jobs_table.sql` - Creates the jobs table with foreign key to companies
- `20260113132011_enable_realtime_jobs.sql` - Enables real-time updates for jobs table

These migrations run automatically when you start Supabase locally.

### Resetting the Database

To reset your local database and re-run all migrations:

```bash
supabase db reset
```

This will:
1. Drop all tables
2. Re-run all migrations
3. Run the seed file (`supabase/seed.sql`) to populate sample data

### Creating New Migrations

To create a new migration:

```bash
supabase migration new <migration_name>
```

Example:
```bash
supabase migration new add_user_profiles_table
```

This creates a new timestamped SQL file in `supabase/migrations/`.

### Generating TypeScript Types

To generate TypeScript types from your database schema:

```bash
supabase gen types typescript --local > src/lib/database.types.ts
```

This creates type definitions that match your database schema.

## Running the Application

### Development Mode

1. **Start Supabase** (in one terminal)
   ```bash
   supabase start
   ```

2. **Start the development server** (in another terminal)
   ```bash
   npm run dev
   ```

3. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

### Additional Commands

```bash
# Lint code
npm run lint

# Stop Supabase
supabase stop

# View Supabase status
supabase status
```

## Project Structure

```
React-Jobs-Finder/
├── src/
│   ├── assets/              # Static assets (images, logos)
│   │   └── images/
│   ├── components/          # Reusable UI components
│   │   ├── Hero.tsx
│   │   ├── HomeCards.tsx
│   │   ├── JobListings.tsx
│   │   ├── JobListing.tsx
│   │   ├── Navbar.tsx
│   │   ├── ViewAllJobs.tsx
│   │   ├── Spinner.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/             # React Context providers
│   │   └── AuthContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.ts
│   ├── layouts/             # Layout components
│   │   ├── AuthLayout.tsx   # Layout for auth pages
│   │   └── MainLayout.tsx   # Layout for protected pages
│   ├── pages/               # Page components (routes)
│   │   ├── SignInPage.tsx
│   │   ├── SignUpPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── JobsPage.tsx
│   │   ├── JobPage.tsx
│   │   ├── AddJobPage.tsx
│   │   ├── EditJobPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── lib/                 # Utilities and types
│   │   ├── types.ts
│   │   └── database.types.ts
│   ├── supabase-client.ts   # Supabase client singleton
│   ├── App.tsx              # Route configuration
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── supabase/
│   ├── migrations/          # Database migrations
│   │   ├── 20260113131013_create_companies_table.sql
│   │   ├── 20260113131107_create_jobs_table.sql
│   │   └── 20260113132011_enable_realtime_jobs.sql
│   ├── schemas/             # Schema definitions
│   │   ├── companies.sql
│   │   └── jobs.sql
│   ├── seed.sql             # Seed data for development
│   └── config.toml          # Supabase configuration
├── .env.local               # Environment variables (create this)
├── .gitignore
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Database Schema

### Companies Table

| Column         | Type      | Constraints                    | Description                  |
|----------------|-----------|--------------------------------|------------------------------|
| `id`           | bigint    | PRIMARY KEY, AUTO INCREMENT    | Unique company identifier    |
| `name`         | text      | NOT NULL                       | Company name                 |
| `description`  | text      | NULL                           | Company description          |
| `contact_email`| text      | NOT NULL                       | Contact email address        |
| `contact_phone`| text      | NULL                           | Contact phone number         |
| `user_id`      | uuid      | NULL, FOREIGN KEY → auth.users(id), ON DELETE CASCADE | Owner of the company |
| `created_at`   | timestamp | DEFAULT NOW()                  | Record creation timestamp    |

### Jobs Table

| Column        | Type      | Constraints                        | Description                  |
|---------------|-----------|------------------------------------|------------------------------|
| `id`          | bigint    | PRIMARY KEY, AUTO INCREMENT        | Unique job identifier        |
| `title`       | text      | NOT NULL                           | Job title                    |
| `type`        | text      | NOT NULL                           | Job type (Full-Time, etc.)   |
| `description` | text      | NULL                               | Job description              |
| `salary`      | text      | NOT NULL                           | Salary information           |
| `location`    | text      | NOT NULL                           | Job location                 |
| `company_id`  | bigint    | FOREIGN KEY → companies(id), ON DELETE CASCADE | Reference to company |
| `user_id`     | uuid      | NULL, FOREIGN KEY → auth.users(id), ON DELETE CASCADE | Owner of the job |
| `created_at`  | timestamp | DEFAULT NOW()                      | Record creation timestamp    |

### Relationships

- **One-to-Many (Companies to Jobs)**: One company can have many jobs
  - **Foreign Key**: `jobs.company_id` references `companies.id`
  - **Cascading Delete**: Deleting a company automatically deletes all associated jobs

- **One-to-Many (Users to Companies)**: One user can own many companies
  - **Foreign Key**: `companies.user_id` references `auth.users(id)`
  - **Cascading Delete**: Deleting a user automatically deletes all their companies

- **One-to-Many (Users to Jobs)**: One user can own many jobs
  - **Foreign Key**: `jobs.user_id` references `auth.users(id)`
  - **Cascading Delete**: Deleting a user automatically deletes all their jobs

### Database Diagram

```
┌─────────────────────┐
│   auth.users        │
│  (Supabase Auth)    │
├─────────────────────┤
│ id (PK)             │
│ email               │
│ ...                 │
└─────────────────────┘
          │
          ├─────────────┐
          │             │
          │ 1:N         │ 1:N
          │             │
          ▼             ▼
┌─────────────────────┐ ┌─────────────────────┐
│     companies       │ │       jobs          │
├─────────────────────┤ ├─────────────────────┤
│ id (PK)             │ │ id (PK)             │
│ name                │ │ title               │
│ description         │ │ type                │
│ contact_email       │ │ description         │
│ contact_phone       │ │ salary              │
│ user_id (FK)        │ │ location            │
│ created_at          │ │ company_id (FK)     │
└─────────────────────┘ │ user_id (FK)        │
          │             │ created_at          │
          │ 1:N         └─────────────────────┘
          │                       ▲
          └───────────────────────┘
```

## Key Features Explained

### Authentication System

The application uses Supabase Auth for secure user authentication:

1. **AuthContext** (`src/context/AuthContext.tsx`)
   - Provides authentication state across the app
   - Manages user session
   - Handles sign in, sign up, and sign out
   - Listens for auth state changes

2. **ProtectedRoute Component** (`src/components/ProtectedRoute.tsx`)
   - Wraps protected pages
   - Checks authentication status
   - Redirects unauthenticated users to sign-in page
   - Prevents unauthorized access

3. **Auth Flow**
   ```
   User visits / → SignInPage
                 ↓
           Authenticated?
                 ↓ Yes
           Redirect to /home
                 ↓
         Access all features
   ```

### Data Fetching Strategy

The app uses React Router loaders for efficient data fetching:

```typescript
// Example: Job loader
export const jobLoader = async ({ params }) => {
  const { data, error } = await supabase
    .from("jobs")
    .select("*, companies(*)")
    .eq("id", params.id)
    .single();

  if (error) throw new Response("Job not found", { status: 404 });
  return data;
};

// Usage in component
const job = useLoaderData();
```

**Benefits:**
- Data fetches before component renders
- Automatic loading states
- Error boundaries for failed requests
- Better user experience with no loading flicker

### CRUD Operations

#### Create (Add Job)
```typescript
const { error } = await supabase
  .from("jobs")
  .insert({
    title,
    type,
    description,
    salary,
    location,
    company_id
  });
```

#### Read (Fetch Jobs)
```typescript
const { data, error } = await supabase
  .from("jobs")
  .select("*, companies(*)");
```

#### Update (Edit Job)
```typescript
const { error } = await supabase
  .from("jobs")
  .update({ title, type, description, salary, location })
  .eq("id", jobId);
```

#### Delete (Remove Job)
```typescript
const { error } = await supabase
  .from("jobs")
  .delete()
  .eq("id", jobId);
```

### Toast Notifications

User feedback is provided through toast notifications:

```typescript
import { toast } from "react-toastify";

// Success message
toast.success("Job added successfully!");

// Error message
toast.error("Failed to delete job");

// Info message
toast.info("Loading job details...");
```

### Loading States

The app provides visual feedback during async operations:

```typescript
import { ClipLoader } from "react-spinners";

{loading && (
  <ClipLoader
    color="#4338ca"
    loading={loading}
    size={150}
  />
)}
```

## Development Workflow

### Making Database Changes

1. **Create a migration**
   ```bash
   supabase migration new add_new_field_to_jobs
   ```

2. **Edit the migration file**
   ```sql
   ALTER TABLE jobs
   ADD COLUMN remote boolean DEFAULT false;
   ```

3. **Apply the migration**
   ```bash
   supabase db reset
   ```

4. **Generate new types**
   ```bash
   supabase gen types typescript --local > src/lib/database.types.ts
   ```

### Adding a New Feature

1. **Create necessary components** in `src/components/`
2. **Create page component** in `src/pages/`
3. **Add route** in `src/App.tsx`
4. **Implement data fetching** with loaders
5. **Add Supabase operations** for CRUD
6. **Test locally** with Supabase running

### Code Style Guidelines

- Use TypeScript for type safety
- Follow React best practices (hooks, functional components)
- Use Tailwind CSS for styling
- Handle errors gracefully
- Provide user feedback with toasts
- Use loading states for async operations
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use React Router loaders for data fetching

## API Integration

### Supabase Client Setup

```typescript
// src/supabase-client.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Authentication Methods

```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email,
  password,
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

// Sign out
const { error } = await supabase.auth.signOut();

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

### Database Queries with Joins

```typescript
// Fetch job with company details
const { data, error } = await supabase
  .from("jobs")
  .select(`
    id,
    title,
    type,
    description,
    salary,
    location,
    companies (
      id,
      name,
      description,
      contact_email,
      contact_phone
    )
  `)
  .eq("id", jobId)
  .single();
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
   - Run the app locally
   - Test all CRUD operations
   - Verify authentication flows
5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Development Guidelines

- Write clean, readable code
- Follow TypeScript best practices
- Add comments for complex logic
- Test your changes locally
- Ensure no console errors
- Follow the existing code style
- Update documentation if needed

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Troubleshooting

### Common Issues

**Issue**: Supabase won't start
```bash
# Solution: Stop any running instances and try again
supabase stop
supabase start
```

**Issue**: Environment variables not loading
```bash
# Solution: Ensure .env.local exists and restart dev server
npm run dev
```

**Issue**: Database migrations failing
```bash
# Solution: Reset the database
supabase db reset
```

**Issue**: Type errors after schema changes
```bash
# Solution: Regenerate types
supabase gen types typescript --local > src/lib/database.types.ts
```

### Getting Help

- Check the [Supabase Documentation](https://supabase.com/docs)
- Review [React Router Documentation](https://reactrouter.com/en/main)
- Open an issue on GitHub
- Check existing issues for similar problems

---

**Happy Coding!** If you found this project helpful, please consider giving it a star on GitHub.
