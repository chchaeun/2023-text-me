import React, { useEffect } from "react";
import { useLetterView } from "../../stores/useLetterView";
import { Overlay } from "../../styles/components/Modal";
import LetterView from "./LetterView";
import LetterViewMove from "./LetterViewMove";
import ReportIcon from "../common/icons/ReportIcon";
import styled from "styled-components";
import { useAlertModal } from "../../stores/useAlertModal";

function LetterViewContainer() {
  const { isOpened, id, getLetter, close } = useLetterView();

  const { openAlertModal } = useAlertModal();

  useEffect(() => {
    if (id) {
      getLetter();
    }
  }, [id]);

  if (!isOpened) {
    return <></>;
  }

  return (
    <>
      <Report
        type="button"
        onClick={() => openAlertModal("편지를 신고하시겠습니까?")}
      >
        신고
        <ReportIcon />
      </Report>
      <div>
        <Overlay onClick={close} />
        <LetterViewMove>
          <LetterView />
        </LetterViewMove>
      </div>
    </>
  );
}

export default LetterViewContainer;

const Report = styled.button`
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 2px;
  position: fixed;
  opacity: 1;
  color: white;
  background-color: navy;
  z-index: 100;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
`;
