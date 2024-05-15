// import React, { useEffect, useRef } from 'react';
// export default function ArticleKakaoMap() {
//     const { kakao } = window;
//     const Map = () => {
//         const mapContainer = useRef(null);
//         const position = new window.kakao.maps.LatLng(37.566826, 126.9786567);
//         const mapOption = {
//             center: position,
//             level: 4
//         };

//         useEffect(() => {

//             if (!kakao) {
//                 console.error('Kakao Map API is not loaded.');
//                 return;
//             }

//             const map = new kakao.maps.Map(mapContainer.current, mapOption);
//             const marker = new kakao.maps.Marker({ position });

//             const content =
//                 <div className="customoverlay">
//                     <span>학교</span>
//                 </div>;

//             new kakao.maps.CustomOverlay({ map, position, content });

//             marker.setMap(map);

//         }, []);

//         return (
//             <div id='map' ref={mapContainer} style={{ width: '100px', height: '350px', display: 'block' }}>

//                 <Map />
//             </div>

//         );
//     };


// }
import React, { useState, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function ArticleKakaoMap() {
    const [coordinates, setCoordinates] = useState(null); // 현재 위치의 좌표값을 저장할 상태
    const mapRef = useRef();

    const getCoordinates = () => {
        const map = mapRef.current;

        setCoordinates({
            center: {
                lat: map.getCenter().getLat(),
                lng: map.getCenter().getLng(),
            },
        });
    };

    return (
        <Map
            center={{ lat: 33.5563, lng: 126.79581 }}   // 지도의 중심 좌표
            style={{ width: '100%', height: '350px', marginTop: '30px' }} // 지도 크기
            level={3}                                   // 지도 확대 레벨
        >
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
        </Map>);
};