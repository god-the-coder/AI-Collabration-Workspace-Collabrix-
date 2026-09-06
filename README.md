# 🚀 Collabrix - AI Collaboration Workspace

**Collabrix** is an intelligent collaboration platform that bridges teams and AI capabilities, enabling seamless project management, real-time communication, and task automation in a unified workspace environment.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Important Details](#important-details)

---

## 🎯 Overview

Collabrix is a modern AI-powered collaboration workspace designed to facilitate:

- **Workspace Management**: Create and manage multiple collaborative workspaces with role-based access control
- **Project Management**: Organize work into projects with milestones, status tracking, and team coordination
- **Task Management**: Handle tasks with priorities, assignments, subtasks, and progress tracking
- **Real-time Communication**: Enable conversations and messaging between team members
- **File Management**: Centralized file storage and sharing
- **Notifications**: Intelligent notification system for updates and mentions
- **Audit Logging**: Complete audit trail for security and compliance
- **AI Integration**: Support for multiple AI providers (OpenAI, Groq, Gemini, Anthropic)

---

## ✨ Key Features

### User Management
- User registration and authentication (JWT-based)
- Email verification with token-based validation
- Password reset functionality with secure tokens
- User profiles with customizable settings
- Theme preferences (Light/Dark/System)
- Multi-language support

### Workspace Management
- Create and manage workspaces
- Invite members with role-based access (Owner, Admin, Member)
- Workspace settings and configuration
- Logo/branding support
- Member management and role assignment

### Projects
- Create projects within workspaces
- Project status tracking (Planning, Active, On Hold, Completed, Cancelled, At Risk)
- Milestone management with status tracking
- Project member roles (Admin, Member)
- Project archival and deletion

### Tasks & Workflows
- Flexible task creation and assignment
- Task priorities (Critical, High, Medium, Low)
- Task status management (Todo, In Progress, In Review, Completed, Cancelled)
- Subtask support for hierarchical task structures
- Task comments and collaboration
- Milestone linking
- Due date tracking

### Communication
- Direct messaging and conversations
- Workspace-wide discussions
- Message threading
- Real-time updates

### Notifications
- User-customizable notification preferences
- Task notifications
- Mention notifications
- Direct message notifications
- Intelligent notification filtering

### Security & Compliance
- JWT authentication with refresh tokens
- Session management and tracking
- Email and password verification
- CORS security
- Audit logging for all operations
- Permission-based access control

---

## 🛠️ Tech Stack

### **Backend** (30.6% Python)
- **Framework**: Django 5.x with Django REST Framework (DRF)
- **Language**: Python 3.8+
- **Database**: PostgreSQL (primary) / SQLite (development)
- **API Documentation**: drf-spectacular (Swagger/OpenAPI)
- **Authentication**: JWT (rest_framework_simplejwt)
- **Email Handling**: Django Email Backend
- **File Storage**: Local filesystem with uploads directory
- **Redis**: Caching and session management support
- **AI Integration**: OpenAI, Groq, Gemini, Anthropic APIs

### **Frontend** (69.4% JavaScript)
- **Framework**: React 19.2.6
- **Bundler**: Vite 8.x (lightning-fast dev server)
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Zustand 5.x (lightweight alternative to Redux)
- **HTTP Client**: Axios 1.16.1
- **Form Handling**: React Hook Form 7.77
- **UI Components**: Lucide React Icons 1.17
- **Notifications**: React Hot Toast 2.6
- **Routing**: React Router DOM 7.16
- **Utilities**: clsx 2.1.1

### **DevTools & Quality**
- **Linting**: ESLint 10.x
- **Formatting**: Prettier 3.8
- **CSS Processing**: PostCSS, Autoprefixer
- **Build Tool**: Vite with React plugin

---

## 📁 Project Structure

### Backend Structure

```
backend/
├── api/v1/                          # API v1 endpoints
│   ├── accounts/                    # Authentication & profile endpoints
│   ├── workspaces/                  # Workspace management endpoints
│   ├── projects/                    # Project management endpoints
│   ├── tasks/                       # Task management endpoints
│   ├── notifications/               # Notification endpoints
│   ├── profiles/                    # User profile endpoints
│   ├── settings/                    # User settings endpoints
│   ├── services/                    # Reusable service layer
│   ├── urls.py                      # API route configuration
│   ├── views.py                     # Core API views (health check, profile)
│   ├── permissions.py               # Custom permission classes
│   ├── selectors.py                 # Database query selectors
│   └── serializers.py               # DRF serializers
│
├── apps/                            # Django applications
│   ├── accounts/                    # User models & authentication
│   │   ├── models.py               # User, UserSettings, Session, Token models
│   │   ├── admin.py                # Django admin configuration
│   │   └── backends.py             # Email authentication backend
│   │
│   ├── workspaces/                  # Workspace management
│   │   ├── models.py               # Workspace, WorkspaceMember, Invitation models
│   │   └── admin.py
│   │
│   ├── projects/                    # Project management
│   │   ├── models.py               # Project, ProjectMember, Milestone models
│   │   └── admin.py
│   │
│   ├── tasks/                       # Task management
│   │   ├── models.py               # Task, TaskComment models
│   │   └── admin.py
│   │
│   ├── files/                       # File management
│   │   ├── models.py               # File model
│   │   └── admin.py
│   │
│   ├── communications/              # Messaging & conversations
│   │   ├── models.py               # Conversation, Message models
│   │   └── admin.py
│   │
│   ├── notifications/               # Notification system
│   │   └── models.py               # Notification model
│   │
│   └── audit/                       # Audit logging
│       └── models.py               # Audit log model
│
├── config/                          # Django configuration
│   ├── settings/
│   │   ├── base.py                 # Common settings
│   │   ├── development.py          # Dev environment config
│   │   ├── production.py           # Production environment config
│   │   └── spectacular_hooks.py    # API documentation customization
│   ├── urls.py                     # Main URL routing
│   ├── asgi.py                     # ASGI configuration
│   └── wsgi.py                     # WSGI configuration
│
├── common/                          # Shared utilities
│   ├── utils/
│   │   ├── models.py               # Base model classes (UUIDModel, TimeStampedModel)
│   │   └── api_response.py         # Standardized API response utilities
│   ├── middleware/                 # Custom middleware
│   │   ├── request_logger.py       # Request logging
│   │   ├── timing.py               # Request timing
│   │   └── exception.py            # Global exception handling
│   ├── authentication.py           # JWT authentication
│   ├── exceptions/
│   │   └── handlers.py             # Custom exception handlers
│   └── permissions/
│
├── manage.py                        # Django management script
├── db.sqlite3                       # SQLite database (dev)
└── .env.example                     # Environment variables template
```

### Frontend Structure

```
frontend/
├── src/
│   ├── api/                         # API service layer
│   │   ├── client.ts               # Axios client configuration
│   │   └── endpoints.ts            # API endpoint definitions
│   │
│   ├── components/                  # Reusable React components
│   │   ├── common/                 # Common UI components
│   │   ├── forms/                  # Form components
│   │   ├── layouts/                # Layout components
│   │   └── modals/                 # Modal/dialog components
│   │
│   ├── pages/                       # Page components
│   │   ├── public/                 # Public pages
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── VerifyEmail.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   │
│   │   ├── workspace/              # Workspace pages
│   │   │   ├── WorkspaceSwitcher.jsx
│   │   │   ├── CreateWorkspace.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── projects/               # Project pages
│   │   │   ├── ProjectsList.jsx
│   │   │   └── ProjectDetails.jsx
│   │   │
│   │   ├── tasks/                  # Task pages
│   │   │   ├── TasksList.jsx
│   │   │   ├── TaskBoard.jsx
│   │   │   └── TaskDetails.jsx
│   │   │
│   │   ├─��� communications/         # Chat pages
│   │   │   ├── ConversationsList.jsx
│   │   │   └── ConversationView.jsx
│   │   │
│   │   ├── notifications/          # Notification pages
│   │   │   └── NotificationCenter.jsx
│   │   │
│   │   ├── members/                # Member management pages
│   │   │   ├── MembersManagement.jsx
│   │   │   ├── Invitations.jsx
│   │   │   └── InvitationAcceptance.jsx
│   │   │
│   │   ├── settings/               # Settings pages
│   │   │   ├── Profile.jsx
│   │   │   ├── Account.jsx
│   │   │   └── Preferences.jsx
│   │   │
│   │   └── errors/                 # Error pages
│   │       ├── 403.jsx
│   │       ├── 404.jsx
│   │       └── 500.jsx
│   │
│   ├── routes/                      # Route configuration
│   │   ├── AppRoute.jsx            # Main route component
│   │   └── ProtectedRoute.jsx      # Protected route wrapper
│   │
│   ├── services/                    # Business logic services
│   │   ├── auth/
│   │   │   └── authService.js
│   │   ├── workspace/
│   │   ├── project/
│   │   ├── task/
│   │   └── communication/
│   │
│   ├── store/                       # Zustand state management
│   │   ├── authStore.js            # Auth state
│   │   ├── workspaceStore.js       # Workspace state
│   │   ├── projectStore.js         # Project state
│   │   ├── taskStore.js            # Task state
│   │   └── uiStore.js              # UI state
│   │
│   ├── layout/                      # Layout components
│   │   ├── MainLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── ErrorLayout.jsx
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useWorkspace.js
│   │   └── useFetch.js
│   │
│   ├── utils/                       # Utility functions
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── helpers.js
│   │
│   ├── constants/                   # Application constants
│   │   ├── roles.js
│   │   ├── status.js
│   │   └── api.js
│   │
│   ├── config/                      # Configuration files
│   │   ├── api.config.js
│   │   └── env.js
│   │
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # Entry point
│   ├── App.css                      # Global styles
│   ├── index.css                    # Global styles
│   └── tailwind.css                 # Tailwind configuration
│
├── public/                          # Static assets
├── index.html                       # HTML entry point
├── package.json                     # Dependencies & scripts
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── eslint.config.js                 # ESLint configuration
└── .env                             # Environment variables
```

---

## 🗄️ Database Schema

### **Database Type**: PostgreSQL (Production) / SQLite (Development)

### **Number of Tables**: 14+ Core Tables

### **Core Data Models**

#### **Accounts App** (4 Tables)
1. **UserModel** - Custom user model with UUID primary key
   - Fields: id(UUID), email, username, password, bio, avatar, is_email_verified, created_at, updated_at
   
2. **UserSettingsModel** - User preferences
   - Fields: id, user_id, theme, timezone, language, task_notifications, mention_notifications, dm_notifications
   
3. **SessionsModel** - Active user sessions with JWT tokens
   - Fields: id, user_id, refresh_token, ip_address, user_agent, expires_at, revoked_at
   
4. **PasswordResetTokenModel** & **EmailVerificationTokenModel** - Token management
   - Fields: id, user_id, token, expires_at, used_at/verified_at

#### **Workspaces App** (4 Tables)
1. **Workspace** - Collaboration space
   - Fields: id, owner_id, logo_id, name, slug(unique), description, created_at, updated_at
   
2. **WorkspaceMember** - Membership with roles
   - Fields: id, user_id, workspace_id, role(OWNER/ADMIN/MEMBER), joined_at
   
3. **WorkspaceSetting** - Workspace configuration
   - Fields: id, workspace_id, allow_member_invites, default_member_role, ai_enabled, ai_file_access_enabled
   
4. **Invitation** - Member invitations
   - Fields: id, invited_by_id, workspace_id, email, role, token, expires_at, status(PENDING/ACCEPTED/REJECTED)

#### **Projects App** (3 Tables)
1. **Project** - Project within workspace
   - Fields: id, owner_id, workspace_id, name, description, start_date, due_date, status, is_archived, is_deleted
   - Status: PLANNING, ACTIVE, ON_HOLD, COMPLETED, CANCELLED, AT_RISK
   
2. **ProjectMember** - Project team members
   - Fields: id, user_id, project_id, role(ADMIN/MEMBER), joined_at
   
3. **Milestone** - Project milestones
   - Fields: id, project_id, title, description, due_date, status(PENDING/IN_PROGRESS/COMPLETED)

#### **Tasks App** (2 Tables)
1. **Task** - Individual tasks
   - Fields: id, workspace_id, project_id, created_by_id, assignee_id, parent_task_id, milestone_id, title, description, priority, status, due_date, completed_at
   - Priority: LOW, MEDIUM, HIGH, CRITICAL
   - Status: TODO, IN_PROGRESS, IN_REVIEW, COMPLETED, CANCELLED
   
2. **TaskComment** - Task discussions
   - Fields: id, task_id, author_id, content, edited_at, created_at, updated_at

#### **Communications App** (2 Tables)
1. **Conversation** - Chat conversations
   - Fields: id, workspace_id, name, type(DIRECT/GROUP), created_by_id
   
2. **Message** - Messages in conversations
   - Fields: id, conversation_id, sender_id, content, edited_at, created_at

#### **Files App** (1 Table)
1. **File** - File storage
   - Fields: id, workspace_id, uploaded_by_id, file_name, file_path, file_size, file_type, mime_type

#### **Notifications App** (1 Table)
1. **Notification** - User notifications
   - Fields: id, user_id, type, title, content, is_read, created_at

#### **Audit App** (1+ Table)
1. **AuditLog** - Activity logging
   - Fields: id, user_id, action, resource_type, resource_id, changes, timestamp

### **Relationships**
- Users → Workspaces (Many-to-Many through WorkspaceMember)
- Workspaces → Projects (One-to-Many)
- Projects → Tasks (One-to-Many)
- Tasks → TaskComments (One-to-Many)
- Tasks → Subtasks (Self-referential Foreign Key)
- Users → Sessions (One-to-Many)

---

## 🔌 API Endpoints

### **Base URL**: `/api/v1/`

### **Authentication Endpoints** (`/auth/`)
- `POST /auth/register/` - User registration
- `POST /auth/login/` - User login (returns access & refresh tokens)
- `POST /auth/refresh/` - Refresh access token
- `POST /auth/logout/` - Logout user
- `POST /auth/verify-email/` - Verify email with token
- `POST /auth/forgot-password/` - Request password reset
- `POST /auth/reset-password/` - Reset password with token

### **Profile Endpoints** (`/profile/`, `/profiles/`)
- `GET /profile/` - Get current user profile
- `GET /profiles/{user_id}/` - Get user profile
- `PUT /profiles/{user_id}/` - Update user profile
- `PUT /profiles/{user_id}/avatar/` - Upload avatar

### **Workspace Endpoints** (`/workspaces/`)
- `GET /workspaces/` - List user's workspaces
- `POST /workspaces/` - Create new workspace
- `GET /workspaces/{workspace_id}/` - Get workspace details
- `PUT /workspaces/{workspace_id}/` - Update workspace
- `DELETE /workspaces/{workspace_id}/` - Delete workspace
- `GET /workspaces/{workspace_id}/members/` - List workspace members
- `POST /workspaces/{workspace_id}/members/` - Add member
- `PUT /workspaces/{workspace_id}/members/{member_id}/` - Update member role
- `DELETE /workspaces/{workspace_id}/members/{member_id}/` - Remove member
- `POST /workspaces/{workspace_id}/invitations/` - Send invitation
- `GET /workspaces/{workspace_id}/invitations/` - List invitations
- `PUT /workspaces/{workspace_id}/invitations/{invitation_id}/accept/` - Accept invitation
- `PUT /workspaces/{workspace_id}/invitations/{invitation_id}/reject/` - Reject invitation

### **Projects Endpoints** (`/projects/`)
- `GET /projects/` - List projects
- `POST /projects/` - Create project
- `GET /projects/{project_id}/` - Get project details
- `PUT /projects/{project_id}/` - Update project
- `DELETE /projects/{project_id}/` - Delete project
- `GET /projects/{project_id}/members/` - List project members
- `POST /projects/{project_id}/members/` - Add project member
- `GET /projects/{project_id}/milestones/` - List milestones
- `POST /projects/{project_id}/milestones/` - Create milestone
- `PUT /projects/{project_id}/milestones/{milestone_id}/` - Update milestone

### **Tasks Endpoints** (`/tasks/`)
- `GET /tasks/` - List tasks (with filtering by workspace, project, status, etc.)
- `POST /tasks/` - Create task
- `GET /tasks/{task_id}/` - Get task details
- `PUT /tasks/{task_id}/` - Update task
- `DELETE /tasks/{task_id}/` - Delete task
- `POST /tasks/{task_id}/comments/` - Add comment to task
- `GET /tasks/{task_id}/comments/` - List task comments
- `PUT /tasks/{task_id}/comments/{comment_id}/` - Edit comment
- `GET /tasks/{task_id}/subtasks/` - List subtasks

### **Notifications Endpoints** (`/notifications/`)
- `GET /notifications/` - List user notifications
- `PUT /notifications/{notification_id}/read/` - Mark notification as read
- `PUT /notifications/read-all/` - Mark all as read
- `DELETE /notifications/{notification_id}/` - Delete notification

### **Settings Endpoints** (`/settings/`)
- `GET /settings/` - Get user settings
- `PUT /settings/` - Update user settings
- `PUT /settings/theme/` - Update theme preference
- `PUT /settings/language/` - Update language preference
- `PUT /settings/notifications/` - Update notification preferences

### **Health & Utility Endpoints**
- `GET /health/` - API health check
- `GET /api/v1/schema/` - OpenAPI schema (Swagger documentation)
- `GET /api/v1/docs/` - Interactive Swagger UI

---

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 12+ (or SQLite for development)
- Git

---

## 📦 Installation

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/god-the-coder/AI-Collabration-Workspace-Collabrix-.git
cd AI-Collabration-Workspace-Collabrix-/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install django djangorestframework django-cors-headers
pip install djangorestframework-simplejwt
pip install drf-spectacular
pip install django-filter
pip install python-decouple
pip install psycopg2-binary  # For PostgreSQL
pip install pillow  # For image handling
pip install redis  # For caching (optional)

# Create .env file from template
cp .env.example .env
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api/v1" > .env
```

---

## ⚙️ Configuration

### Backend Configuration (`.env`)

```dotenv
# Django Configuration
DEBUG=True
SECRET_KEY=your-secret-key-here

# Allowed Hosts
ALLOWED_HOSTS=127.0.0.1,localhost

# Database Configuration (PostgreSQL)
DB_NAME=collabrix_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Redis Configuration
REDIS_URL=redis://localhost:6379/0

# JWT Authentication
JWT_SECRET_KEY=your-jwt-secret-key

# AI Provider APIs
OPENAI_API_KEY=your-openai-key
GROQ_API_KEY=your-groq-key
GEMINI_API_KEY=your-gemini-key
ANTHROPIC_API_KEY=your-anthropic-key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Frontend Configuration (`.env`)

```dotenv
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_NAME=Collabrix
VITE_DEBUG=true
```

---

## ▶️ Running the Application

### Start Backend

```bash
cd backend

# Run migrations
python manage.py migrate

# Create superuser (for admin panel)
python manage.py createsuperuser

# Start development server
python manage.py runserver

# API will be available at: http://localhost:8000/api/v1/
# Swagger UI: http://localhost:8000/api/v1/docs/
# Admin Panel: http://localhost:8000/admin/
```

### Start Frontend

```bash
cd frontend

# Development mode
npm run dev

# Application will be available at: http://localhost:5173
```

### Database Migrations

```bash
# Create migrations for changes
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# View migration status
python manage.py showmigrations
```

---

## 📊 Important Details

### Language Composition
- **JavaScript**: 69.4% (Frontend - React, Node.js)
- **Python**: 30.6% (Backend - Django)

### Number of API Endpoints
**Total Endpoints: 60+** across 7 major route groups:
- Authentication: 7 endpoints
- Profiles: 4 endpoints
- Workspaces: 12+ endpoints
- Projects: 8+ endpoints
- Tasks: 10+ endpoints
- Notifications: 4 endpoints
- Settings: 5+ endpoints

### Number of Database Tables
**Total Tables: 14+** with multiple relationships:
- User-related: 4 tables
- Workspace-related: 4 tables
- Project-related: 3 tables
- Task-related: 2 tables
- Communication-related: 2 tables
- File management: 1 table
- Notification: 1 table
- Audit: 1+ table

### Authentication & Security
- **JWT Token-based Authentication** with access and refresh tokens
- **Cookie-based JWT Authentication** support
- **Email verification** with token expiration
- **Password reset** with secure token mechanism
- **Session tracking** with IP and User-Agent logging
- **CORS protection** with whitelisted origins
- **Permission classes** for role-based access control

### AI Integration
- **Multiple AI Providers**: OpenAI, Groq, Gemini, Anthropic
- **Configurable** via environment variables
- **Workspace-level AI settings** with file access control

### File Management
- **Local file storage** in `uploads/` directory
- **User avatars** stored as File objects
- **Workspace logos** linked to File model
- **MIME type tracking** and validation

### Performance Features
- **JWT Token Caching** for frequent validation
- **Database indexing** on frequently queried fields (workspace, user)
- **Pagination** with 20 items per page (configurable)
- **Django Filter Backend** for efficient filtering
- **Request logging middleware** for monitoring
- **Request timing middleware** for performance tracking

### Deployment Ready
- **Environment-based configuration** (Development/Production)
- **ASGI & WSGI support** for different deployment scenarios
- **Media file serving** with proper security
- **CORS configuration** for frontend communication
- **Database connection pooling** support via environment

### Development Tools
- **OpenAPI/Swagger documentation** with drf-spectacular
- **Django admin panel** for content management
- **Interactive API testing** via Swagger UI
- **Request/Response logging** for debugging
- **ESLint & Prettier** for code quality (Frontend)

### Frontend Features
- **Component-based architecture** with React
- **Zustand state management** for lightweight global state
- **React Router** for client-side routing
- **Tailwind CSS** for rapid UI development
- **React Hook Form** for efficient form handling
- **Axios interceptors** for API request/response handling
- **Toast notifications** with React Hot Toast
- **Lucide icons** for consistent iconography

### Supported Features
✅ Multi-workspace support  
✅ Role-based access control (RBAC)  
✅ Task hierarchy with subtasks  
✅ Project milestones tracking  
✅ Real-time notifications  
✅ User authentication & verification  
✅ File upload & storage  
✅ Conversation threading  
✅ Audit logging  
✅ AI integration ready  
✅ Responsive design  
✅ Dark/Light theme support  

---

## 📚 Project Documentation

### Additional Resources
- **Architecture Design**: See `Collabrix ERD.pdf` for detailed database schema
- **Product Requirements**: See `AI_Collaboration_Workspace_PRD.pdf`
- **Roadmap**: See `AI_Collaboration_Workspace_Roadmap.pdf`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is part of the AI Collaboration Workspace initiative.

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository or contact the development team.

---

**Built with ❤️ by the Collabrix Team**

Last Updated: 2026-09-06
