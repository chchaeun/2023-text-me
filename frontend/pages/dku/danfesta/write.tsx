import { useEffect, useState } from "react";
import SelectCard from "../../../components/write/SelectCard";
import WriteLetter from "../../../components/write/WriteLetter";
import { cardAlt } from "../../../public/static/images/card-alt";
import { useCardPicture } from "../../../stores/useCardPicture";
import { useSendDanfestaLetter } from "../../../stores/useSendDanfestaLetter";
import { Frame } from "../../../styles/components/Frame";
import Head from "next/head";
import { useMembers } from "../../../stores/useMembers";
import Link from "next/link";
import { LeftButton, RightButton } from "../../../styles/components/Button";
import styled from "styled-components";
import { useRoomInfo } from "../../../stores/useRoomInfo";
import { UseFormRegister } from "react-hook-form";

const PROCESS = {
  SELECT: "SELECT",
  PREVIEW: "PREVIEW",
  WRITE: "WRITE",
  COMPLETE: "COMPLETE",
};

const DANFESTA_USER_ID = process.env.NEXT_PUBLIC_DKU_USERID;

function DanfestaWrite() {
  const [process, setProcess] = useState(PROCESS.SELECT);

  const { sendLetter } = useSendDanfestaLetter();
  const { pictureUrl } = useCardPicture();

  const { member, getMember } = useMembers();
  const { roomInfo, getRoomInfo } = useRoomInfo();

  useEffect(() => {
    getMember();
    getRoomInfo(DANFESTA_USER_ID);
  }, []);

  switch (process) {
    case PROCESS.SELECT:
      return (
        <SelectCard
          type={"SELECT"}
          next={() => setProcess(PROCESS.WRITE)}
          cards={Array.from(
            { length: 8 },
            () => "/static/images/danfesta-card"
          ).map((v, i) => ({
            src: `${v}-${i + 1}.png`,
            alt: cardAlt[`card-${i + 1}`],
          }))}
        />
      );
    case PROCESS.WRITE:
      return (
        <WriteLetter
          prev={() => setProcess(PROCESS.SELECT)}
          next={() => setProcess(PROCESS.COMPLETE)}
          sendLetter={sendLetter}
          letterData={{
            receiverId: DANFESTA_USER_ID,
          }}
          to={roomInfo?.userName}
          inputOption={(register) => {
            return (
              <ContactLabel>
                <div>
                  {"연락처를 남겨 새로운 인연을 만들어보세요 ෆ⸒⸒⸜( ˶'ᵕ'˶)⸝"}
                  <ContactSpan> * 선택사항</ContactSpan>
                </div>
                <ContactInput
                  {...register("contact")}
                  placeholder="카카오톡 오픈채팅, 이메일, 인스타그램 etc."
                />
              </ContactLabel>
            );
          }}
        />
      );

    case PROCESS.COMPLETE:
      return (
        <Frame>
          <Head>
            <title>편지 전달 완료 - Text me!</title>
          </Head>

          <Container>
            <Title>익명의 학우에게 편지를 보냈어요</Title>
            {pictureUrl && <CardImage src={pictureUrl} />}
            <div>
              {member ? (
                <Link href={`/${member?.id}`}>
                  <LeftButton>내 방으로 가기 </LeftButton>
                </Link>
              ) : (
                <Link href="/signup">
                  <LeftButton>내 방 만들기 </LeftButton>
                </Link>
              )}
              <Link href={`/dku/danfesta`}>
                <RightButton>확인하기</RightButton>
              </Link>
            </div>
          </Container>
        </Frame>
      );
  }
}

export default DanfestaWrite;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;

  margin-top: 20px;

  ${LeftButton} {
    width: 180px;
    height: 40px;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 17px;
    color: white;
    margin: 0 auto;
  }
  ${RightButton} {
    width: 180px;
    height: 40px;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 17px;
    color: white;
    margin: 17px auto;
  }
`;

const Title = styled.p`
  margin: 0;

  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 17px;
  text-align: center;
`;

const CardImage = styled.img`
  width: 140px;
  height: 175px;
  border-radius: 10px;

  object-fit: cover;
`;

const ContactLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const ContactSpan = styled.span`
  color: gray;
`;

const ContactInput = styled.input`
  border: solid 1px gray;
  padding: 6px;
  border-radius: 4px;
  width: 100%;

  &:focus {
    outline: none;
  }
`;
