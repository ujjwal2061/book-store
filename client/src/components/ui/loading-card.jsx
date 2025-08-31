// components/LoadingCard.jsx
const LoadingCard = () => {
  return (
    <div className="animate-pulse border rounded-2xl p-4 shadow-sm w-full bg-black">
      <div className="h-40 w-full bg-black/40  border  border-black  shadow rounded-xl mb-4"></div>

      <div className="h-4 bg-black/40    border  border-black shadow rounded w-3/4 mb-2"></div>

      <div className="h-4 bg-black/40   border  border-black shadowrounded w-1/2 mb-4"></div>

      <div className="h-8 bg-black/40  border  border-black shadow rounded-lg w-1/3"></div>
    </div>
  );
};

export default LoadingCard;
