import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { getAccount } from "../services";
import {
  getRefinedAccountInfoThunk,
  putAccountWithNewNameThunk,
} from "../store/account-list.reducer";
import styled from "styled-components";
import AccountDetailDescription from "../components/AccountDetailDescription";
import { Button, Drawer, Input } from "antd";
import { Account } from "../types";

const AccountDetailPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.accountList.accountDetail);
  const { userId, id } = useParams();

  useEffect(() => {
    if (!(userId && id)) return;
    dispatch(
      getRefinedAccountInfoThunk({
        userId: parseInt(userId),
        id: parseInt(id),
      })
    );
  }, []);

  const [open, setOpen] = useState(false);
  const closeDrawer = () => {
    setOpen(false);
  };

  const openDrawer = () => {
    setOpen(true);
  };

  const [newAccountName, setNewAccountName] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    console.log({ value });
    setNewAccountName(value);
  };

  const changeAccountName = async () => {
    if (!(userId && id)) return;

    const { account: rawAccount, error } = await getAccount(
      parseInt(userId),
      parseInt(id)
    );
    if (error || rawAccount === null) {
      alert("계좌 이름 변경에 실패했습니다.");
      return;
    }

    const newAccount: Account = {
      ...rawAccount,
      name: newAccountName,
    };
    await dispatch(
      putAccountWithNewNameThunk({
        userId: parseInt(userId),
        id: parseInt(id),
        newAccount,
      })
    );
    closeDrawer();
    dispatch(
      getRefinedAccountInfoThunk({
        userId: parseInt(userId),
        id: parseInt(id),
      })
    );
  };

  return (
    <Container>
      <AccountDetailDescription account={account} />
      <Button type="primary" onClick={openDrawer}>
        계좌명 변경
      </Button>
      <Drawer
        title="계좌명 변경"
        placement="right"
        onClose={closeDrawer}
        open={open}
      >
        <Guide>새 계좌명을 입력해주세요.</Guide>
        <Input
          type="text"
          value={newAccountName}
          onChange={handleInputChange}
          placeholder="새 계좌명"
        />
        <ConfirmButton type="primary" onClick={changeAccountName}>
          확인
        </ConfirmButton>
      </Drawer>
    </Container>
  );
};

export default AccountDetailPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  gap: 30px;
`;

const Guide = styled.span`
  display: block;
  margin-bottom: 10px;
`;

const ConfirmButton = styled(Button)`
  margin-top: 10px;
`;
