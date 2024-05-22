import React, { useEffect, useState } from 'react';

import {
    Box,
    Button ,
    IconButton,
    Stack,
    Modal,
    Typography,
    TextField,
    InputAdornment,
    Card,
    CardMedia,
    CardContent,
  } from '@mui/material';

import Iconify from 'src/components/iconify';
import { colors } from 'src/theme/variableColors';

// ----------------------------------------------------------------------

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export default function MusicModal(){

    const [isOpen, setIsOpen] = useState(true);
    const [isEditing, setIsEditing] = useState([]);
    const [searchInput, setSearchInput] = useState(''); // 검색창에 입력한 값
    const [acessToken, setAccessToken] = useState(''); // API Access Token
    const [albums, setAlbums] = useState([]); // 검색 결과로 나온 앨범들을 저장할 배열
    const [tracks, setTracks] = useState([]); // 앨범에 포함된 트랙들을 저장할 배열
    const [selectedAlbums, setSelectedAlbums] = useState([]); // 선택한 앨범들을 저장할 배열


    const handleEditClick = (index) => {
        const newIsEditing = [...isEditing];
        newIsEditing[index] = !newIsEditing[index];
        setIsEditing(newIsEditing);
    };
    
    const closeModal = () => {
        setIsOpen(false);
    };

    const buttonClick = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        // API Aceess Token 받아오기
        var authParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret
        };
        fetch('https://accounts.spotify.com/api/token', authParams)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

    // Search Albums
    async function searchMusic() {

        // Get request with search input
        var searchParams = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + acessToken, 
            },
        }

        // 어떤 query를 보내는지 
        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParams)
            .then(response => response.json())
            .then(data => {return data.artists.items[0].id}) // 첫 번째 아티스트의 ID를 가져옴(그래야 정확한 아티스트를 찾을 수 있음)
        
            console.log('Artist ID: ' + artistID);

        // Get request with Artist ID grab all the albums from that artist
        var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=KR&limit=50', searchParams)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAlbums(data.items);
            })
        // Display those albums to the user
    }

    // async function searchTrack() {
    //     var searchParams = {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + acessToken,
    //         }
    //     };
    
    //     var trackData = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', searchParams)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //                 return data.tracks.items.map(item => ({
    //                     trackId: item.id,
    //                     albumId: item.album.id,
    //                     trackName: item.name,
    //                     albumName: item.album.name,
    //                     images: item.album.images // 추가: 트랙의 앨범 이미지
    //                 }))
    //         });

    //     // 중복 제거를 위해 트랙 ID로 필터링
    //     const uniqueTracks = trackData.filter((track, index, self) =>
    //         index === self.findIndex((t) => (
    //             t.trackId === track.trackId
    //         ))
    //     );

    //     uniqueTracks.forEach(track => {
    //         console.log('Track ID: ' + track.trackId);
    //         console.log('Album ID: ' + track.albumId);
    //     });
    
    //     // Get request with Album ID grab all the tracks from that album
    //     for (const track of uniqueTracks) {
    //         var returnedTracks = await fetch('https://api.spotify.com/v1/albums/' + track.albumId + '/tracks' + '?market=KR&limit=50', searchParams)
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data);
    //                 setTracks(prevTracks => [...prevTracks, ...data.items.map(item => ({
    //                     ...item,
    //                     albumImages: track.images, // 추가: 트랙에 앨범 이미지 포함
    //                     trackName: track.trackName, // 추가: 트랙 이름
    //                     albumName: track.albumName // 추가: 앨범 이름
    //                 }))]);
    //             });
    //     }
    // }  
    // console.log(tracks);

    const handleAlbumSelect = (album) => {
        setSelectedAlbums(album);
      };
    
      const handleButtonClick = () => {
        console.log('선택된 앨범: ' + selectedAlbums);
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

                <Stack direction="row" sx={{}}>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h5"
                        sx={{ zIndex: 2, position: 'fixed', mt: '18px', ml: '18px', fontWeight: 'bold' }}
                        >
                        음악
                    </Typography>

                    <Button 
                        variant="contained"
                        sx={{
                            ...modal_style.complete_button,
                            position: 'fixed',
                            mt: '18px', ml: '395px',
                        }}
                        onClick={buttonClick}
                    >
                        완료
                    </Button>
                </Stack>

                <div style={{ display: 'flex', justifyContent: 'end', zIndex: 2 }}>
                    <IconButton onClick={closeModal} sx={{ mt: '8px', mr: '5px' }}>
                        <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
                    </IconButton>
                </div>
                

                <Box
                    sx={{
                        justifyContent: 'center',
                        display: 'flex',
                        paddingTop: '15px',
                    }}
                >
                <Stack
                    sx={{
                    width: '80%',
                    justifyContent: 'space-between', // 내부 요소를 가로 정렬하고 동시에 간격을 분배
                    }}
                >
                    <TextField
                        placeholder="노래, 가수, 앨범 검색"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                searchMusic();
                                // searchTrack();
                            }
                        }}
                        onChange={(e) => setSearchInput(e.target.value)}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={searchMusic}>  
                                    <Iconify icon="eva:search-fill" sx={{ width: 20, height: 20, color: 'text.disabled' }} />
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />

                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {albums.map((album,index) => {
                        console.log(album);
                        return (
                            <Card key={index} >
                                <Stack direction="row">
                                    <Box sx={{ maxWidth: 80, maxHeight: 80, overflow: 'hidden' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        image={album.images[0].url}
                                        alt="Card image"
                                    />
                                    </Box>
                                    <CardContent sx={{alignContent:'center'}}>
                                    <Typography variant="body2" component="div" sx={{ fontWeight: 'bold' }}>
                                        {album.name}
                                    </Typography>
                                    <Typography variant="body2" component="div" sx={{ color: colors.textGrey }}>
                                        {album.release_date}
                                    </Typography>
                                    </CardContent>
                                    
                                    <Button 
                                        onClick={() => {
                                                handleEditClick(index); 
                                                handleButtonClick();
                                        }}

                                        sx={{...modal_style.complete_button, 
                                            marginTop: '5px',                       
                                            marginLeft: 'auto',                                    
                                        }}    
                                    >
                                        {isEditing[index] ? (
                                            <Iconify icon="material-symbols:check" />
                                        ) : (
                                            '선택'
                                        )}
                                    </Button>
                                </Stack>
                            </Card>
                        )
                    })}   
{/* 
                    {tracks.map((track, index) => {
                        console.log(track);
                        return (
                            <Card key={index}>
                                <Stack direction="row">
                                    <Box sx={{ maxWidth: 80, maxHeight: 80, overflow: 'hidden' }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            image={track.albumImages[0].url}
                                            alt="Card image"
                                        />
                                    </Box>
                                    <CardContent>
                                        <Typography variant="body2" component="div">
                                            {track.trackName}
                                        </Typography>
                                    </CardContent>
                                </Stack>
                            </Card>
                        )
                    })} */}
                    
                    </div>
                    
                </Stack>
                </Box>
            </Box>
        </Modal>
        )
    );
};

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 530,
    height: 450,
    bgcolor: 'background.paper',
    borderRadius: 2,
    border:'none',

    complete_button: {
        width: 70,
        height: 30,
        bgcolor: '#1A2CDD',
        borderRadius: 7,
        color: 'white',
        fontSize: '18px',
    },
};

