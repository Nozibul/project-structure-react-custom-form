import styled from 'styled-components'

const Button = styled.button`

border: none;
outline: none;
padding: 0.25rem 0.10rem;
font-size:0.9rem;
font-family: Arial;
background: #e1e1e1;
border-radius: 0.15rem;
color: #333;
letter-spacing: 0.1rem;
cursor: pointer;
text-transform: uppercase;

&:hover{
    background: green;
    color: white
}
`

export default Button