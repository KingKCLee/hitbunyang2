import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  address: string;
  title?: string;
  className?: string;
}

export default function KakaoMap({ address, title, className = "w-full h-[400px] rounded-2xl overflow-hidden shadow-lg" }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.kakao || !mapRef.current) return;

    const { kakao } = window;
    
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          const options = {
            center: coords,
            level: 3,
          };

          const map = new kakao.maps.Map(mapRef.current, options);

          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          if (title) {
            const infowindow = new kakao.maps.InfoWindow({
              content: `<div style="padding:5px;font-size:12px;font-weight:bold;color:#1C2D5A;">${title}</div>`,
            });
            infowindow.open(map, marker);
          }

          // Responsive map center
          const handleResize = () => {
            map.setCenter(coords);
          };
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }
      });
    });
  }, [address, title]);

  return <div ref={mapRef} className={className} id="kakao-map" />;
}
