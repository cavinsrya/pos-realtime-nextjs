import { DarkmodeToggle } from "@/components/common/darkmode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-muted flex justify-center items-center h-screen flex-col space-y-4">
      <h1 className="text-4xl font-semibold">Welcome</h1>
      <Link href="/admin">
        <Button className="bg-blue-900 text-white">Access Dashboard</Button>
      </Link>
    </div>
  );
}
