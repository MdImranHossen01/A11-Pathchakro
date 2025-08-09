import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../api/axios.config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { FaPlus, FaCalendarAlt, FaImage, FaTrophy, FaBook, FaLink, FaSave } from 'react-icons/fa';

const CreateAssignment = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [dueDate, setDueDate] = useState(new Date());
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (newAssignment) => {
            return axiosSecure.post('/api/assignments', newAssignment);
        },
        onSuccess: () => {
            toast.success('Assignment created successfully!');
            queryClient.invalidateQueries({ queryKey: ['assignments'] });
            navigate('/assignments');
        },
        onError: (error) => {
            toast.error(`Failed to create assignment: ${error.message}`);
        }
    });

    const handleThumbnailChange = (e) => {
        const url = e.target.value;
        setThumbnailPreview(url);
    };

    const onSubmit = data => {
        const assignmentData = {
            ...data,
            marks: parseInt(data.marks),
            dueDate,
            creatorEmail: user.email,
        };
        mutation.mutate(assignmentData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">Create New Assignment</h1>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Create engaging assignments for your students with clear instructions and deadlines
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center mb-6">
                                <div className="bg-primary/10 p-3 rounded-full mr-4">
                                    <FaPlus className="text-primary text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Assignment Details</h2>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <FaBook className="inline mr-2 text-gray-500" /> Assignment Title
                                    </label>
                                    <input
                                        type="text"
                                        {...register("title", { required: "Title is required" })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="Enter assignment title"
                                    />
                                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        {...register("description", { 
                                            required: "Description is required",
                                            minLength: {
                                                value: 20,
                                                message: "Description must be at least 20 characters long"
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-32"
                                        placeholder="Provide detailed instructions for this assignment..."
                                    />
                                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                                </div>

                                {/* Marks and Thumbnail */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaTrophy className="inline mr-2 text-gray-500" /> Total Marks
                                        </label>
                                        <input
                                            type="number"
                                            {...register("marks", { 
                                                required: "Marks are required",
                                                min: {
                                                    value: 1,
                                                    message: "Marks must be at least 1"
                                                }
                                            })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="100"
                                        />
                                        {errors.marks && <p className="text-red-500 text-sm mt-1">{errors.marks.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaImage className="inline mr-2 text-gray-500" /> Thumbnail URL
                                        </label>
                                        <input
                                            type="url"
                                            {...register("thumbnailURL", { 
                                                required: "Thumbnail URL is required",
                                                pattern: {
                                                    value: /^https?:\/\/.+/,
                                                    message: "Please enter a valid URL"
                                                }
                                            })}
                                            onChange={handleThumbnailChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {errors.thumbnailURL && <p className="text-red-500 text-sm mt-1">{errors.thumbnailURL.message}</p>}
                                    </div>
                                </div>

                                {/* Difficulty and Due Date */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Difficulty Level
                                        </label>
                                        <select
                                            {...register("difficulty", { required: "Difficulty is required" })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        >
                                            <option value="">Select difficulty</option>
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                        {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <FaCalendarAlt className="inline mr-2 text-gray-500" /> Due Date
                                        </label>
                                        <DatePicker
                                            selected={dueDate}
                                            onChange={(date) => setDueDate(date)}
                                            minDate={new Date()}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            placeholderText="Select due date and time"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={mutation.isLoading}
                                    className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50"
                                >
                                    {mutation.isLoading ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm mr-2"></span>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave className="mr-2" /> Create Assignment
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Preview */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Assignment Preview</h3>
                            
                            {/* Thumbnail Preview */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Preview</label>
                                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                    {thumbnailPreview ? (
                                        <img 
                                            src={thumbnailPreview} 
                                            alt="Thumbnail preview" 
                                            className="w-full h-full object-cover"
                                            onError={() => setThumbnailPreview('')}
                                        />
                                    ) : (
                                        <div className="text-center text-gray-500">
                                            <FaImage className="text-4xl mx-auto mb-2" />
                                            <p>Thumbnail preview will appear here</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Assignment Info Preview */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Title</h4>
                                    <p className="text-gray-800 font-medium">Enter a title above</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Due Date</h4>
                                    <p className="text-gray-800 font-medium">
                                        {dueDate.toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Created By</h4>
                                    <p className="text-gray-800 font-medium">{user?.email}</p>
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                                <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Tips for creating great assignments</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• Use clear and concise titles</li>
                                    <li>• Provide detailed instructions</li>
                                    <li>• Set realistic deadlines</li>
                                    <li>• Choose appropriate difficulty levels</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignment;