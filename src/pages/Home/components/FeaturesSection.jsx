import React from "react";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-100 text-gray-800" id="cloud-dynamo">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Run Dynamo Scripts in the Cloud
        </h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto">
          Accelerate your BIM workflows with unlimited cloud power—no local
          hardware needed. You only need to connect your ACC account to the app.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4">On-Demand Execution</h3>
            <p>Launch scripts from any device and get results in minutes.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4">Auto Scaling</h3>
            <p>
              Process multiple scripts in parallel with resources that match
              your workload.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-4">Quick Setup</h3>
            <p>
              Simply connect your Autodesk Construction Cloud account—no servers
              to configure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
