import { assets } from "../assets/assets";
import Title from "./Title";

export default function Testimonial() {
  const testimonials = [
    {
      name: "Aymane Kabti",
      location: "Terni, Italy",
      image: assets.user_profile,
      rating: 5,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional",
    },
    {
      name: "Aymane Kabti",
      location: "Béni Mellal, Morocco",
      image: assets.testimonial_image_2,
      rating: 5,
      testimonial:
        "CarRental made my trip so much easier, The car es delivred right to my door, and the customer service was fantastic!",
    },
    {
      name: "Aymane Kabti",
      location: "Béni Mellal, Morocco",
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial:
        "I higly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service",
    },
  ];

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 pt-20 pb-30">
      <Title title="What Our Customers Say" subtitle="Discover why discering travelers choose StayVenture for their luxury accommodations around the word" />

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10 ">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg max-w-xs hover:-translate-y-2 duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img
                    loading="lazy"
                    src={assets.star_icon}
                    alt="Star icon"
                    key={index}
                  />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
