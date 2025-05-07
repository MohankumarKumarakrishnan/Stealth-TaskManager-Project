import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4">
          <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-xl" />
          <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">Login</button>
        </form>
        <p className="text-center mt-4 text-sm">Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></p>
      </div>
    </div>
  )
}

export default Login
