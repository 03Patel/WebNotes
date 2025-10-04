import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate ,Link} from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [err, setErr] = useState('');
    const nav = useNavigate();

    async function submit(e) {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', form);
            localStorage.setItem('token', res.data.token);
            nav('/dashboard');
        } catch (err) {
            setErr(err.response?.data?.message || 'Error');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">Login</h2>

                <form onSubmit={submit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
                    >
                        Log in
                    </button>
                     <p className='ml-20'>New User     <Link to="/signup" className=" ml-10 bg-indigo-500 text-white text-center px-6 py-2 rounded hover:bg-indigo-600 transition">Sign Up  </Link></p>
                   
                    {err && <p className="text-red-500 text-sm mt-2">{err}</p>}
                </form>
            </div>
        </div>
    );
}
