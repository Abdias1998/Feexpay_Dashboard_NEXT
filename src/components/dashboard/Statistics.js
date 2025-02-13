import { useSelector } from "react-redux";

const Statistics = ({ paymentStats }) => {
  const operators = useSelector((state) => state?.operators?.operators);
  const isLoading = !paymentStats || paymentStats.length === 0;

  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-[20px] shadow-sm border border-gray animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-[20px] shadow-sm border border-primary">
      <h2 className="text-lg font-semibold mb-4">Statistiques de paiement</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>{"Visa"}</span>
            <span>{paymentStats.visa}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${paymentStats.visa}%` }}
            ></div>
          </div>
          <div className="flex justify-between">
            <span>{"Mastercard"}</span>
            <span>{paymentStats.mastercard}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${paymentStats.mastercard}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;