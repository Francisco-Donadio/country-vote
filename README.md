# Country Vote - Frontend

A modern, accessible React application for voting on favorite countries with real-time rankings display. Built with TypeScript, React 19, and Tailwind CSS.

## 🌐 Live Demo

**Frontend**: [https://country-vote.onrender.com](https://country-vote.onrender.com)  
**Backend API**: [https://country-vote-api.onrender.com/api](https://country-vote-api.onrender.com/api)

## ✨ Features

- 🗳️ **Interactive Voting Form** with real-time validation
- 📊 **Live Rankings Table** showing top 10 countries
- 🔍 **Real-time Search** through country rankings
- ♿ **Fully Accessible** with keyboard navigation and screen reader support
- 📱 **Responsive Design** for mobile, tablet, and desktop
- ⚡ **Fast & Modern** using Vite for instant HMR
- 🎨 **Clean UI** with Tailwind CSS and Radix UI components

## 🛠️ Tech Stack

### Core

- **React 19** - UI framework with latest features
- **TypeScript** - Type safety and better DX
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client with interceptors
- **Zod** - TypeScript-first schema validation

### Styling & Components

- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-select` - Accessible dropdown
  - `@radix-ui/react-label` - Form labels
  - `@radix-ui/react-dialog` - Modals

### Architecture

- **Component-Based** - Reusable, maintainable components
- **Type-Safe API Layer** - Centralized HTTP client
- **React Hooks** - Local state management
- **Client-Side Validation** - Real-time form feedback

## 📋 Prerequisites

- **Node.js** v18.19.1 or higher (v20+ recommended)
- **npm** v8.0.0 or higher
- **Backend API** running (see [country-vote-api](https://github.com/Francisco-Donadio/country-vote-api))

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd country-vote
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# For local development with local backend
VITE_API_URL=http://localhost:3000/api

# Or to use the production API
# VITE_API_URL=https://country-vote-api.onrender.com/api
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── api/
│   ├── API.config.ts          # Axios instance & interceptors
│   └── service.ts             # API methods (typed)
├── components/
│   ├── VotingForm.tsx         # Vote submission form
│   ├── CountryTable.tsx       # Rankings table with search
│   └── Icons.tsx              # SVG icon components
├── schemas/
│   └── vote.schema.ts         # Zod validation schemas
├── types.ts                   # TypeScript interfaces
├── App.tsx                    # Root component
├── main.tsx                   # Application entry
└── index.css                  # Global styles & Tailwind
```

## 🔌 API Integration

The frontend communicates with a NestJS backend. Required endpoints:

### Get All Countries

```http
GET /api/countries
  Response: { data: Country[] }
```

### Get Top Countries

```http
GET /api/votes/top
  Response: { data: CountryVote[] }
```

### Submit Vote

```http
POST /api/votes
  Body: { name: string, email: string, country: string }
```

### Search Countries

```http
GET /api/votes/search?q={query}
  Response: { data: CountryVote[] }
```

See [types.ts](./src/types.ts) for complete type definitions.

## 🏗️ Architecture Overview

### Component Hierarchy

```
App
├── VotingForm
│   ├── Radix Select (Country Dropdown)
│   ├── Input Fields (Name, Email)
│   └── Submit Button
└── CountryTable
    ├── Search Input
    └── Table Rows (Top 10 Rankings)
```

### State Management

- **Local State**: React `useState` for component-level state
- **Effect Hooks**: `useEffect` for data fetching and side effects
- **Props & Callbacks**: Parent-child communication

**Why no Redux?**

- Simple component tree (no deep nesting)
- Limited shared state requirements
- Direct parent-child communication is sufficient

### Data Flow

1. **Vote Submission**:

   - User fills form → Client validation → API call → Success feedback
   - On success: Trigger refresh in `CountryTable`

2. **Rankings Display**:

   - Component mount → Fetch data → Display
   - Search input → Filter results → Update display
   - Auto-refresh after vote submission

3. **Error Handling**:
   - Axios interceptor catches errors
   - User-friendly messages displayed
   - Form validation errors shown inline

## 🎨 Design Philosophy

This project follows modern React best practices with focus on:

- **Developer Experience** - Fast builds, TypeScript, great tooling
- **User Experience** - Accessible, performant, intuitive
- **Maintainability** - Clear architecture, type safety
- **Simplicity** - No over-engineering, pragmatic choices

### Quick Overview

- **React 19 + Vite** - Fast development with instant HMR
- **TypeScript Strict Mode** - Type safety throughout
- **Zod Schema Validation** - Type-safe form validation
- **Tailwind CSS** - Utility-first styling for consistency
- **Radix UI** - Accessible primitives for components
- **Axios** - Enhanced HTTP client with interceptors
- **Component-Based** - Reusable, testable components
- **React Hooks** - Simple state management

### Detailed Technical Decisions

For in-depth explanations of architectural choices, trade-offs, and alternatives considered, see:

📖 **[DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md)**

This document covers:

- Framework selection (React + Vite vs Next.js)
- State management (Hooks vs Redux)
- Styling approach (Tailwind vs CSS Modules)
- Component library (Radix UI vs alternatives)
- HTTP client (Axios vs fetch)
- Form validation (Zod schema validation)
- TypeScript configuration
- Performance optimizations
- Future enhancements

## 🧪 Development

### Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint checks        |

### Code Style

- **TypeScript Strict Mode** enabled
- **ESLint** for code quality
- **Prettier** for consistent formatting (via ESLint)

### Adding New Components

1. Create component in `src/components/`
2. Define props interface
3. Export from component file
4. Import and use in parent component

Example:

```typescript
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export const MyComponent = ({ title, onAction }: MyComponentProps) => {
  return (
    <div className="p-4">
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};
```

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

Modern browsers with ES2020+ support required.

## ♿ Accessibility

Built with accessibility as a priority:

- **ARIA Labels** - Proper labeling for screen readers
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Visible focus indicators
- **Semantic HTML** - Proper heading hierarchy
- **Color Contrast** - WCAG AA compliant
- **Form Validation** - Clear error messages

## 🎯 Performance

- **Code Splitting** - Lazy loading for optimal load times
- **Tree Shaking** - Remove unused code
- **Minification** - Compressed production builds
- **Efficient Re-renders** - React's reconciliation
- **Optimized Assets** - Compressed images & fonts

## 🔒 Security

- **Input Validation** - Client & server-side validation
- **XSS Protection** - React's built-in escaping
- **HTTPS Ready** - Secure communication
- **No Sensitive Data** - No tokens/keys in frontend

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

Output in `dist/` folder (configured in `vite.config.ts`).

### Deploy to Render

1. **Connect your GitHub repository** to Render
2. **Create a new Static Site**
3. **Configure settings in the dashboard:**

   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: `20` (or higher)

4. **Add Environment Variables:**

   - `VITE_API_URL`: `https://country-vote-api.onrender.com/api`

5. **Optional - SPA Routing Setup:**

   If you add React Router later, configure redirects in the dashboard:

   - Go to **Redirects/Rewrites**
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Type**: Rewrite

That's it! Render will auto-deploy on every push to your main branch.

### Other Hosting Options

- **Vercel** - Zero config deployment, automatic builds
- **Netlify** - Great DX, instant rollbacks
- **AWS S3 + CloudFront** - Scalable, cost-effective
- **Nginx** - Traditional server hosting

### Environment Variables

For production, set in your hosting platform:

```env
VITE_API_URL=https://country-vote-api.onrender.com/api
```

**Important**: Vite injects env vars at **build time**, not runtime. Rebuild when changing `VITE_*` variables.

## 📊 Bundle Size

Approximate production bundle sizes:

- **JS (gzipped)**: ~45KB
- **CSS (gzipped)**: ~8KB
- **Total**: ~53KB

Optimized with:

- Vite's rollup bundling
- Tailwind's PurgeCSS
- Dynamic imports for routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- TypeScript strict mode
- Functional components with hooks
- Props interface for all components
- Descriptive variable/function names
- Comments for complex logic

## 🐛 Troubleshooting

### Port Already in Use

Change port in `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 5174, // or any other port
  },
});
```

### API Connection Failed

1. Verify backend is running on port 3000
2. Check `.env` file has correct `VITE_API_URL`
3. Ensure CORS is enabled in backend
4. Check browser console for errors

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Render: "Publish directory does not exist"

**Problem**: Render can't find the build output

**Solution**:

1. Ensure **Publish Directory** is set to `dist` (not `build`)
2. Check that build command is: `npm install && npm run build`
3. Verify `vite.config.ts` has `outDir: 'dist'`

### Render: Environment Variables Not Working

**Problem**: `VITE_API_URL` not being replaced

**Solution**:

1. Ensure variable starts with `VITE_` prefix
2. Remember: Vite injects at **build time**
3. After changing env vars in Render, **trigger a rebuild**
4. Variables must be set **before** the build runs

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)

## 📄 License

MIT

## 👥 Authors

- Francisco Donadio

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [REST Countries API](https://restcountries.com/) - Country data source
- [Vite](https://vitejs.dev/) - Next generation frontend tooling

---

**Related Projects:**

- Backend API Repository: [country-vote-api](https://github.com/Francisco-Donadio/country-vote-api)
- Live Frontend: [https://country-vote.onrender.com](https://country-vote.onrender.com)
- Live API: [https://country-vote-api.onrender.com/api](https://country-vote-api.onrender.com/api)

**Documentation:**

- Architecture & Technical Decisions: [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md)
- API Integration Guide: See "API Integration" section above
