# Product Gallery App

A React Native application for browsing products, demonstrating mobile architecture, state management, and UI/UX best practices. Built as part of a larger e-commerce application.

## Features

- Product browsing with master-detail view
- Adaptive layout:
  - Tablet: Split-screen master-detail view
  - Phone: Stack navigation with transitions
- Pull-to-refresh functionality
- Image caching with Expo Image
- Error handling with retry capability
- Loading states with skeleton UI
- Smooth transitions between views

## Tech Stack

- React Native / Expo
- TypeScript
- React Query for state management
- Jest & React Native Testing Library
- React Navigation (Stack & Tab)
- Expo Image for caching

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npx expo start
```

3. Run tests:

```bash
npm test
```

## Test Coverage

The application includes comprehensive tests for:

1. Navigation:

   - Tab navigation presence
   - Phone navigation (list to detail)
   - Tablet split-screen layout
   - Navigation transitions

2. Product List Component:

   - Basic rendering
   - Loading states
   - Error handling
   - Pull-to-refresh functionality
   - Product card interactions

3. Product Detail Component:

   - Loading skeleton
   - Image rendering
   - Product information display

4. Error Handling:
   - API error states
   - Retry functionality
   - Loading states

## Implementation Assumptions

1. Device Handling:

   - Tablet breakpoint set at 768px width
   - Portrait and landscape orientations supported

2. Performance:

   - Using Expo Image for built-in caching
   - Implementing skeleton loading for better UX
   - Minimal re-renders with React Query

3. Architecture:

   - Using Expo for easier setup and maintenance
   - React Query for server state management
   - Component-based architecture for reusability
   - No global state needed beyond React Query

4. API:
   - Using dummyjson.com API
   - Assuming stable network conditions
   - Basic error handling implemented

## Project Structure

```
src/
  ├── components/          # Reusable components
  ├── navigation/          # Navigation configuration
  ├── api/                 # API integration
  ├── types/              # TypeScript definitions
  └── __tests__/          # Test files
```

## Project Requirements Met

✅ TECHNICAL REQUIREMENTS:
React Native / TypeScript ✓
State Management (React Query) ✓
Unit Tests (Jest/RNTL) ✓
Error Handling ✓
Loading States ✓

✅ API:
Using dummyjson.com/products?limit=10&skip=10 ✓

✅ MAIN SCREEN LAYOUT:
Tab navigation with Products tab ✓
Split-screen tablet layout ✓
Stack navigation for phones ✓

✅ PRODUCT LIST:
Reusable ProductList/ProductCard ✓
Scrollable FlatList ✓
ProductCard shows:
Thumbnail ✓
Title ✓
Loading skeleton ✓
Pull-to-refresh ✓
Error handling/retry ✓

✅ PRODUCT DETAIL:
Navigation to detail ✓
Last image display ✓
Image caching (expo-image) ✓
Smooth transitions ✓

✅ EVAL CRITERIA:
Code organization ✓
Component reusability ✓
State management ✓
Performance considerations ✓
Screen size handling ✓
TypeScript typing ✓
Test coverage ✓
Error handling ✓

✅ DOCUMENTATION / VERSION CONTROL:
GitHub repo ✓
README with:
Setup instructions ✓
Build/run instructions ✓
Implementation assumptions ✓

# Dark Mode

This app follows system dark mode preferences:

iOS Simulator:

- cmd+shift+a

Android Emulator:

- Pull down Quick Settings panel
- Toggle Dark theme
- Or: Settings > Display > Dark theme
