import React from "react";
import { Button } from "./ui/button";
import { NavLink } from "react-router";

const FollowUs = () => {
  return (
    <div className="mt-20 min-h-screen bg-background text-white">
      {/* Hero Section */}
      <div className="mx-auto px-4 py-24 flex flex-col lg:flex-row items-center gap-12 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614624532983-4ce03382d63d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-20 bg-cover bg-center rounded-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background-900/95 to-background-900/80 rounded-2xl"></div>

        <div className="lg:w-1/2 space-y-6 sm:px-6 lg:px-8 relative z-10 px-4 md:px-8">
          <div className="inline-block bg-yellow-600/20 px-4 py-1 rounded-full mb-2">
            <span className="text-yellow-400 font-medium text-sm">
              Connect with our platforms
            </span>
          </div>
          <h1 className="text-foreground text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Follow Us On <span className="text-yellow-500">Social Media</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join our thriving community across all social platforms and stay
            updated with our latest features, tips, and industry insights.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="https://t.me/NEGUSCONSULTANTS"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="py-6">
                <span className="material-symbols-outlined">send</span>
                Follow Now
              </Button>
            </a>
            <NavLink to="./about">
              <Button className="py-6" variant="secondary">
                <span className="material-symbols-outlined">help</span>
                Learn More
              </Button>
            </NavLink>
          </div>

          <div className="flex items-center gap-6 mt-12">
            <div className="flex -space-x-3">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHx1c2VyfGVufDB8fHx8MTc1NTYwMTA2NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-neutral-900"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwyfHx1c2VyfGVufDB8fHx8MTc1NTYwMTA2NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-neutral-900"
              />
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwzfHx1c2VyfGVufDB8fHx8MTc1NTYwMTA2NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-neutral-900"
              />
              <div className="w-10 h-10 rounded-full bg-yellow-600 border-2 border-neutral-900 flex items-center justify-center text-sm font-medium">
                +8k
              </div>
            </div>
            <p className="text-sm text-neutral-400">
              Joined by{" "}
              <span className="text-foreground font-medium">1,100+</span>{" "}
              professionals
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 relative z-10 flex justify-center items-center pt-12 lg:pt-0">
          <div className="relative flex justify-center items-center">
            {/* Phone frame */}
            <div className="w-full max-w-xl sm:max-w-sm  animate-float">
              <img src="./followus_iphone.png" className="w-4/5 mx-auto" />
            </div>
            {/* Decorative blurred shapes */}
            <div className="absolute -bottom-6 left-32 w-20 h-20 bg-yellow-500 rounded-lg rotate-12 blur-lg opacity-30"></div>
            <div className="absolute -top-6 right-32 w-20 h-20 bg-yellow-500 rounded-full blur-lg opacity-30"></div>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-8 right-12 w-24 h-24 bg-yellow-600/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-12 left-6 w-32 h-32 bg-yellow-600/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Follow Us <span className="text-yellow-500">Everywhere</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay connected with our community across all major social media
            platforms for exclusive content, updates, and opportunities to
            engage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Twitter/X Card */}
          <div className="bg-card shadow-md p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-200 transform hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-500 transition-colors">
              <i className="fa-brands fa-telegram text-xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Telegram</h3>
            <p className="text-muted-foreground mb-4">
              Quick updates, industry news, and engaging polls to keep you
              informed.
            </p>

            <a
              href="https://t.me/NEGUSCONSULTANTS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              Join Our Channel{" "}
              <span className="material-symbols-outlined ml-1 text-sm">
                north_east
              </span>
            </a>
          </div>

          {/* Instagram Card */}
          <div className="bg-card shadow-md p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-200 transform hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-gradient-to-tr group-hover:from-purple-600 group-hover:via-pink-500 group-hover:to-yellow-500 transition-colors">
              <i className="fa-brands fa-instagram text-xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">
              Instagram
            </h3>
            <p className="text-muted-foreground mb-4">
              Visual stories showcasing our product, team, and customer success
              stories.
            </p>
            <a
              href="https://www.instagram.com/negusconsultants?igsh=MWs1NHhlcDVyanZ1cQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              Follow us{" "}
              <span className="material-symbols-outlined ml-1 text-sm">
                north_east
              </span>
            </a>
          </div>

          {/* LinkedIn Card */}
          <div className="bg-card shadow-md p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-200 transform hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-black transition-colors">
              <i className="fa-brands fa-tiktok text-xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">TikTok</h3>
            <p className="text-muted-foreground mb-4">
              Creative content, behind-the-scenes looks, and fun challenges.
            </p>
            <a
              href="https://www.tiktok.com/@negus.consultant?_t=ZM-8xpBtQiI488&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              Follow us{" "}
              <span className="material-symbols-outlined ml-1 text-sm">
                north_east
              </span>
            </a>
          </div>

          {/* YouTube Card */}
          <div className="bg-card shadow-md p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-yellow-200 transform hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
              <i className="fa-brands fa-youtube text-xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">YouTube</h3>
            <p className="text-muted-foreground mb-4">
              Tutorials, product demos, webinars, and in-depth feature
              explorations.
            </p>
            <a
              href="https://youtube.com/@negusconsultants?si=PoE9UWI7Uue71qoj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              Subscribe{" "}
              <span className="material-symbols-outlined ml-1 text-sm">
                north_east
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FollowUs;
<style
  dangerouslySetInnerHTML={{
    __html: `
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
              }
              @keyframes fade-in {
                from { opacity: 0; transform: translateX(-50px); }
                to { opacity: 1; transform: translateX(0); }
              }
              @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .animate-float {
                animation: float 6s ease-in-out infinite;
              }
              .animate-fade-in {
                animation: fade-in 1s ease-out;
              }
              .animate-spin-slow {
                animation: spin-slow 8s linear infinite;
              }
            `,
  }}
/>;
