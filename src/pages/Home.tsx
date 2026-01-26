// src/pages/Home.tsx - FIXED: NO EMPTY SPACE BELOW BANNER
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Leaf, Star, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";

// ----- banners data -----
import banner1 from "@/assets/banners/banner1.png";
import banner2 from "@/assets/banners/banner2.png";
import banner3 from "@/assets/banners/banner3.png";
import videoBanner from "@/assets/banners/video-banner.png";
import whyKapivaFlower1 from "@/assets/why-kapiva-flower1.png";
import whyKapivaFlower2 from "@/assets/why-kapiva-flower2.png";
import whyKapivaFlower3 from "@/assets/why-kapiva-flower3.png";

const banners = [banner1, banner2, banner3];

// ----- category images -----
import brainImg from "@/assets/categories/Gutimg1.png";
import bornImg from "@/assets/categories/Brainimg2.png";
import heartImg from "@/assets/categories/Heartimg3.png";
import healthyImg from "@/assets/categories/Bornimg4.png";
import WomenImg from "@/assets/categories/Pcos.png";

const youtubeVideos = [
  { id: 1, url: "https://www.youtube.com/embed/fKxmRoD3_y4" },
  { id: 2, url: "https://www.youtube.com/embed/NxyJharn3lo" },
  { id: 3, url: "https://www.youtube.com/embed/m1mB9PfLt1U" },
  { id: 4, url: "https://www.youtube.com/embed/bBm8BfGyI_g" },
  { id: 5, url: "https://www.youtube.com/embed/zioejXbRGjw" },
  { id: 6, url: "https://www.youtube.com/embed/B-Qiadg_pMo" },
  { id: 7, url: "https://www.youtube.com/embed/1C75T9XsN7M" },
  { id: 8, url: "https://www.youtube.com/embed/3BtubJkRheQ" },
  { id: 9, url: "https://www.youtube.com/embed/W6vACcPoF2E" },
  { id: 10, url: "https://www.youtube.com/embed/W6vACcPoF2E" },
];

const categories = [
  { name: "Gut", image: brainImg },
  { name: "Brain", image: bornImg },
  { name: "Heart", image: heartImg },
  { name: "Born", image: healthyImg },
  { name: "Pcod / Pcos", image: WomenImg },
];

function Home() {
  const [bannerIndex, setBannerIndex] = useState(0);

  const prevBanner = () => {
    setBannerIndex((i) => (i === 0 ? banners.length - 1 : i - 1));
  };

  const nextBanner = () => {
    setBannerIndex((i) => (i === banners.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product: (typeof products)[number]) => {
    console.log("Add to cart:", product.id);
  };

  return (
    <Layout className="min-h-screen bg-white">
      {/* ================= FIXED BANNER - NO EMPTY SPACE ================= */}
      <section className="relative w-full overflow-hidden bg-white">
        {/* Container matches image height exactly - NO GAP */}
        <div className="w-full">
          {/* Left arrow */}
          <button
            type="button"
            onClick={prevBanner}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-r-full bg-white/90 text-gray-800 shadow hover:bg-white transition absolute left-2 top-1/2 -translate-y-1/2 z-20"
          >
            <span className="text-lg">&lt;</span>
          </button>

          {/* IMAGE TAKES FULL CONTAINER HEIGHT - NO NESTED DIVS */}
          <img
            src={videoBanner}
            alt="Customer Testimonials Banner"
            className="w-full h-[300px] sm:h-[300px] md:h-[700px] lg:h-[600px] object-cover block"
          />

          {/* Right arrow */}
          <button
            type="button"
            onClick={nextBanner}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-l-full bg-white/90 text-gray-800 shadow hover:bg-white transition absolute right-2 top-1/2 -translate-y-1/2 z-20"
          >
            <span className="text-lg">&gt;</span>
          </button>
        </div>
      </section>

      {/* TOP OFFER BAR */}
      <div className="w-full bg-[#1B441F] text-white">
        <div className="container mx-auto h-16 flex items-center justify-center overflow-hidden">
          <p className="whitespace-nowrap animate-[marquee_40s_linear_infinite] font-semibold tracking-wide 
                        text-base sm:text-lg md:text-xl">
            100% Millet Based&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            High Fiber&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            No Maida&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            No Preservatives&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            Low GI
          </p> 
          <p className="whitespace-nowrap animate-[marquee_40s_linear_infinite] font-semibold tracking-wide 
                        text-base sm:text-lg md:text-xl">
            100% Millet Based&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            High Fiber&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            No Maida&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            No Preservatives&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
            Low GI
          </p>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 space-y-2">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-emerald-900">
              Shop By Category 
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/shop?category=${cat.slug}`}
                className="group relative w-36 h-36 lg:w-40 lg:h-40 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-4"
              >
                <div className="w-19 h-19 lg:w-38 lg:h-38 rounded-1xl overflow-hidden mb-3 group-hover:scale-110 transition-transform">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:brightness-110"
                  />
                </div>
                
                <span className="text-base lg:text-lg font-bold text-gray-800 text-center leading-tight px-2">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-15 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-3xl font-semibold text-center">
            HarvestBites Bestsellers
          </h1>
          <br />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
            {products.slice(0, 5).map((product, i) => (
              <div
                key={product.id}
                className="bg-card rounded-none overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[4/3] bg-white overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Leaf className="h-20 w-20 text-primary" />
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-emerald-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                      <Star className="h-3 w-3 fill-white" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.reviews} reviews
                    </span>
                  </div> 
                  <br />

                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-foreground hover:text-primary transition-colors leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-foreground">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="w-full rounded-none bg-gradient-to-b from-[#7b0000] to-[#b30000] text-white border-none hover:from-[#8c0000] hover:to-[#cc0000]"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why HarvestBites */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Why HarvestBites?
            </h2>
            <p className="hidden md:block text-sm tracking-[0.3em] text-orange-500 font-semibold">
              HEALTHY INSIDE, HAPPY OUTSIDE
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16 max-w-6xl mx-auto">
            <div className="lg:pr-12 space-y-6">
              <span className="text-[80px] md:text-[100px] font-light text-orange-400 block leading-none">
                01
              </span>
              <h3 className="text-xl md:text-2xl font-bold uppercase text-black leading-tight">
                HarvestBites Nutrition & Wellness Lab
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-lg">
                Experts at HarvestBites Nutrition & Wellness Lab, including certified nutritionists, food scientists, and health specialists with over 5 years of combined experience, develop our millet-based formulations using scientifically researched and quality-tested ingredients.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end pt-8 lg:pt-0">
              <img
                src={whyKapivaFlower1}
                alt="HarvestBites Nutrition Lab"
                className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[380px] object-contain drop-shadow-2xl bg-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16 max-w-6xl mx-auto">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1 pt-8 lg:pt-0">
              <img
                src={whyKapivaFlower2}
                alt="HarvestBites Quality Ingredients"
                className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[380px] object-contain drop-shadow-2xl bg-transparent"
              />
            </div>

            <div className="lg:pl-12 space-y-6 order-1 lg:order-2 text-right lg:text-right">
              <span className="text-[80px] md:text-[100px] font-light text-orange-400 block leading-none">
                02
              </span>
              <h3 className="text-xl md:text-2xl font-bold uppercase text-black leading-tight">
                Best Quality Ingredients
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-lg">
                We source premium millets from trusted farms across India. Each ingredient is carefully selected and slow-processed to retain natural goodness.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <div className="lg:pr-12 space-y-6">
              <span className="text-[80px] md:text-[100px] font-light text-orange-400 block leading-none">
                03
              </span>
              <h3 className="text-xl md:text-2xl font-bold uppercase text-black leading-tight">
                Crafted with Care for Everyday Nutrition
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-lg">
                Our food experts combine traditional millet wisdom with modern food science to create balanced formulations for daily nutrition and sustained energy.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end pt-8 lg:pt-0">
              <img
                src={whyKapivaFlower3}
                alt="HarvestBites Everyday Nutrition"
                className="w-[280px] sm:w-[320px] md:w-[340px] lg:w-[380px] object-contain drop-shadow-2xl bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white">
        <div className="w-full">
          <img
            src={videoBanner}
            alt="Customer Testimonials Banner"
            className="w-full h-[220px] sm:h-[280px] md:h-[340px] lg:h-[400px] object-cover"
          />
        </div>
      </section>

      {/* VIDEO TESTIMONIALS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">
            Don't just take our word for it!Hear it from our Happy Customers! 
          </h2>

          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 justify-start md:justify-center">
            {youtubeVideos.map((video) => (
              <div
                key={video.id}
                className="min-w-[220px] h-[390px] rounded-2xl overflow-hidden shadow-md bg-black"
              >
                <iframe
                  src={`${video.url}?rel=0&modestbranding=1`}
                  title="Customer Review"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {youtubeVideos.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === 1 ? "bg-black" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Begin ur Nithyaposhanam routine
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Choose a blend that matches your family's needs and make it a
              small, repeatable part of every day.
            </p>
            <Button variant="golden" size="lg" asChild>
              <Link to="/shop">
                Explore our collection
                <ArrowRight className="h-5 w-5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home;
