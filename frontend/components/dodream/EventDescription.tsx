import React from "react";
import BackgroundTemplate from "../slow/BackgroundTemplate";
import styled from "styled-components";
import dynamic from "next/dynamic";
import TextParser from "../../common/TextParser";
import { useLogin } from "../../stores/dku/useLogin";
import { useRouter } from "next/router";
const DankookStudentCouncilLogin = dynamic(
  () => import("dankook-student-council-login"),
  {
    ssr: false,
  }
);

const EventDescription = () => {
  const { getToken } = useLogin();
  const router = useRouter();
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
안녕하세요 단국대학교 죽전캠퍼스 56대 DO DREAM 총학생회입니다.

‘함께 참여하는 학교 개선’이란, 단국대학교 학우분들이 직접 교류/안전/교육/시설/복지에 대한 학교의 개선 사항을 직접적으로 DO DREAM 총학생회에 건의하고, 이를 통해 총학생회가 해당 개선 필요 사항을 학교에 전달하여 문제점을 개선할 수 있도록 하는 학생 참여형 학교 개선 사업입니다.\n
- 함께 참여하는 학교 개선은 6월 17-30일 해당 홈페이지를 통해 참여 가능합니다.
- 작성 후 제출한 건의 사항에 대해서는 삭제 또는 수정이 불가능합니다.
- 총학생회 계정으로 로그인한 단국대학교 재학생만 참여 가능합니다.

[이벤트]
본 홈페이지를 통해 ‘함께 참여하는 학교 개선’에 참여해주신 학우분들 중 50명을 추첨하여 배달의 민족 상품권 1만원 교환권을 지급할 예정입니다.
7/3 (수) 17시 인스타 라이브 추첨 이후 상품 지급 예정으로 학우분들의 많은 참여 부탁드립니다.
* 2024-1 재학생 중 학생회비 납부자에 한하여 상품 지급

더욱 풍부한 우리의 대학생활을 위해 학우분들의 이야기에 귀 기울여 듣겠습니다.
“단국인의 더 나은 내일과 꿈을 향해 DO DREAM 총학생회가 앞장서겠습니다."`}
          />
        </Sub>
      </TextContainer>
      <ButtonContainer>
        <DankookStudentCouncilLogin
          clientId={process.env.NEXT_PUBLIC_DKU_CLIENTID}
          redirectUri={`${process.env.NEXT_PUBLIC_SERVICE_URL}/dku/dodream`}
          scope="nickname"
          onSuccess={(res) => {
            const { authCode, codeVerifier } = res;
            getToken(
              {
                authCode,
                codeVerifier,
              },
              () => {
                router.push("/dku/dodream");
              }
            );
          }}
        />
      </ButtonContainer>
    </>
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
