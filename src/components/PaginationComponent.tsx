import { Pagination } from "antd";
import { useAppSelector } from "../store";
import styled from "styled-components";

const PaginationComponent = ({
  onPageClick,
}: {
  onPageClick: (pageNum: number) => Promise<void>;
}) => {
  const userCount = useAppSelector((state) => state.userList.userCount);

  return (
    <Container>
      <Padding />
      <Pagination total={userCount} onChange={onPageClick} />
    </Container>
  );
};

export default PaginationComponent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Padding = styled.div`
  padding: 20px 0;
`;
