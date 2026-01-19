import { Layout } from "@/components/layout/Layout";

export default function CancellationRefundPolicy() {
  return (
    <Layout>
      <section className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* Title */}
            <div className="text-center space-y-4">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Cancellation & Refund Policy
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: January 2026
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8 text-sm leading-relaxed text-foreground">

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Order Cancellation
                </h2>
                <p>
                  Orders once placed on Harvest Bites cannot be cancelled after
                  processing due to the perishable nature of food products.
                  If you wish to cancel your order, please contact us
                  immediately after placing it.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Non-Returnable Products
                </h2>
                <p>
                  All food items sold on Harvest Bites are non-returnable.
                  Returns are not accepted once the product has been delivered.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Damaged or Incorrect Products
                </h2>
                <p>
                  If you receive a damaged, expired, or incorrect product,
                  please notify us within <strong>48 hours</strong> of delivery
                  along with clear images of the product and packaging.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Refund Process
                </h2>
                <p>
                  Once your complaint is verified, a refund or replacement will
                  be initiated. Refunds will be processed to the original
                  payment method within <strong>5–7 business days</strong>.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Late or Missing Refunds
                </h2>
                <p>
                  If you have not received your refund after the specified time,
                  please check with your bank or payment provider before
                  contacting us for assistance.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Contact Information
                </h2>
                <p>
                  For any questions regarding cancellations or refunds, please
                  contact us at{" "}
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
