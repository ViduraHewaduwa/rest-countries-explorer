# Wander World - Countries Explorer

A modern, interactive web application for exploring countries around the world with advanced features including user authentication, favorites management, and detailed country information.

## 🌟 website Link (Hosted on netlify)
https://dashing-piroshki-b06794.netlify.app/
## 🌟 Features

- **Country Exploration**: Browse and search countries worldwide
- **Detailed Information**: View comprehensive details about each country
- **Regional Filtering**: Filter countries by region
- **User Authentication**: Secure login and registration system
- **Favorites Management**: Save and manage your favorite countries
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Modern cyberpunk-inspired dark theme

## 🚀 Tech Stack

### Frontend
- React 18
- Material-UI (MUI)
- React Router v6
- Axios for API calls
- Vite as build tool
- Jest and React Testing Library for testing

### Backend
- Django
- Django REST Framework
- Simple JWT for authentication
- SQLite database

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- Git

## 🛠️ Installation

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rest-countries-explorer.git
cd rest-countries-explorer
```

2. Install frontend dependencies:
```bash
cd rest-countries-explorer
npm install
```

3. Create a `.env` file in the frontend root directory with:
```
VITE_API_BASE_URL=http://localhost:8000
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv env
# On Windows:
.\env\Scripts\activate
# On Unix or MacOS:
source env/bin/activate
```

3. Install backend dependencies:
```bash
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt
```

4. Apply database migrations:
```bash
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

## 🚀 Running the Application

### Start the Backend Server

1. Ensure you're in the backend directory with the virtual environment activated
2. Run:
```bash
python manage.py runserver
```
The backend will start at http://localhost:8000

### Start the Frontend Development Server

1. In a new terminal, navigate to the frontend directory
2. Run:
```bash
npm run dev
```
The frontend will start at http://localhost:5173

## 🔨 API Integration

### REST Countries API
- Base URL: https://restcountries.com/v3.1
- Used for fetching country data
- Endpoints used:
  - `/all` - Get all countries
  - `/name/{name}` - Search countries by name
  - `/alpha/{code}` - Get country by code
  - `/region/{region}` - Filter countries by region

### Backend API Endpoints

#### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/token/refresh/` - Refresh access token

#### User Profile
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/` - Update user profile

## 🧪 Testing

### Frontend Tests
Run the frontend tests with:
```bash
npm test
```

### Backend Tests
Run the backend tests with:
```bash
python manage.py test
```

## 🚧 Challenges and Solutions

1. **JWT Token Management**
   - Challenge: Handling token refresh and expired tokens
   - Solution: Implemented an axios interceptor and auth context for automatic token refresh

2. **Country Data Caching**
   - Challenge: Reducing API calls to REST Countries
   - Solution: Implemented client-side caching using React Query

3. **State Management**
   - Challenge: Managing global state for user preferences and favorites
   - Solution: Used React Context API with custom hooks for state management

4. **API Rate Limiting**
   - Challenge: REST Countries API rate limiting
   - Solution: Implemented request throttling and error handling

5. **Testing Challenges**
   - Challenge: Mocking authentication and API responses
   - Solution: Created comprehensive test utilities and mock implementations



