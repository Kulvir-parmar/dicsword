import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { Profile } from '@prisma/client';
import { db } from './db';

// eslint-disable-next-line import/prefer-default-export
export async function initialProfile(): Promise<Profile | null> {
  const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return newProfile;
}
