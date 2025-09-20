import { useEffect, useState } from "react";
import instance from "../utils/axios";

const AnnouncementBar = () => {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const res = await instance.get("/announcement/get-announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  if (!announcements || announcements.length === 0) {
    return null;
  }

  // Single announcement with scrolling text
  if (announcements.length === 1) {
    return (
      <div className="bg-accent text-primary w-full h-[35px] sticky top-0 z-50 overflow-hidden">
        <div className="h-full flex items-center">
          <div className="animate-scroll-text whitespace-nowrap">
            <span className="inline-block px-4 text-sm sm:text-base font-medium">
              {announcements[0].message}
            </span>
          </div>
        </div>
        <style>{`
          @keyframes scroll-text {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-scroll-text {
            animation: scroll-text 12s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  // Multiple announcements with scrolling text (continuous loop)
  return (
    <div className="bg-accent text-primary w-full h-[35px] sticky top-0 z-50 overflow-hidden">
      <div className="h-full flex items-center justify-center">
        <div className="animate-scroll-multiple whitespace-nowrap">
          {announcements.map((announcement, index) => (
            <span key={announcement._id} className="inline-block px-2 text-sm sm:text-base font-medium">
              {announcement.message}
              {index < announcements.length - 1 && (
                <span className="px-4 text-primary">•</span>
              )}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll-multiple {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll-multiple {
          animation: scroll-multiple 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;