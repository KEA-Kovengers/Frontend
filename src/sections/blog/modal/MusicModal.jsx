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

import { useEditStore } from 'src/store/useEditStore';
import { useEditMusicStore } from 'src/store/useEditMusicStore';

// import { updateBlock } from 'src/sections/blog/editor/md-editor.jsx';

// ----------------------------------------------------------------------

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export default function MusicModal(){

    const [isOpen, setIsOpen] = useState(true);
    const [searchInput, setSearchInput] = useState(''); // 검색창에 입력한 값
    const [acessToken, setAccessToken] = useState(''); // API Access Token
    const [index, setIndex] = useState(0); // 선택된 앨범의 인덱스를 저장할 상태
    const [selectedIndices, setSelectedIndices] = useState([]); // Initialize selectedIndices as an empty array

    const { isEditing, setIsEditing, albums, setAlbums } = useEditMusicStore();
    
    const { 
        editorHtml1, editorHtml2,    
        editorRef1, editorRef2, 
        updateEditorHtml1, updateEditorHtml2 ,
    } = useEditStore((state) => ({
      editorHtml1: state.editInfo.editorHtml1,
      editorHtml2: state.editInfo.editorHtml2,
      
      updateEditorHtml1: state.updateEditInfo.bind(null, 'editorHtml1'),
      updateEditorHtml2: state.updateEditInfo.bind(null, 'editorHtml2'),

      editorRef1: state.editInfo.editorRef1,
      editorRef2: state.editInfo.editorRef2,
    }));

    // // md-editor에서 TAG 정보 업뎃 뭐시기
    // useEffect(() => {
    //     if (isOpen) {
    //       updateBlock('TAG', editorRef1, stompClient, postID, userID, blockIds, articleVersion, blockContents);
    //     }
    // }, [isOpen]);


    const resetState = () => {
        setIsOpen(false); // 모달 닫기
        setIsEditing([]); // 버튼 상태 초기화
        setAlbums([]); // 앨범 리스트 초기화
        setSelectedIndices([]); // 선택된 인덱스 초기화
        setSearchInput(''); // 검색 입력값 초기화
    };

    const closeModal = () => {
        resetState(); // 상태 초기화 함수 호출
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
                // console.log(data);
                setAlbums(data.items);
            })
    }


    const selectAlbum = (index) => {
        setSelectedIndex(index); // Update selectedIndex when an album is selected
    };

    const handleEditClick = (index) => {
        const newIsEditing = [...isEditing];
        newIsEditing[index] = !newIsEditing[index];
        setIsEditing(newIsEditing);
        
        // 여러개 선택 가능하도록 수정
        if (newIsEditing[index]) {
            setSelectedIndices([...selectedIndices, index]); // Add index to selectedIndices
        } else {
            setSelectedIndices(selectedIndices.filter(i => i !== index)); // Remove index from selectedIndices
        }

        // 선택된 앨범을 콘솔에 출력
        if (newIsEditing[index]) { 
            console.log('선택된 앨범: ',albums[index]);
            console.log(
            'id:' ,albums[index].id,
            '\n링크:',albums[index].external_urls.spotify,
            '\n앨범명',albums[index].name,
            '\n가수:',albums[index].artists[0].name,
            '\n사진 링크:',albums[index].images[2].url,
            '\nrelease date:',albums[index].release_date
            );
        }
    };

    const buttonClick = () => {
        if (selectedIndices.length > 0) {
            selectedIndices.forEach((index) => {
            const selectedAlbum = albums[index];

            // albumInfoHtml 변수는 선택된 앨범의 정보를 포함하는 HTML 문자열을 생성합니다. 
            // 이 문자열에는 앨범명, 가수, 발매 날짜, 앨범 이미지가 포함되어 있습니다. 
            const albumInfoHtml = `
            <div style=" padding: 10px; max-width: 300px; margin-bottom: 20px;">
            <img src="${selectedAlbum.images[2].url}" alt="${selectedAlbum.name} 앨범 커버" style="max-width: 100%; border-radius: 10px;">
            <h3 style="margin: 10px 0;">${selectedAlbum.name}</h3>
            <p>가수: ${selectedAlbum.artists[0].name}</p>
            <p>발매 날짜: ${selectedAlbum.release_date}</p>
            </div>
            `;
            console.log(`[${selectedAlbum}] ${albumInfoHtml}:`);    

            if (editorRef1 && editorRef1.getInstance()) {
                const editorInstance1 = editorRef1.getInstance();
                const currentText1 = editorInstance1.getHTML();
                editorInstance1.setHTML(`${currentText1}\n${albumInfoHtml}`);
                updateEditorHtml1(`${editorHtml1}\n${albumInfoHtml}`);

                // updateBlock('TAG', editorRef1, stompClient, postID, userID, blockIds, articleVersion, blockContents);
            }
            else if (editorRef2 && editorRef2.current && editorRef2.current.getInstance()) {
                const editorInstance2 = editorRef2.current.getInstance();
                const currentText2 = editorInstance2.getHTML();
                editorInstance2.setHTML(`${currentText2}\n${albumInfoHtml}`);
                updateEditorHtml2(`${editorHtml2}\n${albumInfoHtml}`);

                // updateBlock('TAG', editorRef2, stompClient, postID, userID, blockIds, articleVersion, blockContents);
            }
        })}
        else {
            console.log(`No album found at selectedIndex ${selectedIndex}`);
        }
        resetState(); // 상태 초기화 함수 호출
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
                        // console.log('선택된 앨범'+album);
                        // console.log('선택된 앨범: '+albums[index]);
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
                                        onClick={() => handleEditClick(index)}
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

