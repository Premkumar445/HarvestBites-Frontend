import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { allProducts } from "@/data/products";
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingBag,
  Star,
  Leaf,
  Check,
  ChevronDown,
  X,
  HelpCircle, 
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // ✅ NEW: Success modal state
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [selectedAspect, setSelectedAspect] = useState("");

  const numericId = Number(id);
  const product = allProducts.find((p) => p.id === numericId);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <button className="px-6 py-2 rounded-full bg-amber-500 text-white font-semibold">
            <Link to="/shop">Back to Shop</Link>
          </button>
        </div>
      </Layout>
    );
  }

  // gallery: main + extra thumbnails
  const images =
    product.images && product.images.length > 0
      ? [product.image, ...product.images]
      : [product.image];

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        mode: "buynow",
        item: {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
        },
      },
    });
  };

  // 🔥 PRODUCT SPECIFIC REVIEWS - DYNAMIC DATA FROM PRODUCTS.JS
  const reviews = product.productReviews || [];
  const ratingData = product.ratingData || [];
  const totalReviews = product.totalReviews || product.reviews || 0;
  const avgRating = product.avgRating || product.rating || 4.5;

  const renderStars = (rating, clickable = false) => {
    return (
      <div className="flex items-center gap-1 -space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 transition-all ${clickable ? 'cursor-pointer' : ''} ${
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/50"
            }`}
            onClick={clickable ? () => setReviewRating(star) : undefined}
          />
        ))}
      </div>
    );
  };

  // ✅ UPDATED: Show success modal after review submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log({
      rating: reviewRating,
      comment: reviewComment,
      aspect: selectedAspect,
      productId: product.id,
    });
    
    // Close review modal first
    setIsReviewModalOpen(false);
    
    // Reset form
    setReviewRating(0);
    setReviewComment("");
    setSelectedAspect("");
    
    // Show success modal after short delay
    setTimeout(() => {
      setIsSuccessModalOpen(true);
    }, 300);
  };

  const productAspects = [
    "Taste",
    "Packaging",
    "Value for Money",
    "Quality",
    "Delivery",
  ];

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-sand to-background">
        <div className="container mx-auto px-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-sand to-muted overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {images[selectedImage] ? (
                    <img
                      src={images[selectedImage] as string}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="h-48 w-48 rounded-full bg-primary/20 flex items-center justify-center">
                      <Leaf className="h-24 w-24 text-primary" />
                    </div>
                  )}
                </div>

                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {product.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-secondary text-secondary-foreground text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`flex-1 aspect-square rounded-xl bg-gradient-to-br from-sand to-muted flex items-center justify-center transition-all ${
                      selectedImage === i
                        ? "ring-2 ring-primary ring-offset-2"
                        : "hover:opacity-80"
                    }`}
                  >
                    {img ? (
                      <img
                        src={img as string}
                        alt={`${product.name} ${i + 1}`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <Leaf className="h-8 w-8 text-primary/50" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  {product.benefit}
                </span>
                <h1 className="font-display text-4xl font-bold text-foreground mt-2">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  {product.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">
                  ₹{product.price}
                </span>
                <span className="text-muted-foreground">/ pack</span>
              </div>

              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.description}
              </p>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-3 bg-muted rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-12 w-12 rounded-full bg-background hover:bg-card flex items-center justify-center transition-colors"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-12 text-center text-lg font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-12 w-12 rounded-full bg-background hover:bg-card flex items-center justify-center transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 h-14 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-semibold shadow-md hover:opacity-90 transition"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Buy Now
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  "No Maida",
                  "No Refined Sugar",
                  "No Preservatives",
                  "FSSAI Certified",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {product.ingredients && (
                <div className="pt-6 border-t border-border">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Ingredients
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.nutrition && (
                <div className="pt-6 border-t border-border">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Nutritional Highlights
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {product.nutrition.map((item) => (
                      <div key={item.label} className="text-center">
                        <p className="text-lg font-bold text-primary">
                          {item.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>


           {/* 🔥 FAQ SECTION - REVIEW SUMMARY KU MELA */}
<div className="mt-20 mb-12">
  <div className="bg-card rounded-3xl p-8 border border-border shadow-lg">
    <h3 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
      <HelpCircle className="h-8 w-8 text-primary" />
      <span>FAQs</span>
    </h3>
    
    <div className="space-y-1">
      {product.faqs?.map((faq, index) => (
        <div key={index} className="border-b border-border/50 pb-4 last:border-b-0">
          <button 
            className="w-full text-left py-4 pr-4 group hover:bg-muted/50 rounded-xl transition-all cursor-pointer"
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-medium text-foreground flex-1 text-left leading-tight">
                {faq.question}
              </span>
              <ChevronDown 
                className={`h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                  openFAQ === index ? 'rotate-180' : ''
                }`}
              />
            </div>
          </button>
          
          {openFAQ === index && (
            <div className="ml-2 pl-2 pt-2 pb-4 text-muted-foreground text-sm leading-relaxed border-l-2 border-primary/30">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
      
      {(!product.faqs || product.faqs.length === 0) && (
        <p className="text-center text-muted-foreground py-12 italic">
          No FAQs available for this product
        </p>
      )}
    </div>
  </div>
</div>    

// ProductDetail.tsx la RETURN closing tag ku mundu (modals ku aprm)
{/* 🔥 PERFECT WHATSAPP BUTTON - IMAGE EXACT COPY */}
<div className="fixed bottom-24 right-6 z-40 md:bottom-6">
  <a
    href={`https://wa.me/919876543210?text=Hi!%20${encodeURIComponent(product.name)}%20pathi%20ennalum%20ketka%20venum%20pa%20🚀`}
    target="_blank"
    rel="noopener noreferrer"
    className="block"
  >
    {/* EXACT WHATSAPP BUTTON */}
    <div className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]">
      
      {/* OFFICIAL WHATSAPP ICON - EXACT SIZE & STYLE */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="#FFFFFF"
        className="drop-shadow-sm"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.446l-.232-.139-3.578.505.107-3.483.232-.139a9.87 9.87 0 011.446-5.031l.139-.232.505 3.578-.107 3.483z"/>
      </svg>

      {/* TINY ONLINE DOT - IMAGE LA IRUKARA SIZE */}
      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white shadow-sm animate-ping" />
    </div>
  </a>
</div>


          {/* REVIEW SUMMARY SECTION */}
          <div className="mt-20 mb-12">
            <div className="bg-card rounded-3xl p-8 border border-border shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {renderStars(avgRating)}
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Product Reviews
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Based on {totalReviews} reviews
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-all flex items-center gap-1"
                >
                  Write Review
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {ratingData.map(({ stars, count, percentage }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 w-39">
                      {renderStars(stars, false)}
                      <span className="text-sm font-medium text-foreground">{stars}</span>
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2 relative overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium w-12 text-right">
                      {count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Sort by: <span className="font-medium text-foreground">Helpful</span>
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>View all</span>
                  <ChevronDown className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>

          {/* REVIEWS SECTION */}
          <div className="mt-12 pb-20">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl p-8 border border-border hover:shadow-xl transition-all hover:-translate-y-2"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating, false)}
                      <span className="font-semibold text-foreground">
                        {review.rating}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-medium rounded-full">
                      {review.productAspect}
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{review.comment}"
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">
                      — {review.name}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">
                      {review.timeAgo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ WRITE REVIEW MODAL */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-border/50">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Review {product.name}
              </h2>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-2 hover:bg-muted rounded-xl transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {renderStars(reviewRating, true)}
                  <span className="text-lg font-semibold text-foreground">
                    {reviewRating || "Select rating"}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  What did you like most?
                </label>
                <select
                  value={selectedAspect}
                  onChange={(e) => setSelectedAspect(e.target.value)}
                  className="w-full p-3 border border-border rounded-2xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                >
                  <option value="">Choose an aspect</option>
                  {productAspects.map((aspect) => (
                    <option key={aspect} value={aspect}>
                      {aspect}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Share your experience
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell us what you liked and how it made you feel..."
                  rows={4}
                  className="w-full p-4 border border-border rounded-2xl bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-vertical"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!reviewRating || !reviewComment.trim() || !selectedAspect}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <Star className="h-5 w-5 fill-current" />
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ SUCCESS MODAL - EXACTLY LIKE YOUR SCREENSHOT */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 w-full max-w-sm max-h-[85vh] overflow-hidden">
            {/* Header with X close */}
            <div className="p-6 pb-2 flex items-start justify-between">
              <div className="flex-1" />
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Main Success Content */}
            <div className="px-6 pb-8 text-center">
              {/* Success Check Icon */}
              <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Check className="h-12 w-12 text-green-500" />
              </div>

              {/* Title */}
              <h2 className="font-bold text-2xl text-gray-900 mb-2 leading-tight">
                All done!
              </h2><br></br>

              
             
              <h6 className="font-bold text-2xl text-gray-900 mb-2 leading-tight">
                Thank you! Your review will be posted soon!
              </h6>
              

             

              {/* Browse Section */}
             
            </div>

            {/* Footer Attribution */}
            
          </div>
        </div>
      )}
    </Layout>
  );
}
