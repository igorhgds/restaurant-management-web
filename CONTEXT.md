# CONTEXT.md — Restaurant Management Web

Este arquivo contém o contexto completo da aplicação Front-end Angular, extraído a partir dos protótipos visuais aprovados e das definições da REST API.

---

## 🎨 Paleta de Cores & Design Tokens

### Cores Principais (Dark Mode Premium)
- **Background Principal (Obsidian)**: `#121316`
- **Superfície de Cards/Paineis**: `#1E2026`
- **Bordas Sutis**: `#2A2D36`
- **Acento Primário (Champagne Gold)**: `#C8A27A`
- **Acento Primário Hover**: `#B38E68`
- **Texto Principal**: `#F3F4F6`
- **Texto Secundário**: `#9CA3AF`

### Cores de Status das Mesas
- **Livre (`AVAILABLE`)**: Fundo `#1E4620`, Texto `#4ADE80`
- **Ocupada (`OCCUPIED`)**: Fundo `#4A1E1E`, Texto `#F87171`
- **Reservada (`RESERVED`)**: Fundo `#4A3B1E`, Texto `#FBBF24`
- **Em Manutenção (`OUT_OF_SERVICE`)**: Fundo `#2A2C33`, Texto `#9CA3AF`

### Fontes
- **Títulos/Brand**: `Outfit`, sans-serif
- **Corpo/UI**: `Inter`, sans-serif

---

## 🖥️ Módulos e Telas Aprovadas

1. **`/login`**: Tela de login com visual em glassmorphism, fundo estilizado, formulário com e-mail, senha e botão dourado "Entrar".
2. **`/garcom/mesas`**: Mapa de mesas em grid colorido por status, busca no topo e filtros por localização (*Salão Interno, Varanda, VIP*).
3. **`/garcom/novo-pedido`**: PDV do garçom com catálogo visual de pratos por categoria à esquerda e carrinho/comanda à direita.
4. **`/cozinha`**: Painel KDS (Kitchen Display System) em 3 colunas Kanban (*Aguardando, Em Preparo, Pronto para Servir*).
5. **`/admin/dashboard`**: Painel do gerente com KPIs no topo (Faturamento, Ocupação %, Tempo Médio), gráfico de vendas e tabela de pratos.
