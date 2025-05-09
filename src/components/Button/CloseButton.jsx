import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function CloseButton({className, size, color, style, onClick}) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return(
    <Button className={className} onClick={onClick || handleGoBack} style={style}>
      <FontAwesomeIcon icon={faX} size={size} color={color}/>
    </Button>
  )
}

const Button = styled.button`
  all:unset;
  cursor: pointer;
`

export default CloseButton;