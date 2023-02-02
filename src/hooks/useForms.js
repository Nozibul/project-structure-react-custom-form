import { useState } from "react";

const params ={
    init: {

    }
}

const useForms = ({init, validate}) => {
    const [state, setState]= useState(valuesToState(init));

    
   const handleChange=(e)=>{
 
    const {name:key, value} = e.target;

    const oldState = JSON.parse(JSON.stringify(state));
    oldState[key].values = value;//oldState obj er vitore name er j value title, bio, skill ase ter vitore j values property ase ter moddhe e.target.value ta dhukbe. exp: title.values:"something"
    
    const values = stateToKey(oldState, 'values')
    const {error} = checkValidity(values);
     // console.log(oldState);//{title: {…}, bio: {…}, skill: {…}}
    
    
    if(oldState[key].touched && error[key]){
     oldState[key].errors = error[key];// oldStaet er moddhe title name j property ase and ter vitore error name j property ase ter value hove error er vitorer value ta
   }else{
     oldState[key].errors = '' ;
   } 
    setState(oldState) 
 
   }


  const handleFocus = (e) =>{
    const {name} = e.target
    const oldState = JSON.parse(JSON.stringify(state));
    oldState[name].focus = true;//oldState obj er vitore name er j value title, bio, skill ase ter vitore j focus property ase ter moddhe true ta dhukbe. exp: title.focus: true , bio.focus: true
   
    if(!oldState[name].touched){
        oldState[name].touched = true;
    }
    setState(oldState) 
  } 

  const handleBlur = (e) =>{
    const key = e.target.name; // title, bio, skill
    const values = stateToKey(state, 'values');// {title: 'vv', bio: 'vb', skill: 'rd'}
    const {error} = checkValidity(values);
    const oldState = JSON.parse(JSON.stringify(state));
    
    // note dynamic vabe property nite gele array notation use korte hoi. exp: [propertypabo]
    if(oldState[key].touched && error[key]){
      oldState[key].errors = error[key];// oldStaet er moddhe title name j property ase and ter vitore error name j property ase ter value hove error er vitorer value ta
    }else{
      oldState[key].errors = '' ;
    } 

    oldState[key].focused = false;

    setState(oldState)
  }



  const handleSubmit = (e, cb)=>{
    e.preventDefault();

    if(typeof validate === 'boolean'){
       if(validate){
         cb({
            values: stateToKey(state, 'values'),
            touched: stateToKey(state, 'touched'),
            focused: stateToKey(state, 'focused'),
            hasError: false,
         })
       }else{
        cb({
            errors: stateToKey(state, "errors")
        })
       }
       return ;
    }

    if(isValid){
      console.log(state)
    }else{
     // error jekono field aste pare so sob field gulo k traverse kore dhekbo
     const oldState = JSON.parse(JSON.stringify(state));
     Object.keys(error).forEach((key)=>{
       oldState[key].errors = error[key]
     })

     setState(oldState)
    }
  };



    return {
        formState: state,
        handleChange,
        handleBlur,
        handleFocus,
    }
}

 // helper function
const valuesToState =(values)=>{
    return Object.keys(values).reduce((acc, key)=>{
        acc[key]= {
            values: values[key],
            errors: "",
            focused: false,
            touched: false,
        }       
        return acc ;
     }, {})
}

const stateToKey =(state)=>{
    return Object.keys(state).reduce((acc, cur)=>{
        acc[cur]= state[cur].values
        return acc ;
     }, {})
}

export default useForms