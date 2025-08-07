# ÉLITE Frontend

## Folder Structure & File Explanations

### 📁 frontend/

Main project folder for the frontend React application.

#### 📁 node_modules/

Contains all installed npm packages and dependencies. Managed automatically by npm/yarn.

#### 📁 public/

- `kit_2025.jpg`: Static assets (images, etc.) served directly. Not processed by Webpack/Vite.

#### 📁 src/

Source code for the React app.

##### 📁 api/

- `config.jsx`: API configuration, base URLs, and utility functions for making HTTP requests.

##### 📁 components/

Reusable UI components, organized by feature:

- **cart/**: Cart-related UI (CartItem, CartSummary, QuantitySelector)
- **common/**: Shared UI (Button, Loader, RatingStars)
- **filters/**: Product filtering UI (Availability, Brand, Category, Price, etc.)
- **layout/**: Layout components (Footer, Nav, Sidebar)
- **product/**: Product display (ProductCard, ProductList)

##### 📁 hooks/

Custom React hooks for business logic:

- **cartHook/useCart.js**: Cart state and logic
- **productHook/**: (future product-related hooks)

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

#### package-lock.json / package.json

NPM package management files. List dependencies, scripts, and project metadata.

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
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
└── 📄 vite.config.js

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

- Run `npm install` to install dependencies.
- Use `npm run dev` to start the development server.
- Lint code with `npm run lint`.
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
