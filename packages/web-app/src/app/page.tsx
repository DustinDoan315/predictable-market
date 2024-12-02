import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Blockchain App</h1>
      <Link href="/dashboard">
        <h1 className="mt-4 text-blue-500 underline">Go to Dashboard</h1>
      </Link>
    </main>
  );
}
