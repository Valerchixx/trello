import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {UpdateBoardTitle} from '../../../../store/modules/board/action';
import { validator,regExp } from "../../../../common/validator/validator";
import  styles from './input.module.css'

function Input(props:{value:string, close:() => void, id: string }){
  const[title,SetTitle] = useState('');
  const[flag,setFlag] = useState(true);
  const dispatch = useDispatch()

  function ValidateInput(event:React.ChangeEvent<HTMLInputElement>): void{
    const data  = event.target.value;
    if(validator(regExp,data)){
      SetTitle(data);
      setFlag(true)
    }else{
      SetTitle('')
      setFlag(false)
    }
  }

    function Keyy(event:React.KeyboardEvent<HTMLInputElement>){
      if(event.key === 'Enter' && title){
        dispatch(UpdateBoardTitle(props.id,title.trim()));
      props.close?.()
      }
    }
    return(
      <div>
      <input
         className={flag ? styles.inputTitle :
        `${styles.inputTitle} ${styles.wrong}`}
        type="text" placeholder={props.value}
        onKeyPress={Keyy} onChange={ValidateInput}
        onBlur={props.close}/>
      </div>
    )
  }

export default Input;