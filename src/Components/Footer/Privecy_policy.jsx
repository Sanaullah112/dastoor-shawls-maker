import React from "react";

const Privacy_Policy = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8 sm:p-12">
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-gray-600">Last updated: October 7, 2025</p>
        </header>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            At <strong>Dastoor Shawls Maker</strong> ("we", "us", "our"), your
            privacy matters. This Privacy Policy explains what information we
            collect, how we use it, and the choices you have. By using our
            website and services, you agree to the collection and use of
            information in accordance with this policy.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              1. Information We Collect
            </h2>
            <ul className="mt-2 list-disc list-inside">
              <li>
                <strong>Information you provide:</strong> name, email address,
                shipping and billing addresses, phone number, and any other
                details you share when placing an order or contacting us.
              </li>
              <li>
                <strong>Payment information:</strong> we do not store full card
                details. Payments are securely processed through trusted third
                parties.
              </li>
              <li>
                <strong>Device and usage data:</strong> includes IP address,
                browser type, operating system, pages viewed, and referral
                source.
              </li>
              <li>
                <strong>Marketing data:</strong> if you subscribe to our
                newsletter, we collect your email and preferences.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              2. How We Use Your Information
            </h2>
            <p className="mt-2">
              We use your data to process orders, provide customer support,
              improve our services, send updates (if you’ve opted in), and meet
              legal obligations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              3. Cookies and Tracking
            </h2>
            <p className="mt-2">
              We use cookies to improve your browsing experience. You can manage
              cookie settings in your browser at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              4. Sharing and Disclosure
            </h2>
            <p className="mt-2">
              We share information only with trusted service providers (like
              shipping companies and payment processors). We never sell your
              personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              5. Data Retention
            </h2>
            <p className="mt-2">
              We keep your data as long as necessary to fulfill the purposes
              described in this policy or as required by law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              6. Your Rights
            </h2>
            <ul className="mt-2 list-disc list-inside">
              <li>Request access or correction of your data.</li>
              <li>Request deletion of your information where applicable.</li>
              <li>Unsubscribe from marketing emails anytime.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">7. Security</h2>
            <p className="mt-2">
              We use appropriate technical and organizational measures to
              safeguard your information, but no online system is completely
              secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">8. Contact Us</h2>
            <p className="mt-2 text-gray-700">
              For privacy concerns or data requests, contact us at:
            </p>
            <p className="mt-2">
              <a
                href="mailto:sanaarman033@gmail.com?subject=Privacy%20Inquiry&body=Hi%20Dastoor%20Shawls%20Maker,%0D%0AI%20would%20like%20to%20ask%20about..."
                className="text-indigo-600 hover:underline"
              >
                sanaarman033@gmail.com
              </a>
            </p>
          </div>

          <footer className="mt-6 text-sm text-gray-500">
            This policy is provided to help you understand how your data is
            handled by Dastoor Shawls Maker.
          </footer>
        </section>
      </div>
    </main>
  );
};

export default Privacy_Policy;
