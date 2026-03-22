import { permanentRedirect } from "next/navigation"
import { knowledgeBriefs } from "@/lib/knowledge-briefs"

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return knowledgeBriefs.map((brief) => ({ slug: brief.slug }))
}

export default async function LegacyOurTakeArticleRedirectPage({ params }: PageProps) {
  const { slug } = await params
  permanentRedirect(`/research/${slug}`)
}

