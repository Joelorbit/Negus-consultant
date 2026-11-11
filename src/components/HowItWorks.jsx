import React, { useState } from "react";
import { ChevronDown, Check, Play } from "lucide-react";
import { Button } from "./ui/button";
import { NavLink } from "react-router";

const packages = [
  {
    id: 1,
    title: "Essay Writing Package",
    price: "2000 Birr (one-time)",
    oldPrice: "2500 Birr",
    description: "Expert-written essays tailored to your voice and story",
    features: [
      "Polished personal statement & supplemental essays.",
      "Multiple revisions and editable formats.",
      "Includes strategy consultation & Common App setup.",
    ],
    image:
      "https://images.pexels.com/photos/5905442/pexels-photo-5905442.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Mentorship & Guidance",
    price: "4000 Birr (one-time)",
    oldPrice: "5000 Birr",
    description: "Perfect for independent students who want expert guidance",
    features: [
      "Ongoing mentorship & step-by-step Common App help.",
      "Brainstorming & final feedback on essays.",
      "Financial aid guidance & submission support.",
    ],
    image:
      "https://images.pexels.com/photos/3768126/pexels-photo-3768126.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Full Application Support",
    price: "3 installments (5,000 + 5,000 + 15,000 Birr)",
    description:
      "Complete end-to-end assistance with your university applications",
    features: [
      "Full application plan with essay & Common App support.",
      "Financial aid guidance & recommendation letter review.",
      "Visa support & dedicated expert assistance.",
    ],
    image:
      "https://images.pexels.com/photos/6348113/pexels-photo-6348113.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Additional Services",
    description:
      "Need something specific? Our expert team can help with custom solutions.",
    features: [
      "Essay editing & feedback starting at 250 Birr.",
      "Common App setup & final review.",
      "Financial services including CSS Profile & ISFAA support.",
    ],
    image:
      "https://images.pexels.com/photos/6694967/pexels-photo-6694967.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const HowItWorks = () => {
  const [expandedId, setExpandedId] = useState(1);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? 0 : id);
  };

  const current = packages.find((p) => p.id === expandedId) || packages[0];

  return (
    <div className=" bg-card py-16 px-4 text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-card/5 border border-border rounded-3xl shadow-primary/30 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Panel */}
            <div className="p-4 sm:p-6 lg:p-12">
              <div className="mb-6 sm:mb-8 text-center lg:text-left">
                <p className="text-primary font-medium text-sm tracking-wide uppercase mb-2">
                  Over view of our packages
                </p>
                <h2 className="text-4xl font-bold text-foreground">
                  Check Out Various Scholarship Packages
                </h2>
                {/* <p className="text-muted-foreground mt-2">
                  Unlock powerful features and accelerate your success with our
                  flexible pricing plans. Start your 7-day free trial today.
                </p> */}
              </div>

              <div className="space-y-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="overflow-hidden transition-all">
                    <button
                      onClick={() => toggleExpand(pkg.id)}
                      className="w-full p-6 text-left flex items-center justify-between rounded-xl bg-card/5 border border-border hover:bg-card/10 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shadow-primary/40 ${
                            expandedId === pkg.id
                              ? "bg-primary text-background"
                              : "bg-card/10 text-primary"
                          }`}
                        >
                          {pkg.id}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">
                            {pkg.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {pkg.description}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-primary transition-transform duration-300 ${
                          expandedId === pkg.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedId === pkg.id
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="ml-12 space-y-3">
                          {pkg.features.map((f, i) => (
                            <div
                              key={i}
                              className="flex items-center space-x-3"
                            >
                              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-primary shadow-primary/50">
                                <Check className="w-3 h-3 text-background" />
                              </div>
                              <span className="text-sm text-foreground">
                                {f}
                              </span>
                            </div>
                          ))}
                          {pkg.price && (
                            <p className="mt-4 text-primary font-semibold">
                              {pkg.price}{" "}
                              {pkg.oldPrice && (
                                <span className="line-through text-muted-foreground ml-2">
                                  {pkg.oldPrice}
                                </span>
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <div className="p-4 sm:p-6 lg:p-12 flex items-center justify-center bg-card/10 rounded-b-3xl lg:rounded-tr-3xl lg:rounded-br-3xl">
              <div className="w-full max-w-md">
                <div className="relative rounded-2xl overflow-hidden shadow-primary/30 group cursor-pointer">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-56 sm:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  ...
                </div>
                <div className="mt-4 sm:mt-6 text-center lg:text-left">
                  <h4 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    {current.title}
                  </h4>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {current.description}
                  </p>
                </div>
                <div className="w-full flex justify-center lg:justify-start">
                  <NavLink to="/packages" className="mt-4 sm:mt-6 inline-block">
                    <Button className="py-4 sm:py-6 px-8 sm:px-10">
                      Get Started
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        {/* <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Need Help Choosing?
          </h3>
          <p className="text-muted-foreground mb-4">
            Our advisors are ready to guide you through the best plan for your
            journey.
          </p>
          <p className="text-primary font-semibold">Call: +(251) 943041418</p>
          <p className="text-primary font-semibold">Mail: contact@negusconsultants.com</p>
        </div> */}
      </div>
    </div>
  );
};

export default HowItWorks;
