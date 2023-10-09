import { v4 as uuidv4 } from 'uuid';
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
      return new NextResponse('Server ID missing', { status: 400 });

    const server = await db.server.update({
      where: { id: params.serverId, profileId: profile.id },
      data: {
        inviteCode: uuidv4(),
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER_ID]', error);
    return new NextResponse('Internal server error');
  }
}
