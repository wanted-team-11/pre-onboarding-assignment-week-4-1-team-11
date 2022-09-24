import { Button } from "antd";
import { ReactElement, SetStateAction } from "react";
import styled from "styled-components";

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
}

const Pagination = ({ total, limit, page, setPage }: PaginationProps) => {
  const numPages = Math.ceil(total / limit);
  const pageArray: number[] = Array(numPages);

  /** TODO : styled component에서 생긴 타입에러를 잡아야함.
   *   {
        pageArray.fill(0).map((el : number, i : number) =>{
            return (
              <PageButton  
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}>
                {i + 1}
            </PageButton>
            )
        })
      }
   * 
   */
  return (
    <ButtonContainer>
      <PageButton onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </PageButton>
    </ButtonContainer>
  );
};

export default Pagination;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
`;

const PageButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 8px;
  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }
  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
