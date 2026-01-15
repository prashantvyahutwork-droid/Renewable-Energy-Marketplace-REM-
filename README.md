# BIJLI.GRID - Decentralized P2P Energy Marketplace

![BIJLI.GRID Banner](https://via.placeholder.com/1200x400/000000/00f2ff?text=BIJLI.GRID+ENERGY+MARKETPLACE)

## 📡 Overview
**BIJLI.GRID** is a cutting-edge, decentralized peer-to-peer (P2P) energy trading ecosystem. It empowers users to buy, sell, and trade renewable energy surplus directly with their community members, bypassing traditional centralized intermediaries. 

Built with a high-fidelity holographic/cyberpunk aesthetic, the platform provides a transparent, immutable, and real-time visualization of the energy grid.

---

## 🚀 Key Modules & Features

### 1. 🛡️ Identity Portal (Gatekeeper)
Secure authentication is the core of BIJLI.GRID.
- **Access Control**: All browsing panels are locked until the user performs a **Sign Up** or **Log In**.
- **Digital Identity**: Tracks user reputation, verified credentials, and profile details.
- **Web3 Integration**: Seamlessly connects to Ethereum/EVM-compatible wallets to display **Address**, **ETH Balance**, and **Chain ID**.

### 2. ⚡ P2P Energy Marketplace
The heart of the trading ecosystem.
- **Request Fulfillment**: Users can browse active energy requests from peers (e.g., Rajesh Kumar, Priya Sharma).
- **Fulfillment Workflow**: Accepting a request triggers a simulated blockchain transaction where energy is "sent" and payment is recorded.
- **Real-time Status**: Track active vs. fulfilled energy demands within the local grid.

### 3. 🗺️ BIJLI.GRID Peer Topology (Network)
A sophisticated 3D visualization of the decentralized network.
- **Dynamic 3D Scene**: Rotating peer network with a prominent "Primary Node" and pulsating connection lines.
- **Regional Relay Nodes**: Live monitoring of key grid hubs including:
    - **Delhi Core Hub**
    - **Mumbai Peer Relay**
    - **Bangalore Grid**
- **Stats Monitoring**: Real-time view of Grid Hashrate and Latency.

### 4. 📜 Grid Transaction Ledger
The immutable record of all energy movement.
- **Live Energy Feed**: A stream of all incoming and outgoing energy transfers.
- **Source Categorization**: Visual tracking of energy types: **Solar**, **Wind**, **Hydro**, and **Fusion**.
- **User-Specific History**: The ledger dynamically updates to show only the transactions accepted and fulfilled by the user.

### 5. 🎛️ Grid Preferences (System)
Advanced control hub for grid participants.
- **Auto-Sync**: Automatically link to the nearest peer relay.
- **Grid Alerts**: Configurable notifications for low energy or high-value transactions.
- **Optimization**: Route prioritization based on hub latency.

---

## 🛠️ Technical Stack

- **Core**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Framer Motion Animations
- **3D Graphics**: Three.js (@react-three/fiber & @react-three/drei)
- **Blockchain Interface**: Ethers.js
- **Icons**: Lucide React
- **Data Visualization**: Recharts

---

## 🔧 Setup & Installation

### Prerequisites
- **Node.js**: v18.0.0+ 
- **npm**: v9.0.0+
- **MetaMask Extension**: Recommended for the Web3 identity demo.

### 1. Clone & Install
```bash
git clone https://github.com/prashantvyahutwork-droid/Renewable-Energy-Marketplace-REM-.git
cd Energy-Marketplace
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173` to view the application.

### 3. Usage Guide
1. Launch the app and go to the **Identity** section.
2. Register a new account or Log In to unlock the platform.
3. Connect your **MetaMask** wallet.
4. Go to **Marketplace** to fulfill an energy request.
5. Visit the **Ledger** to see your recorded transaction.

---

## ⚡ Creator
Designed and Architected by **Prashant**.

---
> [!NOTE]
> BIJLI.GRID is currently in **Alpha v2.0**. All blockchain transactions in this demo are simulated for representative purposes.
>

## Visual Representation 

### Login page 
---
[![Alt text](https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/login-imagetourl.cloud-1768447324834-ey3x4s.png)](Login_page)

[![Alt text](https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/Register-login-imagetourl.cloud-1768447419408-f3zytz.png)](Register_Page)

---
### Profile 
---
[![Alt text](https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/Profile-imagetourl.cloud-1768447365339-7w4fus.png)](Profile)

---

## Trade Place 
---
[![Alt text](https://pub-141831e61e69445289222976a15b6fb3.r2.dev/Image_to_url_V2/Trade-place-imagetourl.cloud-1768447471315-hd6o7d.png)](Trade_Hub)
