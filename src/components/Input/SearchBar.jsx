import styled from "styled-components";
import { MAIN, SECONDARY } from "../../constants/colors";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBar() {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearchQuery("");
    }
  }, [location.pathname]);

  return (
    <>
      <SearchBarBox>
        <form onSubmit={handleSearch}>
          <Input 
          type="text" 
          placeholder="검색어를 입력해 주세요" 
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}/>
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
  padding: 3px 10px;
`;

const Input = styled.input`
  all: unset;
  width: 300px;
  
`;

const SearchButton = styled.button`
all:unset;
`

export default SearchBar;
