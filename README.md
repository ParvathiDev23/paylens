<div align="center">
  <img src="https://raw.githubusercontent.com/ParvathiDev23/paylens/main/public/favicon.ico" alt="PayLens Logo" width="120" height="120" />
  
  <h1 align="center">PayLens</h1>

  <p align="center">
    <strong>Democratizing Tech Compensation Data 💸</strong>
    <br />
    <br />
    A modern, sleek, and fully functional platform for tech professionals to compare salaries, align engineering levels across top companies, and anonymously share compensation data.
    <br />
    <br />
    <a href="https://paylens-dun.vercel.app/"><strong>Explore the Live App »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ParvathiDev23/paylens/issues">Report Bug</a>
    ·
    <a href="https://github.com/ParvathiDev23/paylens/issues">Request Feature</a>
  </p>
</div>

<hr />

## ✨ Features

*   **📊 Dynamic Salary Dashboard:** View anonymized, crowdsourced compensation data for software engineers, product managers, and data scientists across the tech industry.
*   **⚖️ Level Mapping Compare Tool:** Visually align internal engineering and product levels (e.g., L4 vs. E4 vs. ICT4) side-by-side across up to four companies simultaneously based on `seniorityRank`.
*   **💰 Offer Comparison:** Compare multiple total compensation packages (Base + Equity + Bonus) side-by-side with interactive Recharts visualizations to identify the best overall offer and negotiation leverage.
*   **🔐 Secure User Authentication:** NextAuth-powered login and registration system with secure `bcrypt` password hashing and session management.
*   **📝 Anonymous Salary Submission:** Authenticated users can anonymously contribute their salary data via a seamless multi-step Server Action form that instantly updates the live database.
*   **🧑‍💻 Personalized Dashboard:** Users get a personal dashboard to track their saved companies and view a history of their salary submissions.
*   **🎨 Stunning Modern UI:** Built with Tailwind CSS and Radix UI primitives, featuring a gorgeous glassmorphic design, subtle micro-animations, and a fully responsive layout.

## 🛠️ Tech Stack

This project is built with the cutting-edge modern web ecosystem:

**Frontend:**
*   [Next.js 14](https://nextjs.org/) (App Router) - React Framework
*   [React](https://reactjs.org/)
*   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
*   [Lucide React](https://lucide.dev/) - Beautiful, consistent icons
*   [Recharts](https://recharts.org/) - Composable charting library

**Backend & Database:**
*   [Prisma ORM](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
*   [Neon PostgreSQL](https://neon.tech/) - Serverless Postgres database
*   Next.js Server Actions - For secure, server-side data mutations

**Authentication:**
*   [NextAuth.js (v5)](https://authjs.dev/) - Authentication for Next.js
*   [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - Password hashing

**Deployment:**
*   [Vercel](https://vercel.com/) - Serverless deployment platform

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   A PostgreSQL database (e.g., Neon, Supabase, or local)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ParvathiDev23/paylens.git
    cd paylens
    ```

2.  **Install NPM packages**
    ```bash
    npm install
    ```

3.  **Set up your environment variables**
    Create a `.env` file in the root directory and add the following:
    ```env
    # Your PostgreSQL connection string
    DATABASE_URL="postgresql://user:password@host:port/database"
    
    # NextAuth configuration
    AUTH_SECRET="your-super-secret-auth-key-generate-one-with-openssl"
    AUTH_URL="http://localhost:3000"
    ```

4.  **Push the Prisma schema to your database**
    ```bash
    npx prisma db push
    ```

5.  **(Optional) Seed the database with initial data**
    ```bash
    npm run seed
    ```

6.  **Run the development server**
    ```bash
    npm run dev
    ```

7.  **Open the app**
    Navigate to `http://localhost:3000` in your browser.

## 📂 Project Structure

```text
paylens/
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets (images, fonts)
├── src/
│   ├── app/              # Next.js App Router (Pages & Layouts)
│   │   ├── api/          # API Routes
│   │   ├── auth/         # Login & Signup pages
│   │   ├── compare/      # Level and Offer comparison tools
│   │   ├── dashboard/    # User personalized dashboard
│   │   └── submit/       # Salary submission flow
│   ├── components/       # Reusable React components (UI, Layout)
│   └── lib/              # Utility functions, database client, constants
├── .env                  # Environment variables (ignored in git)
├── package.json          # Dependencies and scripts
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 📸 Screenshots

*(Add screenshots of your beautiful UI here! Consider adding images of the landing page, compare tool, and dashboard.)*

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  Built with ❤️ for tech professionals everywhere.
</div>
