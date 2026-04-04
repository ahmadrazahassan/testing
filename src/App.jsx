import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layouts/Layout.jsx'
import About from './components/pages/About.jsx'
import Contact from './components/pages/Contact.jsx'
import HomePage from './components/pages/HomePage.jsx'
import PageNotFound from './components/pages/PageNotFound.jsx'
import SignIn from './components/pages/SignIn.jsx'
import SignUp from './components/pages/SignUp.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="auth/login" element={<SignIn />} />
        <Route path="auth/register" element={<SignUp />} />
        <Route path="sign-in" element={<Navigate to="/signin" replace />} />
        <Route path="sign-up" element={<Navigate to="/signup" replace />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  )
}
