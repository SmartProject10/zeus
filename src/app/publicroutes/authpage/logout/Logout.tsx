import { useEffect } from 'react'
import { Navigate, Routes } from 'react-router-dom'
import { useEmployee } from '@zeus/app/EmployeeContext'

export function Logout() {
  const { logout } = useEmployee()

  useEffect(() => {
    logout()
    document.location.reload()
  }, [logout])

  return (
    <Routes>
      <Navigate to="/auth/login" />
    </Routes>
  )
}
