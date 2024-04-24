import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useCaptureMode } from "../../../stores/useCaptureMode";
import { useAlertModal } from "../../../stores/useAlertModal";
import ButtonsContainer from "../../../components/room/ButtonsContainer";
import LettersContainer from "../../../components/room/LettersContainer";
import {
  RightButton,
  WhiteRightButton,
} from "../../../styles/components/Button";
const AlertModal = dynamic(() => import("../../../components/room/AlertModal"));
const LetterViewContainer = dynamic(
  () => import("../../../components/room/LetterViewContainer")
);
const SaveModal = dynamic(() => import("../../../components/room/SaveModal"));

const LETTER_NOT_ARRIVE_MESSAGE = "아직 편지가 도착하지 않았어요!";

function DanfestaRoom() {
  const pathname = usePathname();

  const userId = "BC09E4C4E30AD99120565CA8746E6D86";

  const { isCaptureMode, toggleCaptureMode, modalOpen } = useCaptureMode();
  const { alertEmptyLetterModalOpen } = useAlertModal();

  return (
    <>
      <Head>
        <title>낭만 우편함 - Danfesta</title>
      </Head>
      <Header>
        <Logo src="/static/images/danfesta-logo.png" />
        {!isCaptureMode && <ButtonsContainer />}
      </Header>
      <LettersContainer
        userId={userId}
        backgroundImage={"/static/images/danfesta-background.jpeg"}
        defaultCardImage="/static/images/danfesta-card-default.png"
      />
      {!isCaptureMode && (
        <Link href={`${pathname}/write`}>
          <CTAButton>편지 남기기</CTAButton>
        </Link>
      )}
      <LetterViewContainer />
      {alertEmptyLetterModalOpen && (
        <AlertModal text={LETTER_NOT_ARRIVE_MESSAGE} />
      )}
      {modalOpen && <SaveModal />}
      {isCaptureMode && (
        <CaptureModeButton type="button" onClick={toggleCaptureMode}>
          캡처 모드 종료
        </CaptureModeButton>
      )}
    </>
  );
}

export default DanfestaRoom;

const Logo = styled.img`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px;

  width: fit-content;
  height: 150px;

  margin: 0;
  z-index: 1;

  @media ${({ theme }) => theme.device.small} {
    padding: 13px;
    height: 40px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CTAButton = styled(WhiteRightButton)`
  position: fixed;
  left: 50%;
  bottom: 8%;
  transform: translate(-50%, -50%);

  padding: 13px 24px;

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4),
    inset -2px -2px 3px rgba(106, 106, 106, 0.25),
    inset 2px 2px 3px rgba(255, 255, 255, 0.5);

  color: navy;

  @media ${({ theme }) => theme.device.small} {
    font-size: 12px;
    padding: 8px 16px;
  }
`;

const CaptureModeButton = styled(RightButton)`
  position: fixed;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 5vh;
  margin: 10px auto;
  border-radius: 0;
`;
