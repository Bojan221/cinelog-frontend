import SideBarMenu from "../../components/sidebar/SideBarMenu";

export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideBarMenu />
      {children}
    </div>
  );
}
