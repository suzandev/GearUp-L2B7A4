# 🚴‍♂️ GearUp: Rent Sports & Outdoor Gear Instantly

GearUp is a robust, production-ready RESTful backend API designed for sports and outdoor equipment rental platforms. Built using modern industry-standard architecture, the system provides distinct workspaces and fine-grained role-based permissions for **Customers**, **Inventory Providers**, and **Platform Administrators**.

---

## 🛠️ Tech Stack & Key Architectures

- **Runtime & Framework:** Node.js + Express with strict TypeScript compilation.
- **Database & ORM:** PostgreSQL running over Prisma Client ORM engine.
- **Authentication:** Stateless JSON Web Tokens (JWT) with secure password hashing via `bcryptjs`.
- **Data Validation:** Absolute server-side input request validation via `Zod`.
- **Payment Infrastructure:** Native financial gateway integration using the official `stripe` API.
- **Architecture Pattern:** Clean Modular MVC Architecture (`route` ➡️ `middleware` ➡️ `controller` ➡️ `service` ➡️ `prisma`).

---

## 🚀 Key Features

### 🌐 Public Features

- Browse all registered sports & outdoor inventory gear items.
- Advanced query filtering workflows by `category`, `brand`, and stock `availability`.
- View deep gear metadata along with live customer review roll ups.

### 👥 Customer Capabilities

- Register accounts and login securely to manage profile data.
- Place multi-item rental bookings with automated rental duration and price calculation logic.
- Secure live multi-item billing pipelines utilizing **Stripe Payment Intents**.
- Leave star ratings and experience comments on gear after returning rentals.

### 🏪 Provider Management

- Add, modify, and safely delete gear item listings from store inventory layouts.
- Automated stock counter synchronization checks upon successful incoming orders.
- Track specific incoming item rental batches and progress order tracking life cycles (`CONFIRMED`, `PICKED_UP`, `RETURNED`, `CANCELLED`).

### 👑 Admin Workspace

- Review comprehensive platform metrics (view all registered users, total global rentals, and stock items).
- Moderate platform access parameters by modifying account access flags (`ACTIVE` or `SUSPENDED`).
- Manage structural inventory category listings (`Cycling`, `Camping`, `Water Sports`, etc.).

---

## 📁 Modular MVC Directory Structure

```text
src/
├── app/
│   ├── config/                  # Environment Variables & Configuration
    |     |──  prisma.ts         # Prisma Client Core Initializer
    |
│   ├── middlewares/             # Auth Token Checks, RBAC, Validation & Error Handlers
│   │   ├── auth.middleware.ts   # Stateless JWT Check & Role Enforcement
│   │   ├── error.middleware.ts  # Global Catch-All JSON Error Standardizer
│   │   └── validateRequest.ts   # Zod Validation Runner
│   └── modules/                 # Modular MVC Feature Domains
│       ├── admin/               # Admin Control Layer
│       ├── auth/                # User Auth Sign-up & Login
│       ├── category/            # Inventory Categories Domain
│       ├── gear/                # Public Inventory Core
│       ├── payment/             # Stripe Financial Transaction Processors
│       ├── provider/            # Provider Workspace Controls
│       ├── rental/              # Order Creation Transaction Blocks
│       ├── review/              # Customer Feedback Mechanisms
│       └── user/                # Profile View & Modifications Module
├── app.ts                       # Core Express Engine Setup
└── server.ts                    # Main Application Bootstrap Script
```

---

## ⚙️ Core Environment Configurations (`.env`)

Create a `.env` configuration file in the project root directory containing the following parameters:

```env
PORT=3000
DATABASE_URL="postgresql://username:password@localhost:5432/gearup_db?sslmode=prefer"
JWT_SECRET="your_super_stateless_jwt_secret_key_phrase"
JWT_EXPIRES_IN="7d"
STRIPE_SECRET_KEY="sk_test_51TrQ...insert_your_live_stripe_secret_test_key_here"
```

---

## 🕹️ Installation & Database Initialization Execution Steps

### 1. Install Project Dependencies

```bash
npm install
```

### 2. Run Database Migration Schemas

Apply structural database layout schemas over your localized PostgreSQL instance:

```bash
npx prisma migrate dev --name init_gearup_system
```

### 3. Generate Prisma Client Types

Synchronize types and type validation hooks mapping directly to operational ORM queries:

```bash
npx prisma generate
```

### 4. Boot Up the Development Instance

Launch the compilation wrapper and observe local server states:

```bash
npm run dev
```

_The operational server instance will boot dynamically at `http://localhost:3000`._

---

## 🧪 Postman Mandatory API Documentation

Import the documented request pipelines by following this endpoint hierarchy schema inside your Postman workspace:

### 🔒 Operational Rules

- **Bearer Auth Token:** Save the logged-in token value inside a Collection level variable named `{{token}}`. Protect endpoints inherit authentication values cleanly.
- **Global Variable Base Path:** Use `{{base_url}}` matching your operational backend location port configurations (e.g., `http://localhost:3000`).

### 📦 Mapped Endpoints Blueprint

#### 🔑 1. Authentication (`/api/auth`)

- `POST /api/auth/register` - Create fresh account parameters (`CUSTOMER`, `PROVIDER`, `ADMIN`).
- `POST /api/auth/login` - Login to retrieve your state token.
- `GET /api/auth/me` - Read raw account configuration layers.

#### 👤 2. Profile Management (`/api/users`)

- `GET /api/users/me` - Fetch profile specifications.
- `PATCH /api/users/me` - Update profile particulars (`name`, `phone`, `address`).

#### 🌐 3. Public Inventory Modules

- `GET /api/categories` - Fetch all system operational categories.
- `GET /api/gear` - Filter stock indices dynamically via query strings (`?category=camping&brand=coleman`).
- `GET /api/gear/:id` - Load individual gear detailed specifications.

#### 🛒 4. Rental Management (`/api/rentals`)

- `POST /api/rentals` - Place a rental layout order (**Requires CUSTOMER login token**).
- `GET /api/rentals` - Read dynamic history files based on account permission classifications.

#### 💳 5. Financial Processing Gateway (`/api/payments`)

- `POST /api/payments/create` - Return a secure Stripe `clientSecret` using a valid `rentalOrderId`.
- `POST /api/payments/confirm` - Perform state validation triggers tracking Stripe `transactionId` parameters.

#### 🏪 6. Provider Operations Workspace (`/api/provider`)

- `POST /api/provider/gear` - Inject new items inside active category systems.
- `PUT /api/provider/gear/:id` - Change pricing, stock allocations, or item status.
- `DELETE /api/provider/gear/:id` - Erase specific gear options permanently.
- `GET /api/provider/orders` - View active consumer rental orders linked to store inventory items.
- `PATCH /api/provider/orders/:id` - Transition rental shipping processing tracks (`PICKED_UP`, `RETURNED`).

#### 👑 7. Admin Moderate & Control (`/api/admin`)

- `POST /api/categories` - Initialize brand new inventory categories.
- `GET /api/admin/users` - Generate overview records of all consumer/provider registry systems.
- `PATCH /api/admin/users/:id` - Ban or activate accounts (`status: "SUSPENDED" | "ACTIVE"`).

#### ⭐ 8. Product Reviews (`/api/reviews`)

- `POST /api/reviews` - Post star rating parameters and comments against item configurations.

---

## 🛡️ Mandatory Evaluation Standards Compliance Report

1.  **Consistent JSON Responses:** All operational failure pathways intercept execution cascades cleanly and map directly down to structural global middleware formats:
    ```json
    {
      "success": false,
      "message": "Error classification description",
      "errorDetails": [ ... ]
    }
    ```
2.  **Input Request Validation Security:** No parameters breach internal logic workflows without passing strict schema validation barriers. Malformed queries generate a explicit `400 Bad Request` payload identifying error fields natively.
3.  **Strict Transaction Rollbacks:** All inventory allocations execute within atomic `prisma.$transaction` scopes. If a payment loop or stock validation failure happens, database operations roll back safely to prevent stock fragmentation.
