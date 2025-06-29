import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../api/axios.config'; // ✅ Use the configured secure axios
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router'; // ✅ Correct import from react-router-dom

const CreateAssignment = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [dueDate, setDueDate] = useState(new Date());
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newAssignment) => {
            // ✅ Use axiosSecure to make the request
            return axiosSecure.post('/api/assignments', newAssignment);
        },
        onSuccess: () => {
            toast.success('Assignment created successfully!');
            // Invalidate queries to make sure the assignments list updates
            queryClient.invalidateQueries({ queryKey: ['assignments'] });
            navigate('/assignments');
        },
        onError: (error) => {
            toast.error(`Failed to create assignment: ${error.message}`);
        }
    });

    const onSubmit = data => {
        const assignmentData = {
            ...data,
            marks: parseInt(data.marks), // Ensure marks are stored as a number
            dueDate,
            creatorEmail: user.email,
        };
        mutation.mutate(assignmentData);
    };

    return (
        <div className="p-8 bg-base-200 rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Create New Assignment</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-4xl mx-auto">
                <div className="form-control">
                    <label className="label"><span className="label-text">Title</span></label>
                    <input type="text" {...register("title", { required: true })} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text">Description</span></label>
                    <textarea {...register("description", { required: true, minLength: 20 })} className="textarea textarea-bordered h-24"></textarea>
                    {errors.description && <span className="text-error text-xs">Description must be at least 20 characters long.</span>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Marks</span></label>
                        <input type="number" {...register("marks", { required: true })} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Thumbnail Image URL</span></label>
                        <input type="url" {...register("thumbnailURL", { required: true })} className="input input-bordered" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Difficulty</span></label>
                        <select {...register("difficulty", { required: true })} className="select select-bordered">
                            <option value="" disabled>Select Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Due Date</span></label>
                        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} className="input input-bordered w-full" />
                    </div>
                </div>
                <button type="submit" disabled={mutation.isLoading} className="btn btn-primary w-full mt-6">
                    {mutation.isLoading ? 'Creating...' : 'Create Assignment'}
                </button>
            </form>
        </div>
    );
};

export default CreateAssignment;