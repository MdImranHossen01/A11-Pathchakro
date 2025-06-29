import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router'; 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axiosSecure from '../../api/axios.config';
import Swal from 'sweetalert2'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateAssignment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [dueDate, setDueDate] = useState(new Date());

    
    // 1. Fetch the assignment data to pre-fill the form
    const { data: assignment, isLoading, isError } = useQuery({
        queryKey: ['assignment', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/api/assignments/${id}`);
            return data;
        },
    });

    // 2. Pre-fill the form once the data is loaded
    useEffect(() => {
        if (assignment) {
            reset(assignment);
            setDueDate(new Date(assignment.dueDate));
        }
    }, [assignment, reset]);

    // 3. Set up the mutation to send the updated data
    const mutation = useMutation({
        mutationFn: (updatedData) => {
            return axiosSecure.put(`/api/assignments/${id}`, updatedData);
        },
        // ✅ Changed from toast to SweetAlert for success
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assignments'] });
            Swal.fire({
                title: 'Updated!',
                text: 'The assignment has been updated successfully.',
                icon: 'success',
                confirmButtonText: 'Cool'
            }).then(() => {
                navigate('/assignments'); // Navigate after user clicks OK
            });
        },
        // ✅ Changed from toast to SweetAlert for error
        onError: (err) => {
            Swal.fire({
                title: 'Update Failed!',
                text: err.response?.data?.message || 'Something went wrong.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    const onSubmit = (data) => {
        const updatedAssignmentData = { ...data, dueDate, marks: parseInt(data.marks) };
        mutation.mutate(updatedAssignmentData);
    };

    if (isLoading) {
        return <div className="text-center my-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }
    
    if (isError) {
        return <div className="text-center my-10 text-red-500">Error loading assignment data.</div>;
    }

    return (
        <div className="p-8 bg-base-200 rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Update Assignment</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-4xl mx-auto">
                <div className="form-control">
                    <label className="label"><span className="label-text">Title</span></label>
                    <input type="text" {...register("title", { required: true })} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label"><span className="label-text">Description</span></label>
                    <textarea {...register("description", { required: true, minLength: 20 })} className="textarea textarea-bordered h-24" />
                    {errors.description && <span className="text-error text-xs">Description must be at least 20 characters.</span>}
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
                    {mutation.isLoading ? <span className="loading loading-spinner"></span> : 'Update Assignment'}
                </button>
            </form>
        </div>
    );
};

export default UpdateAssignment;