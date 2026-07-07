import AppShell from "@/components/sidebar/AppShell";
import PreviewSheet from "@/components/common/PreviewSheet";

export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell>
      <PreviewSheet />
      {children}
    </AppShell>
  );
}
