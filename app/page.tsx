"use client";

import Head from "next/head";
import React from "react";
import useUser from "@/utils/useUser";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useUser({ redirectTo: "/authpage" });
  console.log(user);
  if (!user) return <div>loading...</div>;
  if(user._id) redirect("/guides"); 
  //triggering rebuild
  return (
    <>
      <Head>
        <title>Vefskólinn Intranet</title>
        <meta name="description" content="Intranet for Vefskólinn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
          Hellos
      </div>
    </>
  );
}
