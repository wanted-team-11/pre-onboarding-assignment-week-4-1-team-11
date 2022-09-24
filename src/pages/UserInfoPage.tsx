import { Avatar, Descriptions, Image, message, Space, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDetail } from "../services/axios.service";

import { dayConverter, phoneMask } from "../utils/regfunc";

const UserInfoPage = () => {
  const { id } = useParams();
  const [, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any | null>(null);
  useEffect(() => {
    const getUserInfo = async (id: string) => {
      try {
        setLoading(true);
        const result = await getUserDetail(id);
        setUserInfo(result);
      } catch (error) {
        if (axios.isAxiosError(error)) message.error(error.message);
        else message.error("404 Error");
      } finally {
        setLoading(false);
      }
    };
    if (!id) return;
    const dd = String(id);
    getUserInfo(dd);
  }, [id]);
  console.log(userInfo);
  return (
    <Space direction="vertical">
      <Avatar
        size={100}
        src={<Image src="https://joeschmoe.io/api/v1/random" />}
      />
      <Descriptions title="User Info" bordered>
        <Descriptions.Item label="이 름">
          {userInfo?.name === undefined ? "--" : userInfo.name}
        </Descriptions.Item>
        <Descriptions.Item label="성 별">
          {userInfo?.gender_origin === undefined ? (
            "--"
          ) : userInfo.gender_origin % 2 === 0 ? (
            <Tag>여성</Tag>
          ) : (
            <Tag>남성</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="생년월일">
          {userInfo?.birth_date === undefined
            ? "--"
            : dayConverter(userInfo.birth_date)}
        </Descriptions.Item>
        <Descriptions.Item label="핸드폰 번호">
          {userInfo?.phone_number === undefined
            ? "--"
            : phoneMask(userInfo.phone_number)}
        </Descriptions.Item>
        <Descriptions.Item label="이메일" span={2}>
          {userInfo?.email === undefined ? "--" : userInfo.email}
        </Descriptions.Item>
        <Descriptions.Item label="주 소" span={3}>
          {`${userInfo?.address} ${userInfo?.detail_address}`}
        </Descriptions.Item>
        <Descriptions.Item label="가입일">
          {userInfo?.created_at === undefined
            ? "--"
            : dayConverter(userInfo.created_at)}
        </Descriptions.Item>
        <Descriptions.Item label="혜택 수신 동의">
          {userInfo?.allow_marketing_push === undefined ? (
            "--"
          ) : userInfo.allow_marketing_push ? (
            <Tag color="success">동의</Tag>
          ) : (
            <Tag color="error">거부</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="활성화 여부">
          {userInfo?.is_active === undefined ? (
            "--"
          ) : userInfo.is_active ? (
            <Tag color="success">활성화</Tag>
          ) : (
            <Tag color="error">비활성</Tag>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Space>
  );
};
export default UserInfoPage;
