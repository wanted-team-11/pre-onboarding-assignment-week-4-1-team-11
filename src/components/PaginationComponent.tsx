import { Pagination } from "antd";
import styled from "styled-components";

const PaginationComponent = ({
  onPageClick,
  total,
}: {
  onPageClick: (pageNum: number) => Promise<void>;
  total: number;
}) => {
  return (
    <Container>
      <Padding />
      <Pagination total={total} onChange={onPageClick} />
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
