'use server';

import { revalidatePath } from 'next/cache';
import { createSSRClient } from '@/interface/apiSSR';

export async function handleDelete(opportunityId: string) {
  const { repo } = await createSSRClient();
  try {
    await repo.mission.delete(opportunityId);
    revalidatePath('/my-profile');
  } catch (error) {
    console.error('Failed to delete opportunity', error);
  }
}

export async function updateProfile(profileId: number, values: { name: string }) {
  const { repo } = await createSSRClient();
  try {
    await repo.userProfile.update({ id: profileId, ...values });
    revalidatePath('/my-profile');
  } catch (error) {
    console.error('Failed to update profile', error);
  }
}
