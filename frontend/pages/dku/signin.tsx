import styled from "styled-components";
import { Frame } from "../../styles/components/Frame";
import Head from "next/head";
function SignIn() {
  const signIn = () => {};

  return (
    <Frame>
      <Head>
        <title>로그인 - Text me!</title>
      </Head>
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
