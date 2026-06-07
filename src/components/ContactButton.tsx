"use client";

import type { ReactNode } from "react";

type ContactButtonProps = {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export default function ContactButton({
  className,
  children = "Contact",
  onClick,
}: ContactButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new Event("learn-with-zara-contact"));
        onClick?.();
      }}
    >
      {children}
    </button>
  );
}
