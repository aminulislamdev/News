import Image from "next/image";
import { Suspense } from "react";
import { io } from "next/cache";
import logo from "../../public/logo.webp";

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
      <div className="grid grid-cols-3 items-center px-6 py-4">
        <div></div>

        <div className="flex items-center justify-center gap-2">
          <Image
            src={logo}
            alt="Bangla News 24 logo"
            width={40}
            height={40}
          />
          <div>
            <h2 className="text-3xl font-bold text-red-700 leading-tight">
              Bangla News 24
            </h2>
            <Suspense fallback={<p className="text-xs text-gray-500">&nbsp;</p>}>
              <CurrentDate />
            </Suspense>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button className="text-sm hover:text-red-600">
            সাইন ইন
          </button>
          <button className="bg-red-700 text-white px-3 py-2 rounded-md text-sm hover:bg-red-900">
            সাইন আপ
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
