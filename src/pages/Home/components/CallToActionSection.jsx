import React from "react";

const CallToActionSection = () => {
  return (
    <section className="py-16 bg-green-500 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">¡Empieza Ahora!</h2>
      <p className="text-lg mb-6">
        Connect your Autodesk Construction Cloud account and start running
      </p>
      <button className="px-8 py-3 bg-white text-green-500 font-medium rounded-md shadow-lg hover:bg-gray-200 transition">
        Login for free
      </button>
    </section>
  );
};

export default CallToActionSection;
