import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import EventDescription from "../../../components/dodream/EventDescription";
import DoDreamRoom from "../../../components/dodream/Room";
import { useLetters } from "../../../stores/dku/dodream/useLetters";
import EventEnd from "../../../components/dodream/EventEnd";

const DoDream = () => {
  const errorRef = useRef<any>();
  const [process, setProcess] = useState("ROOM");

  const { error, getLetters } = useLetters();

  useEffect(() => {
    const end = new Date("2024/06/30 23:59");
    const now = new Date();

    if (end < now) {
      setProcess("END");
      return;
    }

    errorRef.current = error;

    if (error) {
      setProcess("DESCRIPTION");
    } else {
      setProcess("ROOM");
    }
  }, [error]);

  useEffect(() => {
    const id = setInterval(() => {
      if (errorRef.current) {
        getLetters();
      }
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Head>
        <meta
          property="og:url"
          content="https://textme.gifterz.site/dku/dodream"
        />
        <meta
          property="og:image"
          content="static/images/dodream-background.png"
        />
        <meta
          property="og:description"
          content="따뜻한 편지 한 통으로 소중한 인연을 만들어보세요!"
        />
        <meta
          property="og:title"
          content="함께 참여하는 학교 개선 - Do Dream"
        />
      </Head>

      {(() => {
        switch (process) {
          case "ROOM":
            return <DoDreamRoom />;

          case "DESCRIPTION":
            return <EventDescription />;

          case "END":
            return <EventEnd />;
          default:
            return <></>;
        }
      })()}
    </>
  );
};

export default DoDream;
