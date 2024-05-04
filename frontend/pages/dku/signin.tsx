import styled from "styled-components";
import { Frame } from "../../styles/components/Frame";
import Head from "next/head";
import dynamic from "next/dynamic";
// import DankookStudentCouncilLogin from "dankook-student-council-login";
// const DankookStudentCouncilLogin = dynamic(
//   () => import("dankook-student-council-login"),
//   {
//     ssr: false,
//   }
// );

function SignIn() {
  const signIn = () => {};

  return (
    <Frame>
      <Head>
        <title>로그인 - Text me!</title>
      </Head>
      {/* <DankookStudentCouncilLogin
        clientId="dku-text-me"
        onSuccess={(res) => {
          console.log(res);
        }}
        onError={(err) => {
          console.log(err);
        }}
      /> */}
      <div style={{ background: "red" }}>안녕</div>
    </Frame>
  );
}

export default SignIn;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  color: gray;
  text-decoration: underline;
  margin: 20px;
  &:hover {
    cursor: pointer;
  }
`;
