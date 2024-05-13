import React from "react";
import styled from "styled-components";
import { Modal } from "../../styles/components/Modal";
import { useConfirmModal } from "../../stores/useConfirmModal";
import TextParser from "../TextParser";

const ConfirmModal = () => {
  const { text, clickNo, clickYes } = useConfirmModal();

  return (
    <>
      {text && (
        <Container>
          <TextParser text={text} />
          <RowLayout>
            <Button type="button" onClick={clickNo}>
              취소
            </Button>
            <Button type="button" onClick={clickYes}>
              확인
            </Button>
          </RowLayout>
        </Container>
      )}
    </>
  );
};

export default ConfirmModal;

const Container = styled(Modal)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 32px;

  width: 70%;
  height: fit-content;

  background: rgba(21, 21, 21, 0.75);
  color: #ffffff;
`;

const RowLayout = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background: #ffffff;
  border: none;
  border-radius: 5px;
`;
