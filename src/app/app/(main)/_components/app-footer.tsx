"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SwipeNavigation } from "~/app/_components/swipe-navigation";

export function AppFooter({
  sections,
  icons,
  customSections,
}: {
  sections: readonly string[];
  icons: readonly string[];
  customSections?: Map<number, React.ReactNode>;
}) {
  const pathname = usePathname();
  const page = sections.find((section) => pathname.includes(section));
  const pageIndex = page ? sections.indexOf(page) : 0;

  return (
    <>
      {/* <SwipeNavigation pages={sections} pageIndex={pageIndex} /> */}
      <footer className="bg-surface sticky bottom-0 ">
        <div className="mx-2 flex h-16 flex-row items-center justify-around border-inverse-surface">
          {sections.map((section, index) => {
            if (customSections?.has(index)) {
              return customSections.get(index);
            }
            return (
              <Link key={section} href={section} replace={true}>
                <span
                  className={`material-icons ${pageIndex === index ? "text-primary" : ""}`}
                >
                  {icons[index]}
                </span>
              </Link>
            );
          })}
        </div>
      </footer>
    </>
  );
}
