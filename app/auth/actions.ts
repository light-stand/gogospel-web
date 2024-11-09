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
  if (error) throw new Error("Invalid credentials");

  revalidatePath("/");
  redirect("/");
}

export async function signup(data: SignupFields) {
  signupSchema.parse(data);
  const { client } = await createSSRClient();

  const { error } = await client.auth.signUp(data);
  if (error) throw new Error("Invalid credentials");

  revalidatePath("/");
  redirect("/");
}

export async function signOut() {
  const { client } = await createSSRClient();

  const { error } = await client.auth.signOut();
  if (error) throw new Error("Error Signing out");

  revalidatePath("/");
  redirect("/");
}
