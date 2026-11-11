import React from "react";
import { Star, Clock, Users, TrendingUp } from "lucide-react";
import { averageRating, renderStars } from "../../../utils/functions";
import UserProfile from "../../../components/UserProfile";

const MentorCard = ({ mentor, onClick, review }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105 border border-gray-100 group overflow-hidden"
    >
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center overflow-hidden">
          <UserProfile user={mentor} width={24} height={24} />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <div className="flex items-center space-x-1">
              {/* <Star className="w-4 h-4 text-yellow-500 fill-current" /> */}
              {renderStars(averageRating(review), Star)}
              <span className="text-sm font-semibold text-gray-800">
                {averageRating(review)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
          {mentor.first_name + " " + mentor.last_name}
        </h3>
        <p className="text-blue-600 font-medium mb-3">{mentor.position}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {mentor.specialties.slice(0, 2).map((spec, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-200"
            >
              {spec}
            </span>
          ))}
          {mentor.specialties.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{mentor.specialties.length - 2} more
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">
              ${mentor.hourly_rate}/hr
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">
              {/* {mentor.studentsHelped} helped */}5 helped
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">
              70% success rate
              {/* {mentor.successRate}% success rate */}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({review?.length} reviews)
          </span>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
