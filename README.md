# Fresh Cart

**Fresh Cart** is an e-commerce web application built using Angular 17 that allows users to browse, add to cart, and purchase various products. The project is designed with a focus on clean architecture, responsiveness, and performance. It includes features like authentication, product categories, carousels, a wishlist, payment functionality, and much more.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)

## Demo
Link to the live demo.

## Features
- **User Authentication**: Login, signup, and session management using JWT tokens.
- **Product Browsing**: Browse products by category, add products to the cart, and wishlist functionality.
- **Carousels**: Home and category-based carousels using `ngx-owl-carousel`.
- **Cart Management**: Add and remove products from the cart, and display cart totals.
- **Address Management**: Add, update, and delete addresses.
- **Guards**: Page access guards to restrict users from signing up or signing in if already authenticated.
- **Payment Gateway**: Seamless integration of a payment gateway to allow users to complete purchases securely.
- **Responsive Design**: Fully responsive across different screen sizes.
- **Toaster Notifications**: Feedback using `ngx-toaster` for actions like adding items to the cart.

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

## Usage
1. Sign up or log in with your account.
2. Browse through the product categories.
3. Add products to your cart or wishlist.
4. Manage your cart and proceed to checkout.
5. Complete your purchase via the integrated payment gateway.
****
