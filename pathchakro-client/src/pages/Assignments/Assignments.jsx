import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosSecure from '../../api/axios.config';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Assignments = () => {
    const { user } = useAuth();
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const queryClient = useQueryClient();

    const { data: assignments = [], isLoading, isError, error } = useQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/api/assignments');
            return data;
        }
    });

    // Assignment Statistics - Calculate locally since we don't have stats endpoint yet
    const assignmentStats = React.useMemo(() => {
        const totalAssignments = assignments.length;
        const byDifficulty = {
            easy: assignments.filter(a => a.difficulty === 'easy').length,
            medium: assignments.filter(a => a.difficulty === 'medium').length,
            hard: assignments.filter(a => a.difficulty === 'hard').length
        };
        return { totalAssignments, byDifficulty };
    }, [assignments]);

    // Bookmarks
    const { data: bookmarks = [] } = useQuery({
        queryKey: ['bookmarks', user?.email],
        queryFn: async () => {
            if (!user) return [];
            try {
                const { data } = await axiosSecure.get(`/api/bookmarks?userEmail=${user.email}`);
                return data;
            } catch (error) {
                return [];
            }
        },
        enabled: !!user
    });

    const toggleBookmark = useMutation({
        mutationFn: async (assignmentId) => {
            const isBookmarked = bookmarks.some(bookmark => bookmark.assignmentId === assignmentId);
            
            if (isBookmarked) {
                await axiosSecure.delete(`/api/bookmarks/${assignmentId}?userEmail=${user.email}`);
            } else {
                const assignment = assignments.find(a => a._id === assignmentId);
                await axiosSecure.post('/api/bookmarks', {
                    assignmentId,
                    userEmail: user.email,
                    assignmentTitle: assignment?.title,
                    assignmentDifficulty: assignment?.difficulty,
                    assignmentMarks: assignment?.marks
                });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookmarks', user?.email] });
        },
        onError: (error) => {
            Swal.fire('Error', 'Failed to update bookmark', 'error');
        }
    });

    const deleteMutation = useMutation({
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
                deleteMutation.mutate(assignment._id);
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
                    assignment.description.toLowerCase().includes(searchLower) ||
                    assignment.creatorName?.toLowerCase().includes(searchLower)
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

    // Pagination
    const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedAssignments = filteredAssignments.slice(startIndex, startIndex + itemsPerPage);

    // Quick filter buttons
    const quickFilters = [
        { label: 'All', value: '', color: 'badge-primary' },
        { label: 'Easy', value: 'easy', color: 'badge-success' },
        { label: 'Medium', value: 'medium', color: 'badge-warning' },
        { label: 'Hard', value: 'hard', color: 'badge-error' }
    ];

    // Reset filters
    const resetFilters = () => {
        setDifficultyFilter('');
        setSearchQuery('');
        setSortOption('newest');
        setCurrentPage(1);
    };

    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center my-20">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="mt-4 text-lg">Loading assignments...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto p-4">
                <div className="alert alert-error">
                    <span>Error loading assignments: {error.message}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">All Assignments</h1>
                <p className="text-lg text-base-content/70">
                    Discover and work on exciting programming challenges
                </p>
            </div>

            {/* Assignment Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="stat bg-base-200 rounded-lg p-4 text-center">
                    <div className="stat-title text-sm">Total Assignments</div>
                    <div className="stat-value text-primary text-2xl">
                        {assignmentStats.totalAssignments}
                    </div>
                    <div className="stat-desc text-xs">All available assignments</div>
                </div>

                <div className="stat bg-base-200 rounded-lg p-4 text-center">
                    <div className="stat-title text-sm">Easy</div>
                    <div className="stat-value text-success text-2xl">
                        {assignmentStats.byDifficulty.easy}
                    </div>
                    <div className="stat-desc text-xs">Beginner friendly</div>
                </div>

                <div className="stat bg-base-200 rounded-lg p-4 text-center">
                    <div className="stat-title text-sm">Medium</div>
                    <div className="stat-value text-warning text-2xl">
                        {assignmentStats.byDifficulty.medium}
                    </div>
                    <div className="stat-desc text-xs">Intermediate level</div>
                </div>

                <div className="stat bg-base-200 rounded-lg p-4 text-center">
                    <div className="stat-title text-sm">Hard</div>
                    <div className="stat-value text-error text-2xl">
                        {assignmentStats.byDifficulty.hard}
                    </div>
                    <div className="stat-desc text-xs">Advanced challenges</div>
                </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {quickFilters.map(filter => (
                    <button
                        key={filter.value}
                        className={`badge badge-lg cursor-pointer hover:scale-105 transition-transform ${
                            difficultyFilter === filter.value ? filter.color : 'badge-outline'
                        }`}
                        onClick={() => {
                            setDifficultyFilter(filter.value);
                            setCurrentPage(1);
                        }}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Search and Filter Controls */}
            <div className="bg-base-200 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Search Assignments</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Search by title, description, or creator..."
                            className="input input-bordered"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    {/* Difficulty Filter */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Difficulty Level</span>
                        </label>
                        <select
                            onChange={(e) => {
                                setDifficultyFilter(e.target.value);
                                setCurrentPage(1);
                            }}
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
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Sort By</span>
                        </label>
                        <select
                            onChange={(e) => {
                                setSortOption(e.target.value);
                                setCurrentPage(1);
                            }}
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

                    {/* Items Per Page */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Items Per Page</span>
                        </label>
                        <select
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            value={itemsPerPage}
                            className="select select-bordered"
                        >
                            <option value={4}>4</option>
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                            <option value={16}>16</option>
                        </select>
                    </div>
                </div>

                {/* Active Filters Display */}
                {(searchQuery || difficultyFilter) && (
                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                        <span className="text-sm font-semibold">Active Filters:</span>
                        {searchQuery && (
                            <div className="badge badge-primary gap-2">
                                Search: "{searchQuery}"
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="hover:text-error"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        {difficultyFilter && (
                            <div className="badge badge-secondary gap-2">
                                Difficulty: {difficultyFilter}
                                <button 
                                    onClick={() => setDifficultyFilter('')}
                                    className="hover:text-error"
                                >
                                    ×
                                </button>
                            </div>
                        )}
                        <button 
                            onClick={resetFilters}
                            className="btn btn-xs btn-ghost"
                        >
                            Clear All
                        </button>
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-base-content/70">
                    Showing {paginatedAssignments.length} of {filteredAssignments.length} assignments
                    {filteredAssignments.length !== assignments.length && ` (filtered from ${assignments.length} total)`}
                </p>
                
                {user && (
                    <Link to="/user-dashboard/create-assignment" className="btn btn-primary btn-sm">
                        + Create New Assignment
                    </Link>
                )}
            </div>

            {/* Assignments Grid */}
            {paginatedAssignments.length === 0 ? (
                <div className="text-center my-20">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">No assignments found</h3>
                    <p className="text-base-content/70 mb-4">
                        Try adjusting your search criteria or filters
                    </p>
                    <button onClick={resetFilters} className="btn btn-primary">
                        Reset Filters
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {paginatedAssignments.map(assignment => (
                            <div key={assignment._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                                <figure className="relative">
                                    <img 
                                        src={assignment.thumbnailURL || "https://via.placeholder.com/300x200?text=No+Image"} 
                                        alt={assignment.title} 
                                        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <div className={`badge ${
                                            assignment.difficulty === 'easy' ? 'badge-success' :
                                            assignment.difficulty === 'medium' ? 'badge-warning' : 'badge-error'
                                        }`}>
                                            {assignment.difficulty}
                                        </div>
                                    </div>
                                    {user && (
                                        <div className="absolute top-2 left-2">
                                            <button
                                                onClick={() => toggleBookmark.mutate(assignment._id)}
                                                className={`btn btn-circle btn-xs ${
                                                    bookmarks.some(b => b.assignmentId === assignment._id) 
                                                        ? 'bg-yellow-500 text-white border-yellow-500' 
                                                        : 'bg-base-100/80 border-base-300'
                                                } border`}
                                                disabled={toggleBookmark.isLoading}
                                                title={bookmarks.some(b => b.assignmentId === assignment._id) ? 'Remove bookmark' : 'Add bookmark'}
                                            >
                                                {toggleBookmark.isLoading ? (
                                                    <span className="loading loading-spinner loading-xs"></span>
                                                ) : (
                                                    '★'
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title text-lg line-clamp-2">{assignment.title}</h2>
                                    <p className="text-sm text-base-content/70 line-clamp-2 mb-2">
                                        {assignment.description}
                                    </p>
                                    
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-semibold text-primary">
                                            {assignment.marks} marks
                                        </span>
                                        <span className="text-xs text-base-content/50">
                                            By {assignment.creatorName || 'Unknown'}
                                        </span>
                                    </div>

                                    <div className="card-actions justify-between items-center">
                                        <Link 
                                            to={`/assignment/${assignment._id}`} 
                                            className="btn btn-primary btn-sm flex-1"
                                        >
                                            View Details
                                        </Link>
                                        
                                        {user?.email === assignment.creatorEmail && (
                                            <div className="flex gap-1">
                                                <Link 
                                                    to={`/update-assignment/${assignment._id}`} 
                                                    className="btn btn-info btn-sm btn-square"
                                                    title="Edit"
                                                >
                                                    ✏️
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(assignment)} 
                                                    className="btn btn-error btn-sm btn-square"
                                                    title="Delete"
                                                    disabled={deleteMutation.isLoading}
                                                >
                                                    {deleteMutation.isLoading ? (
                                                        <span className="loading loading-spinner loading-xs"></span>
                                                    ) : (
                                                        '🗑️'
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mb-8">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="btn btn-sm btn-ghost"
                            >
                                Previous
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-ghost'}`}
                                >
                                    {page}
                                </button>
                            ))}
                            
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="btn btn-sm btn-ghost"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Assignments;