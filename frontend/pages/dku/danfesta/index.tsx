import { useEffect, useState } from "react";
import DanfestaRoom from "../../../components/danfesta/Room";
import EventDescription from "../../../components/danfesta/EventDescription";
import { useLetters } from "../../../stores/dku/danfesta/useLetters";

function Danfesta() {
  const [process, setProcess] = useState<"ROOM" | "DESCRIPTION">();

  const { getLetters } = useLetters();

  useEffect(() => {
    getLetters(
      { gender: null },
      () => setProcess("ROOM"),
      () => setProcess("DESCRIPTION")
    );
  }, []);

  switch (process) {
    case "ROOM":
      return <DanfestaRoom />;

    case "DESCRIPTION":
      return <EventDescription loginCallback={() => setProcess("ROOM")} />;

    default:
      return <></>;
  }
}

export default Danfesta;
