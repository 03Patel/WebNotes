import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [err, setErr] = useState('');
    const nav = useNavigate();

    async function submit(e) {
        e.preventDefault();
        try {
            const res = await API.post('/auth/register', form);
            localStorage.setItem('token', res.data.token);
            nav('/dashboard');
        } catch (err) {
            setErr(err.response?.data?.message || 'Error');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">Sign Up</h2>

                <form onSubmit={submit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />

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
                        Sign Up
                    </button>
                    {/* <p>Already have  account <Link ></Link></p> */}
                    <p className='ml-10'>Already Account:   <Link to="/login" className="bg-indigo-500 text-white text-center px-6 py-2 rounded hover:bg-indigo-600 transition" >Log In </Link></p>
                    {err && <p className="text-red-500 text-sm mt-2">{err}</p>}
                </form>
            </div>
        </div>
    );
}
