# 🌾 **Farms Map — React Native + Laravel**

Mapa simples para visualizar **fazendas** vindas de um backend **Laravel**, com **marcadores personalizados**, **lista compacta** no topo e **card de detalhes**. Otimizado para Android (emulador e APK de teste).

---

## ✨ **Funcionalidades**

- 🗺️ **Google Maps** com **markers customizados** (`farm-icon.png`)
- 🎯 Tap no marker → **centraliza e dá zoom**
- 🧭 **Card flutuante** com nome, cultura, área, produtor e coordenadas
- 📋 **Lista compacta (topo)** → botão **Ir** centraliza a fazenda
- 🔁 **Ver todas**: ajusta a câmera para caber todas as fazendas (padding dinâmico)
- ⚡ **React Query** para busca/cache de `GET /api/farms`
- 🔐 **API URL via `.env`** (React Native Config)
- 🧩 **Arquitetura feature-first** pronta para crescer
- ☁️ **Backend Docker-ready** (Render/Koyeb) com **SQLite** para demo

---

## 🧱 **Arquitetura (frontend)**

frontend/
|-- src/
|   |-- app/
|   |   `-- App.tsx
|   |-- config/
|   |   `-- env.ts
|   |-- features/
|   |   `-- farms/
|   |       |-- api/
|   |       |   `-- farms.api.ts
|   |       |-- components/
|   |       |   |-- FarmCard.tsx
|   |       |   |-- FarmList.tsx
|   |       |   `-- FarmMarker.tsx
|   |       |-- hooks/
|   |       |   `-- useFarms.ts
|   |       |-- screens/
|   |       |   `-- FarmsMapScreen.tsx
|   |       `-- types.ts
`-- assets/
    `-- farm-icon.png

Feito com 💙 por Gabriel.
