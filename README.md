# ÉLITE

ÉLITE is a full-stack e-commerce platform built with React and Vite on the frontend, and powered by Bun, Express, and MongoDB on the backend.
It features product browsing with filters and sorting, cart management, secure authentication using JSON Web Token, and admin-controlled product CRUD operations.
Designed with a layered architecture and Redux-based state management, it is structured for scalability, maintainability, and production-grade deployment.


+## Features
+- Product catalog with filter UI, sorting, and infinite scroll
+- Product details view with image gallery and related items
+- Cart management with quantity updates
+- User authentication (signup/signin) and profile management
+- Admin-only product creation, updates, and deletion
+
+## Tech Stack
+**Frontend:** React 19, Vite, Redux Toolkit, React Router, Tailwind CSS v4, Axios, Framer Motion
+**Backend:** Bun runtime, Express 5, MongoDB + Mongoose, JWT auth, CORS, Multer
+
+## Project Structure
+- `frontend/` React app (Vite)
+- `backend/` Express API
+- `backend/src/routes/` API routes
+- `backend/src/controllers/` business logic
+- `backend/src/models/` Mongoose schemas
+
+## Getting Started
+### Prerequisites
+- Bun (for both frontend and backend)
+- MongoDB (local or Atlas)
+
+### Setup
+1. Install dependencies:
+```bash
+cd backend
+bun install
+cd ../frontend
+bun install
+```
##### 📁 pages/

Top-level pages for routing:

- **admin/ProductCreate.jsx**: Admin product creation page
- **cart/Cart.jsx**: Shopping cart page
- **general/**: About, Contact, Home, PageNotFound
- **product/**: ProductDetails (single product), ProductPage (listing)
- **user/**: Settings, Signin, Signup
- `Products.jsx`: General product listing page

##### 📁 routes/

App routing logic:

- `Auth.jsx`: Authenticated routes
- `Mainroutes.jsx`: Main app routes
- `Unauth.jsx`: Unauthenticated routes

##### 📁 store/

Redux state management:

- **actions/**: Redux action creators for cart, product, user
- **reducers/**: Redux slices for product and user state
- `store.jsx`: Redux store configuration

##### App.jsx

Root React component. Sets up layout, providers, and main structure.

##### index.css

Global CSS styles for the app.

##### main.jsx

Entry point. Renders the React app and sets up providers (Redux, Router, etc).

#### .gitignore

Specifies files/folders to ignore in git version control.

#### eslint.config.js

ESLint configuration for code linting and style.

#### frontend_map.pdf

Visual map/diagram of the frontend structure.

#### index.html

Main HTML file loaded by Vite. Contains root div for React.

#### bun.lock / package.json

Bun package management files. List dependencies, scripts, and project metadata.

## folder structure

📁 frontend/
├── 📁 node_modules/
├── 📁 public/
│ └── 🖼️ kit_2025.jpg
├── 📁 src/
│ ├── 📁 api/
│ │ └── ⚛️ config.jsx
│ ├── 📁 components/
│ │ ├── 📁 cart/
│ │ │ ├── ⚛️ CartItem.jsx
│ │ │ ├── ⚛️ CartSummary.jsx
│ │ │ └── ⚛️ QuantitySelector.jsx
│ │ ├── 📁 common/
│ │ │ ├── ⚛️ Button.jsx
| | | |---⚛️--AutoSlider.jsx
│ │ │ ├── ⚛️ Loader.jsx
│ │ │ └── ⚛️ RatingStars.jsx
│ │ ├── 📁 filters/
│ │ │ ├── ⚛️ AvailabilityFilter.jsx
│ │ │ ├── ⚛️ BrandFilter.jsx
│ │ │ ├── ⚛️ CategoryFilter.jsx
│ │ │ ├── ⚛️ FilterSidebar.jsx
│ │ │ ├── ⚛️ PriceRangeSlider.jsx
│ │ │ ├── ⚛️ RatingFilter.jsx
│ │ │ ├── ⚛️ ResetFilters.jsx
│ │ │ ├── ⚛️ SizeFilter.jsx
│ │ │ └── ⚛️ SortByDropdown.jsx
│ │ ├── 📁 layout/
│ │ │ ├── ⚛️ Footer.jsx
│ │ │ ├── ⚛️ Nav.jsx
│ │ │ └── ⚛️ Sidebar.jsx
│ │ └── 📁 product/
│ │ ├── ⚛️ ProductCard.jsx
| | |---⚛️--ProductForm.jsx
│ │ └── ⚛️ ProductList.jsx
│ ├── 📁 hooks/
│ │ ├── 📁 cartHook/
│ │ │ └── useCart.js
│ │ └── 📁 productHook/
│ ├── 📁 pages/
│ │ ├── 📁 admin/
│ │ │ └── ⚛️ ProductCreate.jsx
│ │ ├── 📁 cart/
│ │ │ └── ⚛️ Cart.jsx
│ │ ├── 📁 general/
│ │ │ ├── ⚛️ About.jsx
│ │ │ ├── ⚛️ Contact.jsx
│ │ │ ├── ⚛️ Home.jsx
│ │ │ └── ⚛️ PageNotFound.jsx
│ │ ├── 📁 product/
│ │ │ |── ⚛️ ProductDetails.jsx
| | | └── ⚛️ ProductPage.jsx
│ │ ├── 📁 user/
│ │ │ ├── ⚛️ Settings.jsx
│ │ │ ├── ⚛️ Signin.jsx
│ │ │ └── ⚛️ Signup.jsx
│ │ └── ⚛️ Products.jsx
│ ├── 📁 routes/
│ │ ├── ⚛️ Auth.jsx
│ │ ├── ⚛️ Mainroutes.jsx
│ │ └── ⚛️ Unauth.jsx
│ ├── 📁 store/
│ │ ├── 📁 actions/
│ │ │ ├── ⚛️ cartAction.jsx
│ │ │ ├── ⚛️ productAction.jsx
│ │ │ └── ⚛️ userActions.jsx
│ │ ├── 📁 reducers/
│ │ │ ├── ⚛️ productSlice.jsx
│ │ │ └── ⚛️ userSlice.jsx
│ │ └── ⚛️ store.jsx
│ ├── ⚛️ App.jsx
│ ├── 📄 index.css
│ └── ⚛️ main.jsx
├── 📄 .gitignore
├── 📄 eslint.config.js
├── 📄 frontend_map.pdf
├── 📄 index.html
├── 📄 bun.lock
├── 📄 package.json
├── 📄 README.md
└── 📄 vite.config.js


and this is backend starcture


Folder Structure---

backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection logic (connects using MONGO_URI)
│   │   └── cloudinary.js         # Cloudinary config for image uploads (optional)
│   │
│   ├── controllers/              # Handle requests & responses (business logic layer)
│   │   ├── auth.controller.js    # User login, register, refresh tokens
│   │   ├── product.controller.js # CRUD operations for products
│   │   ├── user.controller.js    # Fetch/update/delete user details
│   │   ├── order.controller.js   # Order placement, status updates
│   │   └── payment.controller.js # Payment gateway integrations (e.g. Stripe/Razorpay)
│   │
│   ├── middleware/               # Middlewares run before reaching controllers
│   │   ├── auth.middleware.js    # JWT authentication & role-based access
│   │   ├── error.middleware.js   # Global error handler (try/catch wrapper)
│   │   └── validate.middleware.js# Request validation (Joi/Yup/Zod) (optional)
│   │
│   ├── models/                   # MongoDB schemas (Mongoose)
│   │   ├── user.model.js         # User schema (name, email, password, roles)
│   │   ├── product.model.js      # Product schema (title, price, stock, etc.)
│   │   ├── order.model.js        # Order schema (items, total, status, user ref)
│   │   ├── category.model.js     # Categories schema (electronics, clothing, etc.)
│   │   └── cart.model.js         # Cart schema (items, user ref, total)
│   │
│   ├── routes/                   # API routes (connects URLs to controllers)
│   │   ├── auth.routes.js        # /api/auth → login, register, refresh, logout
│   │   ├── user.routes.js        # /api/users → profile, update, delete
│   │   ├── product.routes.js     # /api/products → CRUD endpoints
│   │   ├── order.routes.js       # /api/orders → create, update, fetch orders
│   │   └── upload.routes.js      # /api/upload → file/image uploads
│   │
│   ├── scripts/
│   │   └── seedAdmin.js          # Script to insert a default admin user in DB
│   │
│   ├── services/                 # Service layer (logic reusable across controllers)
│   │   ├── auth.service.js       # Auth helper functions (hash password, verify)
│   │   ├── product.service.js    # Product-related reusable functions
│   │   └── payment.service.js    # Payment gateway utilities
│   │
│   ├── utils/                    # Helper functions/utilities
│   │   ├── generateToken.js      # Generates JWT tokens
│   │   ├── sendEmail.js          # Nodemailer/SMTP for emails
│   │   └── slugify.js            # Converts product titles → URL-friendly slugs
│   │
│   ├── app.js                    # Express app config → middleware, routes
│   └── server.js                 # Main entry → connect DB + start server
│
├── uploads/                      # Local uploads folder (if not using cloudinary)
├── tests/                        # Jest/Mocha test cases (unit/integration)
├── Dockerfile                    # Docker setup (optional)
├── .env                          # Environment variables (MONGO_URI, JWT_SECRET, etc.)
├── .gitignore                    # Ignore node_modules, .env, etc.
├── package.json                  # Project metadata, dependencies, scripts
└── README.md                     # Project documentation


## Project Workflow & Architecture

### 1. General Workflow

- The app is built with React (Vite) and uses Redux for state management and React Router for navigation.
- Components are organized by feature for scalability and maintainability.
- Pages are mapped to routes for navigation.
- Redux manages global state (cart, user, products, etc.).
- API calls are abstracted in the `api/` folder.
- Custom hooks encapsulate business logic.

### 2. Redux State Management

- **store/store.jsx**: Configures the Redux store and applies middleware (e.g., thunk for async actions).
- **actions/**: Contains action creators for cart, product, and user. These dispatch actions to update the Redux state.
- **reducers/**: Contains slices (using Redux Toolkit or plain reducers) for product and user state. Each slice manages a part of the global state.
- **Usage**: Components use `useSelector` to read state and `useDispatch` to trigger actions. Example: `useSelector(state => state.cart)`.

### 3. Routing

- **routes/Mainroutes.jsx**: Defines the main application routes using React Router v6+ (`<Routes>`, `<Route>`).
- **routes/Auth.jsx**: Handles routes that require authentication (e.g., user dashboard, settings).
- **routes/Unauth.jsx**: Handles routes for unauthenticated users (e.g., login, signup).
- **pages/**: Each page component is mapped to a route. Example: `/cart` renders `pages/cart/Cart.jsx`.
- **Navigation**: The `Nav.jsx` component provides navigation links using `<NavLink>`.

### 4. Component Structure

- **components/**: Contains all reusable UI components, grouped by feature (cart, filters, layout, etc.).
- **pages/**: Contains top-level pages for each route.
- **hooks/**: Contains custom React hooks for encapsulating logic (e.g., cart logic, product fetching).

### 5. API Layer

- **api/config.jsx**: Centralizes API endpoints and HTTP logic (e.g., using axios or fetch). All network requests are made through this layer for consistency.

### 6. Styling

- **index.css**: Global styles. Components may use Tailwind CSS or other utility classes for styling.

### 7. Development & Contribution

- Run `bun install` to install dependencies.
- Use `bun run dev` to start the development server.
- Lint code with `bun run lint`.

## CI

GitHub Actions runs a Bun-based pipeline to install, lint, test (backend), and build (frontend) on pushes and pull requests.
- Follow the folder structure and naming conventions for new components/pages.

---

## Key Concepts for New Users

### Redux

- Redux is used for global state management (cart, user, products, etc.).
- Actions are dispatched to update state; reducers handle the logic.
- Use `useSelector` to access state and `useDispatch` to trigger actions in components.

### Routing

- React Router is used for client-side navigation.
- Define routes in `routes/` and map them to page components.
- Use `<NavLink>` for navigation links.

### Adding New Features

- Add new UI components in `components/`.
- Add new pages in `pages/` and map them in `routes/`.
- Add new Redux state by creating a new slice in `store/reducers/` and updating `store.jsx`.

### API Calls

- Use functions from `api/config.jsx` for all HTTP requests.
- Keep API logic out of components for maintainability.

### Custom Hooks

- Place reusable logic in `hooks/` (e.g., `useCart`).

---

For any questions, see the code comments or contact the project maintainer.
