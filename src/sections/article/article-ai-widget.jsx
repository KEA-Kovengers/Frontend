import { useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import Iconify from 'src/components/iconify';
import AiModal from './article-ai-modal';
import { PostSummary } from 'src/api/ai.api';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    zIndex: 0,
    right: '0%',
    display: 'flex',
    cursor: 'pointer',
    position: 'fixed',
    alignItems: 'center',
    top: theme.spacing(16),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1.25),
    color: theme.palette.text.primary,
    flexDirection: "column",
    height: "45px",
    transition: theme.transitions.create('opacity'),

    '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function AiWidget() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleRootClick = () => {
        setIsAddModalOpen(true);

        //여기서 하면 돼요 res를 가공해서 띄우세여
        PostSummary(text).then((res) => {
            console.log(res);
        }
        ).catch((err) => {
            console.log(err);
        });
    }

    const handleAddModalClose = () => {
        setIsAddModalOpen(false);
    }

    const [text, setText] = useState("반응형 웹을 만드는 요소는 여러가지가 있지만, 가장 기본적으로 CSS의 미디어 쿼리가 빠질 수 없지요. 특히 미디어 쿼리의 속성들 중 min-width 또는 max-width를 이용해 브라우저 폭을 인식해서 각 조건에 맞게 처리해 주는 방식이 널리 쓰입니다 아래 코드는 min-width(최소 width)가 1000px, 즉 1000px 이상인 경우에 적용되는 코드이고 ");





    return (
        <>
            <StyledRoot onClick={handleRootClick} >
                <Iconify icon="basil:lightbulb-alt-outline" width={26} height={28} color='#E8C300' />
                <div style={{ fontSize: "10px", color: "#808080" }}>AI 요약</div>
            </StyledRoot>
            <AiModal open={isAddModalOpen} onClose={handleAddModalClose} />
        </>
    );
}
