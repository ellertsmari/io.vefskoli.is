"use client";
import { FilledButton } from "@/components/buttons/filledButton";
import Link from "next/link";

type Props = {
  module: string;
};
export default function ({ module }: Props) {
  return (
    <div>
      <Link href={`/saveGuide/${module}`}>
        <FilledButton>Create Guide</FilledButton>
      </Link>
    </div>
  );
}
