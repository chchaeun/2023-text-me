import React, { Fragment, useEffect } from "react";
import uuid from "react-uuid";
import BackgroundTemplate from "../slow/BackgroundTemplate";
import styled from "styled-components";
import dynamic from "next/dynamic";

const DankookStudentCouncilLogin = dynamic(
  () => import("dankook-student-council-login"),
  {
    ssr: false,
  }
);
interface Props {
  unmountHandler: () => void;
}
const EventDescription = ({ unmountHandler }: Props) => {
  useEffect(() => {
    return () => {
      unmountHandler();
    };
  }, [unmountHandler]);

  const enter = (paragraph: string) => {
    return paragraph.split("\n").map((sentence) => (
      <Fragment key={uuid()}>
        {sentence}
        <br />
      </Fragment>
    ));
  };

  return (
    <BackgroundTemplate imageUrl={"/static/images/danfesta-background.jpeg"}>
      <TextContainer>
        <Head>랑데부: 만남의 우편함</Head>
        <Sub>
          {enter(
            "익명의 학우에게 편지를 남겨보세요.\n편지 하나를 남기면 세 장의 편지를 읽을 수 있어요.\n편지를 남긴 사람이 궁금하다면,\n편지에 적혀있는 연락처로 만남을 추진해요.\n당신의 새로운 만남을 응원합니다 ᰔ\n\n˖◛⁺˖♡ﾟ･♪⁺\n본 이벤트는 5월 21일부터 23일까지 3일 간 운영됩니다.\n\n˖◛⁺˖♡ﾟ･♪⁺\n총학생회 계정으로 로그인한 단국대학교 학생만\n글을 남길 수 있습니다.\n\n˖◛⁺˖♡ﾟ･♪⁺\n연락처를 남기는 건 자유입니다.\n\n˖◛⁺˖♡ﾟ･♪⁺\n열람한 편지는 마이페이지에서 볼 수 있습니다."
          )}
        </Sub>
      </TextContainer>

      <ButtonContainer>
        <DankookStudentCouncilLogin
          clientId="dku-text-me"
          onSuccess={(res) => {
            console.log(res);
          }}
          onError={(err) => {
            console.log(err);
          }}
        />
      </ButtonContainer>
    </BackgroundTemplate>
  );
};

export default EventDescription;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  position: relative;
  top: 20px;
`;

const Head = styled.p`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
`;

const Sub = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 50px;
`;
