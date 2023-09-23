import { Server, Member, Profile } from '@prisma/client';

export type ServerWithMemberWithProfile = Server & {
  member: (Member & { profile: Profile })[];
};
