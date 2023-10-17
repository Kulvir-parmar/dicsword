import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { CurrentProfile } from '@/lib/CurrentProfile';
import { db } from '@/lib/db';
import ChatHeader from '@/components/chat/ChatHeader';

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await CurrentProfile();

  if (!profile) return redirectToSignIn();

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params?.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) return redirect('/');

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={channel.serverId}
        name={channel.name}
        type={'channel'}
      />
    </div>
  );
};

export default ChannelIdPage;
