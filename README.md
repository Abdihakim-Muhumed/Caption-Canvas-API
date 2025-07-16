# 🎨 Caption Canvas API

> A secure, scalable, and role-based backend API built with Node.js, Express, and Sequelize.

Caption Canvas is a RESTful backend service that powers caption-based content creation and management. It features secure user authentication, dynamic role assignment, and robust endpoint access control—making it ideal for media platforms, education tools, or collaborative apps.

## 🚀 Features

- ✅ **Secure JWT Authentication**  
  Token-based login with hashed passwords, HTTP-only cookies, and 1-day session expiration.

- 🔐 **Role-Based Access Control (RBAC)**  
  Users are assigned roles like `admin`, `contestant`, or `user` with enforced backend permissions.

- 📚 **Live API Documentation**  
  Explore and test the API via Swagger UI:  
  [`/docs`](https://caption-canvas-api.onrender.com/docs/)

- ⚙️ **Modular and Scalable Codebase**  
  Clean folder structure (controllers, models, routes) following best practices for maintainability.

- 🧩 **Sequelize ORM Integration**  
  Models and relationships for `User`, `Role`, `Caption`, and `Media` entities.

- 🛡️ **Security-First Design**  
  Secure cookies (`httpOnly`, `sameSite`, `secure`) and backend-enforced session protection.

- 🧠 **Smart Role Handling**  
  The `user` role is auto-assigned and cannot be removed—ensuring every user has base-level access.

## 📦 Tech Stack

- **Node.js** + **Express**
- **Sequelize** (PostgreSQL)
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Swagger** for API docs
- **Render.com** for deployment

## 📂 Folder Structure
📦 caption-canvas-api/

    ┣ 📁 app/
    
        ┣ 📁 controllers/

        ┣ 📁 models/

        ┣ 📁 routes/

        ┣ 📁 config/

        ┣ 📁 middleware/

    ┣ 📄 api-docs.yaml

    ┣ 📄 server.js

    ┣ 📄 README.md

# Contact:

 Email: abdihakim.muhumedo@gmail.com 

 Phone: +254759430440

 # Copyright (c) 2024 Abdihakim-Muhumed

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
