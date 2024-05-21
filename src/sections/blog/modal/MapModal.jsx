import React, { useState, useRef, useEffect } from 'react';
import { 
    Modal, 
    Box, 
    Button,
    InputAdornment,
    IconButton, 
    Typography, 
    Stack, 
    TextField,
} from '@mui/material';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { colors } from 'src/theme/variableColors';
import Iconify from 'src/components/iconify';

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800, // 전체 너비를 적절히 조정
    height: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    border: 'none',
    padding: '20px',
    display: 'flex', // Flex 레이아웃 적용
    flexDirection: 'column',

    complete_button: {
        width: 70,
        height: 30,
        bgcolor: '#1A2CDD',
        borderRadius: 7,
        color: 'white',
        fontSize: '15px',
    },
};

// const listStyle = {
//     flex: 1, // 왼쪽 부분이 오른쪽 부분과 동일한 너비를 차지하도록 설정
//     maxHeight: '100%',
//     overflowY: 'auto',
// };

const searchStyle = {
    width: '100%',
};

const contentStyle = {
    display: 'flex',
    flex: 1,
    marginBottom: '35px',
    overflow: 'hidden',
    border: '1px solid #eee',
};

const listStyle = {
    flex: 1,
    maxHeight: '100%',
    overflowY: 'auto',
};

const mapStyle = {
    flex: 1,
    maxHeight: '100%',
    overflowY: 'auto',
};

export default function MapModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [keyword, setKeyword] = useState(''); // 검색 키워드 상태
    const [places, setPlaces] = useState([]); // 검색 결과 상태
    const mapRef = useRef();
    const [loaded, setLoaded] = useState(false); // 카카오 맵 API 로드 여부
    const [selectedMarker, setSelectedMarker] = useState(null); // 선택된 마커 상태
    const [highlightedPlace, setHighlightedPlace] = useState(null); // 선택된 리스트 항목의 인덱스
    const listRefs = useRef({}); // 리스트 항목의 ref 객체

    const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;

    const closeModal = () => {
        setIsOpen(false);
    };

    // 카카오 맵 API를 동적으로 로드
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&libraries=services`;
        script.async = true;
        script.onload = () => setLoaded(true);
        document.head.appendChild(script);
    }, []);

    // 키워드로 장소를 검색
    const searchPlaces = () => {
        if (!window.kakao || !window.kakao.maps) return;

        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(keyword, placesSearchCB);
    };

    // 검색 결과 콜백 함수로, 검색 결과에 따라 상태를 업데이트
    const placesSearchCB = (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
            setPlaces(data);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            setPlaces([]);
        } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            setPlaces([]);
        }
    };

    // 리스트 항목 클릭 시, 해당 장소의 마커를 생성하고 정보창을 표시
    useEffect(() => {
        if (mapRef.current && places.length > 0) {
            const map = mapRef.current;
            const bounds = new window.kakao.maps.LatLngBounds();
            places.forEach(place => {
                bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
            });
            map.setBounds(bounds);
        }
    }, [places]);

    // 리스트 항목 클릭 시, 해당 장소의 마커를 생성하고 정보창을 표시
    const handleListItemClick = (place,index) => {
        if (!window.kakao || !window.kakao.maps) return;

        const map = mapRef.current;
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({
            position: markerPosition
        });

        // 이전에 열려있던 정보창이 있다면 닫기
        if (selectedMarker) {
            selectedMarker.infowindow.close();
        }

        // 마커 클릭 시, 정보창 열기
        infowindow.setContent('<div style="padding:5px;z-index:1;">' + place.place_name + '</div>');
        infowindow.open(map, marker);

        setSelectedMarker({ marker, infowindow }); // 선택된 마커 상태 업데이트
        setHighlightedPlace(place); // 선택된 리스트 항목의 인덱스 설정

        // 이전에 선택된 마커가 있다면 지도에서 제거
        marker.setMap(map);
        map.setCenter(markerPosition);

        // 해당 리스트 항목으로 스크롤됨
        listRefs.current[index].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    return (
        isOpen && (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex' }}
        >
            <Box sx={modal_style}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h5"
                    sx={{ fontWeight: 'bold' }}
                >
                    지도
                </Typography>

                    <IconButton onClick={closeModal} sx={{ display: 'flex', justifyContent: 'end', zIndex: 2 }}>
                        <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
                    </IconButton>
                </Stack>


                <TextField
                    type="text"
                    id="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="키워드를 입력하세요"
                    sx={searchStyle}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={searchPlaces} 
                                disabled={!loaded}
                            >
                                <Iconify 
                                    icon="eva:search-fill" 
                                    sx={{ width: 20, height: 20, color: 'text.disabled' }} 
                                />
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                />
                <Box sx={contentStyle}>
                    <Box sx={listStyle}>
                        <ul id="placesList" style={{ listStyle: 'none', padding: 0 }}>
                            {places.map((place, index) => (
                                <li 
                                    key={index} 
                                    className="item" 
                                    style={{ 
                                        padding: '5px', 
                                        cursor: 'pointer', 
                                        borderBottom: '2px dashed #eee',
                                        backgroundColor: highlightedPlace && 
                                            highlightedPlace.id === place.id ? colors.third : 'white'
                                    }} 
                                    onClick={() => handleListItemClick(place,index)}
                                    ref={el => listRefs.current[index] = el}
                                >
                                    <div 
                                        className="info"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontWeight: 'bold',
                                                paddingBottom: '5px',
                                            }}>{place.place_name}
                                        </div>
                                        {place.road_address_name ? (
                                            <>
                                                <span>{place.road_address_name}</span>
                                                <span>    
                                                    {place.address_name && (
                                                        <div>
                                                            <small style={{paddingRight: '5px', color: colors.textGrey}}>지번</small>
                                                            <span style={{color: colors.textGrey}}>{place.address_name}</span>
                                                        </div>
                                                    )}
                                                </span>
                                            </>
                                        ) : (
                                            <span>{place.address_name}</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Box>
                    <Box sx={mapStyle}>
                        {/* 현재 위치 관련 위도 경도로 수정해야할ㄷ스 */}
                        <Map
                            center={{ lat: 37.566826, lng: 126.9786567 }}
                            style={{ width: '100%', height: '100%' }}
                            level={3}
                            ref={mapRef}
                        >
                            {places.map((place, index) => (
                                <MapMarker
                                    key={index}
                                    position={{ lat: place.y, lng: place.x }}
                                    title={place.place_name}
                                    onClick={() => handleListItemClick(place,index)}
                                />
                            ))}
                        </Map>
                    </Box>
                </Box>
                
                <Button 
                    sx={{
                        ...modal_style.complete_button,
                        marginLeft: 'auto',
                    }}>
                        추가
                </Button>
            </Box>
        </Modal>
        )
    );
}
