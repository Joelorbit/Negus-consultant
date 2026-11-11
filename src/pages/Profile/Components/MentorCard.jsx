import { MessageCircle, Star } from "lucide-react";
import { NavLink } from "react-router";

const MentorCard = ({ mentor }) => {
  return (
    <NavLink key={mentor.id} to={`/profile/messages/${mentor.id}`}>
      <div className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-3">
          <div className="relative">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {mentor.online && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{mentor.name}</h4>
            <p className="text-sm text-gray-600">
              {mentor.university} • {mentor.scholarship}
            </p>
            <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{mentor.rating}</span>
              </span>
              <span>{mentor.sessions} sessions</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[12px] bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full">
                {mentor.expertise}
              </span>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1.5 px-2 py-2.5 min-h-[44px]">
                <MessageCircle className="w-4 h-4" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default MentorCard;
