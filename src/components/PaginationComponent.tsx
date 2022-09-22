import { useState, useEffect } from "react";
import { Pagination } from "antd";
import { getUserTotalCount } from "../services/api";
import styled from "styled-components";

const PaginationComponent = ({
  onPageClick,
}: {
  onPageClick: (pageNum: number) => Promise<void>;
}) => {
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    (async () => {
      const totalCount = await getUserTotalCount();
      totalCount && setPageCount(totalCount);
    })();
  });

  return (
    <Container>
      <Padding />
      <Pagination defaultCurrent={1} total={pageCount} onChange={onPageClick} />
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
