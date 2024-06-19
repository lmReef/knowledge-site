import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "./NavBar";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

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

      <div className="fixed bottom-0 right-0 z-20">
        <button
          className="rounded-full p-6 transition-all hover:scale-125"
          onClick={() => window.scrollTo(0, document.body.scrollHeight)}
          aria-label="scroll to bottom"
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        <button
          className="rounded-full p-6 transition-all hover:scale-125"
          onClick={() => document.body.scrollIntoView()}
          aria-label="scroll to top"
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      </div>
    </>
  );
}
