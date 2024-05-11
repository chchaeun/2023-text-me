import { useEffect, useState } from "react";
import DanfestaRoom from "../../../components/danfesta/Room";
import EventDescription from "../../../components/danfesta/EventDescription";

function Danfesta() {
  const DKU_DANFESTA_PROCESS_NEVERSEE = "DKU_DANFESTA_PROCESS_NEVERSEE";
  const [process, setProcess] = useState<"ROOM" | "DESCRIPTION">("ROOM");

  useEffect(() => {
    if (localStorage.getItem(DKU_DANFESTA_PROCESS_NEVERSEE) !== "Y") {
      setProcess("DESCRIPTION");
    }
  }, []);

  switch (process) {
    case "ROOM":
      return <DanfestaRoom />;

    case "DESCRIPTION":
      return (
        <EventDescription
          unmountHandler={() => {
            localStorage.setItem(DKU_DANFESTA_PROCESS_NEVERSEE, "Y");
          }}
        />
      );
  }
}

export default Danfesta;
