"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSSRClient } from "@/interface/apiSSR";
import { LoginFields, loginSchema } from "@/auth/domain/Login";
import { SignupFields, signupSchema } from "@/auth/domain/Signup";

export async function login(data: LoginFields) {
  loginSchema.parse(data);
  const { client } = await createSSRClient();

  const { error } = await client.auth.signInWithPassword(data);
  if (error) throw { message: "Invalid credentials" };

  revalidatePath("/");
  redirect("/");
}

export async function signup(data: SignupFields) {
  signupSchema.parse(data);
  const { client } = await createSSRClient();

  const { error } = await client.auth.signUp(data);
  if (error) throw { message: "Invalid credentials" };

  revalidatePath("/");
  redirect("/");
}

export async function signOut() {
  try {
    const { client } = await createSSRClient();

    const { error } = await client.auth.signOut();
    console.log(">>>>>>>>><error", error);
    if (error) throw { message: "Failed to sign out" };

    revalidatePath("/");
    redirect("/");
  } catch (e) {
    return { message: "Failed to sign out" };
  }
}
