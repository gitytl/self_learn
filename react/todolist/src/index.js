import React from 'react';//加载react库，理解组件语法
import ReactDOM from 'react-dom';//把组件挂在到dom页面
import TodoList from './TodoList';

import './style.css';

ReactDOM.render(<TodoList />, document.getElementById('root'));//把组件渲染到页面的root标签里

