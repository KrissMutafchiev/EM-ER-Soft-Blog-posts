import { Blog } from "@/components";

export default async function Home({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Blog searchParams={ searchParams} />
    </main>
  );
}
