# FreshCart

**FreshCart** is an e-commerce web application built using Angular 17 that allows users to browse, add to cart, and purchase various products. The project is designed with a focus on clean architecture, responsiveness, and performance. It includes features like authentication, product categories, carousels, a wishlist, payment functionality, and much more.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)

## Demo
Link to the live demo : https://freshcart-swart-kappa.vercel.app/

## Features
- **User Authentication**: Login, signup, and session management using JWT tokens.
- **Product Browsing**: Browse products by category, add products to the cart, and wishlist functionality.
- **Carousels**: Implemented two carousels:
  - **Home Carousel**: Displays static pictures.
  - **Categories Carousel**: Displays pictures fetched from the API using `ngx-owl-carousel`.
- **Cart Management**: 
  - Add and remove products from the cart.
  - Display cart totals.
  - Integrated with a cart service that connects with the API.
- **Wishlist Management**: Easily add or remove products from the wishlist.
- **Address Management**: Add, update, and delete addresses.
- **Guards**: 
  - Page access guards to restrict users from signing up or signing in if already authenticated.
  - Guards for pages like signup and signin to prevent access if the user already has a token.
- **Payment Gateway**: Seamless integration of a payment gateway to allow users to complete purchases securely.
- **Responsive Design**: 
  - Fully responsive across different screen sizes.
  - Added hover effects for products using SCSS.
  - Custom scrollbar styles added to the main stylesheet.
  - Fixed responsive errors in the products section.
- **Toaster Notifications**: Feedback using `ngx-toaster` for actions like adding items to the cart.
- **Form Validation**:
  - Refactored all forms using `FormBuilder`.
  - Implemented `invalid` and `valid` classes for email and password validation in login and signup forms.
- **Scroll to Top Button**: Implemented a "scroll to top" button in the main layout for better navigation.
- **Dependency Injection**: 
  - Utilized `@Inject` decorator for most services and components instead of constructors.
- **Routing**:
  - Angular routing for navigation between different pages.
  - Added NotFound page for non-existent routes.
- **Language Support**: 
  - Added feature to switch between English and Arabic languages.
  - Implemented translation using `@ngx-translate/core` and `@ngx-translate/http-loader`.

## Technologies Used
- **Frontend Framework**: Angular 17
- **Styling**: SCSS, responsive design with media queries
- **Carousel**: `ngx-owl-carousel`
- **Notifications**: `ngx-toaster`
- **Dependency Injection**: Utilized `@Inject` decorator for services
- **Form Handling**: Reactive forms with `FormBuilder` for signup and login
- **API Integration**: Connected with backend APIs for products, wishlist, cart, and payment functionality.
- **Routing**: Angular routing for navigation between different pages
- **Guards**: Route protection for authenticated users
- **Translation**: Implemented with `@ngx-translate/core` and `@ngx-translate/http-loader`

## Usage
1. Sign up or log in with your account.
2. Browse through the product categories.
3. Switch the language between English and Arabic using the language selector.
4. Add products to your cart or wishlist.
5. Manage your cart and proceed to checkout.
6. Complete your purchase via the integrated payment gateway.
