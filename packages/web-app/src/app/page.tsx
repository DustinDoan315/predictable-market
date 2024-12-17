import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Blockchain App</h1>
      <Link href="/dashboard" legacyBehavior>
        <a className="mt-4 text-blue-500 underline text-xl">Go to Dashboard</a>
      </Link>
    </main>
  );
}
