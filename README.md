# F&B Client Website Documentation

## Project Architecture

This is a client-side application for a Food & Beverage ordering system built with React, TypeScript, and Redux for state management. The application follows a well-structured architecture for handling user authentication, order management, and bill generation.

## Table of Contents
- [API Architecture](#api-architecture)
- [Data Flow](#data-flow)
- [Authentication System](#authentication-system)
- [Key Features](#key-features)
- [State Management](#state-management)
- [API Endpoints](#api-endpoints)

## API Architecture

The API structure is organized into two main categories:

```
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

```
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

This documentation provides a comprehensive overview of the F&B client website's architecture and functionality. The system is designed to be scalable, maintainable, and user-friendly, with clear separation of concerns and robust error handling.
