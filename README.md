# Zume - AI-Powered Job Application Assistant

Zume is a modern web application that helps job seekers manage their job applications and create professional resumes with AI assistance.

## Features

- **AI-Powered Resume Builder**
  - Create professional resumes with AI suggestions
  - Multiple resume templates
  - Export to PDF format

- **Job Application Tracker**
  - Track application status
  - Manage multiple job applications
  - Organize by company and position

- **User Authentication**
  - Secure login with Clerk
  - Protected dashboard routes
  - Personalized user experience

## Tech Stack

### Frontend
- Next.js 13+ (React)
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Clerk Authentication

### Backend
- Node.js & Express
- PostgreSQL (with Prisma ORM)
- RESTful API architecture
- Deployed on Render

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/D-Karak/Zume.git
cd Zume
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Configure environment variables
```bash
# Create .env file in backend directory
cp .env.example .env
# Add your database URL and other credentials
```

4. Install frontend dependencies
```bash
cd ../frontend
npm install
```

5. Configure frontend environment
```bash
# Create .env.local file in frontend directory
cp .env.example .env.local
# Add your API URLs and Clerk credentials
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Deployment

- Frontend is deployed on Vercel
- Backend is deployed on Render
- Database is hosted on Neon

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the ISC License.

## Acknowledgments

- [Clerk](https://clerk.dev/) for authentication
- [Shadcn UI](https://ui.shadcn.com/) for components
- [Prisma](https://www.prisma.io/) for database ORM
- [Vercel](https://vercel.com/) for frontend hosting
- [Render](https://render.com/) for backend hosting
- [Neon](https://neon.tech/) for PostgreSQL database
