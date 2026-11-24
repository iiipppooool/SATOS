import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { ImportForm } from "./form";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Notice,
  SectionHeading,
  buttonClass,
} from "@/components/ui";

export const metadata = { title: "Import questions" };
export const dynamic = "force-dynamic";

export default async function ImportPage() {
  const user = await requireUser();

  const batches = await prisma.importBatch.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Import questions"
        description="Bring in material you already hold a licence to: your own copies of the Official SAT Practice Tests, Khan Academy sets, a prep book you bought, or questions you have written yourself."
        action={
          <Link href="/bank" className={buttonClass("ghost", "sm")}>
            Back to bank
          </Link>
        }
      />

      <Notice tone="warning">
        <span className="font-medium">Read this before importing.</span> Do not paste in material
        scraped from a site that forbids it, and do not relabel recalled questions as official
        ones. Reconstructed questions are imported under the &ldquo;recalled, unverified&rdquo;
        source, which marks them as unreliable everywhere they appear, including in the answer key
        warning shown during practice. That labelling is not decoration: an incorrect answer key
        that you trust will actively teach you the wrong method.
      </Notice>

      <ImportForm />

      {batches.length > 0 ? (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Previous imports</CardTitle>
            </div>
          </CardHeader>
          <CardBody className="pt-3">
            <ul className="divide-y">
              {batches.map((batch) => (
                <li key={batch.id} className="flex items-center justify-between gap-4 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-text-base">{batch.name}</p>
                    <p className="text-[11px] text-text-subtle">
                      {batch.source.replace(/_/g, " ")} ·{" "}
                      {batch.createdAt.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {batch.sourceRef ? ` · ${batch.sourceRef}` : ""}
                    </p>
                  </div>
                  <span className="numeric shrink-0 text-xs text-text-muted">
                    {batch.rowsImported} imported
                    {batch.rowsRejected > 0 ? (
                      <span className="text-wrong"> · {batch.rowsRejected} rejected</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      ) : null}
    </div>
  );
}
