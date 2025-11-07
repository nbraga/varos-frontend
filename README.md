# Varos Frontend

A modern user management system built with Next.js 15, featuring real-time data handling, advanced filtering capabilities, and a beautiful UI.

## 🚀 Features

- **User Management**: Create, read, update, and delete users with ease
- **Smart Filtering**: Filter users by consultant, creation date, and search terms
- **Address Autocomplete**: Automatic address filling via CEP (Brazilian postal code) lookup
- **Input Masking**: Automatic formatting for phone numbers and CPF
- **Real-time Updates**: Optimistic UI updates with React Query
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: Built-in theme switching
- **Type Safety**: Full TypeScript implementation
- **Data Visualization**: Statistics dashboard with user metrics

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Supabase)
- **ORM**: [Prisma](https://www.prisma.io/)
- **State Management**: [React Query](https://tanstack.com/query)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 📋 Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- PostgreSQL database (Supabase recommended)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nbraga/varos-frontend.git
   cd varos-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://..."
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── _components/        # Page-specific components
│   ├── actions/           # Server actions
│   ├── api/               # API routes
│   └── schemas/           # Zod validation schemas
├── components/            # Reusable UI components
│   └── ui/               # shadcn/ui components
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
├── interfaces/           # TypeScript interfaces
├── lib/                  # Utility functions
├── providers/            # App providers
├── services/             # API services
└── utils/                # Helper functions
```

## 🎯 Key Features Explained

### User Management

- **CRUD Operations**: Full create, read, update, delete functionality
- **Form Validation**: Client and server-side validation using Zod
- **Loading States**: Visual feedback during async operations
- **Error Handling**: Graceful error messages and recovery

### Filtering System

- **Search**: Real-time search by name or email
- **Consultant Filter**: View clients assigned to specific consultants
- **Date Range**: Filter users by creation date
- **Combined Filters**: All filters work together seamlessly

### Address Integration

- **ViaCEP API**: Automatic address lookup for Brazilian postal codes
- **Auto-fill**: Automatically populates street, neighborhood, city, and state
- **Fallback**: Manual input available if CEP is not found

### Data Table

- **Pagination**: Server-side pagination for optimal performance
- **Sorting**: Sortable columns
- **Actions**: Inline edit and delete actions
- **Responsive**: Mobile-friendly table layout

## 🔐 Environment Variables

| Variable       | Description                  | Required |
| -------------- | ---------------------------- | -------- |
| `DATABASE_URL` | PostgreSQL connection string | Yes      |

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma migrate dev    # Run migrations (development)
npx prisma studio         # Open Prisma Studio
npx prisma generate       # Generate Prisma Client

# Linting
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Nicolas Braga**

- GitHub: [@nbraga](https://github.com/nbraga)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [shadcn](https://ui.shadcn.com/) for the beautiful UI components
- [Vercel](https://vercel.com/) for hosting and deployment platform
