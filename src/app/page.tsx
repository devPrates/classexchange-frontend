import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href='/auth/login' >Fazer Login</Link>
      <Link href='/dashboard' >Dashboard</Link>
      <Button>Click me</Button>
    </main>
  );
}
