import styled from "styled-components"
import TextInputs from "../../ui/inputs/TextInputs"
import Label from "../../ui/inputs/Label"
import Text from "../../ui/text/Text"


const Container =styled.div`
  width: 50%;
  padding: 1rem;
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  gap: 0.5rem
`

const InputGroup = ({onBlur, onFocus, label, name, value, onChange, placeholder, error}) => {
  return (
    <Container>
       <Label htmlFor={name}>{label}</Label>
       <TextInputs
         value={value}
         name={name} 
         id={name}
         placeholder={placeholder} 
         onChange={onChange} 
         onFocus={onFocus}
         onBlur={onBlur}
         error={error}       
       />
      {error && <Text>{error}</Text>}
    </Container>
  )
}

export default InputGroup