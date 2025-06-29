import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import axiosSecure from '../../api/axios.config';

const MyAttemptedAssignments = () => {
    const { user } = useAuth();

    const { data: attemptedAssignments = [], isLoading, isError, error } = useQuery({
        // The query key is unique to this user's email
        queryKey: ['my-assignments', user?.email],
        // Only run the query if the user's email is available
        enabled: !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/api/submissions/my-submissions`);
            return data;
        },
    });

    if (isLoading) {
        return <div className="text-center my-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (isError) {
        return <div className="text-center my-10 text-red-500">Error loading your assignments: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">My Attempted Assignments</h1>
            {attemptedAssignments.length === 0 ? (
                <p className="text-center text-lg">You have not submitted any assignments yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Assignment Title</th>
                                <th>Total Marks</th>
                                <th>Status</th>
                                <th>Marks Obtained</th>
                                <th>Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attemptedAssignments.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.assignmentTitle}</td>
                                    <td>{item.assignmentMarks}</td>
                                    <td>
                                        <span className={`badge ${item.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>{item.obtainedMarks || 'Not graded'}</td>
                                    <td>{item.feedback || 'No feedback yet'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyAttemptedAssignments;