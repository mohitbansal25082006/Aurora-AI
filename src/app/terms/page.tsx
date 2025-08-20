import Link from 'next/link';

export default function TermsPage() {
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
            Terms of Service
          </h1>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing and using Aurora AI, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-gray-300 mb-6">
              Permission is granted to temporarily download one copy of Aurora AI for personal, non-commercial transitory viewing only.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
            <p className="text-gray-300 mb-6">
              The information on Aurora AI is provided on an as is basis. We make no warranties of any kind, expressed or implied.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
            <p className="text-gray-300 mb-6">
              In no event shall Aurora AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Aurora AI.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
            <p className="text-gray-300 mb-6">
              The materials appearing on Aurora AI could include technical, typographical, or photographic errors. Aurora AI does not warrant that any of the materials on its website are accurate, complete, or current.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">6. Links</h2>
            <p className="text-gray-300 mb-6">
              Aurora AI has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
            <p className="text-gray-300 mb-6">
              Aurora AI may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
            <p className="text-gray-300">
              These terms and conditions are governed by and construed in accordance with the laws of [Jurisdiction] and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}