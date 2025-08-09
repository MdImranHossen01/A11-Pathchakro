import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../api/axios.config';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const Assignments = () => {
    const { user } = useAuth();
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const queryClient = useQueryClient();

    const { data: assignments = [], isLoading, isError, error } = useQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/api/assignments');
            return data;
        }
    });

    const mutation = useMutation({
        mutationFn: (id) => {
            return axiosSecure.delete(`/api/assignments/${id}`);
        },
        onSuccess: () => {
            Swal.fire(
                'Deleted!',
                'Your assignment has been successfully deleted.',
                'success'
            );
            queryClient.invalidateQueries({ queryKey: ['assignments'] });
        },
        onError: (error) => {
            Swal.fire(
                'Action Failed!',
                error.response?.data?.message || 'You cannot delete this assignment.',
                'error'
            );
        }
    });

    const handleDelete = (assignment) => {
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

    // Filter, search, and sort assignments
    const filteredAssignments = assignments
        .filter(assignment => {
            // Apply difficulty filter
            if (difficultyFilter && assignment.difficulty !== difficultyFilter) {
                return false;
            }
            // Apply search query filter
            if (searchQuery) {
                const searchLower = searchQuery.toLowerCase();
                return (
                    assignment.title.toLowerCase().includes(searchLower) ||
                    assignment.description.toLowerCase().includes(searchLower)
                );
            }
            return true;
        })
        .sort((a, b) => {
            // Apply sorting
            switch (sortOption) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'marks-high':
                    return b.marks - a.marks;
                case 'marks-low':
                    return a.marks - b.marks;
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

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
                
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
                    {/* Search Input */}
                    <div className="form-control w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search assignments..."
                            className="input input-bordered w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Difficulty Filter */}
                    <div className="form-control w-full max-w-xs">
                        <select
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            value={difficultyFilter}
                            className="select select-bordered"
                        >
                            <option value="">All Difficulties</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    {/* Sort Options */}
                    <div className="form-control w-full max-w-xs">
                        <select
                            onChange={(e) => setSortOption(e.target.value)}
                            value={sortOption}
                            className="select select-bordered"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="marks-high">Highest Marks</option>
                            <option value="marks-low">Lowest Marks</option>
                            <option value="title-asc">Title (A-Z)</option>
                            <option value="title-desc">Title (Z-A)</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredAssignments.length === 0 ? (
                <div className="text-center my-10">
                    <p className="text-xl">No assignments found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredAssignments.map(assignment => (
                        <div key={assignment._id} className="card bg-base-100 shadow-xl">
                            <figure><img src={assignment.thumbnailURL} alt={assignment.title} className="h-56 w-full object-cover" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{assignment.title}</h2>
                                {/* <p>{assignment.description.substring(0, 100)}...</p> */}
                                <p>Marks: {assignment.marks}</p>
                                <div className="badge badge-secondary">{assignment.difficulty}</div>
                                <div className="card-actions justify-end mt-2">
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
            )}
        </div>
    );
};

export default Assignments;