import NavBar from "./NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />

      <main className="flex min-h-screen flex-col items-center overflow-hidden p-4 md:p-36 md:pt-6">
        {children}
      </main>
    </>
  );
}
