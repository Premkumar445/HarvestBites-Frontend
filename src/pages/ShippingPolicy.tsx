import { Layout } from "@/components/layout/Layout";

export default function ShippingPolicy() {
  return (
    <Layout>
      <section className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* Title */}
            <div className="text-center space-y-4">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Shipping Policy
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: January 2026
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8 text-sm leading-relaxed text-foreground">

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Shipping Coverage
                </h2>
                <p>
                  Harvest Bites currently ships across India. We partner with
                  reliable courier services to ensure safe and timely delivery
                  of your orders.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Order Processing Time
                </h2>
                <p>
                  Orders are usually processed within <strong>1–2 business
                  days</strong> after successful payment confirmation.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Delivery Timeline
                </h2>
                <p>
                  Delivery typically takes <strong>3–7 business days</strong>
                  depending on your location. Metro cities may receive orders
                  faster than remote locations.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Shipping Charges
                </h2>
                <p>
                  Shipping charges, if applicable, will be clearly displayed
                  at checkout before order confirmation.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Delays in Delivery
                </h2>
                <p>
                  While we strive to deliver orders on time, delays may occur
                  due to unforeseen circumstances such as weather conditions,
                  courier delays, or regional restrictions.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Incorrect Address
                </h2>
                <p>
                  Please ensure that the shipping address provided at checkout
                  is accurate. Harvest Bites will not be responsible for
                  delivery failures due to incorrect or incomplete addresses.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Contact Information
                </h2>
                <p>
                  For shipping-related queries, please contact us at{" "}
                  <strong>support@harvestbites.in</strong>
                </p>
              </section>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
