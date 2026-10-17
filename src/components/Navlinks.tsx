import Link from 'next/link';
import ICatagories from '@/types/Catagories';

const NavLinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories")
  const data = await res.json()
  const nav: Array<ICatagories> = data.data
  const filterNav = nav.filter(n => n.scrapable)
  return (
    <div className='flex justify-center items-center gap-4 text-sm'>
      <Link href={'/'}>হোম</Link>
      {filterNav.map((navData: { slug: string; title: string }, index: number) => (
        <Link key={index} href={`/category/${navData.slug}`} className='hover:text-red-700'>{navData.title}</Link>
      ))}
    </div>
  );
};

export default NavLinks;