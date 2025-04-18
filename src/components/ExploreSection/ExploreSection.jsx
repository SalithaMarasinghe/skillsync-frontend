import React, { useState } from "react";

const mockFollowers = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    handle: "@johndoe",
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    handle: "@janesmith",
  },
];

const mockFollowing = [
  {
    id: 3,
    name: "Michael Lee",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    handle: "@michaell",
  },
  {
    id: 4,
    name: "Emily Clark",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    handle: "@emilyclark",
  },
];

const ExploreSection = () => {
  const [tab, setTab] = useState("followers");

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md mt-0 border border-gray-200 flex flex-col min-h-[500px] max-h-full">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Explore</h2>
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === "followers" ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-700"}`}
          onClick={() => setTab("followers")}
        >
          Followers
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${tab === "following" ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-700"}`}
          onClick={() => setTab("following")}
        >
          Following
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {tab === "followers" ? (
          mockFollowers.length === 0 ? (
            <p className="text-gray-500">No followers yet.</p>
          ) : (
            <ul className="space-y-4">
              {mockFollowers.map((user) => (
                <li key={user.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                  <img src={user.photo} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-gray-800">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.handle}</div>
                  </div>
                </li>
              ))}
            </ul>
          )
        ) : (
          mockFollowing.length === 0 ? (
            <p className="text-gray-500">Not following anyone yet.</p>
          ) : (
            <ul className="space-y-4">
              {mockFollowing.map((user) => (
                <li key={user.id} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                  <img src={user.photo} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-gray-800">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.handle}</div>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
};

export default ExploreSection;
