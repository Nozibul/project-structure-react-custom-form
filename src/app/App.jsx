import { useState } from "react";
import InputGroup from '../components/shared/forms/InputGroup'
import Button from "../components/ui/buttons/Button";


const init = {
  title:{
    values:"",
    errors:"",
    focus: false,
  },
  bio:{
    values:"",
    errors:"",
    focus: false,
  },
  skill:{
    values:"",
    errors:"",
    focus: false,
  },
}

const App = () => {
  const stateToValues =(state)=>{
     // console.log(Object.keys(state));// ['title', 'bio', 'skill']
    // Object.keys(state).reduce((acc, cur)=>console.log(state[cur], cur));//{values: 'sdfg', errors: '', focus: false} 'bio'
   
   return Object.keys(state).reduce((acc, cur)=>{
      // acc obj er vitore title, bio, skill name akta property thakbe 
      // oi property te title, bio, skill er value gulo dhuke jabe
      acc[cur] = state[cur].values; // { title: "", bio:"", skill:''}
       return acc ;
    },{})
  }

 // 3 ta state na nia amra init er object ta create korlam than
 // 1ta state nia kaj korbo
 const [state, setState]= useState({...init})
 const [hasError, setHasError]= useState(false)

 
  const handleChange=(e)=>{
   const {name:key, value} = e.target;
   const oldState = JSON.parse(JSON.stringify(state)); // deep clone 
   const values = stateToValues(oldState)
   const {error} = checkValidity(values);
    // console.log(oldState);//{title: {…}, bio: {…}, skill: {…}}
   
   oldState[key].values = value;//oldState obj er vitore name er j value title, bio, skill ase ter vitore j values property ase ter moddhe e.target.value ta dhukbe. exp: title.values:"something"
   
   if(oldState[key].focus && error[key]){
    oldState[key].errors = error[key]; // oldStaet er moddhe title name j property ase and ter vitore error name j property ase ter value hove error er vitorer value ta
  }else{
    oldState[key].errors = '' ;
  } 
   setState(oldState) 

  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const values = stateToValues(state)
    // console.log(values);//{title: 'vv', bio: 'vb', skill: 'rd'}

    const {error, isValid} = checkValidity(values);
    if(isValid){
      console.log(state)
    }else{
     // error jekono field aste pare so sob field gulo k traverse kore dhekbo
     const oldState = JSON.parse(JSON.stringify(state));
     Object.keys(error).forEach((key)=>{
       oldState[key].errors = error[key] ;
     })

     setState(oldState)
    }
  };


  const handleFocus = (e) =>{
    const oldState = JSON.parse(JSON.stringify(state));
    oldState[e.target.name].focus = true;//oldState obj er vitore name er j value title, bio, skill ase ter vitore j focus property ase ter moddhe true ta dhukbe. exp: title.focus: true , bio.focus: true
    setState(oldState) 
  } 

  const handleBlur = (e) =>{
    const key = e.target.name; // title, bio, skill
    const values = stateToValues(state);// {title: 'vv', bio: 'vb', skill: 'rd'}
    const {error} = checkValidity(values);
    const oldState = JSON.parse(JSON.stringify(state));
    
    // note dynamic vabe property nite gele array notation use korte hoi. exp: [propertypabo]
    if(oldState[key].focus && error[key]){
      oldState[key].errors = error[key];// oldStaet er moddhe title name j property ase and ter vitore error name j property ase ter value hove error er vitorer value ta
    }else{
      oldState[key].errors = '' ;
    } 
    setState(oldState)
  }


  const checkValidity=(value)=>{
      // jehetu error gulo akta obj  hobe so akta empty obj nibo
      const error = {}
      const {title, bio, skill} = value;
      if(!title){
        error.title = 'Invalid Title'
      }
      if(!bio){
        error.bio = 'Invalid Bio'
      }
      if(!skill){
        error.skill = 'Invalid Skill'
      }
      return {
        error,
   // object.keys array return kore, error obj er property gulo k array te convert kore than length check korbe
        isValid: Object.keys(error).length === 0 
      }
  }


  return (
    <div className='root'>Folder Structure for React <br /> <br />
       <form onSubmit={handleSubmit}>
          <InputGroup 
            value={state.title.values}
            label={'Title'}
            name={'title'}
            placeholder={'Software Engineer'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={state.title.errors}
          />
          <InputGroup 
            value={state.bio.values}
            label={'Bio'}
            name={'bio'}
            placeholder={'I am a Software Engineer...'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={state.bio.errors}
          />
          <InputGroup 
            value={state.skill.values}
            label={'Skill'}
            name={'skill'}
            placeholder={'javascript, react'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={state.skill.errors}
          />
          <Button disabled={hasError} type="submit">submit</Button>
       </form>
    </div>
  )
}

export default App  