import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import {CreateList} from '../../../../store/modules/board/action';
import { validator, regExp } from "../../../../common/validator/validator";
import  styles from './addList.module.css';

function AddDesk(props:{close: () => void, position: () => number, id: string}){
    const [title,setTitle] = useState({title: ''});
    const [flag, setFlag] = useState({flag: true, input:title.title});
    const dispatch = useDispatch();

    function Validate(event:ChangeEvent<HTMLInputElement>): void{
        const InputValue = event.currentTarget.value;
        if(validator(regExp,InputValue)){
        setTitle({
            ...title,
            title: InputValue
        })
        setFlag({
            ...flag,
            flag: true,
            input: InputValue
        });

        }else{
            setTitle({
                ...title,
                title: ''
            })
            setFlag({
                ...flag,
                flag: false
            });
        }
    }

    function AddList(){
        const pos = props.position?.()
        if(title){
            dispatch(CreateList(title.title,pos,props.id));
            props.close?.()
        }else{
            setFlag({
                ...flag,
                input: ''
            });
        }
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.wrapList}>
            <h3 className={styles.H3}>Add list</h3>
            <div className={styles.btnClose} onClick={props.close}>&times;</div>
            </div>
            <div className={styles.wrapForm}>
            <input
                 className={ flag.flag ? styles.inputDesk :
                `${styles.inputDesk} ${styles.wrong}`} value={flag.input}
                onChange={Validate} placeholder='Enter list title' type="text" />
            <button type='button' onClick={AddList}  className={styles.btnAdd}>Create list</button>
            </div>
        </div>
    )
}

export default AddDesk