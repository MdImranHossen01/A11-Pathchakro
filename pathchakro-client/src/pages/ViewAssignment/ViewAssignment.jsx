import React from 'react';
import { useParams } from 'react-router-dom'; // ✅ Corrected import
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../api/axios.config';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ViewAssignment = () => {
    const { id } = useParams(); // Get assignment ID from the URL
    const { user } = useAuth();
    const queryClient = useQueryClient();

    // Fetch the specific assignment details
    const { data: assignment, isLoading, isError, error } = useQuery({
        queryKey: ['assignment', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/api/assignments/${id}`);
            return data;
        },
    });

    // Mutation for submitting the assignment
    const mutation = useMutation({
        mutationFn: (submissionData) => {
            return axiosSecure.post('/api/submissions', submissionData);
        },
        onSuccess: () => {
            toast.success("Assignment submitted successfully!");
            document.getElementById('submission_modal').close();
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Submission failed.");
        }
    });

    const handleSubmission = (e) => {
        e.preventDefault();
        const form = e.target;
        const googleDocsLink = form.link.value;
        const quickNote = form.note.value;

        if (!user || !assignment) {
            toast.error("Cannot submit, user or assignment data is missing.");
            return;
        }

        const submissionData = {
            assignmentId: assignment._id,
            assignmentTitle: assignment.title,
            assignmentMarks: assignment.marks,
            studentEmail: user.email,
            examineeName: user.displayName,
            status: 'pending', // Default status
            googleDocsLink,
            quickNote,
        };

        mutation.mutate(submissionData);
    };

    if (isLoading) {
        return <div className="text-center my-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (isError) {
        return <div className="text-center my-10 text-red-500">Error: {error.message}</div>;
    }
    
    if (!assignment) {
        return <div className="text-center my-10">Assignment not found.</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="card bg-base-100 shadow-xl">
                <figure><img src={assignment.thumbnailURL} alt={assignment.title} className="w-full h-96 object-cover" /></figure>
                <div className="card-body">
                    <h1 className="card-title text-4xl font-bold">{assignment.title}</h1>
                    <div className="badge badge-primary">{assignment.difficulty}</div>
                    <p className="mt-4 text-lg">{assignment.description}</p>
                    <div className="divider"></div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Total Marks: {assignment.marks}</p>
                        <p className="font-semibold">Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="card-actions justify-end mt-6">
                        <button className="btn btn-primary" onClick={() => document.getElementById('submission_modal').showModal()}>
                            Take Assignment
                        </button>
                    </div>
                </div>
            </div>

            {/* Submission Modal */}
            <dialog id="submission_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Submit Your Work</h3>
                    <p className="py-4">Provide the Google Docs link to your assignment and a quick note for the examiner.</p>
                    <form onSubmit={handleSubmission}>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Google Docs Link</span></label>
                            <input type="url" name="link" placeholder="https://docs.google.com/..." className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label"><span className="label-text">Quick Note</span></label>
                            <textarea name="note" className="textarea textarea-bordered" placeholder="Add any notes for your examiner here..."></textarea>
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary" disabled={mutation.isLoading}>
                                {mutation.isLoading ? 'Submitting...' : 'Submit Assignment'}
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default ViewAssignment;