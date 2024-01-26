'use client'
import { useRouter } from "next/navigation"
import { FilledButton } from "@/components/buttons/filledButton"

type Props = {
  module: string;
}
export default function({module}: Props) {
  const router = useRouter()
  return (
    <div>
      <FilledButton onClick={() => router.push(`/saveGuide/${module}`)}>Create Guide</FilledButton>
    </div>
  )
}