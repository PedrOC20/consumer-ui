import styled from 'styled-components';

export const ProductSearchContainer = styled.div`
`

export const Table = styled.div`
  margin: auto;
  text-align: center;
  margin-top: 30px;
`

export const Search = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

export const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;

  button {
    margin: 0 5px;
    padding: 8px 16px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`
