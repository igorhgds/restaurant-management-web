<<<<<<< HEAD
# 🍽️ Restaurant Management Web

> Interface moderna, responsiva e elegante desenvolvida em **Angular 18+** com **TailwindCSS** para o sistema **Restaurant Management API**.

![Angular 18](https://img.shields.io/badge/Angular-18+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)

---

## 🎨 Design System & Identidade Visual

A interface foi projetada com um estilo **Dark Mode Premium** sofisticado, utilizando elementos em *glassmorphism*, detalhes em tom champanhe dourado e tipografia de alto padrão.

### 🎨 Paleta de Cores (Tailwind Design Tokens)

| Token | Cor Hex | Uso |
|---|---|---|
| **Fundo Principal (Obsidian)** | `#121316` | Background geral da aplicação (`bg-[#121316]`) |
| **Card / Painel (Dark Slate)** | `#1E2026` | Superfície de cards, modais e tabelas (`bg-[#1E2026]`) |
| **Borda / Divisor** | `#2A2D36` | Bordas sutis dos elementos (`border-[#2A2D36]`) |
| **Primária / Acento (Champagne Gold)** | `#C8A27A` | Botões principais, seleções e destaques (`bg-[#C8A27A]`, `text-[#C8A27A]`) |
| **Primária Hover** | `#B38E68` | Estado de hover dos botões dourados (`hover:bg-[#B38E68]`) |
| **Status - Livre / Disponível (Verde)** | `#22C55E` / `#1E4620` | Mesas disponíveis e pedidos prontos |
| **Status - Ocupada (Vermelho)** | `#EF4444` / `#4A1E1E` | Mesas ocupadas e alertas |
| **Status - Reservada (Amarelo)** | `#F59E0B` / `#4A3B1E` | Mesas reservadas e pedidos aguardando |
| **Status - Em Preparo (Azul)** | `#3B82F6` / `#1E3A5F` | Pedidos em preparo na cozinha |

### 🔤 Tipografia

- **Títulos e Logotipos:** `Outfit` / `Playfair Display` (Fontes elegantes com toque de luxo)
- **Interface e Corpo do Texto:** `Inter` (Altamente legível para números, tabelas e comandas)

---

## 🧠 Arquitetura do Projeto

O projeto utiliza a arquitetura moderna de **Standalone Components** do Angular 18+, organizada por camadas:

```
src/app/
├── core/
│   ├── guards/          # AuthGuard, RoleGuard
│   ├── interceptors/    # AuthInterceptor (Token JWT)
│   ├── models/          # Interfaces TypeScript (User, Dish, Menu, Table, Order)
│   └── services/        # AuthService, DishService, MenuService, TableService, OrderService
├── features/
│   ├── auth/            # Login, Esqueci a Senha
│   ├── waiter/          # Mapa de Mesas, Abertura de Pedido, Catálogo de Pratos, Comanda
│   ├── kitchen/         # Painel KDS (Kitchen Display System) estilo Kanban
│   └── admin/           # CRUD de Pratos, Upload de Imagens, Cardápios e Usuários
├── shared/
│   ├── components/      # Header, Sidebar responsiva, Modal, StatCard, Badge
│   ├── pipes/           # Formatadores de moeda (BRL), status e datas
│   └── directives/      # Utilitários de UI
└── environments/        # Configurações de API (apiUrl: http://localhost:8080)
```

---

## 🔗 Integração com o Back-end

Este Front-end consome a REST API desenvolvida em Spring Boot 3.5:
* **Repositório da API (Back-end):** [restaurant-management-api](https://github.com/igorhgds/restaurant-management-api)
* **Documentação Swagger API:** `http://localhost:8080/swagger-ui.html`

---

## 🛠️ Como Executar

### Pré-requisitos
* Node.js 18+ e NPM
* Angular CLI instalado (`npm install -g @angular/cli`)

### Instalação e Execução

```bash
# 1. Clone o repositório
$ git clone https://github.com/igorhgds/restaurant-management-web.git
$ cd restaurant-management-web

# 2. Instale as dependências
$ npm install

# 3. Inicie o servidor de desenvolvimento
$ ng serve
```

Navegue para `http://localhost:4200/`. A aplicação atualizará automaticamente se você alterar qualquer arquivo fonte.

---

Desenvolvido por **Igor Henrique Gomes**
=======
# RestaurantManagementWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
>>>>>>> 49cca099a5e87f2b35a2189068eb6b9f3712ce58
