import React, { useState } from 'react';
import './Login.css'; // Assuming external styling in a CSS file.

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<{ email: string; password: string }>({ email: '', password: '' });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setError((prev) => ({
            ...prev,
            email: value.includes('@') ? '' : 'Please enter a valid email address.',
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setError((prev) => ({
            ...prev,
            password: value.length >= 6 ? '' : 'Password must be at least 6 characters.',
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!error.email && !error.password) {
            console.log('Email:', email);
            console.log('Password:', password);
            // Implement your login logic here
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        aria-label="Email Address"
                        className={error.email ? 'input-error' : ''}
                    />
                    {error.email && <span className="error-text">{error.email}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        aria-label="Password"
                        className={error.password ? 'input-error' : ''}
                    />
                    {error.password && <span className="error-text">{error.password}</span>}
                </div>
                <button type="submit" disabled={!!error.email || !!error.password}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
