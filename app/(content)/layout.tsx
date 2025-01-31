import React from "react";

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="max-w-screen-lg mx-auto p-4 pb-16 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:my-4
      [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-3
      [&_h3]:text-xl [&_h3]:font-bold [&_h3]:my-3
      [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:my-4
      [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:my-4
      [&_li]:my-2 [&_li]:pl-2
      [&_p]:my-3"
    >
      {children}
    </div>
  );
}
