import Link from "next/link";
import { getCategories } from "@/lib/news";

const NavLinks = async () => {
  const nav = await getCategories();
  const filterNav = nav.filter((category) => category.scrapable);

  return (
    <nav className="container mx-auto px-4 py-2">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
        <Link
          href={"/"}
          className="whitespace-nowrap transition-colors hover:text-red-700"
        >
          হোম
        </Link>
        {filterNav.map((navData) => (
          <Link
            key={navData.slug}
            href={`/category/${navData.slug}`}
            className="whitespace-nowrap transition-colors hover:text-red-700"
          >
            {navData.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
