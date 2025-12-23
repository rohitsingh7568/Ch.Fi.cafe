// app/page.tsx
"use client"; // Marks as Client Component for interactivity

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define the type for Menu Highlights
interface Highlight {
  title: string;
  price: string;
  desc: string;
  image: string;
  alt: string;
}

interface GalleryImage {
  src: string;
  alt: string;
  span: string; // Tailwind CSS class for grid span
}

const slides = [
  {
    src: "/images/indoor_seating_blue.jpg",
    alt: "Coffee Chacha cafe exterior sign",
  },

  {
    src: "/images/outdoor_light_blue2.jpg",
    alt: "Coffee Chacha cozy interior seating",
  },
];

// --- Data for Menu Highlights ---
const menuHighlights: Highlight[] = [
  {
    title: "Signature Chai",
    price: "₹25",
    desc: "The perfect 'cutting' chai served in our traditional, artistic kettle. A warm hug in a glass.",
    image: "/images/chai_kettle.jpg",
    alt: "Artistically painted chai kettle and glass",
  },
  {
    title: "Loaded Cheesy Sandwich",
    price: "Starting ₹70",
    desc: "Melted cheese, fresh veggies, and a spicy kick. The ideal companion for your coffee.",
    image: "/images/cheesy_sandwich.jpg",
    alt: "Grilled sandwich covered in melted cheese",
  },
  {
    title: "Hot Coffee",
    price: "₹35",
    desc: "Classic coffee, rich foam, and a chocolate sprinkle. Simple, yet perfect.",
    image: "/images/hot_coffees.jpg",
    alt: "Four cups of foamy hot coffee",
  },
];

// --- Data for Gallery Images ---
const galleryImages: GalleryImage[] = [
  {
    src: "/images/indoor_seating_blue.jpg",
    alt: "Indoor seating with blue wicker chairs",
    span: "md:col-span-2",
  },
  {
    src: "/images/outdoor_seating.jpg",
    alt: "Outdoor seating with string lights",
    span: "md:col-span-1",
  },
  {
    src: "/images/interior_detail.jpg",
    alt: "Close up of brick wall and lantern",
    span: "md:col-span-1",
  },
  {
    src: "/images/outdoor_seating_wide.jpg",
    alt: "Wide view of the glass framed exterior",
    span: "md:col-span-1",
  },
  {
    src: "/images/chai_table.jpg",
    alt: "Wide view of the glass framed exterior",
    span: "md:col-span-1",
  },
  {
    src: "/images/cold_coffees.jpg",
    alt: "Branded cold coffee cups",
    span: "md:col-span-1",
  },
  {
    src: "/images/cafe_exterior_sign.jpg",
    alt: "Cafe exterior with Ch.Fi sign and a bike",
    span: "md:col-span-2",
  },
  {
    src: "/images/chai_kettle.jpg",
    alt: "Painted chai kettle at night",
    span: "md:col-span-3",
  },
  // {
  //   src: "/images/cafe_exterior_sign.jpg",
  //   alt: "Cafe exterior with Ch.Fi sign and a bike",
  //   span: "md:col-span-2",
  // },
];

const menuImages = ["/images/menu_card.jpg", "/images/menu_card2.jpg"];

const reviews = [
  {
    name: "Duddy The Reviewer",
    rating: 5,
    review:
      "The **Signature Chai** here is a game-changer! Perfect strong flavor and served in that beautiful kettle. Paired with the Cheesy Vada Pav, it's the ultimate evening snack combo. Ambiance is chill, great spot for friends!",
    date: "October 18, 2024",
  },
  {
    name: "Local Foodie",
    rating: 4,
    review:
      "Tried the **Tandoori Maggi** and it was unique and spicy! The service was quick, and the outdoor seating under the fairy lights is lovely. A must-visit for a casual coffee date.",
    date: "November 5, 2024",
  },
  {
    name: "Chai Lover",
    rating: 5,
    review:
      "This place lives up to its name. Best Chai in the area, and the **Loaded Fries** were absolutely fantastic. Pricing is very reasonable for the quality and setting.",
    date: "November 20, 2024",
  },
];

const HomePage: React.FC = () => {
  // moved state and effect inside component (hooks cannot be used at top-level)
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? menuImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === menuImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen">
      {/* 1. Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white shadow-lg">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
          <a
            href="#"
            className="text-4xl font-bold text-blue-400 tracking-wider"
          >
            च|.<span className="text-red-500">फी</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["Menu", "Ambiance", "Reviews", "Locate"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-800 hover:text-blue-400 transition duration-300 font-bold"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                // Close icon (X)
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 py-2 bg-white border-t border-gray-200">
            {["Menu", "Ambiance", "Reviews", "Locate"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 px-4 text-gray-800 hover:bg-blue-50 hover:text-blue-400 transition duration-300 font-bold rounded"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section
        id="hero"
        className="relative h-[60vh] md:h-[80vh] overflow-hidden"
      >
        {/* --- IMAGE SLIDER --- */}
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover object-center md:object-[center_30%]"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}

        {/* --- DARKER OVERLAY for better text visibility --- */}
        <div className="absolute inset-0 bg-black/50 z-20"></div>

        {/* --- TEXT OVERLAY --- */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-30 max-w-6xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
            Chai, Coffee <span className="text-blue-400">& Stories</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8 md:mb-12 italic drop-shadow-lg">
            Your Spot for the Perfect Brew and Conversations.
          </p>

          <a
            href="#menu"
            className="inline-block bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-blue-500 px-6 py-4 rounded-full text-sm font-bold hover:bg-slate-100 transition duration-300"
          >
            Explore Our Menu
          </a>
        </div>
      </section>
      {/* 3. Menu Highlights Section */}
      <section id="menu" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            🍵 Our Must-Try Items 🥪
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {menuHighlights.map((item, index) => (
              <div
                key={index}
                className="bg-chfi-white rounded-xl shadow-2xl overflow-hidden hover:shadow-chfi-blue/50 transition duration-500 transform hover:-translate-y-1"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                  {/* <span className="text-xl font-bold mt-3 block text-gray-600">
                    {item.price}
                  </span> */}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#full-menu"
              className="text-lg text-blue-400 hover:text-chfi-blue/80 font-semibold underline transition duration-300"
            >
              See Full Menu Below
            </a>
          </div>
        </div>
      </section>

      <hr className="border-t-2 border-chfi-blue/20 max-w-6xl mx-auto" />

      {/* 4. Full Menu Section (Menu Card Image) */}
      <section id="full-menu" className="py-16 md:py-24 relative">
        {/* Background Image with Low Opacity */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/complete_menu_bg.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-200">
            📜 The Complete Menu
          </h2>
          <p className="text-center text-white-600 mb-12">
            Chai, Coffee, Maggi, and all the light bites you crave!
          </p>

          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="relative max-w-xl w-full">
              {/* Menu Card Container */}
              <div className="relative rounded-xl shadow-2xl overflow-hidden  aspect-[3/4.5] ">
                <img
                  src={menuImages[currentIndex]}
                  alt={`Menu card ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Left Arrow */}
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/90 hover:bg-blue-400 cursor-pointer text-blue-900 p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
                aria-label="Previous menu"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/90 hover:bg-blue-400 cursor-pointer text-blue-900 p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
                aria-label="Next menu"
              >
                <ChevronRight className="w-6 h-6 " />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {menuImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full  cursor-pointer transition-all ${
                      index === currentIndex
                        ? "bg-blue-400 w-8"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to menu ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="border-t-2 border-chfi-blue/20 max-w-6xl mx-auto" />

      {/* 5. Gallery / Ambiance Section */}
      <section id="ambiance" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            ✨ The Ambiance - Your Happy Place
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryImages.map((item, index) => (
              <div
                key={index}
                className={`relative rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer
            ${index === 0 ? "col-span-2 row-span-2" : ""}
            ${index === 7 ? "col-span-2" : ""}
          `}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes={
                    index === 0
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className="border-t-2 border-chfi-blue/20 max-w-6xl mx-auto" />
      <section id="reviews" className="py-16 md:py-24 bg-chfi-white relative">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/reviews_bg.jpg"
            alt="Background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-400 flex items-center justify-center">
            ⭐ Reviews & Feedback from Duddy! ⭐
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl shadow-xl border-t-4 transition duration-300 transform hover:scale-[1.02] 
                            ${
                              review.name === "Duddy The Reviewer"
                                ? "bg-yellow-50 border-yellow-500"
                                : "bg-white border-chfi-blue/50"
                            }`}
              >
                <div className="flex items-center mb-3">
                  {Array(review.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        ★
                      </span>
                    ))}
                  <span className="ml-2 text-sm text-gray-500">
                    ({review.rating}/5)
                  </span>
                </div>

                <p
                  className={`text-xl font-semibold mb-2 ${
                    review.name === "Duddy The Reviewer"
                      ? "text-blue-500"
                      : "text-chfi-blue"
                  }`}
                >
                  {review.name === "Duddy The Reviewer"
                    ? "Duddy The Reviewer (Featured)"
                    : review.name}
                </p>

                {/* Use dangerouslySetInnerHTML to render the bolded text from the review string */}
                <p
                  className="text-gray-700 italic mb-4"
                  dangerouslySetInnerHTML={{ __html: review.review }}
                />

                <p className="text-sm text-gray-400 mt-2">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 6. Location and Delivery Links */}
      <section
        id="locate"
        className="py-16 md:py-24 bg-white"
        style={{
          backgroundImage: "url('/images/map.png')",
        }}
      >
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-400">
            📍 Find Us & Order Online
          </h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Physical Address */}
            <div className="bg-white p-8 rounded-xl shadow-2xl border-l-4 border-chfi-blue">
              <h3 className="text-2xl font-bold text-gray-500 mb-4">
                Our Address
              </h3>
              <p className="text-lg text-gray-700 font-semibold">
                **Ch.Fi (च.फी) Cafe**,
                <br /> [ G18,19, Kardhani Govindpura, Kalwar Rd, opp. DMart,
                Kardhani Govindpura,302044],
                <br /> **Jaipur, Rajasthan, India**
              </p>
              <a
                href="https://share.google/217rlR5w8XlV4GZD2"
                target="_blank"
                className="mt-4 inline-block text-md font-semibold text-blue-500 text-chfi-red hover:text-red-700 underline transition duration-300"
              >
                Get Directions on Maps 🗺️
              </a>
            </div>

            {/* Delivery Links */}
            <div className="bg-white p-8 rounded-xl shadow-2xl border-l-4 border-chfi-blue">
              <h3 className="text-2xl font-bold text-gray-500 mb-4">
                Order Right Away!
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Delivering the best Chai and Maggi to your door.
              </p>

              <a
                href="https://www.zomato.com/YourZomatoLink"
                target="_blank"
                className="block w-full py-3 mb-4 bg-orange-800 hover:bg-red-700 text-white font-bold rounded-lg transition duration-300 shadow-lg"
              >
                Order on Zomato
              </a>

              <a
                href="https://www.swiggy.com/YourSwiggyLink"
                target="_blank"
                className="block w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition duration-300 shadow-lg"
              >
                Order on Swiggy
              </a>
            </div>
          </div>
        
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Ch.Fi - All rights reserved.</p>
          <p className="text-sm mt-2 text-gray-400">
            Made with ❤️ for Chai, Coffee and Stories.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
