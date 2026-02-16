import React from "react";

const products = [
  {
    id: 1,
    title: "Dandi",
    price: "₹30",
    image: "src/Images/lambi.png",
  },
  {
    id: 2,
    title: "Marbal Cakla",
    price: "₹250",
    image: "src/Images/marbal.png.jpg",
  },
  {
    id: 3,
    title: "Sisam Chakla",
    price: "₹1,200",
    image: "src/Images/small.png",
  },
  {
    id: 4,
    title: "Wooden Mortar & Pestle",
    price: "₹900",
    image: "src/Images/WhatsApp Image 2025-12-21 at 02.29.46_233eb3b5.jpg",
  },
];

const ProductCard = () => {
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          A G Traders Products
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition overflow-hidden"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-xl font-bold text-indigo-600 mt-2">
                  {product.price}
                </p>

                <button className="mt-4 w-full rounded-xl bg-gray-900 text-white py-2 text-sm font-medium hover:bg-gray-800 transition">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
