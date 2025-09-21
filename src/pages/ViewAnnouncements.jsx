import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "../utils/axios";
import {
  FiBell,
  FiEdit3,
  FiX,
  FiCalendar,
  FiMessageSquare,
  FiEye,
} from "react-icons/fi";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all announcements
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/announcement/get-announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Start editing
  const startEditing = (announcement) => {
    setEditingId(announcement._id);
    setFormData({
      message: announcement.message,
    });
    // Close modal if open
    setShowModal(false);
    setSelectedAnnouncement(null);
  };

  // Update announcement
  const handleUpdate = async (id) => {
    if (!formData.message.trim()) {
      toast.error("Please fill in the message field");
      return;
    }

    try {
      await instance.put(`/announcement/update/${id}`, formData);
      toast.success("Announcement updated successfully");
      setEditingId(null);
      setFormData({ message: "" });
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update announcement");
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setFormData({ message: "" });
  };

  // View announcement in modal
  const viewAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedAnnouncement(null);
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateMessage = (message, maxLength = 150) => {
    if (!message) return "N/A";
    return message.length > maxLength 
      ? message.substring(0, maxLength) + "..." 
      : message;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <FiBell className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Announcements
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  {announcements.length} announcements found
                </p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <FiBell className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Total</p>
                  <p className="text-2xl font-bold text-blue-800">{announcements.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <FiEye className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">Published</p>
                  <p className="text-2xl font-bold text-green-800">{announcements.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <FiCalendar className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Last Updated</p>
                  <p className="text-sm font-semibold text-purple-800">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center bg-white rounded-xl shadow-sm">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 font-medium">Loading announcements...</p>
            </div>
          </div>
        ) : (
          /* Announcements List */
          <div className="space-y-4 overflow-y-scroll">
            {announcements.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiBell className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No announcements found
                </h3>
              </div>
            ) : (
              announcements.map((announcement, index) => (
                <div
                  key={announcement._id}
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden ${
                    editingId === announcement._id ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  }`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {editingId === announcement._id ? (
                    // Edit Mode
                    <div className="p-4 sm:p-6">
                      {/* Mobile Edit Layout */}
                      <div className="flex flex-col sm:hidden gap-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FiEdit3 className="text-blue-600 text-sm" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800">Edit Announcement</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Enter your announcement message..."
                              rows="3"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none text-sm"
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2 border-t border-gray-100">
                          <button
                            onClick={cancelEditing}
                            className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleUpdate(announcement._id)}
                            disabled={!formData.message.trim()}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            Save
                          </button>
                        </div>
                      </div>

                      {/* Desktop Edit Layout */}
                      <div className="hidden sm:block">
                        <div className="flex items-center mb-4">
                          <div className="p-2 bg-blue-100 rounded-lg mr-3">
                            <FiEdit3 className="text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800">Edit Announcement</h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Enter your announcement message..."
                              rows="4"
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
                          <button
                            onClick={cancelEditing}
                            className="px-5 py-2.5 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleUpdate(announcement._id)}
                            disabled={!formData.message.trim()}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="p-4 sm:p-6">
                      {/* Mobile Layout */}
                      <div className="flex flex-col sm:hidden gap-3">
                        <div className="flex justify-between items-start">
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {formatDate(announcement.createdAt)}
                          </span>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {truncateMessage(announcement.message, 100)}
                          </p>
                          {announcement.message && announcement.message.length > 100 && (
                            <button
                              onClick={() => viewAnnouncement(announcement)}
                              className="text-blue-600 hover:text-blue-800 text-xs mt-1 font-medium"
                            >
                              Read more...
                            </button>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => viewAnnouncement(announcement)}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                          >
                            <FiEye size={14} />
                            View
                          </button>
                          <button
                            onClick={() => startEditing(announcement)}
                            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                          >
                            <FiEdit3 size={14} />
                            Edit
                          </button>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden sm:block">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                              <FiBell className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <FiCalendar size={12} />
                                  {formatDate(announcement.createdAt)}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                  Published
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => viewAnnouncement(announcement)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                            >
                              <FiEye size={16} />
                              View Full
                            </button>
                            <button
                              onClick={() => startEditing(announcement)}
                              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                            >
                              <FiEdit3 size={16} />
                              Edit
                            </button>
                          </div>
                        </div>

                        {/* Message Preview */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <FiMessageSquare className="text-purple-600" size={16} />
                            Message Preview:
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {truncateMessage(announcement.message)}
                          </p>
                          {announcement.message && announcement.message.length > 150 && (
                            <button
                              onClick={() => viewAnnouncement(announcement)}
                              className="text-blue-600 hover:text-blue-800 text-xs mt-2 font-medium"
                            >
                              Read more...
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Announcement Detail Modal */}
      {showModal && selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                  <FiBell className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Announcement Details
                  </h2>
                  <p className="text-sm text-gray-600">
                    Published on {formatDate(selectedAnnouncement.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEditing(selectedAnnouncement)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <FiEdit3 size={14} />
                  Edit
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* Announcement Details */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 sm:p-5 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <FiCalendar className="text-blue-600" />
                  <h3 className="font-semibold text-lg text-gray-900">
                    Announcement Details
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div>
                    <span className="font-medium text-gray-700 block">Status:</span>
                    <span className="inline-flex items-center gap-1 text-green-600">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Published
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 block">Published Date:</span>
                    <span className="text-gray-600">{formatDate(selectedAnnouncement.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Full Message */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FiMessageSquare className="text-purple-600" />
                  <h3 className="font-semibold text-lg text-gray-900">
                    Full Message
                  </h3>
                </div>
                <div className="bg-white rounded border p-4">
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {selectedAnnouncement.message || "No message content available."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AnnouncementsPage;