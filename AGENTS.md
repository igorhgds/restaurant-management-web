# AGENTS.md — Restaurant Management Web (Angular)

> Technical guide & design system tokens for AI Agents (Jules) working in this Angular 18+ / TailwindCSS repository.

---

## 🎨 Design Tokens & UI Guidelines

All components generated MUST strictly adhere to the approved **Dark Mode Premium** design palette and typography:

### Color Palette (Tailwind Classes & Hex)
- **Obsidian Main Background**: `bg-[#121316]` (Hex: `#121316`)
- **Dark Slate Cards/Surfaces**: `bg-[#1E2026]` (Hex: `#1E2026`)
- **Borders & Dividers**: `border-[#2A2D36]` (Hex: `#2A2D36`)
- **Champagne Gold Accent (Buttons/Active)**: `bg-[#C8A27A]` (Hex: `#C8A27A`), text: `text-[#C8A27A]`
- **Champagne Gold Hover**: `hover:bg-[#B38E68]` (Hex: `#B38E68`)
- **Glassmorphism Panels**: `bg-white/5 backdrop-blur-md border border-white/10`
- **Text Main**: `text-gray-100` (`#F3F4F6`)
- **Text Secondary/Muted**: `text-gray-400` (`#9CA3AF`)

### Table & Status Indicators
- **`AVAILABLE` (Livre)**: Background `bg-emerald-950/60`, Border `border-emerald-500/50`, Text `text-emerald-400`
- **`OCCUPIED` (Ocupada)**: Background `bg-red-950/60`, Border `border-red-500/50`, Text `text-red-400`
- **`RESERVED` (Reservada)**: Background `bg-amber-950/60`, Border `border-amber-500/50`, Text `text-amber-400`
- **`OUT_OF_SERVICE` (Manutenção)**: Background `bg-gray-900`, Border `border-gray-700`, Text `text-gray-500`

### KDS Status Badges
- **`OPEN` (Aguardando)**: `bg-amber-500/20 text-amber-300 border-amber-500/30`
- **`PREPARING` (Em Preparo)**: `bg-blue-500/20 text-blue-300 border-blue-500/30`
- **`READY` (Pronto)**: `bg-emerald-500/20 text-emerald-300 border-emerald-500/30`

### Typography
- **Headings & Logo**: Font family `'Outfit', sans-serif` or `'Playfair Display', serif`
- **Body & Controls**: Font family `'Inter', sans-serif`

---

## 🛠️ Architecture & Conventions

1. **Angular Standalone Components**: Use `standalone: true` for all components, directives, and pipes.
2. **API Base URL**: Configured in `src/environments/environment.ts` (`http://localhost:8080`).
3. **HTTP Interceptor**: `auth.interceptor.ts` automatically injects `Authorization: Bearer <token>` into requests.
4. **State & Signals**: Prefer Angular Signals and RxJS observables for reactive state management.
5. **Folder Organization**:
   - `src/app/core/` (services, guards, interceptors, models)
   - `src/app/features/` (auth, waiter, kitchen, admin)
   - `src/app/shared/` (components, pipes, directives)

---

## 🔗 Backend API Reference

- **Base URL**: `http://localhost:8080`
- **Swagger Docs**: `http://localhost:8080/swagger-ui.html`
- **Public Endpoints**: `/auth/login`, `/auth/activate`
- **Protected Endpoints**: `/users`, `/dishes`, `/menus`, `/tables`, `/orders`
