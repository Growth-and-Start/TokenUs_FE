import styled from "styled-components";
import { MAIN, SECONDARY } from "../../constants/colors";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchBar() {
  return (
    <>
      <SearchBarBox>
        <form action="." method="post">
          <Input type="text" placeholder="검색어를 입력해 주세요" />
          <SearchButton type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:MAIN.BLUE}} />
          </SearchButton>
        </form>
      </SearchBarBox>
    </>
  );
}

const SearchBarBox = styled.div`
  display: inline-block;
  border: 1px solid ${SECONDARY.BLUE};
  border-radius: 8px;
  padding: 1px 10px;
`;

const Input = styled.input`
  all: unset;
  width: 300px;
`;

const SearchButton = styled.button`
all:unset;
`

export default SearchBar;
