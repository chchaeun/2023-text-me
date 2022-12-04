import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import LettersContainer from "../../components/room/LettersContainer";
import ShareContainer from "../../components/room/ShareContainer";
import SaveContainer from "../../components/room/SaveContainer";
import LetterViewContainer from "../../components/room/LetterViewContainer";
import { useRoomInfo } from "../../stores/useRoomInfo";
import Background from "../../components/room/Background";
import styled from "styled-components";

function Room() {
  const { get } = useSearchParams();
  const pathname = usePathname();
  const userId = Number(get("uid"));

  const { roomInfo, getRoomInfo } = useRoomInfo();

  useEffect(() => {
    getRoomInfo(userId);
  }, []);

  return (
    <Background>
      <Frame>
        <Title>{roomInfo.ownerName}'s room</Title>
        <div>
          <ShareContainer />
          <SaveContainer />
          {/* To do: 비로그인 구분 */}
          <Link href="/">메인</Link>
        </div>
        <LettersContainer userId={userId} />
        <Link href={`${pathname}/write`}>Text Username</Link>
        <LetterViewContainer />
      </Frame>
    </Background>
  );
}

export default Room;

const Frame = styled.div`
  padding: 32px 24px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px;

  width: fit-content;
  margin: 0;

  background: #ffffff;
  border-radius: 10px 10px 10px 0px;

  font-weight: 700;
  font-size: 17px;
  line-height: 17px;

  color: #0eca92;

  box-shadow: 2px 2px 5px 1px rgba(62, 78, 82, 0.4);
`;
