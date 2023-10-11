'use client';

import { useEffect, useState } from 'react';

import { CreateServerModal } from '@/components/modals/CreateServerModal';
import { InviteModal } from '@/components/modals/Invite';
import { EditServerModal } from '@/components/modals/EditServerModal';
import { MemberModal } from '@/components/modals/MemberModal';

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
      <MemberModal />
    </>
  );
};
