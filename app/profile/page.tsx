import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { ClientSession } from "@/user/ClientSession";
import { createSSRClient } from "@/interface/apiSSR";
import { signOut } from "../auth/actions";

export default async function Profile() {
  const t = await getTranslations();
  const { client } = await createSSRClient();
  const serverEmail = (await client.auth.getUser()).data.user?.email;

  return (
    <div>
      <h1 className="text-lg font-bold">Hello</h1>
      <h1>{serverEmail}</h1>
      <ClientSession />
      <form action={signOut}>
        <Button>{t("user.profile.options.logout")}</Button>
      </form>
    </div>
  );
}
