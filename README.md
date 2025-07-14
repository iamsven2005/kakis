# 🍽️ Kakis - Student Food Delivery Platform

A comprehensive food delivery system designed specifically for educational institutions, connecting students with campus food stalls through a peer-to-peer delivery network.

![Kakis Banner](https://via.placeholder.com/1200x400/6366f1/ffffff?text=Kakis+-+Food+Delivery+for+Students)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Kakis is a modern food delivery platform that revolutionizes campus dining by:
- Connecting students with local food stalls
- Enabling peer-to-peer delivery through student partners
- Providing real-time order tracking and management
- Supporting multiple payment methods and languages

Perfect for universities, colleges, and educational campuses looking to digitize their food service ecosystem.

## ✨ Features

### 🛒 **Customer Features**
- Browse food stalls and menus with real-time availability
- Add items to cart with quantity management
- Choose between delivery and pickup options
- Multiple payment methods (Online, Cash on Delivery)
- Real-time order tracking
- Order history and reordering
- User profiles with preferences
- Multi-language support (English, Chinese, Malay, Tamil)

### 🚚 **Delivery Partner Features**
- Partner dashboard with available orders
- Earnings tracking and statistics
- Real-time delivery management
- Customer communication tools
- Performance analytics

### 👨‍💼 **Admin Features**
- Comprehensive admin dashboard
- Order management and assignment
- Partner management and analytics
- Revenue tracking and reporting
- System-wide analytics and insights

### 🔧 **Technical Features**
- Responsive design for all devices
- Real-time updates and notifications
- Secure authentication system
- Data export and privacy controls
- Multi-theme support (Light/Dark/System)

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks

### **Backend** (Ready for Integration)
- **Database**: Supabase / PostgreSQL
- **Authentication**: NextAuth.js / Supabase Auth
- **Real-time**: WebSockets / Supabase Realtime
- **Payments**: Stripe / PayNow
- **File Storage**: Vercel Blob / Supabase Storage

### **Development**
- **Package Manager**: npm/yarn
- **Linting**: ESLint
- **Formatting**: Prettier
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/kakis-food-delivery.git
   cd kakis-food-delivery
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Fill in your environment variables (see [Environment Variables](#environment-variables))

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
kakis-food-delivery/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   └── login/               # Authentication pages
│   ├── admin/                   # Admin dashboard
│   ├── checkout/                # Checkout process
│   ├── menu/
│   │   ├── [stallId]/          # Dynamic menu pages
│   │   ├── 2/                  # Western Grill menu
│   │   └── 4/                  # Local Favorites menu
│   ├── orders/                  # Order management
│   ├── partner/                 # Partner dashboard
│   ├── profile/                 # User profile
│   ├── settings/                # User settings
│   ├── support/                 # Support center
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   └── ui/                     # shadcn/ui components
├── lib/                        # Utility functions
├── public/                     # Static assets
├── types/                      # TypeScript definitions
└── README.md
\`\`\`

## 👥 User Roles

### 🎓 **Students**
- Browse and order food
- Track deliveries
- Manage profiles and preferences
- Rate and review orders

### 🚴 **Delivery Partners**
- Accept and fulfill delivery requests
- Track earnings and performance
- Communicate with customers
- Manage availability status

### 👨‍💼 **Administrators**
- Oversee platform operations
- Manage users and partners
- Monitor system analytics
- Handle support requests

## 📡 API Documentation

### Authentication Endpoints
\`\`\`typescript
POST /api/auth/login          # User login
POST /api/auth/register       # User registration
POST /api/auth/logout         # User logout
GET  /api/auth/me            # Get current user
\`\`\`

### Order Management
\`\`\`typescript
GET    /api/orders           # Get user orders
POST   /api/orders           # Create new order
GET    /api/orders/[id]      # Get specific order
PATCH  /api/orders/[id]      # Update order status
DELETE /api/orders/[id]      # Cancel order
\`\`\`

### Menu & Stalls
\`\`\`typescript
GET  /api/stalls             # Get all food stalls
GET  /api/stalls/[id]        # Get specific stall
GET  /api/stalls/[id]/menu   # Get stall menu
POST /api/stalls/[id]/menu   # Add menu item (admin)
\`\`\`

### Partner Management
\`\`\`typescript
GET   /api/partners          # Get available orders (partner)
POST  /api/partners/accept   # Accept delivery order
PATCH /api/partners/status   # Update delivery status
GET   /api/partners/earnings # Get earnings data
\`\`\`

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`bash
# Database
DATABASE_URL="your_database_url"
SUPABASE_URL="your_supabase_url"
SUPABASE_ANON_KEY="your_supabase_anon_key"

# Authentication
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# Payment Processing
STRIPE_PUBLIC_KEY="your_stripe_public_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"

# File Storage
VERCEL_BLOB_READ_WRITE_TOKEN="your_blob_token"

# Email Service
RESEND_API_KEY="your_resend_api_key"

# SMS Service
TWILIO_ACCOUNT_SID="your_twilio_sid"
TWILIO_AUTH_TOKEN="your_twilio_token"
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Manual Deployment
\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`

### Docker Deployment
\`\`\`bash
# Build Docker image
docker build -t kakis-app .

# Run container
docker run -p 3000:3000 kakis-app
\`\`\`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Make your changes**
4. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add amazing feature'
   \`\`\`
5. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
6. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

## 📝 Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript checks
\`\`\`

## 🐛 Known Issues

- [ ] Real-time notifications need WebSocket implementation
- [ ] Payment integration requires backend setup
- [ ] Image uploads need storage configuration
- [ ] Push notifications need service worker

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Core UI/UX implementation
- [x] Multi-role authentication
- [x] Order management system
- [x] Admin dashboard

### Phase 2 (Next)
- [ ] Backend API integration
- [ ] Real-time order tracking
- [ ] Payment gateway integration
- [ ] Push notifications

### Phase 3 (Future)
- [ ] Mobile app development
- [ ] Advanced analytics
- [ ] Multi-campus support
- [ ] AI-powered recommendations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for consistent icons

## 📞 Support

- **Email**: support@kakis.com
- **Documentation**: [docs.kakis.com](https://docs.kakis.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/kakis-food-delivery/issues)

---

<div align="center">
  <p>Made with ❤️ for the student community</p>
  <p>
    <a href="#top">Back to Top</a> •
    <a href="https://kakis.com">Website</a> •
    <a href="mailto:support@kakis.com">Contact</a>
  </p>
</div>
