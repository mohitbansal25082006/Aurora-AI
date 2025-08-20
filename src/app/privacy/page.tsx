import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div>
          <div className="mb-8">
            <Link href="/">
              <button className="border border-gray-700 text-gray-300 hover:bg-gray-800 px-4 py-2 rounded-md transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-gray-300 mb-6">
              We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-gray-300 mb-6">
              We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
            <p className="text-gray-300 mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-gray-300 mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
            <p className="text-gray-300 mb-6">
              You have the right to access, update, or delete your personal information. You may also object to or restrict the processing of your personal information.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-gray-300 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at privacy@aurora-ai.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}