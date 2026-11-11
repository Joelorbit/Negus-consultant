import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router";

export const ShinyButton = ({ className, children, href, ...props }) => {
  return (
    <NavLink
      to={href ?? "#"}
      className={cn(
        "px-14 py-2 group relative flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md  bg-primary text-base/7 font-medium text-white transition-all duration-300 hover:ring-2 hover:ring-primary hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="size-4 shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]" />
      </span>

      <div
        className="
          pointer-events-none
          absolute
          top-[-50px]
          left-[-75px]
          h-[155px]
          w-8
          rotate-[35deg]
          bg-white
          opacity-20
          transition-transform
          duration-500
          ease-[cubic-bezier(0.19,1,0.22,1)]
          group-hover:translate-x-[800%]
        "
      />
    </NavLink>
  );
};
