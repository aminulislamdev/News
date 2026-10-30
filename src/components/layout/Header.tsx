import Image from "next/image";
import { Suspense } from "react";
import { io } from "next/cache";
import AuthNav from "@/components/auth/AuthNav";
import logo from "../../../public/logo.webp";

async function CurrentDate() {
  await io();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return <p className="text-xs text-gray-500">{date}</p>;
}

const Header = () => {
  return (
    <header className="mx-auto container">
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-0 md:px-6 md:py-4">
        <div className="hidden md:block" aria-hidden="true"></div>

        <div className="flex min-w-0 items-center gap-2 md:justify-self-center">
          <Image
            src={logo}
            alt="Bangla News 24 logo"
            width={40}
            height={40}
            className="h-7 w-7 shrink-0 min-[360px]:h-8 min-[360px]:w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
          />
          <div className="min-w-0">
            <h2 className="whitespace-nowrap text-base font-bold text-red-700 leading-tight min-[360px]:text-lg min-[480px]:text-xl sm:text-2xl md:text-3xl">
              Bangla News 24
            </h2>
            <div className="hidden md:block">
              <Suspense
                fallback={<p className="text-xs text-gray-500">&nbsp;</p>}
              >
                <CurrentDate />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="shrink-0 md:justify-self-end">
          <AuthNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
