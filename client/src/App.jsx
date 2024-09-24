import React, { memo, useState } from 'react'
import { useTheme } from './context/ThemeContext'
import NotFound from './pages/NotFound'
import User from './pages/User'
import Group from './pages/Group'
import Forum from './pages/Forum'
import Login from './pages/Login'
import Register from './pages/Register'
import Api from './pages/Api'
import ApiDetails from './pages/ApiDetails'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectRoute from './components/ProtectRoute'
import "bootstrap/dist/css/bootstrap.min.css"

const App = () => {
  const { themeState } = useTheme()

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<ProtectRoute><Layout /></ProtectRoute>}>
          <Route path="/" element={<Navigate to="/api" />} />
          <Route path="api" element={<Api />} />
          <Route path="api/:id" element={<ApiDetails />} />
          <Route path="user" element={<User />} />
          <Route path="group" element={<Group />} />
          <Route path="forum" element={<Forum />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
