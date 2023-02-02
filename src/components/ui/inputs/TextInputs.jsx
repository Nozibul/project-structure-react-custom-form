import styled from 'styled-components'

const TextInputs = styled.input`
  width: 80%;
  border: ${({error})=> error ? '2px solid red' : '1px solid green'};
  outline: none;
  padding:.25rem 0.10rem;
  font-size:0.9rem;
  font-family: Arial;
  background: transparent;
  color: #333;

  &:focus{
    border: 2px solid red;
  };
`

export default TextInputs
