import Link from "next/link";
import { getCategories } from "@/lib/news";

const NavLinks = async () => {
  const nav = await getCategories();
  const filterNav = nav.filter((category) => category.scrapable);

  return (
    <div className="flex justify-center items-center gap-4 text-sm">
      <Link href={"/"}>হোম</Link>
      {filterNav.map((navData) => (
        <Link
          key={navData.slug}
          href={`/category/${navData.slug}`}
          className="hover:text-red-700"
        >
          {navData.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
