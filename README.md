# 📝 Blog App

A modern, responsive React blogging platform built with **React 19,
Vite, Appwrite, Redux Toolkit, React Router, React Hook Form, Tailwind
CSS, TinyMCE, and Swiper**.

The application allows users to create accounts, authenticate with
email/password or Google OAuth, create and edit rich-text blog posts,
upload multiple images, view posts in an image carousel, manage their
own posts, and interact with the application through a clean responsive
interface.

> **Project type:** Full-featured client-side blogging application\
> **Frontend:** React + Vite\
> **Backend-as-a-Service:** Appwrite\
> **Deployment:** Vercel-ready

------------------------------------------------------------------------

## ✨ Features

### 🔐 Authentication

-   Email/password registration and login
-   Google OAuth authentication
-   Persistent Appwrite authentication sessions
-   Current-user detection when the application starts
-   Logout / session deletion
-   Protected routes for authenticated-only pages
-   Redux-based authentication state
-   User-friendly authentication error messages

### 📝 Blog Post Management

Authenticated users can:

-   Create blog posts
-   Edit existing posts
-   Delete posts
-   View their own posts
-   View individual posts
-   Publish active posts
-   Store post title, slug, content, status, author ID, and images
-   Write formatted content using a rich-text editor

### 🖼️ Multiple Image Uploads

The application supports multiple images per post.

The upload flow is:

``` text
User selects multiple images
          │
          ▼
       React
          │
          ▼
      Appwrite
       Storage
          │
          ▼
     File IDs saved
      with post
```

Images are stored in an Appwrite Storage bucket rather than directly
inside the database.

### 🎨 Rich Text Editing

Blog content is created using:

-   TinyMCE
-   `@tinymce/tinymce-react`
-   HTML content rendering through `html-react-parser`

This allows users to create structured blog content instead of plain
text only.

### 🖼️ Image Carousel

Individual posts use **Swiper** to display multiple uploaded images as a
responsive carousel.

The post viewer includes:

-   Swipe/slide navigation
-   Current image counter
-   Responsive image sizing
-   Author-only Edit and Delete controls

### 📱 Responsive UI

The interface is designed with Tailwind CSS responsive utilities.

Examples include:

``` text
Mobile
  ↓
1-column post grid

Small screens
  ↓
2-column post grid

Medium screens
  ↓
3-column post grid

Large screens
  ↓
4-column post grid
```

The post detail page also changes spacing, typography, image height, and
action-button sizing across breakpoints.

### 🧭 Client-Side Routing

React Router controls navigation between:

-   Home
-   Login
-   Signup
-   My Posts
-   Add Post
-   Edit Post
-   Individual Post

Protected routes prevent unauthenticated users from accessing private
pages.

### 🗃️ Appwrite Data Layer

Appwrite is used for:

-   Authentication
-   OAuth
-   Database/table operations
-   File storage
-   Image retrieval
-   File deletion

A dedicated service class centralizes Appwrite operations instead of
placing database/storage calls throughout the UI.

### 🔄 Redux State Management

Redux Toolkit manages authentication state.

The current store contains:

``` text
Redux Store
└── Auth
    ├── status
    └── user_data
```

Authentication actions include:

``` text
login()
logout()
```

This allows components such as the Header and protected routes to react
consistently to authentication changes.

### 🧾 Form Management

Forms use **React Hook Form** for:

-   Login
-   Signup
-   Blog creation
-   Blog editing
-   Form registration and submission
-   Basic validation

### 🧩 Reusable Components

The project separates reusable UI into components such as:

``` text
Header
Footer
Logo
Container
Button
Input
Select
Login
Signup
Post Card
Post Form
Rich Text Editor
Authentication Route
Logout Button
```

This makes the application easier to maintain and extend.

------------------------------------------------------------------------

# 🏗️ Architecture

The application follows a component-oriented React architecture:

``` text
                           React Application
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
        React Router          Redux Toolkit       Components
              │                   │                   │
              │                   ▼                   ├── Header
              │              Auth State             ├── Footer
              │                   │                   ├── Forms
              │                   │                   ├── Post Card
              │                   │                   └── UI
              │                   │
              ▼                   │
          Pages ◄─────────────────┘
              │
      ┌───────┼────────┬─────────────┐
      ▼       ▼        ▼             ▼
    Home    Auth     Posts        Management
                      │
            ┌─────────┼─────────┐
            ▼         ▼         ▼
           View      Create     Edit/Delete
            │         │
            └─────────┼─────────┘
                      ▼
                  Appwrite
                      │
           ┌──────────┼──────────┐
           ▼          ▼          ▼
       Account     Tables DB   Storage
       / OAuth     / Posts     / Images
```

------------------------------------------------------------------------

# 🧱 Project Structure

``` text
BLOG_APP/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── appwrite/
│   │   ├── auth.js
│   │   └── db.js
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── component/
│   │   ├── Header/
│   │   │   ├── header.jsx
│   │   │   └── logout_btn.jsx
│   │   │
│   │   ├── Footer/
│   │   │   └── footer.jsx
│   │   │
│   │   ├── container/
│   │   │   └── container.jsx
│   │   │
│   │   ├── auth_route.jsx
│   │   ├── button.jsx
│   │   ├── index.js
│   │   ├── input.jsx
│   │   ├── login.jsx
│   │   ├── logo.jsx
│   │   ├── post_card.jsx
│   │   ├── post_form.jsx
│   │   ├── RTE.jsx
│   │   ├── select.jsx
│   │   └── signup.jsx
│   │
│   ├── config/
│   │   └── config.js
│   │
│   ├── context/
│   │   ├── auth.jsx
│   │   └── store.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Sign_up.jsx
│   │   ├── login_.jsx
│   │   ├── add_post.jsx
│   │   ├── all_post.jsx
│   │   ├── Edit_page.jsx
│   │   └── post.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env_sample
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

------------------------------------------------------------------------

# 🗺️ Application Routes

  Route              Purpose             Authentication
  ------------------ ------------------- ------------------------------------
  `/`                Public blog feed    Public
  `/login`           Login page          Guest only
  `/signup`          Registration page   Guest only
  `/my-posts`        User's posts        Required
  `/add-post`        Create a post       Required
  `/edit-post/:id`   Edit a post         Required
  `/post/:id`        View a post         Required in current implementation

The route configuration is centralized in `main.jsx` using React
Router's `createBrowserRouter` and `RouterProvider`.

------------------------------------------------------------------------

# 🔐 Authentication Architecture

Authentication is encapsulated in:

``` text
src/appwrite/auth.js
```

The service provides methods for:

``` text
signup()
login()
login_google()
get_curr_user()
get_auth_user()
logout()
```

The application startup flow is:

``` text
Application starts
       │
       ▼
App.jsx
       │
       ▼
get_curr_user()
       │
       ├── User exists ──────► Redux login()
       │
       └── No user ──────────► Redux logout()
       │
       ▼
Loading complete
       │
       ▼
Application rendered
```

This prevents the UI from immediately assuming that a user is logged out
before Appwrite has finished checking the current session.

------------------------------------------------------------------------

# 🛡️ Protected Routes

Private pages are wrapped using the project's authentication route
component.

Conceptually:

``` text
                    Route
                      │
                      ▼
                Protection
                  /      \
                 /        \
       authenticated?       ?
             │
       ┌─────┴─────┐
       │           │
      YES          NO
       │           │
       ▼           ▼
     Page        Redirect
```

This is used for pages such as:

``` text
/my-posts
/add-post
/edit-post/:id
/post/:id
```

------------------------------------------------------------------------

# 🗄️ Appwrite Architecture

The Appwrite integration is separated into two major services.

## Authentication Service

``` text
src/appwrite/auth.js
```

Responsible for:

``` text
Appwrite Account
├── Email/password authentication
├── Google OAuth
├── Current user
├── Current session
└── Logout
```

## Database & Storage Service

``` text
src/appwrite/db.js
```

Responsible for:

``` text
Appwrite
│
├── TablesDB
│   ├── Create post
│   ├── Update post
│   ├── Delete post
│   ├── Get post
│   ├── Get all active posts
│   └── Get user's posts
│
└── Storage
    ├── Upload images
    ├── Delete images
    └── Get image preview
```

Centralizing these operations keeps Appwrite-specific code out of most
React components.

------------------------------------------------------------------------

# 📝 Post Data Model

The frontend stores blog information using a structure containing fields
such as:

``` text
Post
│
├── $id
├── title
├── content
├── status
├── slug
├── userid
└── image[]
```

The relationship is:

``` text
             User
              │
              │ userid
              ▼
             Post
        ┌─────┼─────┐
        │     │     │
        ▼     ▼     ▼
      title content status
                    │
                    ▼
                 image[]
                    │
                    ▼
             Appwrite Storage
```

------------------------------------------------------------------------

# 🖼️ Image Management Flow

When a user creates a post:

``` text
                User
                  │
                  ▼
          Select multiple images
                  │
                  ▼
             Post Form
                  │
                  ▼
          upload_image()
                  │
                  ▼
        Appwrite Storage Bucket
                  │
                  ▼
            File IDs returned
                  │
                  ▼
             Create post
                  │
                  ▼
         image: [fileId, ...]
```

When viewing the post:

``` text
Stored file ID
      │
      ▼
get_image_preview(fileId)
      │
      ▼
Appwrite Storage
      │
      ▼
Image URL
      │
      ▼
<img />
```

When deleting a post:

``` text
Post deletion
     │
     ├── Delete associated images
     │
     └── Delete database row
```

------------------------------------------------------------------------

# ✍️ Post Creation / Editing Flow

The reusable `Post_Form` component handles both creation and editing.

### Create

``` text
/add-post
    │
    ▼
Post_Form
    │
    ├── Title
    ├── Slug
    ├── Content
    ├── Status
    └── Images
    │
    ▼
Appwrite Storage
    │
    ▼
Appwrite Database
    │
    ▼
Navigate /post/:id
```

### Edit

``` text
/edit-post/:id
       │
       ▼
Load existing post
       │
       ▼
Post_Form(post)
       │
       ▼
Update database row
       │
       ▼
Updated post
```

This reuse avoids maintaining completely separate forms for create and
edit operations.

------------------------------------------------------------------------

# 📰 Home Feed

The home page retrieves active posts from Appwrite:

``` text
Home
 │
 ▼
get_all_posts()
 │
 ▼
Appwrite TablesDB
 │
 ├── status = active
 └── limit = 100
 │
 ▼
posts.rows
 │
 ▼
Post_Card[]
```

The UI displays posts in a responsive grid.

``` text
Mobile
┌───────────────┐
│     Post      │
├───────────────┤
│     Post      │
└───────────────┘

Tablet
┌─────────┬─────────┐
│  Post   │  Post   │
├─────────┼─────────┤
│  Post   │  Post   │
└─────────┴─────────┘

Desktop
┌──────┬──────┬──────┬──────┐
│ Post │ Post │ Post │ Post │
└──────┴──────┴──────┴──────┘
```

------------------------------------------------------------------------

# 📱 Responsive Design

Tailwind CSS responsive utilities are used throughout the application.

For example, the home feed uses:

``` text
grid-cols-1
      ↓
sm:grid-cols-2
      ↓
md:grid-cols-3
      ↓
lg:grid-cols-4
```

The post detail page also adapts:

``` text
Mobile
├── Smaller padding
├── Smaller typography
├── Shorter image area
└── Compact action buttons

Desktop
├── Larger content area
├── Larger typography
├── Larger image area
└── More spacious controls
```

The project therefore supports responsive layouts rather than being
designed exclusively for desktop.

------------------------------------------------------------------------

# 🧰 Technology Stack

  Technology              Purpose
  ----------------------- --------------------------------------
  **React 19**            UI development
  **Vite**                Development server and build tooling
  **React Router DOM**    Client-side routing
  **Redux Toolkit**       Global authentication state
  **React Redux**         React bindings for Redux
  **Appwrite**            Authentication, database and storage
  **React Hook Form**     Form state and validation
  **Tailwind CSS 4**      Responsive UI styling
  **TinyMCE**             Rich-text blog editor
  **html-react-parser**   Rendering rich HTML content
  **Swiper**              Responsive image carousel
  **ESLint**              Code quality and linting
  **Vercel**              Deployment-ready configuration

------------------------------------------------------------------------

# 📦 Dependencies

Important production dependencies include:

``` json
{
  "@reduxjs/toolkit": "^2.12.0",
  "@tailwindcss/vite": "^4.3.3",
  "@tinymce/tinymce-react": "^6.3.0",
  "appwrite": "^26.2.0",
  "html-react-parser": "^6.1.5",
  "react": "^19.2.7",
  "react-dom": "^19.2.7",
  "react-hook-form": "^7.82.0",
  "react-redux": "^9.3.0",
  "react-router-dom": "^7.18.1",
  "swiper": "^14.0.7",
  "tailwindcss": "^4.3.3"
}
```

------------------------------------------------------------------------

# ⚙️ Installation

## 1. Clone the project

``` bash
git clone <your-repository-url>
cd BLOG_APP
```

## 2. Install dependencies

``` bash
npm install
```

## 3. Configure environment variables

Create:

``` text
.env
```

based on:

``` text
.env_sample
```

The application expects configuration values such as:

``` env
VITE_URL=
VITE_PROJECT_ID=
VITE_DATABASE_ID=
VITE_COLLECTION_ID=
VITE_BUCKET_ID=
VITE_RTE_API=
```

These values connect the frontend to your Appwrite project,
database/table, storage bucket, and rich-text editor configuration.

> Never commit real credentials or private API secrets to Git.

## 4. Start development server

``` bash
npm run dev
```

The Vite development server will provide the local application URL.

------------------------------------------------------------------------

# 🏭 Production Build

Build the application:

``` bash
npm run build
```

Preview the production build:

``` bash
npm run preview
```

Run ESLint:

``` bash
npm run lint
```

------------------------------------------------------------------------

# ☁️ Appwrite Setup

To run the application against your own Appwrite project, configure:

### 1. Appwrite Project

Create an Appwrite project.

### 2. Authentication

Enable:

``` text
Email/Password
Google OAuth
```

Configure your web platform/domain in Appwrite.

### 3. Database

Create the database and table used by the application.

The post table should support the fields used by the frontend:

``` text
title
content
status
slug
userid
image
```

### 4. Storage

Create a storage bucket for blog images.

The frontend uploads files using:

``` text
Storage.createFile()
```

### 5. Permissions

Configure Appwrite permissions appropriately for:

-   Reading published posts
-   Creating posts
-   Updating owned posts
-   Deleting owned posts
-   Uploading images
-   Deleting owned images

------------------------------------------------------------------------

# 🔄 Complete Application Flow

The complete application can be understood as:

``` text
                         BLOG APPLICATION
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
          Authentication      Content           UI
              │                 │                 │
              ▼                 ▼                 ▼
          Appwrite          Blog Posts       Tailwind CSS
          Account              │                 │
              │                │                 │
       ┌──────┴──────┐         │                 │
       ▼             ▼         ▼                 ▼
    Email          Google   TablesDB          Responsive
    Login          OAuth       │               Layout
       │                       │
       ▼                       ▼
    Redux Auth              Post Data
                                │
                     ┌──────────┴──────────┐
                     ▼                     ▼
                  Images                Content
                     │                     │
                     ▼                     ▼
              Appwrite Storage          TinyMCE
                     │                     │
                     └──────────┬──────────┘
                                ▼
                           React UI
```

------------------------------------------------------------------------

# 🔒 Security Considerations

The project follows several good frontend practices:

-   Authentication is delegated to Appwrite.
-   Private pages are protected by an authentication route.
-   Sensitive configuration is supplied through Vite environment
    variables.
-   Authentication state is centralized in Redux.
-   Appwrite permissions should be used as the authoritative
    access-control layer.
-   User-controlled rich HTML should be handled carefully and sanitized
    appropriately if the backend/editor configuration permits untrusted
    HTML.

> Environment variables prefixed with `VITE_` are exposed to the client
> bundle. They must therefore **never contain server-only secrets**.

------------------------------------------------------------------------

# 🚀 Deployment

The project includes Vercel configuration:

``` text
vercel.json
```

A typical deployment flow is:

``` text
GitHub
   │
   ▼
Vercel
   │
   ▼
npm run build
   │
   ▼
Vite production build
   │
   ▼
React Application
   │
   ▼
Appwrite
```

Remember to configure the same `VITE_*` environment variables in the
Vercel project settings.

Also configure the deployed domain in Appwrite's web platform and OAuth
settings.

------------------------------------------------------------------------

# 🧪 Development Commands

``` bash
# Install
npm install

# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

------------------------------------------------------------------------

# 📌 Current Scope

The application currently focuses on the core blogging experience:

-   User authentication
-   Google OAuth
-   Blog creation
-   Rich-text content
-   Multiple image uploads
-   Image carousel
-   Blog editing
-   Blog deletion
-   User-specific post listing
-   Active/public post listing
-   Individual post viewing
-   Protected routes
-   Responsive UI
-   Appwrite database integration
-   Appwrite storage integration
-   Redux authentication state

------------------------------------------------------------------------

# 🔮 Potential Future Improvements

The current architecture provides a strong foundation for additional
features such as:

-   Comments
-   Likes
-   Bookmarks
-   User profiles
-   Categories
-   Tags
-   Search
-   Pagination / infinite scrolling
-   Post analytics
-   Draft autosave
-   Markdown support
-   Image compression before upload
-   Drag-and-drop image uploads
-   Richer author profiles
-   Admin dashboard
-   Notifications
-   Reading-time calculation
-   Social sharing
-   SEO metadata
-   Server-side rendering or static generation
-   Progressive Web App support

------------------------------------------------------------------------

# 🎯 What This Project Demonstrates

This project demonstrates practical frontend engineering concepts rather
than only basic React syntax.

It brings together:

``` text
React
  +
Component Architecture
  +
Routing
  +
Protected Routes
  +
Authentication
  +
OAuth
  +
Redux State Management
  +
Form Management
  +
File Uploads
  +
Cloud Storage
  +
Database Operations
  +
Rich Text
  +
Responsive Design
  +
Reusable Components
```

It is therefore a useful example of building a complete client-side
application around a Backend-as-a-Service platform.

------------------------------------------------------------------------

## 👨‍💻 Author

**Muhammad Kamran**

Built as a practical React + Appwrite blogging application to explore
modern frontend architecture, authentication, state management, cloud
storage, rich-text editing, responsive UI, and CRUD-based application
development.
