import { Plus } from "lucide-react";

export default function TeamCard({ member }) {
  return (
    <div className="relative  overflow-hidden text-center w-72 mx-auto shadow-lg py-10">
      {/* Top image with curved cutout */}
      <div className="bg-black rounded-t-4xl overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Info section */}
      <div className="relative bg-[#111] text-white px-6 py-10 rounded-t-3xl -mt-12 z-0">
        <h3 className="text-xl font-bold">{member.name}</h3>
        {/* <p className="text-primary text-sm mt-1">{member.role}</p> */}
      </div>

      {/* Plus button */}
      <div className="border-4 border-bg-[#111] rounded-full absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 ">
        <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-orange-700 transition">
          <Plus className="text-white w-6 h-6  " />
        </button>
      </div>
    </div>
  );
}
