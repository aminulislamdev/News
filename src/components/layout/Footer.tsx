interface FooterProps {
  year?: number;
  siteName?: string;
  sourceName?: string;
}

export default function Footer({
  year = 2026,
  siteName = 'BanglaBulletin',
  sourceName = 'BBC Bangla',
}: FooterProps) {
  return (
    <footer className="w-full border-t border-gray-200 bg-white px-4 py-5 sm:p-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 text-center text-sm text-gray-500 sm:flex-row sm:gap-0 sm:text-left sm:text-[18px]">
        <span className="break-words">
          &copy; {year} {siteName}
        </span>
        <span className="break-words">Source: {sourceName}</span>
      </div>
    </footer>
  );
}