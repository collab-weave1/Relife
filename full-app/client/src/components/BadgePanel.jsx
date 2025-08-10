import { Globe, Package, Sprout, TreePine, Heart } from "lucide-react";

const badges = [
  {
    key: "ecoInitiator",
    label: "Eco Initiator",
    icon: <Sprout className="w-6 h-6 text-green-500" />,
    tip: "Celebrate your first step toward making e-waste matter!"
  },
  {
    key: "firstPickup",
    label: "First Pickup",
    icon: <Package className="w-6 h-6 text-blue-500" />,
    tip: "You’ve scheduled your very first pickup request"
  },
  {
    key: "referralHero",
    label: "Referral Hero",
    icon: <Globe className="w-6 h-6 text-indigo-500" />,
    tip: "You’ve invited 3 friends who also signed up"
  },
  {
    key: "collectionConnoisseur",
    label: "Collection Connoisseur",
    icon: <TreePine className="w-6 h-6 text-yellow-500" />,
    tip: "You’ve completed 5 pickups"
  },
  {
    key: "marketplaceMaven",
    label: "Marketplace Maven",
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    tip: "You bought or sold your first refurbished device"
  },
];

export const BadgePanel = () => (
  <aside className="space-y-4">
    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
      🎖 Your Badges
    </h3>
    <ul className="space-y-3">
      {badges.map(b => (
        <li
          key={b.key}
          className="relative group flex items-center space-x-3 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow hover:shadow-xl transition"
        >
          {b.icon}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {b.label}
          </span>
          <div
            className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity
                       absolute left-full top-1/2 -translate-y-1/2 ml-3 w-48 p-2
                       bg-gray-900 text-white text-sm rounded"
          >
            {b.tip}
          </div>
        </li>
      ))}
    </ul>
  </aside>
);