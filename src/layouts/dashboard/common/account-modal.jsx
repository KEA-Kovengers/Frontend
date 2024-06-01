import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';


// import IconButton from '@mui/material/IconButton';

import {
  Container,
  Box,
  Button,
  IconButton,
  Stack,
  Modal,
  Typography,
  TextField,
} from '@mui/material';
import Iconify from 'src/components/iconify';

import { colors } from 'src/theme/variableColors';
import { useNavigate } from 'react-router-dom';
import { PostWithdraw, PostWithdraw1 } from 'src/api/auth.api';
export default function AccountModal({ rightButton, onClose, open, contents, subcontents }) {
  const [textField, setTextField] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'refreshToken', 'userId']);
  const navigate = useNavigate();
  const token = cookies.token;
  const refreshToken = cookies.refreshToken;
  const userId = cookies.userId;
  const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 270 * 1.534,
    height: 270,
    bgcolor: 'background.paper',
    borderRadius: 3,

    left_button: {
      width: 120,
      height: 40,
      border: '3px solid #E3E6FF',
      borderRadius: 3,
      color: 'black',
      marginRight: '49px',
      fontSize: '18px',
    },
    right_button: {
      width: 120,
      height: 40,
      bgcolor: '#1A2CDD',
      borderRadius: 3,
      color: 'white',
      fontSize: '18px',
    },
  };

  const Logout = () => {
    try {
      removeCookie('token');
      removeCookie('refreshToken');
      removeCookie('userId');
      navigate('/');
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };


  const Withdrawal = () => {
    PostWithdraw1()
      .then((res) => {
        console.log(res);
        removeCookie('token');
        removeCookie('refreshToken');
        removeCookie('userId');
        navigate('/');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    open && (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex' }}
      >
        <Box sx={modal_style}>
          <div style={{ display: 'flex', justifyContent: 'end', zIndex: 2 }}>
            <IconButton onClick={onClose} sx={{ mt: '5px', mr: '5px' }}>
              <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
            </IconButton>
          </div>
          <Box
            sx={{
              justifyContent: 'center',
              display: 'flex',
              height: '63%',
            }}
          >

            <Stack
              sx={{
                width: '80%',
              }}
            >
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                <Typography
                  id="modal-modal-description"
                  color={colors.textGrey}
                  sx={{
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                >
                  {contents}
                </Typography>

                <Typography
                  id="modal-modal-description2"
                  color={colors.textGrey1}
                  sx={{
                    fontSize: 15,
                    textAlign: 'center',
                  }}
                >
                  {subcontents}
                </Typography>

              </div>

            </Stack>

          </Box>


          <Stack direction="row" justifyContent="center" sx={{}}>
            <Button onClick={onClose} sx={modal_style.left_button}>
              취소
            </Button>
            {/* 버튼이 탈퇴이면? 탈퇴 함수 
              버튼이 로그아웃? 로그아웃 함수 */}
            <Button sx={modal_style.right_button}
              onClick={rightButton === '탈퇴' ? Withdrawal : Logout}
            >
              {rightButton}
            </Button>
          </Stack>

        </Box>
      </Modal>
    )
  );
}

AccountModal.propTypes = {
  rightButton: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  contents: PropTypes.string,
  subcontents: PropTypes.string,
};
