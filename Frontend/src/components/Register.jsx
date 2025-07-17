import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { toast } from 'react-hot-toast'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Investor') // Default role
    const [error, setError] = useState(null)
    const { registerUser } = useUserContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const user = await registerUser(name, email, password, role);
        if (!user.success) {
            setError(user.message);
            toast.error(user.message || 'User already exists');
        } else {
            setError('');
            toast.success(user.message || 'User created. Please complete your profile');
            // Redirect based on role
            if (role === "Advisor") {
                navigate('/advisor/register');
            } else if (role === "Entrepreneur") {
                navigate('/entrepreneur/register');
            } else if (role === "Investor") {
                navigate('/investor/register');
            } else {
                navigate('/dashboard'); // or wherever you want for generic users
            }
        }
    } catch (error) {
        setError('An unexpected error occurred. Please try again.');
    }
}


    return (
        <div className='flex items-center justify-center mt-10'>
            <form onSubmit={handleSubmit} className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

                <input id="name" className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="text" placeholder="Name" name='name' value={name} onChange={e => setName(e.target.value)} required />

                <input id="email" className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3" type="email" placeholder="Email" name='email' value={email} onChange={e => setEmail(e.target.value)} required />

                <input id="password" className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3" type="password" placeholder="Password" name='password' value={password} onChange={e => setPassword(e.target.value)} required />

                {/* Role selection */}
                <label htmlFor="role" className="block mb-1 font-medium text-gray-700">Register as:</label>
                <select
                    id="role"
                    name="role"
                    className="w-full border mb-5 bg-indigo-500/5 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    required
                >
                    <option value="Investor">Investor</option>
                    <option value="Entrepreneur">Entrepreneur</option>
                    <option value="Banker">Banker</option>
                    <option value="Advisor">Advisor</option>
                    <option value="User">User</option>
                </select>

                {error && <div className="text-red-500 mb-3">{error}</div>}

                <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">Create Account</button>

                <Link to='/signup'>
                    <p className="text-center mt-4">Already have an account? Log In</p>
                </Link>
            </form>
        </div>
    )
}

export default Register
