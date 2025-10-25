# Project Architecture Documentation

## 📂 Folder Structure

```
capital-one/
├── src/
│   ├── app/                           # Next.js App Router
│   │   ├── components/
│   │   │   └── typography/
│   │   │       ├── loginForm.tsx      # Login form component (refactored)
│   │   │       └── TypographyComponent.tsx
│   │   ├── pages/
│   │   │   └── SpotApp.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css                # Global Tailwind styles
│   │   ├── layout.tsx                 # Root layout with fonts
│   │   ├── page.tsx                   # Home page (shows LoginForm)
│   │   └── theme.ts                   # Flowbite theme customization
│   │
│   ├── components/                    # Reusable components (NEW)
│   │   ├── ui/                        # UI component library
│   │   │   ├── Button.tsx             # Reusable button (primary, secondary, outline)
│   │   │   ├── Card.tsx               # Card container with padding variants
│   │   │   ├── Checkbox.tsx           # Styled checkbox with label
│   │   │   ├── Link.tsx               # Next.js Link wrapper with variants
│   │   │   ├── TextField.tsx          # Input field with icon support
│   │   │   └── index.ts               # Barrel export
│   │   │
│   │   └── layout/                    # Layout components
│   │       ├── Header.tsx             # App header with logo
│   │       ├── Footer.tsx             # App footer with links
│   │       └── index.ts               # Barrel export
│   │
│   ├── lib/                           # Utilities and helpers (NEW)
│   │   ├── api.ts                     # API client with CRUD methods
│   │   └── utils.ts                   # Helper functions (formatDate, formatCurrency, etc.)
│   │
│   └── config/                        # Configuration (NEW)
│       └── app.config.ts              # App-wide configuration
│
├── public/                            # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── .flowbite-react/                   # Flowbite React configuration
│   ├── .gitignore
│   ├── config.json
│   └── init.tsx
│
├── .github/workflows/                 # CI/CD workflows
│   └── pr-check.yml
│
├── .vscode/                           # VS Code settings
│   ├── extensions.json
│   └── settings.json
│
├── .env.example                       # Environment variables template (NEW)
├── .gitignore
├── biome.json                         # Biome linter config
├── next.config.ts                     # Next.js configuration
├── package.json                       # Dependencies
├── package-lock.json
├── postcss.config.mjs                 # PostCSS configuration
├── README.md
└── tsconfig.json                      # TypeScript configuration
```

## 🧩 Component Architecture

### UI Components (`src/components/ui/`)

All UI components are:
- ✅ **Fully typed** with TypeScript
- ✅ **Responsive** using Tailwind breakpoints
- ✅ **Accessible** with proper ARIA attributes
- ✅ **Reusable** across the entire application
- ✅ **Customizable** via props

#### Button
```tsx
<Button 
  type="submit" 
  variant="primary"  // primary | secondary | outline
  fullWidth          // boolean
  disabled           // boolean
>
  Click Me
</Button>
```

#### TextField
```tsx
<TextField
  id="username"
  label="Username"
  type="text"           // text | password | email
  placeholder="Enter username"
  value={value}
  onChange={handleChange}
  required
  icon={HiMail}         // Optional icon from react-icons
/>
```

#### Card
```tsx
<Card 
  padding="lg"          // sm | md | lg
  className="custom-class"
>
  {children}
</Card>
```

#### Checkbox
```tsx
<Checkbox
  id="remember"
  label="Remember Me"
  checked={isChecked}
  onChange={handleChange}
/>
```

#### Link
```tsx
<Link 
  href="/about"
  variant="primary"     // primary | secondary
  className="custom-class"
>
  Learn More
</Link>
```

### Layout Components (`src/components/layout/`)

#### Header
- Logo display
- Language selector
- Sticky positioning
- Responsive navigation

#### Footer
- Multi-column layout
- Links organized by category
- Copyright information
- Responsive grid

## 📱 Responsive Design Strategy

All components use Tailwind's mobile-first approach:

```tsx
// Mobile (default)
className="text-sm p-4"

// Tablet (sm: 640px+)
className="sm:text-base sm:p-6"

// Desktop (lg: 1024px+)
className="lg:text-lg lg:p-8"
```

### Breakpoints Used
- `sm`: 640px (tablets)
- `md`: 768px (small desktops)
- `lg`: 1024px (large desktops)
- `xl`: 1280px (extra large screens)

## 🛠️ Best Practices Implemented

### 1. **Component Composition**
- Small, single-responsibility components
- Composable and reusable
- Props for customization

### 2. **Type Safety**
- Full TypeScript coverage
- Interface definitions for all props
- Type inference where possible

### 3. **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Focus states

### 4. **Performance**
- Next.js Image optimization
- Font optimization with `next/font`
- Code splitting
- Tree shaking

### 5. **Code Organization**
- Barrel exports (`index.ts`)
- Clear folder structure
- Separation of concerns
- Config files separate from components

### 6. **Styling**
- Tailwind utility classes
- Consistent spacing scale
- Mobile-first responsive design
- No inline styles

## 🔄 Data Flow

```
User Interaction
    ↓
Component State (useState)
    ↓
Event Handler
    ↓
API Client (lib/api.ts)
    ↓
Backend API
    ↓
Response
    ↓
State Update
    ↓
UI Re-render
```

## 🎨 Design System

### Colors
- **Primary**: Blue-700 (#1D4ED8)
- **Secondary**: Gray-700 (#374151)
- **Background**: Gray-100 (#F3F4F6)
- **Text**: Gray-900 (#111827)
- **Border**: Gray-300 (#D1D5DB)

### Spacing Scale (Tailwind)
- xs: 0.5rem (2)
- sm: 0.75rem (3)
- md: 1rem (4)
- lg: 1.5rem (6)
- xl: 2rem (8)

### Typography
- **Headings**: Montserrat (600, 700)
- **Body**: Inter (400, 500, 600)
- **Sizes**: text-sm, text-base, text-lg, text-xl, text-2xl

## 📝 Usage Examples

### Creating a New Page

1. Create page file: `src/app/dashboard/page.tsx`
2. Import components:
```tsx
import { Card, Button } from '@/components/ui';
import { Header, Footer } from '@/components/layout';

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-8">
        <Card padding="lg">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <Button variant="primary">Action</Button>
        </Card>
      </main>
      <Footer />
    </>
  );
}
```

### Adding API Calls

```tsx
import { apiClient } from '@/lib/api';

const fetchData = async () => {
  const data = await apiClient.get('/users');
  return data;
};
```

### Using Utilities

```tsx
import { formatCurrency, formatDate } from '@/lib/utils';

const amount = formatCurrency(1234.56); // "$1,234.56"
const date = formatDate(new Date());    // "October 25, 2025"
```

## 🚀 Next Steps

To extend this project:

1. **Add more pages**: Create `about.tsx`, `contact.tsx` in `src/app/`
2. **Add authentication**: Implement NextAuth.js
3. **Add state management**: Consider Zustand or Context API
4. **Add form validation**: Use React Hook Form + Zod
5. **Add testing**: Jest + React Testing Library
6. **Add API routes**: Create in `src/app/api/`

## 📦 Dependencies

### Core
- next: 15.5.3
- react: 19.1.0
- typescript: ^5

### UI & Styling
- tailwindcss: ^4
- flowbite-react: ^0.12.7
- react-icons: ^5.5.0

### Dev Tools
- @biomejs/biome: 2.2.0
- @types/*: Latest

---

**Note**: This architecture follows Next.js 15 App Router best practices and industry standards for component-based React applications.
