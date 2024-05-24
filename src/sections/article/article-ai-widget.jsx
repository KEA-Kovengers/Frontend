import React, { useState } from "react";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import Iconify from 'src/components/iconify';
import AiModal from './article-ai-modal';
import { PostSummary } from 'src/api/ai.api';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 0,
  // right: '0%',
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(40),
  paddingLeft: theme.spacing(3),
  // paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  color: theme.palette.text.primary,
  flexDirection: 'column',
  height: '45px',
  transition: theme.transitions.create('opacity'),

  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function AiWidget() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [aiSummaryText, setAiSummaryText] = useState('');

  const handleRootClick = () => {
    setIsAddModalOpen(true);

    //여기서 하면 돼요 res를 가공해서 띄우세여
    PostSummary(text)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setAiSummaryText(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const [text, setText] = useState(
    '집사님들이라면 공감하실거예요. 고양이 감기 증상 때문에 스트레스 받았던 1인입니다. 처음에는 훌쩍거리는 단순한 코감기만 있었던 것 같은데 이제는 눈곱까지 생기면서 문제가 생기기 시작했어요. 최근에 계속 이런 상태라서 카페에 찾아보니까 혹시 허피스가 아니냐고 했어요. 그래서 영양제를 먹이면 더 나을거라고 해서 좋은 제품을 소개받게 되었어요. 많은 분들이 직접 급여해보고 괜찮다고 말씀하시니까 저도 먹이고픈 마음이 들었거든요. 허피스바이러스는 보통 일주일 잠복기가 있고 콧물부터 눈곱, 눈이 충혈되며 기침까지 다양한 증상이 나타날 수 있다고 해요. 심각해지면 결막염과 폐렴, 구내염까지 생길 수 있어요. 꾸준히 관리를 해주지 않으면 언제든 또 발병을 할 수 있어서 계속 케어가 필요하다고 해요. 이게 없어지는건줄 알았는데 그렇지 않고 계속 잠복해있다가 나타나는 거라고 해요. 보통 열마리중 여덞마리는 이 바이러스를 보유하고 있고 무증상으로 계속 배출한다고해요. 저희 아이의 경우에는 눈곱도 많이 늘어났는데다 계속 기침도 하기 시작했어요. 열도 나는 증상이 있다는데 다행히 열은 없긴 했었거든요. 의심되는 상황이라면 계속 내버려두지 말고 일단 케어를 받는 것이 중요해요. 그리고 나서 다 낫고 난 후라도 영양제와 같은 방법으로 쭉 관리를 해주어야겠더라고요.'
  );

  return (
    <>
      <StyledRoot onClick={handleRootClick}>
        <Iconify icon="basil:lightbulb-alt-outline" width={26} height={28} color="#E8C300" />
        <div style={{ fontSize: '10px', color: '#808080' }}>AI 요약</div>
      </StyledRoot>
      <AiModal open={isAddModalOpen} onClose={handleAddModalClose} aiSummaryText={aiSummaryText} />
    </>
  );
}
