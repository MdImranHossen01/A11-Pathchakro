import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, handleUpdateProfile } = useAuth();
    const navigate = useNavigate();

    const onSubmit = data => {
        if (data.password !== data.confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        createUser(data.email, data.password)
            .then(() => {
                handleUpdateProfile(data.name, data.photoURL)
                    .then(() => {
                        toast.success('Registration successful!');
                        navigate('/');
                    })
                    .catch(err => toast.error(err.message));
            })
            .catch(err => toast.error(err.message));
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <h1 className="text-3xl font-bold text-center">Register Now!</h1>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" {...register("name", { required: true })} className="input input-bordered" />
                        {errors.name && <span className="text-error">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Photo URL</span></label>
                        <input type="url" {...register("photoURL", { required: true })} className="input input-bordered" />
                        {errors.photoURL && <span className="text-error">Photo URL is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" {...register("email", { required: true })} className="input input-bordered" />
                        {errors.email && <span className="text-error">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" {...register("password", { 
                            required: true, 
                            minLength: 6, 
                            pattern: /(?=.*[A-Z])(?=.*[a-z])/ 
                        })} className="input input-bordered" />
                        {errors.password?.type === 'required' && <span className="text-error">Password is required</span>}
                        {errors.password?.type === 'minLength' && <span className="text-error">Password must be at least 6 characters</span>}
                        {errors.password?.type === 'pattern' && <span className="text-error">Password must have one uppercase and one lowercase letter</span>}
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Confirm Password</span></label>
                        <input type="password" {...register("confirmPassword", { required: true })} className="input input-bordered" />
                        {errors.confirmPassword && <span className="text-error">Please confirm your password</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                    <p className="text-center mt-4">Already have an account? <Link to="/login" className="link link-primary">Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;