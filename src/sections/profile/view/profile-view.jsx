import { SpaceBar } from "@mui/icons-material";
import UserInfo from "../profile-user-info";
import { useState } from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import ProfileArticle from "../profile-article";


export default function ProfileView() {
    // const [selectAll, setSelectAll] = useState('전체게시글');
    // const [selectFolder, setSelectFolder] = useState('폴더');
    // const [selectActivity, setSelectActivity] = useState('활동');
    // const [selected, isSelect] = useState(false);

    // const handleSelect = (value) => {
    //     if (value === '전체게시글') {
    //         setSelectAll(value);
    //         console.log(selectAll);
    //     }
    //     else if (value === '폴더') {
    //         setSelectFolder(value);
    //         console.log(selectFolder);

    //     } else if (value === '활동') {
    //         setSelectActivity(value);
    //         console.log(selectActivity);
    //     }
    // };

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,

        };
    }
    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}

                style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}
            >
                {value === index && (
                    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    const select_style = {
        fontSize: '20px',
        cursor: 'pointer',
    };

    const articleList = [{ imgurl: 'https://cdn.pixabay.com/photo/2023/06/03/18/04/ai-generated-8038224_640.jpg', title: '세비 스페인 광장', content: '마차를 타고 광장으로 들어섰는데 반달 모양의 웅장한 건물, 넓은 광장, 분수가 압도합니다. 건물의 아래쪽 벽면에는 에스파냐의 지역별 역사를 타일 모자이크로 만든 작품이 이어져 있습니다. 바르셀로나 타일을 찾아 한 컷 찍었습니다. 스페인 광장 어디서 찍어도 사진이 화보처럼 나와요. 스...', date: '2021-10-10', likecnt: 10, commentcnt: 5 },
    { imgurl: 'https://cdn.pixabay.com/photo/2023/06/03/18/04/ai-generated-8038224_640.jpg', title: '세비 스페인 광장', content: '마차를 타고 광장으로 들어섰는데 반달 모양의 웅장한 건물, 넓은 광장, 분수가 압도합니다. 건물의 아래쪽 벽면에는 에스파냐의 지역별 역사를 타일 모자이크로 만든 작품이 이어져 있습니다. 바르셀로나 타일을 찾아 한 컷 찍었습니다. 스페인 광장 어디서 찍어도 사진이 화보처럼 나와요. 스...', date: '2021-10-10', likecnt: 10, commentcnt: 5 }];

    return (
        <div style={{ width: '80%', alignItems: 'center' }}>
            <UserInfo />
            <div style={{ display: 'flex', alignContent: 'center', marginTop: '20px', flexDirection: 'column' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                            sx={{ width: '100%' }} s>
                            <Tab label="전체 게시글" {...a11yProps(0)} />
                            <Tab label="폴더" {...a11yProps(1)} />
                            <Tab label="활동" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0} >
                        <div style={{ width: '100%', alignItems: 'center', flexDirection: 'column', display: 'flex' }}>

                            {articleList.map((article) => (
                                <ProfileArticle
                                    key={article.id}
                                    imgurl={article.imgurl}
                                    title={article.title}
                                    content={article.content}
                                    date={article.date}
                                    likecnt={article.likecnt}
                                    commentcnt={article.commentcnt}


                                />
                            ))}
                        </div>

                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                </Box>

            </div>
        </div >
    );

}
