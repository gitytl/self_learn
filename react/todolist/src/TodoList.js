import React, { Component,Fragment } from 'react';
import TodoItem from './TodoItem'

class TodoList extends Component {//class App extends Component=class App extends React.Component
    render() {//负责组件显示的内容
        return (
            <Fragment>
                <div><input type="text" value={this.state.inputValue} onChange={this.inputChange}/><button className={'buttonBg buttonColor'} onClick={this.addClick}>添加</button></div>
                <ul>
                    {this.ulListCon()}
                </ul>
            </Fragment>
        );
    }
    constructor(props){
    super(props);
      this.inputChange=this.inputChange.bind(this);
      this.addClick=this.addClick.bind(this);
      this.deleteClick=this.deleteClick.bind(this);
    this.state={
      list:[
          '111','222'
      ],
        inputValue:''
    }
  }
    addClick(){
        if(!this.state.inputValue.match(/^[ ]*$/)){
          this.setState({
              list:[...this.state.list,this.state.inputValue],
              inputValue:''
          })
      }
    }
    inputChange(e){
      this.setState({
          inputValue:e.target.value
      })
    }
    deleteClick(index){
      const list=[...this.state.list];
      list.splice(index,1);
      this.setState({
          list
      })
    }
    ulListCon(){
      return(
          this.state.list.map((item,index)=>{
              return (
                  <TodoItem
                      key={index}
                      deleteClick={this.deleteClick}
                      content={item}
                      index={index}
                  />
              );
          })
      )
    }
}

export default TodoList;//导出组件内容
