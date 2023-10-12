import { NextResponse } from 'next/server';

import { CurrentProfile } from '@/lib/CurrentProfile';
import { db } from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } },
  res: Response
) {
  try {
    const profile = await CurrentProfile();

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });
    if (!params.serverId)
      return new NextResponse('Server Id Missing', { status: 400 });

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER ID  LEAVE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}