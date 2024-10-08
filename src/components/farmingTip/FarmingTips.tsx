import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLightbulb } from 'react-icons/fa';


interface FarmingTip {
  id: number;
  tipTitle: string;
  tipDescription: string;
}

const FarmingTips: React.FC = () => {
  const [tips, setTips] = useState<FarmingTip[]>([]);
  const [currentTip, setCurrentTip] = useState<FarmingTip | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/tips`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTips(response.data);
      } catch (err) {
        console.error('Failed to fetch tips.');
      }
    };

    fetchTips();
  }, []);

  useEffect(() => {
    const lastShownTipId = localStorage.getItem('lastTipId');
    if (tips.length > 0) {
      const newTip = getRandomTip(tips, lastShownTipId);
      setCurrentTip(newTip);
      localStorage.setItem('lastTipId', String(newTip.id));
    }
  }, [tips]);

  const getRandomTip = (tips: FarmingTip[], lastShownTipId: string | null): FarmingTip => {
    let randomTip = tips[Math.floor(Math.random() * tips.length)];
    while (randomTip.id.toString() === lastShownTipId) {
      randomTip = tips[Math.floor(Math.random() * tips.length)];
    }
    return randomTip;
  };

  return (
    <div className="bg-[rgba(192,241,150,1)] p-6 rounded-xl shadow-sm mt-10 relative w-full  font-raleway">
      <div className="absolute top-[-15px] right-[-15px] bg-[rgba(192,241,150,1)] rounded-full p-3 z-30">
        <FaLightbulb className="text-[#01815d] h-8 w-8" />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md relative">
        <div className={` relative`}>
          <h3 className="text-lg font-bold mb-2">Farming Tips</h3>
          {currentTip ? (
            <div>
              <h4 className="font-semibold">{currentTip.tipTitle}</h4>
              <p className="text-gray-700 italic">{`"${currentTip.tipDescription}"`}</p>
            </div>
          ) : (
            <p className="text-gray-700">No tips available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmingTips;
