import React, {Component,Fragment} from 'react';

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
            <Fragment>
                <li onClick={this.getIndex}>{this.props.content}</li>
            </Fragment>
        );
    }
}
export default TodoItem;