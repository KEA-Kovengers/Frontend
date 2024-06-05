import React, { useState, useEffect } from 'react';
import { Modal, Typography, Box, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
import PieChart from './PieChart';
import HorizontalBarChart from './HorizontalBarChart';
import { useParams } from 'react-router-dom';
import { GetUserBlocks, GetParticipatedBlocks } from 'src/api/analysis.api';
import { GetUserInfo } from 'src/api/user.api';

export default function DashboardModal({ open, onClose }) {
  const params = useParams();
  const postId = Number(params.id);

  const [block, setBlock] = useState([]);
  const [participatedBlock, setParticipatedBlock] = useState([]);

  useEffect(() => {
    setBlock([]);
    setParticipatedBlock([]);
    GetUserBlocks(postId)
      .then((res) => {
        console.log('블록 생성', res.data.result);
        res.data.result.forEach((block) => {
          if (block.blockId.length !== 0) {
            GetUserInfo(block.creatorId).then((res) => {
              console.log('label', res.data.result.nickName, 'value', block.blockId.length);
              setBlock((prevBlocks) => [
                ...prevBlocks,
                { label: res.data.result.nickName, value: block.blockId.length },
              ]);
            });
          }
        });
      })
      .catch((err) => {
        console.log('블록 정보 에러', err);
      });

    GetParticipatedBlocks(postId)
      .then((res) => {
        const data = res.data.result.editorLogResponseDTOS; // editorLogResponseDTOS가 배열인지 확인
        // console.log('참여한 블록', data);

        // userID를 기준으로 blockId의 개수를 그룹화
        const groupedData = data.reduce((acc, item) => {
          acc[item.userID] = (acc[item.userID] || 0) + 1;
          return acc;
        }, {});

        // 그룹화된 데이터를 리스트 형식으로 변환
        const groupedDataList = Object.keys(groupedData).map((userID) => ({
          userID: parseInt(userID, 10), // userID를 숫자로 변환
          value: groupedData[userID],
        }));

        console.log('참여한 블록 (리스트 형식):', groupedDataList);

        // 각 userID에 대해 GetUserInfo를 호출
        groupedDataList.forEach((group) => {
          GetUserInfo(group.userID).then((res) => {
            console.log(res.data.result);
            setParticipatedBlock((prevBlocks) => [
              ...prevBlocks,
              { label: res.data.result.nickName, value: group.value },
            ]);
          });
        });
      })
      .catch((err) => {
        console.log('참여한 블록 정보 에러', err);
      });
  }, [postId]);

  return (
    open && (
      <Modal open={open} onClose={onClose}>
        <Box sx={modal_style}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              zIndex: 2,
              marginBottom: '10px',
            }}
          >
            <Typography variant="h5" sx={{ mt: '13px', ml: '13px' }}>
              통계 데이터
            </Typography>
            <IconButton onClick={onClose} sx={{ mt: '5px', mr: '5px' }}>
              <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
            </IconButton>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-around',
              marginBottom: '15px',
            }}
          >
            <PieChart
              title="유저 별 블럭 생성 비율"
              chart={{
                series: block,
                // series: [
                //   { label: 'Korea', value: 5 },
                //   { label: 'Japan', value: 1 },
                // ],
              }}
            />
            <HorizontalBarChart
              title="유저 별 참여한 블럭 수"

              chart={{
                // series: [
                //   { label: 'Italy', value: 5 },
                //   { label: 'Japan', value: 5 },
                //   { label: 'China', value: 15 },
                //   { label: 'Canada', value: 2 },
                //   { label: 'France', value: 6 },
                //   { label: 'Germany', value: 13 },
                //   { label: 'South Korea', value: 30 },
                //   { label: 'Netherlands', value: 1 },
                //   { label: 'United States', value: 18 },
                //   { label: 'United Kingdom', value: 40 },
                // ],
                series: participatedBlock,
              }}
            />
          </div>
        </Box>
      </Modal>
    )
  );
}

const modal_style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '55%',
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
  padding: '5px',
};
