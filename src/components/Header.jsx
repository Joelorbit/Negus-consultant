import { Users } from "lucide-react";
import React from "react";

const Header = ({ tag, titleBefore, titleAfter, description }) => {
  return (
    <div className="relative py-20 bg-background overflow-hidden">
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
          <Users className="w-4 h-4 mr-2" />
          {tag}
        </div>
        <div className="w-full flex justify-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-5xl text-center">
            {titleBefore}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              {titleAfter}
            </span>
          </h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Header;
