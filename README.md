# Learning Management System (LMS)

A modern, full-stack Learning Management System built with Next.js, featuring course management, user authentication, file uploads, and an intuitive admin interface.

## 🚀 Features

- **Course Management**: Create, edit, and organize courses with chapters and lessons
- **User Authentication**: Secure authentication with Google OAuth using Better Auth
- **Admin Dashboard**: Comprehensive admin interface for managing content
- **File Uploads**: AWS S3 integration for course materials and thumbnails
- **Rich Text Editor**: Tiptap-powered editor for lesson content
- **Drag & Drop**: Intuitive course structure management with @dnd-kit
- **Responsive Design**: Mobile-first design with Tailwind CSS and Radix UI
- **Database**: PostgreSQL with Prisma ORM for robust data management
- **Security**: Arcjet integration for rate limiting and security
- **Email Notifications**: Resend integration for user communications

## 🛠 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **Better Auth** - Authentication library
- **AWS S3** - File storage
- **Resend** - Email service
- **Arcjet** - Security and rate limiting

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Prisma Studio** - Database management UI

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL** database
- **AWS Account** (for S3 file storage)
- **Google OAuth** credentials
- **Resend** account for email

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning-management-system
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/lms_db"

   # Authentication
   BETTER_AUTH_SECRET="your-secret-key-here"
   BETTER_AUTH_URL="http://localhost:3000"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Email Service
   RESEND_API_KEY="your-resend-api-key"

   # Security
   ARCJET_KEY="your-arcjet-key"

   # AWS S3 Configuration
   AWS_ACCESS_KEY_ID="your-aws-access-key-id"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
   AWS_ENDPOINT_URL_S3="https://s3.amazonaws.com"
   AWS_ENDPOINT_URL_IAM="https://iam.amazonaws.com"
   AWS_REGION="us-east-1"
   NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES="your-s3-bucket-name"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   pnpm run prisma:generate

   # Push database schema
   pnpm run prisma:dbpush

   # (Optional) Open Prisma Studio to view database
   pnpm run prisma:studio
   ```

5. **Run the development server**

   ```bash
   pnpm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
learning-management-system/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Authentication routes
│   ├── (public)/                 # Public-facing pages
│   │   ├── courses/              # Course listing and details
│   │   └── _components/          # Public components
│   ├── admin/                    # Admin dashboard
│   │   ├── courses/              # Course management
│   │   └── _components/          # Admin components
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   └── s3/                   # File upload endpoints
│   └── data/                     # Data access layer
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI components (Radix)
│   ├── file-uploader/            # File upload components
│   ├── rich-text-editor/         # Rich text editor
│   └── sidebar/                  # Sidebar components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication configuration
│   ├── db.ts                     # Database connection
│   ├── env.ts                    # Environment variables
│   └── S3Client.ts               # AWS S3 client
├── prisma/                       # Database schema and migrations
│   └── schema.prisma
└── public/                       # Static assets
```

## 🔧 Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run prisma:generate` - Generate Prisma client
- `pnpm run prisma:dbpush` - Push database schema
- `pnpm run prisma:studio` - Open Prisma Studio

## 🎯 Key Features Explained

### Course Management
- **Courses**: Create and manage educational courses with titles, descriptions, pricing, and categories
- **Chapters**: Organize courses into chapters for better structure
- **Lessons**: Add individual lessons with video content, descriptions, and thumbnails
- **Drag & Drop**: Reorder chapters and lessons with intuitive drag-and-drop functionality

### User Roles
- **Public Users**: Browse and view published courses
- **Administrators**: Full access to create, edit, and manage all content

### File Management
- **AWS S3 Integration**: Secure file storage for course materials
- **Image Uploads**: Course thumbnails and lesson images
- **Video Uploads**: Support for video lesson content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🔄 Updates

Keep your dependencies up to date:

```bash
pnpm update
```

And check for database migrations when pulling updates:

```bash
pnpm run prisma:dbpush
```
