// pages/LoadingPage.jsx

import LoadingCard from "./loading-card";
const LoadingPage = () => {
  const placeholders = Array.from({ length: 8 });

  return (
    <div className="min-h-screen w-full  flex justify-center px-4 py-10">
      <section className="max-w-7xl w-full justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {placeholders.map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default LoadingPage;
