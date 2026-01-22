import { Layout } from "@/components/layout/Layout";

export default function TermsAndConditions() {
  return (
    <Layout>
      <section className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* Title */}
            <div className="text-center space-y-4">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Terms & Conditions
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: January 2026
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8 text-sm leading-relaxed text-foreground">

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  1. Introduction
                </h2>
                <p>
                  Welcome to Harvest Bites. By accessing or using our website,
                  you agree to be bound by these Terms & Conditions, applicable
                  laws, and regulations. If you do not agree, please refrain
                  from using our services.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  2. Eligibility
                </h2>
                <p>
                  You must be at least 18 years of age to place an order on
                  Harvest Bites. By using this website, you confirm that you
                  are legally capable of entering into a binding contract.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  3. Product Information
                </h2>
                <p>
                  All products displayed on Harvest Bites are food products
                  intended for general wellness. Product images are for
                  representation purposes only. Actual packaging may vary.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  4. Pricing & Payments
                </h2>
                <p>
                  Prices are listed in Indian Rupees (INR) and are inclusive of
                  applicable taxes unless stated otherwise. Payments are
                  processed through secure third-party payment gateways.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  5. Shipping & Delivery
                </h2>
                <p>
                  Orders are usually dispatched within 1–2 business days.
                  Delivery timelines depend on location and courier service
                  availability.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  6. Returns & Refunds
                </h2>
                <p>
                  Due to the perishable nature of food products, returns are
                  not accepted. Refunds or replacements are provided only in
                  case of damaged or incorrect deliveries reported within
                  48 hours.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  7. Intellectual Property
                </h2>
                <p>
                  All content on this website including logos, text, graphics,
                  and designs are the property of Harvest Bites and protected
                  under applicable laws.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  8. Limitation of Liability
                </h2>
                <p>
                  Harvest Bites shall not be liable for any indirect,
                  incidental, or consequential damages arising from the use
                  of our products or website.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  9. Changes to Terms
                </h2>
                <p>
                  Harvest Bites reserves the right to update or modify these
                  Terms & Conditions at any time without prior notice.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  10. Contact Information
                </h2>
                <p>
                  For any questions regarding these Terms & Conditions, please
                  contact us at <strong>support@harvestbites.in</strong>
                </p>
              </section>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
