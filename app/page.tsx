'use client'
import { useState, useEffect } from 'react';
import GameMap from '../components/GameMap';
import GamePanel from '../components/GamePanel';
import { getDistance } from '../utils/distance';
import { cities } from '../utils/cities';

interface LatLng {
  lat: number;
  lng: number;
}

const Home = () => {
  const [score, setScore] = useState<number>(1500);
  const [currentCity, setCurrentCity] = useState(cities[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [playerPosition, setPlayerPosition] = useState<LatLng | null>(null);

  const handleMapClick = (latlng:any) => {
    setPlayerPosition(latlng);
  };

  const handleConfirm = () => {
    if (playerPosition) {
      const distance = getDistance(
        playerPosition.lat,
        playerPosition.lng,
        currentCity.position.lat,
        currentCity.position.lng
      );
      setScore(score - distance);
      if (currentIndex < cities.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentCity(cities[currentIndex + 1]);
      } else {
        alert(`Game Over! Your score: ${score}`);
      }
    }
  };

  useEffect(() => {
    if (score <= 0) {
      alert('Game Over! No kilometers left.');
      setScore(1500);
      setCurrentIndex(0);
      setCurrentCity(cities[0]);
    }
  }, [score]);

  return (
    <div>
      <GamePanel score={score} currentCity={currentCity} onConfirm={handleConfirm} />
      <GameMap onMapClick={handleMapClick} />
    </div>
  );
};

export default Home;
