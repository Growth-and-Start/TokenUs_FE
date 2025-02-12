import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function CloseButton({size, color, style}) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return(
    <Button onClick={handleGoBack} style={style}>
      <FontAwesomeIcon icon={faX} size={size} color={color}/>
    </Button>
  )
}

const Button = styled.button`
  all:unset;
  cursor: pointer;
`

export default CloseButton;