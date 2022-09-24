import { Pagination } from "antd";
import styled from "styled-components";
import { useParams } from "react-router-dom";

interface PaginationComponentProps {
  onPageClick: (pageNum: number) => Promise<void>;
  total: number;
}

const PaginationComponent = ({
  onPageClick,
  total,
}: PaginationComponentProps) => {
  const { page } = useParams();
  const numId = page ? parseInt(page) : undefined;

  return (
    <Container>
      <Padding />
      <Pagination total={total} onChange={onPageClick} current={numId} />
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
