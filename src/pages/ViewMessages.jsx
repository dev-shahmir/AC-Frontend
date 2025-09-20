import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { toast } from "react-toastify";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const response = await instance.get("/contact/get-message");
      setMessages(response.data); // ✅ backend direct array bhej raha hai
    } catch (err) {
      toast.error("Failed to fetch messages");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete message
  const deleteMessage = async (messageId) => {
    setDeleteLoading(messageId);
    try {
      await instance.delete(`/contact/delete-message/${messageId}`);
      setMessages(messages.filter(msg => msg._id !== messageId));
      toast.success("Message deleted successfully");
      setShowDeleteConfirm(null);
    } catch (err) {
      toast.error("Failed to delete message");
      console.error(err);
    } finally {
      setDeleteLoading(null);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-full w-full p-4 sm:p-6 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-2">
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Contact Messages
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage and review customer inquiries
          </p>
        </div>
        {!loading && (
          <div className="bg-blue-100 px-4 py-2 rounded-full">
            <span className="text-blue-800 font-semibold text-sm">
              {messages.length} Messages
            </span>
          </div>
        )}
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading messages...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 w-full">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={msg?._id ?? index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-200 group"
              >
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex-1 mb-3 sm:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {msg?.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {msg?.name || 'Anonymous'}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Customer Inquiry
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">Received</p>
                    <p className="text-sm font-medium text-gray-600">
                      {new Date(msg?.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Email</p>
                      <p className="text-sm font-medium text-gray-700">{msg?.email || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Phone</p>
                      <p className="text-sm font-medium text-gray-700">{msg?.number || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 uppercase font-medium mb-2">Message</p>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                        {msg?.message || 'No message content provided.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                  
                  

                  <button 
                    onClick={() => setShowDeleteConfirm(msg._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium ml-auto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm === msg._id && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">Delete Message</h3>
                          <p className="text-sm text-gray-600">This action cannot be undone</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-6">
                        Are you sure you want to delete the message from <strong>{msg.name}</strong>? This will permanently remove the message from your system.
                      </p>
                      
                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => deleteMessage(msg._id)}
                          disabled={deleteLoading === msg._id}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                        >
                          {deleteLoading === msg._id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete Message
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Messages Yet</h3>
              <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                When customers send you messages through the contact form, they'll appear here.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;