'use client';

import PublicLayout from "@/components/Layouts/PublicLayout";


export default function PublicPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}