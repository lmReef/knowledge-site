"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://en.wikipedia.org/w/rest.php/v1/search/page?q=corn&limit=3",
      );
      const json = await res.json();
      // console.log(json);

      setContent(json);
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />

      <main className="flex min-h-screen flex-col items-center p-12">
        <div className="content flex flex-col gap-8">
          {content?.pages?.map((x: object, key: number) => {
            return (
              <div key={key} className="item text-center">
                <h3>{x.title}</h3>
                <p>{x.description}</p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
