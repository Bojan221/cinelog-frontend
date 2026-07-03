import SideBarMenu from "../../components/sidebar/SideBarMenu";
import PreviewSheet from "@/components/common/PreviewSheet";
export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideBarMenu />
      <PreviewSheet/>
      {children}
    </div>
  );
}
