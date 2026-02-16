import React from "react";

const stats = [
  { label: "Years Experience", value: "40+" },
  { label: "Happy Clients", value: "1000+" },
  { label: "Projects Done", value: "1200+" },
  { label: "Team Members", value: "3+" },
];

const values = [
  {
    id: 1,
    title: "Which Time Spend products",
    desc: "Any Time Custamer Order and 24 hours Delivery .",
  },
  {
    id: 2,
    title: "Quality",
    desc: "Every product goes through Best quality standards  and Good  .",
  },
  {
    id: 3,
    title: "Trust",
    desc: "Long-term relationships built on transparency and honesty.",
  },
];

const team = [
  {
    name: "Abdul Azim",
    role: "Full stack developer",
    img: "data:image/jpeg;base64,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",
  },
  {
    name: "Abdul Khalik",
    role: "Product Manager",
    img: "data:image/jpeg;base64,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",
  },
  {
    name: "Abdulla",
    role: "Shop Managment",
    img: "data:image/jpeg;base64,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",
  },
  {
    name: "Abdul sami",
    role: "Managment Customer",
    img: "data:image/jpeg;base64,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",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="max-w-2xl mx-auto text-lg text-indigo-100">
            At A G Traders, our mission is to provide high-quality wooden
            products that enhance your cooking experience. We are committed to
            customer satisfaction, offering exceptional service and value.
          </p>
        </div>
      </section>

      <hr class="h-px my-8 bg-neutral-quaternary border-0" />

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">A G Traders</h2>
            <p className="mb-4 text-gray-600">
              At A G Traders, our mission is to provide high-quality wooden
              products that enhance your cooking experience. We are committed to
              customer satisfaction, offering exceptional service and value..
            </p>
            <p className="text-gray-600">
              With years of experience and a customer-first approach, we ensure
              every project meets business goals and user needs.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
              >
                <h3 className="text-3xl font-bold text-indigo-600">
                  {item.value}
                </h3>
                <p className="text-gray-600 mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="p-8 rounded-xl bg-indigo-50">
            <h3 className="text-2xl font-semibold mb-3 text-indigo-700">
              Our Mission
            </h3>
            <p className="text-gray-700">
              To empower businesses with innovative and reliable digital
              solutions that drive growth and efficiency.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-purple-50">
            <h3 className="text-2xl font-semibold mb-3 text-purple-700">
              Our Vision
            </h3>
            <p className="text-gray-700">
              To become a trusted global partner for technology and design,
              known for creativity and excellence.
            </p>
          </div>
        </div>
      </section>

      <hr className="max-w-[50%] mx-auto " />

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Meet Our Team</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:-translate-y-2 hover:shadow-xl transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="group p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-xl hover:-translate-y-1 transition"
          >
            <h4 className="text-3xl font-extrabold text-indigo-600">
              {stat.value}
            </h4>
            <p className="mt-2 text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
      <hr className="max-w-[50%] mx-auto " />
    </div>
  );
};

export default AboutUs;
