# 🚀 Blockchain Admin Dashboard

A secure, role-based blockchain administration portal built with React + Vite frontend and Express + Prisma + MySQL backend.

## ✨ Features

- **🔐 Role-Based Authentication**: Admin, Issuer, and Investor roles
- **🎯 Admin Dashboard Access**: Exclusive admin portal with secure authentication
- **🛡️ JWT Token Security**: Secure token-based authentication with refresh tokens
- **💎 Modern UI**: Beautiful Material-UI components with custom CSS
- **🔗 Blockchain Ready**: Architecture designed for blockchain applications
- **📱 Responsive Design**: Mobile-friendly admin interface

## 🏗️ Architecture

```
moon/
├── backend/               # Express.js API Server
│   ├── controllers/       # API Controllers
│   ├── routes/           # API Routes
│   ├── services/         # Business Logic
│   ├── middleware/       # Authentication & Validation
│   ├── prisma/          # Database Schema
│   └── src/utils/       # Utilities
└── frontend/            # React + Vite Frontend
    ├── src/
    │   ├── components/  # React Components
    │   ├── pages/       # Page Components
    │   └── services/    # API Services
    └── public/          # Static Assets
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MySQL Database
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your database URL in .env
npm run db:push
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔐 User Roles

- **ADMIN**: Full dashboard access and system administration
- **ISSUER**: Token/asset issuance and management
- **INVESTOR**: Portfolio management and investment tracking

## 🎯 Admin Access

**Default Admin Credentials:**
- Email: `admin@blockchain.com`
- Password: `Admin@123`
- Role: `ADMIN`

## 🛠️ Tech Stack

### Backend
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **MySQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI Framework
- **Vite** - Build tool
- **Material-UI** - Component library
- **Axios** - HTTP client
- **React Router** - Navigation

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - Admin login (ADMIN only)
- `POST /api/auth/signout` - Logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Health Check
- `GET /api/health` - Server health status

## 🔒 Security Features

- Role-based access control (RBAC)
- JWT token authentication
- Password hashing with bcrypt
- Refresh token rotation
- Admin-only dashboard access
- Secure environment variables

## 🌟 Development

### Database Schema Updates
```bash
cd backend
npx prisma db push
```

### Generate Prisma Client
```bash
npx prisma generate
```

### View Database
```bash
npx prisma studio
```

## 📦 Deployment

### Backend
- Configure production environment variables
- Set up MySQL database
- Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend
- Build for production: `npm run build`
- Deploy to Vercel, Netlify, or your preferred hosting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for blockchain applications
- Security-first approach
- Beautiful UI/UX design

---

**🚀 Ready to revolutionize blockchain administration!** 