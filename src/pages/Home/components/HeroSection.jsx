import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-600 text-white text-center p-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Run Dynamo Scripts in the Cloud
      </h1>
      <p className="text-lg md:text-xl max-w-xl">
        Discover the power of cloud computing for your Dynamo scripts.
      </p>
      <button className="mt-6 px-8 py-3 bg-white text-blue-500 font-medium rounded-md shadow-lg hover:bg-gray-200 transition">
        Request a Demo
      </button>
    </section>
  );
};

export default HeroSection;
