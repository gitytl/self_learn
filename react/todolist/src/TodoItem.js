import React, {Component} from 'react';

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.getIndex=this.getIndex.bind(this);
    }
    getIndex(){
        return this.props.deleteClick(this.props.index);
    }
    render() {
        return (
            <div>
                <div onClick={this.getIndex}>{this.props.content}</div>
            </div>
        );
    }
}
export default TodoItem;