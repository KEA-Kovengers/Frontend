import React from 'react';
import { Modal, Typography, Box, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
import PieChart from './PieChart';
import HorizontalBarChart from './HorizontalBarChart';

export default function DashboardModal({ open, onClose }) {
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
              //   backgroundColor: 'pink',
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
              title="Current Visits"
              chart={{
                series: [
                  { label: 'America', value: 2 },
                  { label: 'Asia', value: 5 },
                  { label: 'Europe', value: 4 },
                  { label: 'Africa', value: 1 },
                ],
              }}
            />
            <HorizontalBarChart
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chart={{
                series: [
                  { label: 'Italy', value: 5 },
                  { label: 'Japan', value: 5 },
                  { label: 'China', value: 15 },
                  { label: 'Canada', value: 2 },
                  { label: 'France', value: 6 },
                  { label: 'Germany', value: 13 },
                  { label: 'South Korea', value: 30 },
                  { label: 'Netherlands', value: 1 },
                  { label: 'United States', value: 18 },
                  { label: 'United Kingdom', value: 40 },
                ],
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
