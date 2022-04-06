import React from 'react';
import { connect } from "react-redux";
import { withRouter , RouteComponentProps } from "react-router-dom";
import {UpdateBoardTitle, getBoard } from '../../store/modules/board/action';
import List from "./components/List/List";
import styles from './components/Board/board.module.css';
import { IBoardFetch} from "../../common/interfaces/IBoardFetch";
import Input from './components/Input/InputBoardTitle';
import Spin from '../spin/Spin';
import AddList from './components/AddList/AddList';
import DelBoard from './components/DeleteBoard/DeleteBoard';


type funcGet = {
  getBoard: (id:string) => Promise<void>,
  UpdateBoardTitle: (id:string,newTitle:string) => Promise<void>,
  editBoardTitle:(title:string) => Promise<void>
};
type TypeProps = {
  board:IBoardFetch
}
type stateType = any
type TParams = RouteComponentProps<{ boardId:any, name: string | undefined; id: string | undefined}>;
class Board extends React.Component<TParams & funcGet & TypeProps,stateType>{

   id = this.props.match.params;

   boardId = this.id.boardId;

  constructor (props: any){
    super((props));
    this.state = {
      flag: false,
      listOPen: false

  }
}

  async componentDidMount() {
    const id = this.id.boardId;
    if (id) {
      await this.props.getBoard(id);
    }
  }

   KeyEnter = (event:React.KeyboardEvent<HTMLInputElement>): void =>{
    const id = this.id.boardId;
    const title = event.currentTarget.value
    UpdateBoardTitle(id,title)
    if(event.key === 'Enter'){
      this.setState({flag:false});

    }
  }

  listPos = () =>{
    const {board}  = this.props;
    const listPos = Object.keys(board.lists).length;
    return listPos
  }

  ShowInput = () =>{
    this.setState({flag:true})
  }

  CloseInput = () =>{
    this.setState({flag:false})
  }

  ShowAddList = () => {
    this.setState({listOpen:true})
  }

  CloseAddList = () => {
    this.setState({listOpen:false})
  }

  render(){
    const {title} = this.props.board
    return (
      <div className={styles.Board}>
        <div className={styles.wrap}>
          <img src="nature2.jpg" alt="" />
        <div> <DelBoard id={this.id.boardId} /></div>
       <div  onClick={this.ShowInput}> <h2> {this.state.flag ? <Input value={title}  id={this.id.boardId} close={this.CloseInput}/> : title} </h2> </div>
        <a className={styles.btnHome} href="/">go Home</a>
        </div>
        <Spin />
        <div className={styles.listWrap}>
          {
            this.props.board.lists && Object.values(this.props.board.lists).map(item =>
               (
              <List
                currentPostId={this.props.match.params.id}
                listArr={this.props.board.lists}
                poslist={item.position}
                poscard={Object.keys(item.cards).length}
                boardTitle={title}
                key={item.id}
                title={item.title}
                id={item.id}
                boardid={this.id.boardId}
                cards={item.cards}
                />)
            )
          }
        <div className={styles.btns}>
          {this.state.listOpen ?
          <AddList position={this.listPos}
          id={this.id.boardId}
          close={this.CloseAddList} /> :
          <div className={styles.btnAdd}
          onClick={this.ShowAddList} >Add list +
          </div>}
        </div>
      </div>
    </div>
    );
  };
};

const mapStateToProps = (state:{board:IBoardFetch}) => ({
  ...state.board,
});

export default withRouter(connect(mapStateToProps,{getBoard})(Board));


