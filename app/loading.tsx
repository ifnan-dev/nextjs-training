export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-100 animate-pulse">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="h-8 w-36 bg-gray-300 rounded"></div>
          <div className="flex gap-4">
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <section className="grid gap-6 sm:grid-cols-2">
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-6">
            <div className="h-7 w-40 bg-gray-300 rounded mb-6 mx-auto"></div>

            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg p-4 shadow-sm mb-4"
              >
                <div className="h-5 w-3/4 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="h-7 w-32 bg-gray-300 rounded mb-6"></div>

            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border rounded-lg p-4 mb-4">
                <div className="h-5 w-3/4 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
