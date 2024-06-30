import React from "react";
import styled from "styled-components";
import BackgroundTemplate from "../slow/BackgroundTemplate";
import TextParser from "../../common/TextParser";

function EventEnd() {
  return (
    <>
      <BackgroundTemplate
        imageUrl={"/static/images/dodream-background.jpeg"}
      ></BackgroundTemplate>
      <TextContainer>
        <Head>함께 참여하는 학교 개선</Head>
        <Sub>
          <TextParser
            text={`
이벤트가 종료되었습니다.`}
          />
        </Sub>
      </TextContainer>
    </>
  );
}

export default EventEnd;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  position: relative;
  top: 20px;
`;

const Head = styled.p`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  font-family: "HeirofLight";
`;

const Sub = styled.p`
  font-size: 16px;
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
  z-index: 1;
  position: relative;
`;
