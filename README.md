# Zyros E-Commerce

A full-stack luxury e-commerce website: a React and Material UI storefront backed by a Spring Boot REST API and a SQL Server database.

> Project for *Web Design and Programming* (CEN301), Istanbul Topkapı University (2025).

<!-- TODO: add 2-3 screenshots, e.g. ![Home](screenshots/home.png) -->

## Overview

Zyros redesigns the online storefront of an emerging luxury brand as a high-end, immersive shopping experience, with a minimalist-luxury look and a smooth path from browsing to checkout.

## Features

- **Animated splash screen** with the brand logo and a loading bar while data loads from the backend.
- **Dynamic category filtering** (Watches, Bags, Jewelry) that updates instantly without page reloads, using React state hooks.
- **Product detail modals** with an image gallery, thumbnails, price comparison, and Add to Cart.
- **Cart drawer** (Material UI Drawer) with live notification badges.
- **Search** using Material UI text fields with input adornments.
- **User feedback** through Snackbars and Alerts when items are added to the cart.
- **Responsive layout** for desktop, tablet, and mobile.

## Tech Stack

| Part | Technology |
|------|------------|
| Frontend | React.js, Material UI (custom theme and `sx` styling) |
| Backend | Spring Boot (RESTful API, JSON), Maven |
| Database | Microsoft SQL Server |

## Data Workflow

The product catalog was organized in Excel, exported to CSV, and imported directly into SQL Server. This was faster than writing manual SQL inserts and kept hundreds of entries accurate.

## Getting Started

> TODO: check these steps against your project and fix any folder names or ports.

1. Clone the repository:
   ```bash
   git clone https://github.com/asmaatya205-del/Zyros-E-commerce.git
   ```
2. **Database:** create a SQL Server database and import the product CSV (TODO: file name). Update the connection settings in the backend's `application.properties`.
3. **Backend:**
   ```bash
   cd TODO-backend-folder
   mvn spring-boot:run
   ```
4. **Frontend:**
   ```bash
   cd TODO-frontend-folder
   npm install
   npm start
   ```

## Future Work

User authentication and order processing, which the backend structure is designed to support.

## Author

**Asma Atiah**, Computer Engineering, Istanbul Topkapı University
[LinkedIn](https://www.linkedin.com/in/asma-atiah-1442a7317) · asmaatya205@gmail.com
