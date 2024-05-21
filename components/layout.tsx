import NavBar from "./NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />

      <main className="flex min-h-screen flex-col items-center p-12">
        {children}
      </main>
    </>
  );
}
