import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { MemberRole } from '@prisma/client';

import { CurrentProfile } from '@/lib/CurrentProfile';
import { db } from '@/lib/db';

// BUG: (Feature maib)For some reason default export api's don't work with NEXT JS
// eslint-disable-next-line import/prefer-default-export
export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await CurrentProfile();
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            { name: 'general', profileId: profile.id, type: 'TEXT' },
            // { name: 'general', profileId: profile.id, type: 'AUDIO' },
          ],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[SERVER_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
