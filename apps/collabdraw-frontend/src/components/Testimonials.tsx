"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Collabdraw transformed our design workflow completely. The real-time collaboration features allow our team to brainstorm and iterate faster.",
    author: "Emily Rodriguez",
    position: "Design Lead",
    company: "PinPoint",
  },
  {
    id: 2,
    quote:
      "This collaborative drawing tool revolutionized our creative process. We can now work together seamlessly across different time zones efficiently.",
    author: "David Patel",
    position: "Creative Director",
    company: "Hues",
  },
  {
    id: 3,
    quote:
      "The intuitive interface and powerful collaboration features make Collabdraw essential for our design team. It simplified our entire workflow.",
    author: "Sarah Johnson",
    position: "Art Director",
    company: "DesignCo",
  },
  {
    id: 4,
    quote:
      "Working remotely became effortless with Collabdraw. The platform bridges the gap between team members and enhances our collaborative creativity.",
    author: "Michael Chen",
    position: "UX Designer",
    company: "TechFlow",
  },
  {
    id: 5,
    quote:
      "Collabdraw's real-time editing capabilities transformed our brainstorming sessions. Multiple designers can contribute simultaneously and productively.",
    author: "Lisa Wang",
    position: "Product Designer",
    company: "InnovateLab",
  },
  {
    id: 6,
    quote:
      "Our global design team finally found the perfect collaboration tool. Collabdraw makes distance irrelevant and keeps everyone connected always.",
    author: "Alex Thompson",
    position: "Senior Designer",
    company: "GlobalDesign",
  },
];

export default function Testimonials() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const infiniteTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = 450 + 24;
      carouselRef.current.scrollLeft = cardWidth * testimonials.length;
    }
  }, []);

  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const cardWidth = 450 + 24;
        const currentScroll = carouselRef.current.scrollLeft;
        const maxScroll = cardWidth * testimonials.length * 2;

        if (currentScroll >= maxScroll - cardWidth) {
          carouselRef.current.scrollLeft = cardWidth * testimonials.length;
        } else {
          carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = 450 + 24;
      const currentScroll = carouselRef.current.scrollLeft;

      if (currentScroll <= cardWidth) {
        carouselRef.current.scrollLeft = cardWidth * testimonials.length * 2;
      } else {
        carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = 450 + 24;
      const currentScroll = carouselRef.current.scrollLeft;
      const maxScroll = cardWidth * testimonials.length * 2;

      if (currentScroll >= maxScroll - cardWidth) {
        carouselRef.current.scrollLeft = cardWidth * testimonials.length;
      } else {
        carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const cardWidth = 450 + 24;
      const currentScroll = carouselRef.current.scrollLeft;
      const maxScroll = cardWidth * testimonials.length * 2;

      if (currentScroll <= 0) {
        carouselRef.current.scrollLeft = cardWidth * testimonials.length;
      } else if (currentScroll >= maxScroll) {
        carouselRef.current.scrollLeft = cardWidth * testimonials.length;
      }
    }
  };

  return (
    <div className="py-20" id="testimonials">
      <div className="max-w-[80vw] mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            What our users say
          </h2>

          <div className="flex gap-2">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={scrollLeft}
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={scrollRight}
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        <div className="relative w-full">
          <div
            className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] [-webkit-scrollbar]:hidden"
            ref={carouselRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
          >
            <div className={cn("flex flex-row gap-6 pl-4")}>
              {infiniteTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${Math.floor(index / testimonials.length)}`}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: 0.1 * (index % 6),
          ease: "easeOut",
        },
      }}
      className="flex-shrink-0 w-[450px] h-max bg-gray-900 rounded-2xl p-8 border border-gray-800 last:mr-8 flex flex-col"
    >
      <blockquote className="text-white text-lg leading-relaxed mb-8">
        "{testimonial.quote}"
      </blockquote>

      <div className="flex items-center justify-between pt-6 border-t border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
            {testimonial.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <div className="text-white font-semibold">{testimonial.author}</div>
            <div className="text-gray-400 text-sm">{testimonial.position}</div>
          </div>
        </div>

        <div className="text-gray-500 font-semibold text-sm">
          {testimonial.company}
        </div>
      </div>
    </motion.div>
  );
};
