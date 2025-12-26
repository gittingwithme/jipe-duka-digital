# Kifaru Coffee - Premium Kenyan Coffee & Tea E-commerce

A modern, responsive e-commerce website for a Kenyan coffee and tea business.

![Kifaru Coffee](https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=400&fit=crop)

## 🌟 Live Demo

[View Live Demo](#) *(Replace with your deployment URL)*

## 📋 Project Overview

Kifaru Coffee is a fully-functional mini e-commerce website showcasing premium Kenyan coffee and tea products. The name "Kifaru" means rhinoceros in Swahili, representing strength and Kenyan heritage.

### Features

- **🛒 Shopping Cart** - Add/remove products, quantity management, localStorage persistence
- **💱 Multi-Currency** - KES (default), USD, EUR, GBP with automatic conversion
- **🌓 Dark/Light Theme** - Toggle with localStorage persistence
- **👋 Dynamic Greeting** - Time-based greeting with current date
- **🔍 Product Search & Filter** - Filter by category, search by name/description
- **📱 Fully Responsive** - Mobile-first design, works on all devices
- **✅ Form Validation** - Client-side validation with clear error messages
- **♿ Accessible** - Semantic HTML, ARIA labels, keyboard navigation

## 🛠️ Tech Stack

- **HTML5** - Semantic, accessible markup
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Google Fonts** - Playfair Display, DM Sans
- **Lucide Icons** - Beautiful open-source icons

## 📁 Project Structure

```
public/
├── index.html          # Home page
├── products.html       # Products listing page
├── about.html          # About us page
├── contact.html        # Contact form page
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # All JavaScript functionality
├── images/
│   └── .gitkeep        # Placeholder for images
└── README.md           # This file
```

## 🚀 Deployment

### GitHub Pages

1. Push code to a GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/public` folder
5. Save and wait for deployment

### Netlify

1. Drag and drop the `public` folder to Netlify
2. Or connect your GitHub repository
3. Set publish directory to `public`

### Vercel

1. Import your GitHub repository
2. Set root directory to `public`
3. Deploy

## 🎨 Color Palette

| Color | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| Primary | `hsl(24, 65%, 45%)` | `hsl(35, 70%, 55%)` | Buttons, accents |
| Background | `hsl(40, 30%, 98%)` | `hsl(24, 25%, 8%)` | Page background |
| Foreground | `hsl(24, 30%, 15%)` | `hsl(35, 20%, 95%)` | Text |
| Accent | `hsl(35, 80%, 50%)` | `hsl(35, 80%, 55%)` | Highlights |

## 📝 JavaScript Features

### Shopping Cart
```javascript
addToCart(productId)     // Add item to cart
removeFromCart(productId) // Remove item
updateQuantity(id, change) // Update quantity
clearCart()              // Empty cart
```

### Currency
```javascript
setCurrency('USD')       // Change currency
formatPrice(1500)        // Returns formatted price
```

### Theme
```javascript
toggleTheme()            // Switch dark/light
```

## 📧 Contact

For questions or feedback about this project:

- **Business**: hello@kifarucoffee.co.ke
- **Location**: Nairobi, Kenya

## 📄 License

This project is created for educational purposes.

---

Made with ❤️ in Kenya
