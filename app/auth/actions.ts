"use server";
import { createSSRClient } from "@/interface/apiSSR";
import { LoginFields, loginSchema } from "@/auth/domain/Login";
import { SignupFields, signupSchema } from "@/auth/domain/Signup";

export async function login(data: LoginFields) {
  loginSchema.parse(data);
  const { client } = await createSSRClient();

  const { error } = await client.auth.signInWithPassword(data);
  if (error) throw { message: "Invalid credentials" };
}

export async function signup(data: SignupFields) {
  signupSchema.parse(data);
  const { client } = await createSSRClient();

  const { error } = await client.auth.signUp(data);
  if (error) throw { message: "Invalid credentials" };
}

export async function signOut() {
  try {
    const { client } = await createSSRClient();
    const { error } = await client.auth.signOut();
    if (error) throw { message: "Failed to sign out" };
  } catch {
    return { message: "Failed to sign out" };
  }
}
