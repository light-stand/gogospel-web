import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

import { createSSRClient } from "@/interface/apiSSR";
import dayjs from "@/utils/date";
import { Icon } from "@/components/ui";
import { getProfileOptions } from "@/user/domain/profileOptions";
import ProfileOptions from "@/user/components/ProfileOptions";

export default async function Profile() {
  const t = await getTranslations();
  const { client, repo } = await createSSRClient();
  const user = await client.auth.getUser();
  const id = user?.data?.user?.id;
  if (!id) return redirect("/");
  const [profile] = await repo.userProfile.get(["user_id", "eq", user?.data?.user?.id]);

  const { name, images, created_at, is_verified } = profile;

  return (
    <div className="flex flex-col max-w-screen-sm mx-auto px-4">
      <div className="items-start justify-between gap-y-4 pt-8 pb-2">
        {/*=Image=*/}
        <div className="flex items-center w-full">
          <Image
            width={144}
            height={144}
            className="h-36 w-36 rounded-full shadow-md"
            src={(images as string[])[0]}
            alt="Profile picture"
          />
          <div className="flex flex-col justify-center items-center mx-auto">
            <span className="text-neutral-500 font-bold">{t("user.profile.joined")}</span>
            <span className="capitalize font-bold">{dayjs(created_at).fromNow()}</span>
          </div>
        </div>
        {/*=Name=*/}
        <div className="flex items-center mt-8">
          <span className="flex items-center font-bold text-3xl my-2 line-clamp-2">
            {name}
            {is_verified && (
              <Icon name="check-decagram" className="text-amber-400 ml-2" size={0.8} />
            )}
          </span>
        </div>
      </div>
      {/*=Options=*/}
      <ProfileOptions options={getProfileOptions(profile)} />
    </div>
  );
}
