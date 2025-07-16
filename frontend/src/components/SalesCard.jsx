import { Link } from "react-router-dom";

export default function SalesCard({ sale }) {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-bold">{sale.title}</h2>
        <p className="text-sm text-gray-600">{sale.description}</p>

        {sale.image && (
          <img src={sale.image} alt="Sale" className="w-full h-48 object-cover mt-3 rounded" />
        )}

        <div className="mt-3">
          <Link to={`/shop/${sale.shop._id}`} className="text-blue-600 underline">
            Visit Shop
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 p-2 flex justify-between items-center text-sm">
        <div>
          Shop: <span className="font-semibold">{sale.shop.name}</span>
        </div>
        <div>Views: {sale.views}</div>
      </div>
    </div>
  );
}
