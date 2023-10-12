import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';

import { CurrentProfile } from '@/lib/CurrentProfile';
import { db } from '@/lib/db';

export async function DELETE(
  req: Request,
  { params }: { params: { channelID: string } },
  res: Response
) {
  try {
    const profile = await CurrentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    if (!serverId)
      return new NextResponse('Server ID missing', { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelID,
            name: {
              not: 'general',
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[CHANNEL DELETE]', error);
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { channelID: string } },
  res: Response
) {
  try {
    const profile = await CurrentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');

    if (!profile) return new NextResponse('Unauthorized', { status: 401 });

    if (!serverId)
      return new NextResponse('Server ID missing', { status: 400 });

    if (name === 'general')
      return new NextResponse('Name cannot be General', { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelID,
              NOT: {
                name: 'general',
              },
            },
            data: {
              name,
              type,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log('[CHANNEL PATCH ]', error);
  }
}
