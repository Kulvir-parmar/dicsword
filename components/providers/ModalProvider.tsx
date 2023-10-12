'use client';

import { useEffect, useState } from 'react';

import { CreateServerModal } from '@/components/modals/CreateServerModal';
import { InviteModal } from '@/components/modals/InviteModal';
import { EditServerModal } from '@/components/modals/EditServerModal';
import { MembersModal } from '@/components/modals/MemberModal';
import { CreateChannelModal } from '@/components/modals/CreateChannelModal';
import { LeaveServerModal } from '@/components/modals/LeaveServerModal';
import { DeleteServerModal } from '@/components/modals/DeleteServerModal';
import { Delete } from 'lucide-react';
import { DeleteChannelModal } from '@/components/modals/DeleteChannelModal';
import { EditChannelModal } from '@/components/modals/EditChannelModal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  );
};
