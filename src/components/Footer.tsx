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
    <footer className="w-full border-t border-gray-200 bg-white p-6">
      <div className="mx-auto flex container flex-col items-center justify-between gap-2 text-[18px] text-gray-500 sm:flex-row sm:gap-0">
        <span>
          &copy; {year} {siteName}
        </span>
        <span>Source: {sourceName}</span>
      </div>
    </footer>
  );
}