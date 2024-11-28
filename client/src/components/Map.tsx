import React, { useEffect, useState } from 'react';
import Error from './common/Error';

interface MainProps {
  location: string;  
}

const Map = ({ location }: MainProps) => {
  const [isError, setIsError] = useState<boolean>(false); 

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const geocoder = new window.kakao.maps.services.Geocoder(); 

      // 주소를 좌표로 변환
      geocoder.addressSearch(location, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const lat = result[0].y;
          const lng = result[0].x;

          // 변환된 좌표를 이용해 지도를 표시
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng), 
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);

          // 마커 추가
          const markerPosition = new window.kakao.maps.LatLng(lat, lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map); // 지도에 마커 표시

          // 지도 타입 컨트롤 추가 
          const mapTypeControl = new window.kakao.maps.MapTypeControl();
          map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

          // 줌 컨트롤 추가 
          const zoomControl = new window.kakao.maps.ZoomControl();
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

          setIsError(false); 
        } else {
          setIsError(true); 
        }
      });
    });
  }, [location]); // location이 변경될 때마다 지도 업데이트

  return (
    <>
      {isError ? (
        <Error /> 
      ) : (
        <div
          id="map"
          style={{
            width: '50vw',
            height: '50vh',
            borderRadius: '10px',
            border: '2px solid black',
          }}
        ></div> 
      )}
    </>
  );
};

export default Map;
