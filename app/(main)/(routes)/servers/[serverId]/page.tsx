import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { CurrentProfile } from '@/lib/CurrentProfile';
import { db } from '@/lib/db';

interface ServerIdPageProps {
  params: {
    serverId: string;
  };
}

const ServerIDPage = async ({ params }: ServerIdPageProps) => {
  const profile = await CurrentProfile();

  if (!profile) return redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: 'general',
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== 'general') return null;

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
};

export default ServerIDPage;
