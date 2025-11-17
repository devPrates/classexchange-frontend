import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src="/logo.svg"
          alt="Classexchange logo"
          width={128}
          height={128}
        />
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Classexchange
        </h1>
      </div>
    </div>
  );
}
