import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  const router = useRouter();

  const handleEnterSite = () => {
    router.push("/gallery");
  };

  return (
    <main className={`main-layout main-bg ${inter.className}`}>
      <div className="flex flex-col items-center space-y-8 mb-40">
        <h1 className="logo-title text-gradient">Try it On Gallery</h1>

        <button type="button" className="btn-enter" onClick={handleEnterSite}>
          Enter Site
        </button>
      </div>
    </main>
  );
}
