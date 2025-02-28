import { useEffect } from 'react'
import { Navigate, Routes } from 'react-router-dom'
import useWorker from '@zeus/@hooks/useWorker'

export function Logout() {
  const { logout } = useWorker()

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
