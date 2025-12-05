import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExchangeAlt, 
  faGem, 
  faHeadset, 
  faTruck, 
  faLeaf 
} from '@fortawesome/free-solid-svg-icons';

const policies = [
  { icon: faExchangeAlt, color: "text-gray-600", title: "Easy Exchange", desc: "Hassle-free exchange policy" },
  { icon: faGem, color: "text-purple-500", title: "Premium Quality", desc: "High quality products guaranteed" },
  { icon: faHeadset, color: "text-blue-500", title: "Customer Support", desc: "24/7 support for your convenience" },
  { icon: faTruck, color: "text-green-500", title: "Fast Delivery", desc: "Quick and reliable shipping" },
  { icon: faLeaf, color: "text-green-700", title: "Secure Payments", desc: "Your transactions are safe" },
];

const OurPolicy = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 overflow-hidden">
      <motion.div
        className="flex gap-8 px-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 18, ease: "linear" } }}
      >
        {policies.concat(policies).map((policy, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08, y: -6 }}
            className="flex-shrink-0 w-60 p-6 text-center rounded-3xl backdrop-blur-lg bg-white/70 border border-gray-200 shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl"
          >
            <FontAwesomeIcon 
              icon={policy.icon} 
              className={`mx-auto mb-4 text-5xl ${policy.color}`} 
            />
            <p className="font-semibold text-gray-900 text-lg mb-2">{policy.title}</p>
            <p className="text-gray-600 text-sm">{policy.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default OurPolicy;
