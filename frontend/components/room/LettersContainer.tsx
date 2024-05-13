import React, { useEffect } from "react";
import styled from "styled-components";
import { useCaptureMode } from "../../stores/useCaptureMode";
import { useLetterPagination } from "../../stores/useLetterPagination";
import { useLetters } from "../../stores/useLetters";
import Background from "./Background";
import LettersMove from "./LettersMove";
import { useAlertModal } from "../../stores/useAlertModal";
import { useLetterView } from "../../stores/useLetterView";

interface Props {
  userId: string;
  backgroundImage: string;
  defaultCardImage: string;
  confirmOpen: () => Promise<boolean>;
}

function LettersContainer({
  userId,
  backgroundImage,
  defaultCardImage,
  confirmOpen,
}: Props) {
  const PAGE_LETTER = 23;

  const { isCaptureMode } = useCaptureMode();
  const { pagination, setLastPage } = useLetterPagination();
  const { error, letters, getLetters } = useLetters();
  const { openAlertModal } = useAlertModal();
  const { open } = useLetterView();

  useEffect(() => {
    if (userId) {
      getLetters(userId);
    }
  }, [userId]);

  useEffect(() => {
    setLastPage(Math.floor(letters.length / PAGE_LETTER));
  }, [letters]);

  if (error) {
    return (
      <ErrorMessage>
        편지를 불러오는 중<br />
        에러가 발생했습니다.
      </ErrorMessage>
    );
  }

  const openLetter = async (id: string) => {
    const result = await confirmOpen();
    if (!result) {
      return;
    }

    if (letters[Number(id)]) {
      open(letters[Number(id)].id);
    } else {
      openAlertModal("아직 편지가 도착하지 않았어요!");
    }
  };

  return (
    <Container isCaptureMode={isCaptureMode}>
      {!isCaptureMode && letters.length > PAGE_LETTER && <LettersMove />}
      <Background
        letters={letters.slice(
          pagination * PAGE_LETTER,
          pagination * PAGE_LETTER + PAGE_LETTER
        )}
        backgroundImage={backgroundImage}
        defaultCardImage={defaultCardImage}
        userId={userId}
        openLetter={openLetter}
      />
    </Container>
  );
}

export default LettersContainer;

const Container = styled.div<{ isCaptureMode: boolean }>`
  position: absolute;
  width: 100vw;
  height: ${(p) =>
    p.isCaptureMode
      ? "calc(var(--vh, 1vh) * 95)"
      : "calc(var(--vh, 1vh) * 100)"};
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  gap: 55px;

  overflow-x: scroll;
  -ms-overflow-style: none;

  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
    width: 0px;
    height: 0px;
    color: transparent;
  }

  @media ${({ theme }) => theme.device.large} {
    width: 100%;
    left: 50%;
    transform: translateX(-50%);

    svg {
      height: 100%;
    }
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  color: black;
`;
