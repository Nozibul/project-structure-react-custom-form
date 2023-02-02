import styled from 'styled-components'


const fontSize={
    sm:'0.8rem',
    md: '1rem',
    lg: '1.3rem'
}

const lineHeight ={
    sm: 1.2,
    md: 1.4,
    lg: 1.6,
}

const Label= styled.label`
  font-family: Arial;
  user-select:none;
  font-size:${(props)=> fontSize[props.size] ?? '1rem'};
  color: #222;
  line-height:${(props)=> lineHeight[props.line] ?? '1'};
`

export default Label