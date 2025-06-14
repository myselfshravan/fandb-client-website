# F&B Client Website Documentation

## Complete Project Catalog: [View PDF](F_and_B_QR_Code_based_Food_Ordering_System.pdf)

## Overview

This is a modern client-side application for a Food & Beverage ordering system that provides a seamless dining experience. The platform enables customers to browse menus, place orders, track their order status in real-time, and manage their bills efficiently.

## System Architecture Overview

This client website is part of a larger ecosystem that includes multiple components working together to provide a complete F&B management solution:

### QR Code-Based Table Access

- Each table features a unique QR code
- Customers scan QR code to access the digital menu
- Automatic table association upon login
- Secure OTP-based authentication system

### Customer Journey

1. **Table Access**
   - Scan table's QR code
   - Enter phone number for authentication
   - Receive and verify OTP
   - Gain access to digital menu

2. **Order Management**
   - Browse available menu items (controlled by kitchen)
   - Add items to cart
   - Place orders
   - Track order status in real-time
   - View order history
   - Request waiter assistance

3. **Service Flow**
   - Orders sent to kitchen admin panel
   - Kitchen updates item status
   - Waiters notified of ready items
   - Real-time delivery tracking
   - Digital bill generation

### Connected Systems

1. **Admin Panel** (Separate Application)
   - Waiter/Captain management
   - Table management
   - Menu item availability control
   - Order tracking and management
   - Real-time kitchen coordination
   - Staff assignment and monitoring

2. **Waiter App** (Flutter Application)
   - Real-time order notifications
   - Order pickup management
   - Table service requests
   - Delivery confirmation
   - Status updates

3. **Kitchen Management System**
   - Real-time order queue
   - Item availability updates
   - Order status management
   - Preparation time tracking

### Real-Time Communication

- Instant order updates
- Live menu item availability
- Real-time waiter call system
- Synchronized order tracking
- Immediate status notifications

This client website represents the customer-facing component of a comprehensive F&B management ecosystem, designed to streamline the dining experience while providing efficient tools for staff and management.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Setup](#project-setup)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Performance](#performance)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [API Architecture](#api-architecture)
- [Data Flow](#data-flow)
- [Authentication System](#authentication-system)
- [Key Features](#key-features)
- [State Management](#state-management)
- [API Endpoints](#api-endpoints)

## Tech Stack

### Core Technologies

- **Frontend Framework**: React 18.2.0 with TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router DOM 6.x
- **Build Tool**: Vite 4.x
- **Styling**: TailwindCSS 3.x with custom animations
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**:
  - Radix UI primitives
  - Headless UI components
  - Hero Icons
  - Lucide React icons

### Development Tools

- **Language**: TypeScript 5.x
- **Linting**: ESLint with TypeScript parser
- **Package Manager**: npm/yarn
- **Code Formatting**: Integrated with VSCode
- **Version Control**: Git

## Project Setup

### Directory Structure

```plaintext
fandb-client-website/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # React components
│   ├── store/        # Redux store and slices
│   ├── apis/         # API integration
│   ├── utils/        # Utility functions
│   └── lib/          # Shared libraries
├── public/           # Public assets
└── config/           # Configuration files
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments
- Use proper naming conventions

### Best Practices

1. **Component Structure**
   - Keep components small and focused
   - Use custom hooks for logic reuse
   - Implement proper prop typing

2. **State Management**
   - Use Redux for global state
   - Local state for component-specific data
   - Implement proper error handling

3. **Performance**
   - Implement proper memoization
   - Lazy load components when possible
   - Optimize images and assets
   - Use proper caching strategies

## API Architecture

The API structure is organized into two main categories:

```plaintext
apis/
├── GET/
│   ├── createBill.ts
│   ├── fetchAllMembers.ts
│   ├── fetchAllTables.ts
│   ├── fetchBillByOtp.ts
│   ├── fetchDishCategories.ts
│   ├── fetchDishes.ts
│   ├── fetchDrinkCategory.ts
│   ├── fetchDrinks.ts
│   ├── fetchMyOrders.ts
│   └── fetchRejectedItems.ts
├── POST/
│   ├── authDetails.ts
│   ├── callWaiter.ts
│   ├── fetchMemberInfo.ts
│   ├── placeOrder.ts
│   └── verifyOtp.ts
└── types.ts
```

## Data Flow

1. **User Authentication Flow**:

   ```mermaid
   sequenceDiagram
   participant User
   participant Auth API
   participant App State
   
   User->>Auth API: Submit phone & details
   Auth API->>User: Return OTP & user_id
   User->>Auth API: Verify OTP
   Auth API->>App State: Store user session
   ```

2. **Order Management Flow**:

   ```mermaid
   sequenceDiagram
   participant User
   participant Order API
   participant Kitchen
   participant Bill System
   
   User->>Order API: Place Order (dishes/drinks)
   Order API->>Kitchen: Forward Order
   Kitchen->>Order API: Update Order Status
   Order API->>User: Order Status Updates
   User->>Bill System: Request Bill
   Bill System->>User: Generate Bill with Details
   ```

## Testing

### Testing Stack

- Unit Testing: Jest
- Component Testing: React Testing Library
- E2E Testing: Cypress (recommended)

### Testing Guidelines

1. Write tests for:
   - Components
   - Redux reducers
   - API integration
   - Utils functions

2. Test Coverage:
   - Aim for 80% coverage
   - Focus on business-critical paths
   - Include error scenarios

## Authentication System

The authentication system uses a phone number-based OTP verification:

1. **Initial Authentication** (`authDetails.ts`):
   - Accepts user details (name, phone, table number)
   - Returns an OTP and user_id

2. **OTP Verification** (`verifyOtp.ts`):
   - Verifies the provided OTP
   - Establishes user session upon successful verification

## Key Features

1. **Order Management**:
   - Separate handling for food and drinks
   - Real-time order status tracking
   - Support for order modifications
   - Rejected items handling

2. **Menu Management**:
   - Categorized view of dishes and drinks
   - Detailed item information including prices
   - Support for item descriptions and images

3. **Bill Generation**:
   - Automatic calculation of totals
   - Support for membership discounts
   - Itemized bill with GST calculations
   - OTP-based bill verification

## State Management

The application uses Redux for state management with the following slices:

```plaintext
store/
├── slices/
│   ├── authSlice.ts        # Authentication state
│   ├── cartDishSlice.ts    # Food items in cart
│   ├── cartDrink.ts        # Drinks in cart
│   ├── menuSlice.ts        # Available menu items
│   └── myOrdersSlice.ts    # User's order history
```

## API Endpoints

### Authentication Endpoints

- `POST /api/client/createCustomer`: Create new customer session
- `POST /api/client/verifyOtp`: Verify OTP for authentication

### Order Management Endpoints

- `POST /api/client/setOrders`: Place new order
- `GET /api/client/fetchMyOrders`: Retrieve user's orders
- `GET /api/client/fetchRejectedItems`: Get rejected order items

### Menu Endpoints

- `GET /api/client/fetchDishes`: Get available dishes
- `GET /api/client/fetchDrinks`: Get available drinks
- `GET /api/client/fetchDishCategories`: Get dish categories
- `GET /api/client/fetchDrinkCategory`: Get drink categories

### Billing Endpoints

- `GET /api/client/createBillByUserId/:user_id/:amt/:membership_id`: Generate bill
- `GET /api/client/fetchBillByOtp`: Retrieve bill using OTP

### Additional Features

- `POST /api/client/callWaiter`: Request waiter assistance
- `GET /api/client/fetchAllTables`: Get tables information
- `GET /api/client/fetchAllMembers`: Get membership information

## Data Models

Key data models include:

1. **Order Model**:

   ```typescript
   interface Orders {
   tableNo: string,
   user_id: string,
   otp: string,
   drinks?: OrderDrink[],
   dishes?: OrderDish[],
   }
   ```

2. **Bill Details Model**:

   ```typescript
   interface BillDetails {
   otp: string,
   DishItems: DishItem[],
   DrinkItems: DrinkItem[],
   grandTotal: number,
   dishTotal: number,
   drinkTotal: number,
   cgst: number,
   sgst: number
   }
   ```

3. **User Model**:

   ```typescript
   interface UserState {
   username: string,
   phoneNumber: string,
   otp: string,
   user_id: string,
   tableNo: string,
   membership_id: string,
   member_name: string,
   member_phoneNo: string,
   }
   ```

## Performance

### Optimization Techniques

1. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

2. **Asset Optimization**
   - Image optimization
   - Font optimization
   - CSS minification

3. **Caching Strategy**
   - Redux persist configuration
   - API response caching
   - Static asset caching

### Performance Metrics

- First Contentful Paint (FCP) < 1.8s
- Time to Interactive (TTI) < 3.8s
- Cumulative Layout Shift (CLS) < 0.1

## Security

### Security Measures

1. **Authentication**
   - OTP-based verification
   - Session management
   - Token expiration

2. **Data Protection**
   - HTTPS enforcement
   - XSS prevention
   - CSRF protection

3. **Best Practices**
   - Input sanitization
   - Secure HTTP headers
   - Regular dependency updates

## Troubleshooting

### Common Issues

1. **Build Issues**

   ```bash
   # Clear node modules and lock file
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **API Connection Issues**
   - Verify API URL in .env
   - Check network connectivity
   - Verify CORS configuration

3. **State Management Issues**
   - Clear localStorage
   - Reset Redux persist store
   - Check Redux DevTools

## Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Submit a pull request

### Pull Request Process

1. Update documentation
2. Add/update tests
3. Ensure CI passes
4. Get code review

### Code Review Guidelines

- Follow the PR template
- Write meaningful commit messages
- Keep changes focused and atomic
- Include test coverage

This documentation provides a comprehensive overview of the F&B client website. The system is designed to be scalable, maintainable, and user-friendly, with clear separation of concerns and robust error handling. For additional support or queries, please open an issue in the repository.
