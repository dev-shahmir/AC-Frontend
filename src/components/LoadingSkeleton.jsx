// import React from 'react'

const LoadingSkeleton = () => {
  return (
     <div className="bg-[#ffefcc] min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
          <div className="animate-pulse">
            <div className="bg-[#80011f] h-64 sm:h-96 lg:h-[500px] rounded-lg mb-4"></div>
            <div className="flex justify-between gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#80011f] h-12 sm:h-16 w-12 sm:w-16 rounded"
                ></div>
              ))}
            </div>
          </div>
          <div className="animate-pulse space-y-4 sm:space-y-6">
            <div className="bg-[#80011f] h-6 sm:h-8 w-3/4 rounded"></div>
            <div className="bg-[#80011f] h-4 sm:h-6 w-1/2 rounded"></div>
            <div className="space-y-2">
              <div className="bg-[#80011f] h-3 sm:h-4 w-full rounded"></div>
              <div className="bg-[#80011f] h-3 sm:h-4 w-2/3 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSkeleton