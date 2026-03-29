#Gooomly — Digital Marketplace

A fully interactive, data-driven web application built with **HTML5**, **Tailwind CSS**, **Flowbite**, and **vanilla JavaScript (ES6)**. Gooomly is a digital marketplace for creators to manage and sell UI kits, 3D assets, templates, and more.

 Key Features

- **5+ Pages** — Home, About, Contact, Sign In, Sign Up with consistent Navbar & Footer
- **Full CRUD** — Create, Read, Update, Delete products using Array & Object methods
- **6 Search & Filter Options** — By title, category, status, price range, rating, and sort order
- **Dark / Light Theme Toggle** — Persists across pages via `localStorage`
- **15 String Methods** — Used in search, display formatting, data cleaning, and validation
- **Object CRUD Methods** — `Object.keys()`, `Object.values()`, `Object.entries()`, `Object.assign()`, `Object.freeze()`
- **Advanced Array Methods** — `filter()`, `map()`, `sort()`, `reduce()`, `find()`, `includes()`, `every()`, `some()`
- **Modular Codebase** — Separated into `/database`, `/constants`, `/utils`, `/pages`

# Technologies Used

| Technology     | Purpose                     |
|----------------|-----------------------------|
| HTML5          | Semantic page structure     |
| Tailwind CSS   | Utility-first styling       |
| Flowbite       | Pre-built UI components     |
| JavaScript ES6 | Logic, DOM, CRUD, themes    |
| localStorage   | Theme persistence           |

## Project Structure

```
project/
├── index.html                  ← Home page
├── script.js                   ← Main orchestrator
├── README.md
├── assets/
│   └── images/
│       ├── gooomly-logo.png
│       └── gooomly-hero.png
└── src/
    ├── database/
    │   └── products.js          ← Product data (Array of Objects)
    ├── constants/
    │   └── themeConstants.js     ← Theme config (Object.freeze)
    ├── utils/
    │   ├── theme.js             ← Dark/Light toggle + localStorage
    │   ├── stringHelpers.js     ← 15 string method utilities
    │   ├── filters.js           ← Search, filter, sort engine
    │   └── crud.js              ← CRUD operations + Object methods
    ├── pages/
    │   └── home/
    │       └── home.js          ← Home page logic
    ├── about/
    │   └── about.html
    ├── contact/
    │   └── contact.html
    ├── signin/
    │   └── signin.html
    └── signup/
        └── signup.html
```

## How to Run

1. Clone or download this repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge)
3. **Recommended:** Use VS Code with the **Live Server** extension for the best experience

##  Author

**Ahmed Raza**
