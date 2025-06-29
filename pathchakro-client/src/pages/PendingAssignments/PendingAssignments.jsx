import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../api/axios.config';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const PendingAssignments = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [selectedSubmission, setSelectedSubmission] = useState(null);

    // Fetch all pending assignments
    const { data: pendingAssignments = [], isLoading, isError, error } = useQuery({
        queryKey: ['pending-assignments'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/api/submissions/pending');
            return data;
        },
    });

    const mutation = useMutation({
        mutationFn: ({ submissionId, marks, feedback }) => {
            return axiosSecure.patch(`/api/submissions/${submissionId}/grade`, { marks, feedback });
        },
        onSuccess: () => {
            toast.success("Assignment marked successfully!");
            queryClient.invalidateQueries({ queryKey: ['pending-assignments'] });
            document.getElementById('grading_modal').close();
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to mark assignment.");
        }
    });

    const handleGradeSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const marks = form.marks.value;
        const feedback = form.feedback.value;

        if (marks > selectedSubmission.assignmentMarks) {
            return toast.error(`Marks cannot exceed the total marks of ${selectedSubmission.assignmentMarks}.`);
        }
        mutation.mutate({ submissionId: selectedSubmission._id, marks, feedback });
    };

    const openGradingModal = (submission) => {
        setSelectedSubmission(submission);
        document.getElementById('grading_modal').showModal();
    };

    if (isLoading) {
        return <div className="text-center my-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (isError) {
        return <div className="text-center my-10 text-red-500">Error: {error.message}</div>;
    }

    // Filter out assignments submitted by the current user
    const assignmentsToGrade = pendingAssignments.filter(sub => sub.studentEmail !== user?.email);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Pending Assignments</h1>
            
            {assignmentsToGrade.length === 0 ? (
                <p className="text-center text-lg">There are no pending assignments to grade at this time.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Assignment Title</th>
                                <th>Examinee Name</th>
                                <th>Total Marks</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignmentsToGrade.map((submission) => (
                                <tr key={submission._id}>
                                    <td>{submission.assignmentTitle}</td>
                                    <td>{submission.examineeName}</td>
                                    <td>{submission.assignmentMarks}</td>
                                    <td>
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => openGradingModal(submission)}
                                        >
                                            Give Mark
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Grading Modal */}
            <dialog id="grading_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Grade Assignment</h3>
                    <div className="py-4 space-y-2">
                        <p><strong>Submitted Link:</strong> <a href={selectedSubmission?.googleDocsLink} target="_blank" rel="noopener noreferrer" className="link link-primary">View Document</a></p>
                        <p><strong>Examinee Note:</strong> {selectedSubmission?.quickNote}</p>
                    </div>
                    <form onSubmit={handleGradeSubmit}>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Marks</span></label>
                            <input type="number" name="marks" max={selectedSubmission?.assignmentMarks} className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label"><span className="label-text">Feedback</span></label>
                            <textarea name="feedback" className="textarea textarea-bordered" required></textarea>
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary" disabled={mutation.isLoading}>
                                {mutation.isLoading ? 'Submitting...' : 'Submit Mark'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default PendingAssignments;