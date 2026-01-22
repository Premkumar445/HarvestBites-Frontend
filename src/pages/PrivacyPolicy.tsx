import { Layout } from "@/components/layout/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <section className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">

            {/* Title */}
            <div className="text-center space-y-4">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Privacy Policy
              </h1>
              <p className="text-sm text-muted-foreground">
                Last updated: January 2026
              </p>
            </div>

            {/* Content */}
            <div className="space-y-8 text-sm leading-relaxed text-foreground">

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Introduction
                </h2>
                <p>
                  Harvest Bites respects your privacy and is committed to
                  protecting your personal information. This Privacy Policy
                  explains how we collect, use, and safeguard your data when
                  you visit our website.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Information We Collect
                </h2>
                <p>
                  We may collect personal information such as your name,
                  email address, phone number, delivery address, and payment
                  details when you place an order or contact us.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  How We Use Your Information
                </h2>
                <p>
                  Your information is used to process orders, deliver products,
                  provide customer support, improve our services, and send
                  order-related communications.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Payment Security
                </h2>
                <p>
                  We do not store your payment card details. All transactions
                  are processed securely through trusted third-party payment
                  gateways that comply with industry security standards.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Data Sharing
                </h2>
                <p>
                  We do not sell or rent your personal information to third
                  parties. Data may be shared only with delivery partners and
                  service providers strictly for order fulfillment.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Cookies
                </h2>
                <p>
                  Our website uses cookies to enhance user experience and
                  analyze website traffic. You may choose to disable cookies
                  through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Data Protection
                </h2>
                <p>
                  We implement appropriate security measures to protect your
                  personal data against unauthorized access, alteration, or
                  disclosure.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Policy Updates
                </h2>
                <p>
                  Harvest Bites may update this Privacy Policy from time to
                  time. Any changes will be posted on this page.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-lg mb-2">
                  Contact Us
                </h2>
                <p>
                  If you have any questions regarding this Privacy Policy,
                  please contact us at{" "}
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
