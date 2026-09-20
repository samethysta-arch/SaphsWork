"use client";

import { useRouter } from "next/navigation";
import { type AnchorHTMLAttributes, useState } from "react";

type PixelLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function PixelLink({ href, children, onClick, ...props }: PixelLinkProps) {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || isTransitioning || event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    setIsTransitioning(true);
    window.setTimeout(() => router.push(href), 520);
  }

  return <>
    <a href={href} onClick={handleClick} {...props}>{children}</a>
    {isTransitioning && <div className="pixel-curtain" aria-hidden="true">
      {Array.from({ length: 120 }, (_, index) => <i key={index} style={{ "--tile": index } as React.CSSProperties} />)}
    </div>}
  </>;
}
