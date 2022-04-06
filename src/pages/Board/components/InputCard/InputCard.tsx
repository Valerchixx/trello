import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { validator, regExp } from "common/validator/validator";
import {UpdateList} from '../../../../store/modules/board/action';
import styles from './inputCard.module.css'

function InputCard(props:{listId: number, boardId:string, title:string, poslist: number, close: () => void}){
    const dispatch = useDispatch()
    const[title,setTitle] = useState({title:''});
    const [flag, setFlag] = useState(true);

    function Validate(event:ChangeEvent<HTMLInputElement>){
        const dataInput = event.currentTarget.value;
     if(validator(regExp,dataInput)){
         setTitle({
             ...title,
             title: dataInput
         });
         setFlag(true)
     } else {
        setTitle({
            ...title,
            title: ''
        });
        setFlag(false)

     }
    }

    function updateList(event:React.KeyboardEvent<HTMLInputElement>){
        if(event.key === 'Enter' && title && flag){
            dispatch(UpdateList(props.listId,props.boardId,props.poslist,title.title));
            props.close?.()
        }
    }
    return(
        <input
         className={flag ? styles.input : `${styles.input} ${styles.wrong}`}
         onChange={Validate}
         onKeyPress={updateList}
         type="text" placeholder={props.title}
         onBlur={props.close}
         />
    )
}

export default InputCard