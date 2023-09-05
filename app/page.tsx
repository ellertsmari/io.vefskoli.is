"use client";

import Head from "next/head";
import React from "react";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
import GradingForm from "../components/gradingForm/gradingForm"

export default function Home() {

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
