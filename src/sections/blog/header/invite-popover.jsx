import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '/assets/icons/add-friend.svg';
import { friends } from 'src/_mock/friends';
import { useFriendStore } from 'src/store/useFriendStore';
import InviteModal from './InviteModal';

// ----------------------------------------------------------------------


export default function InvitePopover() {

  const [open, setOpen] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { friendsList } = useFriendStore();
  const handleOpen = () => {
    setIsInviteModalOpen(true);
  };

  const handleClose = () => {
    setIsInviteModalOpen(false);
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <img src={PersonAddIcon} alt="Add Friend" width={24} height={24} />
      </IconButton>

      <InviteModal
        friends={friendsList}
        open={isInviteModalOpen}
        onClose={handleClose}
        buttonAction={{ leftAction: handleClose, rightAction: handleClose }}
      />

    </>
  );
}
