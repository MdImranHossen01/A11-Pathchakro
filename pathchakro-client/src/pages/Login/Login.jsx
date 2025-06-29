import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                toast.success('Login successful!');
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to log in. Please check your credentials.");
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                toast.success('Google login successful!');
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.error(err);
                toast.error("Google login failed.");
            });
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <h1 className="text-3xl font-bold text-center">Login Now!</h1>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" {...register("email", { required: true })} className="input input-bordered" />
                        {errors.email && <span className="text-error text-xs">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password", { required: true })} className="input input-bordered" />
                        {errors.password && <span className="text-error text-xs">Password is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                    <p className="text-center mt-4">New here? <Link to="/register" className="link link-primary">Register an account</Link></p>
                    <div className="divider">OR</div>
                    <button type="button" onClick={handleGoogleLogin} className="btn btn-outline w-full">Continue with Google</button>
                </form>
            </div>
        </div>
    );
};

export default Login;