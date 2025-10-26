'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) redirect("/login");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>
      <p>{session.user.email}</p>
    </div>
  );
}
