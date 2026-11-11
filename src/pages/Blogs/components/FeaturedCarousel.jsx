import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useGetBlogs } from "../../../hooks/useBlogs";
import { NavLink } from "react-router";

const FeaturedCarousel = () => {
  const { data: blogs } = useGetBlogs();

  //   const featuredPosts = [
  //     {
  //       id: 1,
  //       title: "10 Essential Tips for Scholarship Success",
  //       excerpt:
  //         "Master the art of scholarship applications with our proven strategies that have helped thousands of students secure funding.",
  //       image: blogs?.data?.images[0],
  //       category: "Tips",
  //     },
  //     {
  //       id: 2,
  //       title: "From Dream to Reality: Sarah's Journey",
  //       excerpt:
  //         "Follow Sarah's inspiring transformation from uncertainty to securing a full scholarship at her dream university.",
  //       image: blogs?.data?.images[0],
  //       category: "Success Stories",
  //     },
  //     {
  //       id: 3,
  //       title: "Complete Guide to University Applications",
  //       excerpt:
  //         "Navigate the complex world of university applications with our comprehensive step-by-step guide.",
  //       image: blogs?.data?.images[0],
  //       category: "Guides",
  //     },
  //   ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || !blogs?.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, blogs?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogs.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blogs.length) % blogs.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive deep into our most inspiring content and expert insights
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main carousel */}
          <div className="relative overflow-hidden rounded-2xl shadow-card">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {blogs.map((post) => (
                <div key={post.id} className="w-full flex-shrink-0">
                  <div className="relative h-96 md:h-[500px]">
                    <img
                      src={post.images[0]}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <div className="max-w-2xl">
                          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4">
                            {post.category}
                          </span>

                          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                            {post.title}
                          </h3>

                          <p className="text-lg text-white/90 mb-6 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <NavLink to={`/blogs/${post.id}`}>
                            <Button
                              variant="accent"
                              size="lg"
                              className="group"
                            >
                              Read Full Story
                              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </NavLink>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-soft backdrop-blur-sm"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 shadow-soft backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
