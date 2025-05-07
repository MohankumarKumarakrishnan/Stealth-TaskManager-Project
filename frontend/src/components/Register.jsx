import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl" />
          <button className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">Register</button>
        </form>
        <p className="text-center mt-4 text-sm">Already have an account? <Link to="/" className="text-green-600">Login</Link></p>
      </div>
    </div>
  )
}

export default Register
