# Zume - AI-Powered Job Application Assistant

Zume is a modern web application that helps job seekers manage their job applications and create professional resumes with AI assistance.

## Features

- **AI-Powered Resume Builder**
  - Create professional resumes with AI suggestions
  - Multiple resume templates
  - Export to PDF format

- **Job Application Tracker**
  - Track application status
  - Manage multiple job applications (under Process)
  - Subscription based system (under Process)
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
- Frontend: [http://localhost:3000](https://zumeai.vercel.app/)
- Backend API: [http://localhost:5000](https://zume-6lql.onrender.com)

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

## Screenshots
<img width="1501" height="3654" alt="ScreenShot Tool -20250912111927" src="https://github.com/user-attachments/assets/8097733d-c9f5-4a96-95e5-a7b63ebe3e3b" />
<img width="1517" height="723" alt="ScreenShot Tool -20250912112124" src="https://github.com/user-attachments/assets/ae2208b1-5b5e-4b8e-a0c8-1028fd99e1f4" />
<img width="215" height="466" alt="ScreenShot Tool -20250912112157" src="https://github.com/user-attachments/assets/609b2a73-16c5-4795-8716-6945c31a514c" />
<img width="1517" height="723" alt="ScreenShot Tool -20250912112224" src="https://github.com/user-attachments/assets/dee05f1a-809a-4d3f-a3bf-74d6361c0e50" />
<img width="1517" height="723" alt="ScreenShot Tool -20250912112246" src="https://github.com/user-attachments/assets/36d3df6b-f7df-498c-b03e-64203ecec698" />

## Acknowledgement
- [Clerk](https://clerk.dev/) for authentication
- [Shadcn UI](https://ui.shadcn.com/) for components
- [Prisma](https://www.prisma.io/) for database ORM
- [Vercel](https://vercel.com/) for frontend hosting
- [Render](https://render.com/) for backend hosting
- [Neon](https://neon.tech/) for PostgreSQL database
