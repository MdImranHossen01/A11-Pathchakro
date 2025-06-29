import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../api/axios.config';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';


const Assignments = () => {
    const { user } = useAuth();
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const queryClient = useQueryClient();

    const { data: assignments = [], isLoading, isError, error } = useQuery({
        queryKey: ['assignments', difficultyFilter],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/api/assignments?difficulty=${difficultyFilter}`);
            return data;
        }
    });

    const mutation = useMutation({
        mutationFn: (id) => {
            return axiosSecure.delete(`/api/assignments/${id}`);
        },
        // ✅ Changed from toast to SweetAlert for the success message
        onSuccess: () => {
            Swal.fire(
                'Deleted!',
                'Your assignment has been successfully deleted.',
                'success'
            );
            queryClient.invalidateQueries({ queryKey: ['assignments'] });
        },
        // ✅ Changed from toast to SweetAlert for the error message
        onError: (error) => {
            Swal.fire(
                'Action Failed!',
                error.response?.data?.message || 'You cannot delete this assignment.',
                'error'
            );
        }
    });

    const handleDelete = (assignment) => {
        // This initial confirmation pop-up remains the same
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(assignment._id);
            }
        });
    };

    if (isLoading) {
        return <div className="text-center my-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (isError) {
        return <div className="text-center my-10 text-red-500">Error loading assignments: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold">All Assignments</h1>
                <div className="form-control w-full max-w-xs mx-auto mt-4">
                    <label className="label"><span className="label-text">Filter by Difficulty</span></label>
                    <select onChange={(e) => setDifficultyFilter(e.target.value)} value={difficultyFilter} className="select select-bordered">
                        <option value="">All</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignments.map(assignment => (
                    <div key={assignment._id} className="card bg-base-100 shadow-xl">
                        <figure><img src={assignment.thumbnailURL} alt={assignment.title} className="h-56 w-full object-cover" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{assignment.title}</h2>
                            <p>Marks: {assignment.marks}</p>
                            <div className="badge badge-secondary">{assignment.difficulty}</div>
                            <div className="card-actions justify-end">
                                <Link to={`/assignment/${assignment._id}`} className="btn btn-outline btn-sm">View</Link>
                                {user?.email === assignment.creatorEmail && (
                                    <>
                                        <Link to={`/update-assignment/${assignment._id}`} className="btn btn-outline btn-sm btn-info">Update</Link>
                                        <button onClick={() => handleDelete(assignment)} className="btn btn-outline btn-sm btn-error">Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Assignments;