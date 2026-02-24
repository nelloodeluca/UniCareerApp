<h1 align="center"> UniCareer </h1>

<p align="center"> 
  A mobile ecosystem engineered for academic lifecycle management, career trajectory visualization, and strategic exam planning.
</p>

<p align="center">
  <img alt="Build" src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge">
  <img alt="Issues" src="https://img.shields.io/badge/Issues-0%20Open-blue?style=for-the-badge">
  <img alt="Contributions" src="https://img.shields.io/badge/Contributions-Welcome-orange?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge">
</p>

<!-- 
  **Note:** These are static placeholder badges. Replace them with your project's actual badges.
  You can generate your own at https://shields.io
-->

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#-tech-stack-&-architecture)
- [Project Structure](#-project-structure)
- [Demo & Screenshots](#-demo--screenshots)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**UniCareer** is a professional-grade mobile application designed to empower university students with absolute control over their academic data. By centralizing exam tracking, grade management, and predictive statistics into a single, cohesive interface, it transforms the complex chaos of university life into a streamlined, data-driven journey.

> The modern university student faces the challenge of managing multi-year curricula, calculating fluctuating GPAs, and tracking credit (CFU) accumulation across various platforms. Manual tracking is error-prone and lacks the visual insight necessary for long-term academic planning. UniCareer solves this by providing a localized, persistent database and an intuitive suite of analytical tools to monitor progress in real-time.

Built with a **Component-based Architecture** using **React Native** and **TypeScript**, the system provides a fluid user experience (UX) tailored for performance and reliability. By leveraging **SQLite** for on-device data persistence, UniCareer ensures that critical academic records are always accessible, even without an active internet connection.

---

## ✨ Key Features

UniCareer is structured around four primary pillars of functionality, each meticulously designed to provide specific value to the student's daily workflow:

### 🚀 Intelligent Dashboard
The command center of the application. It provides an immediate snapshot of the student's current status, ensuring no deadline is missed.
- **Dynamic Calendar Integration:** View exam dates through a unified calendar interface (`CalendarComponent.tsx`).
- **Immediate Priorities:** See "Today's Exams" and "Imminent Exams" modules that filter your schedule based on time proximity.
- **State Overview:** A summarized view of total credits and progress at a glance.

### 📚 Comprehensive Digital Gradebook (Libretto)
A modernized replacement for traditional physical or web-based gradebooks.
- **Exam Categorization:** Organize exams by custom categories to better understand different areas of study.
- **Detailed History:** Drill down into specific exam results, including dates, grades, honors (Lode), and credit weights.
- **Context-Aware Navigation:** Seamlessly move between the high-level list and granular exam details using a structured navigation stack.

### 📊 Advanced Career Analytics
Transform raw grades into actionable insights.
- **Visual Progress Charts:** Track grade trends over time using the `GraficoAndamentoCarriera.tsx` component.
- **Predictive Statistics:** Calculate the projected graduation grade (Voto di Laurea) based on current averages.
- **Metric Cards:** Modular cards displaying weighted averages, total credits earned, and remaining requirements.

### ➕ Streamlined Management Suite
A user-friendly interface for data entry and customization.
- **Intuitive Data Entry:** Add new exams with specialized inputs for numeric values, categories, and switches for "Lode" (honors).
- **Category Customization:** Create and modify exam categories via a modal-driven interface to match any university department's structure.
- **Validation-Driven Inputs:** Custom pickers and numeric inputs ensure data integrity within the local SQLite database.

---

## 🛠️ Tech Stack & Architecture

The project utilizes a modern mobile development stack optimized for cross-platform compatibility and type safety.

| Technology | Purpose | Why it was Chosen |
| :--- | :--- | :--- |
| **React Native (Expo)** | Core Framework | Enables high-performance, native-feel mobile experiences for iOS and Android from a single codebase. |
| **TypeScript** | Language | Provides strict typing, reducing runtime errors and improving developer productivity in complex state management. |
| **Kotlin** | Native Implementation | Used for core Android application logic and activity management within the `android/` directory. |
| **SQLite** | Local Database | Offers a robust, ACID-compliant relational database for secure on-device storage of academic records. |
| **Styled Components** | UI Styling | Promotes modular, CSS-in-JS styling patterns for highly reusable and maintainable UI components. |
| **React Navigation** | Routing | Manages complex navigation flows, including bottom tabs and nested stacks, for a fluid app experience. |
| **React Native Paper** | UI Components | Provides a suite of Material Design components that ensure visual consistency and accessibility. |
| **Chart Kit** | Data Visualization | Renders performant career progress charts and distribution graphs. |

### Architectural Patterns
- **Provider Pattern:** Utilizes `EsamiContext.tsx` to provide a global state for exam data, ensuring synchronization across the Dashboard, Libretto, and Statistica screens.
- **Repository Pattern:** Logic for database operations is abstracted into `src/utils/operazioni_db/`, separating UI logic from data persistence (CRUD operations).
- **Modular Components:** UI elements are strictly decoupled into atomic components (e.g., `NumericInput.tsx`, `EsameCard.tsx`) to enhance testability and reuse.

---

## 📁 Project Structure

```
nelloodeluca-UniCareerApp-f3d2b50/
├── 📁 docs/                        # Project documentation and presentations
│   ├── 📄 PresentazioneProgetto_gruppo13.pdf
│   └── 📄 UniCareer_gruppo13.pdf
├── 📁 UniCareer/                   # Main Application Directory
│   ├── 📁 android/                 # Android-specific native code and configurations
│   ├── 📁 assets/                  # App icons, splash screens, and static media
│   ├── 📁 src/                     # Application Source Code
│   │   ├── 📁 components/          # Reusable UI building blocks
│   │   │   ├── 📁 dashboard/       # Components specific to the home view
│   │   │   ├── 📁 nav/             # Navigation configurations and wrappers
│   │   │   ├── 📁 statistica/      # Data visualization components
│   │   │   └── 📁 aggiunta/        # Input and form components for new entries
│   │   ├── 📁 screens/             # Top-level screen components (Pages)
│   │   │   ├── 📄 Dashboard.tsx    # Home screen entry point
│   │   │   ├── 📄 Statistica.tsx   # Analytics entry point
│   │   │   ├── 📁 Libretto/        # Gradebook screen modules
│   │   │   └── 📁 Aggiunta/        # Form screen modules
│   │   ├── 📁 utils/               # Logic, helpers, and database operations
│   │   │   └── 📁 operazioni_db/   # SQLite interaction logic (fetch, parse, op)
│   │   ├── 📄 databaseSetup.ts     # SQLite database initialization
│   │   ├── 📄 EsamiContext.tsx     # Global React Context for state management
│   │   ├── 📄 types.ts             # Global TypeScript interface definitions
│   │   └── 📄 App.tsx              # Application entry point
│   ├── 📄 app.json                 # Expo configuration file
│   ├── 📄 package.json             # Dependencies and build scripts
│   └── 📄 tsconfig.json            # TypeScript configuration
└── 📁 icon/                        # High-resolution branding assets
```

---

## 📸 Demo & Screenshots

## 🖼️ Screenshots

<p align="center">
  <img src="https://github.com/nelloodeluca/UniCareerApp/blob/main/Screen/DashBoard2.png?raw=true" alt="Dashboard View" width="20%">
  <img src="https://github.com/nelloodeluca/UniCareerApp/blob/main/Screen/Statistica%20(2).png?raw=true" alt="Statistics View" width="20%">
</p>
<p align="center"><em>Figure 1: Real-time dashboard showing upcoming exams and career statistics visualization.</em></p>

<p align="center">
  <img src="https://github.com/nelloodeluca/UniCareerApp/blob/main/Screen/EsamiConclusi1.png?raw=true" alt="Exam List" width="20%">
  <img src="https://github.com/nelloodeluca/UniCareerApp/blob/main/Screen/NuovoEsame1.png?raw=true" alt="Add Exam" width="20%">
</p>
<p align="center"><em>Figure 2: Digital gradebook management and the intuitive exam entry form.</em></p>

---

## 🚀 Getting Started

### Prerequisites
To run the UniCareer mobile application locally, ensure you have the following installed:
- **Node.js** (LTS version recommended)
- **npm** or **Yarn**
- **Expo Go** app (on your physical device) or an **Android/iOS Emulator**
- **Java Development Kit (JDK)** (for Android builds)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nelloodeluca/UniCareerApp.git
   cd UniCareerApp/UniCareer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Initialize the Environment**
   UniCareer uses Expo. Ensure your development environment is ready:
   ```bash
   npx expo install
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```

---

## 🔧 Usage

Once the development server is running, you can interact with the application:

### 📱 Running on a Mobile Device
1. Open the **Expo Go** app on your Android or iOS device.
2. Scan the QR code displayed in your terminal.
3. The application will bundle and load the UniCareer interface.

### 💻 Running on an Emulator
- For Android: Press `a` in the terminal to launch the Android Emulator.
- For iOS: Press `i` in the terminal to launch the iOS Simulator (Mac only).

### 🛠️ Core Workflows
1. **Adding an Exam:** Navigate to the "Aggiunta" tab. Select a category (or create a new one), enter the grade, credits (CFU), and date.
2. **Reviewing Progress:** Head to the "Statistica" tab to view your career path grafico (trend chart) and check your weighted average.
3. **Managing Exams:** Use the "Libretto" tab to see all completed exams. Tap an exam card (`EsameCard.tsx`) to view full details.
4. **Calendar View:** Use the Dashboard's calendar to see a visual distribution of your study sessions and exam dates.

---

## 🤝 Contributing

We welcome contributions to improve UniCareer! Your input helps make this academic tool better for students everywhere.

### How to Contribute

1. **Fork the repository** - Click the 'Fork' button at the top right of this page
2. **Create a feature branch** 
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** - Improve code, documentation, or features
4. **Test thoroughly** - Ensure all components render correctly and SQLite queries are optimized.
5. **Commit your changes** - Write clear, descriptive commit messages
   ```bash
   git commit -m 'Add: New Statistics Card for Credit Projection'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** - Submit your changes for review

### Development Guidelines

- ✅ **Type Safety:** Always define interfaces in `types.ts` for new data models.
- 📝 **Components:** Keep components small and focused. Use `styled-components` for all styling.
- 🧪 **Database:** If modifying the schema, update `databaseSetup.ts` and provide migration logic.
- 📚 **Documentation:** Update this README if you introduce new screens or navigation flows.

### Ideas for Contributions
- 🎨 **UI/UX:** Dark mode support using `react-native-paper` themes.
- ⚡ **Performance:** Optimizing SQLite fetch queries for large exam histories.
- 🌐 **Internationalization:** Adding multi-language support (English/Italian).

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### What this means:
- ✅ **Commercial use:** You can use this project commercially.
- ✅ **Modification:** You can modify the code.
- ✅ **Distribution:** You can distribute this software.
- ✅ **Private use:** You can use this project privately.
- ⚠️ **Liability:** The software is provided "as is", without warranty.

---

<p align="center">Made with ❤️ by the UniCareer Team</p>
<p align="center">
  <a href="#">⬆️ Back to Top</a>
</p>
