import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { NavLink } from "react-router";

export function UpgradeCard() {
  const [visible, setVisible] = useState(false);

  // Show card after 5 seconds (adjust delay as you want)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`
        sticky top-10 right-8 max-w-xs w-72
        bg-gradient-to-br from-blue-600 to-blue-400
        text-white rounded-xl shadow-2xl
        p-6
        transform transition-transform duration-500
        ${visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}
        z-50
        ring-4 ring-blue-500
      `}
      style={{ willChange: "transform, opacity" }}
    >
      <button
        onClick={() => setVisible(false)}
        aria-label="Close upgrade card"
        className="absolute top-2 right-3 text-blue-100 hover:text-white"
      >
        <X size={20} />
      </button>

      <h3 className="text-xl font-extrabold mb-2 drop-shadow-lg">Want More?</h3>
      <p className="mb-4 text-sm drop-shadow-md leading-relaxed">
        Get Our <span className="font-bold underline">Package</span> for
        exclusive content, personalized essay help, and priority support.
      </p>
      <NavLink to="/packages">
        <Button className="w-full bg-white text-blue-600 font-bold hover:bg-blue-100 shadow-lg transition">
          Get Now
        </Button>
      </NavLink>
    </div>
  );
}
