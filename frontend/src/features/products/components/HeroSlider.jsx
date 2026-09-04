import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const placeholderImage =
  "https://placehold.co/1200x500?text=Category+Image";

const HeroSlider = ({ categories = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = categories.length;

  // পরবর্তী স্লাইডে যাও (লুপিং সহ)
  const nextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // পূর্ববর্তী স্লাইডে যাও (লুপিং সহ)
  const prevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // নির্দিষ্ট স্লাইডে যাও
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // অটোপ্লে (শুধু মাউস পজ না করলে)
  useEffect(() => {
    if (isPaused || totalSlides === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, totalSlides]);

  // যদি ক্যাটাগরি না থাকে, প্লেসহোল্ডার দেখাও
  if (totalSlides === 0) {
    return (
      <div className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-slate-200 md:h-[400px]">
        <img
          src={placeholderImage}
          alt="No categories available"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center text-slate-500">
          No categories to show
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-[300px] w-full overflow-hidden rounded-2xl shadow-md md:h-[400px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* স্লাইডগুলোর কন্টেইনার - ট্রানজিশন সহ */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {categories.map((category) => (
          <Link
            key={category._id || category.slug}
            to={`/categories/${category.slug}`}
            className="relative h-full w-full flex-shrink-0"
          >
            <img
              src={category.image?.url || placeholderImage}
              alt={category.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-2xl font-bold md:text-3xl">
                {category.name}
              </h2>
              {category.description && (
                <p className="mt-1 max-w-xl text-sm text-slate-200">
                  {category.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* বাম বাটন (Prev) - লুপিং সহ */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/40"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="h-6 w-6" />
      </button>

      {/* ডান বাটন (Next) - লুপিং সহ */}
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/40"
        aria-label="Next slide"
      >
        <FiChevronRight className="h-6 w-6" />
      </button>

      {/* ডট ইন্ডিকেটর - সক্রিয় স্লাইড অনুযায়ী আপডেট হয় */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {categories.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;