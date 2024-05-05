import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Todolist.css'
import { useSelector, useDispatch } from 'react-redux'
import { GET_TASK_API } from '../../redux/constants/ToDoListConst'



export default function Todolist(props) {


    //Lay taskList tu redux ve
    const { taskList } = useSelector(state => state.ToDoListReducer)
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        taskName: ''
    });
    const [errors, setErrors] = useState({
        taskName: ''
    });



    const getTaskList = () => {
        let promise = Axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })
        promise.then((result) => {
            dispatch({
                type:GET_TASK_API,
                taskList:result.data
            })
            // setTaskList(result.data)
        }).catch((err) => {
            console.log('fail')
            console.log(err.data)
        })

    }


    const renderTaskTodo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={() => { delTask(item.taskName) }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type='button' onClick={() => { doneTask(item.taskName) }}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    const renderTaskTododone = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>

                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" type='button' onClick={() => { delTask(item.taskName) }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" type='button' onClick={() => { rejectTask(item.taskName) }}>
                        <i className="far fa-undo" />
                        <i className="fas fa-undo" />
                    </button>
                </div>

            </li>
        })
    }



    //xu ly done task
    const doneTask = (taskName) => {
        let promise = Axios({
            url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            alert(result.data)
            getTaskList()
        }).catch(errors => {
            alert(errors.response.data)
        })
    }

    // xu ly xoa task
    const delTask = (taskName) => {
        let promise = Axios({
            url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(result => {
            alert(result.data)
            getTaskList()
        }).catch(errors => {
            alert(errors.response.data)
        })
    }

    useEffect(() => {
        getTaskList()
    }, [])

    // xu ly reject task
    const rejectTask = (taskName) => {
        let promise = Axios({
            url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            alert(result.data)
            getTaskList()
        }).catch(errors => {
            alert(errors.response.data)
        })
    }

    //
    const handleChange = (e) => {
        let { value, name } = e.target

        console.log(value, name)

        const newErrors = { ...errors };
        let regexString = /^[a-zA-Z]+$/

        if (!regexString.test(value.trim()) || value.trim() === '') {
            newErrors[name] = name + ' invalid';
        } else {
            newErrors[name] = '';
        }

        setValues({
            ...values,
            [name]: value
        });

        setErrors(newErrors)
    }

    const addTask = (e) => {
        e.preventDefault()
        // console.log(values.taskName)
        let promise = Axios({
            url: 'https://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: values.taskName }
        })

        promise.then(result => {
            console.log(result.data)
            getTaskList()
        }).catch(errors => {
            alert(errors.response.data)
        })
    }

    return (
        <form onSubmit={addTask}>
            <div>
                {/* <button onClick={() => { getTaskList() }}>Get task list</button> */}
                <div className="card">
                    <div className="card__header">
                        <img src="/img/bg.png" alt="Background" />
                    </div>
                    {/* <h2>hello!</h2> */}
                    <div className="card__body">
                        <div className="card__content">
                            <div className="card__title">
                                <h2>My Tasks</h2>
                                <p>April, 2024</p>
                            </div>
                            <div className="card__add">
                                <input name='taskName' onChange={handleChange} id="newTask" type="text" placeholder="Enter an activity..." />

                                <button id="addItem" onClick={addTask}>
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <p className='text text-danger '>{errors.taskName}</p>
                            <div className="card__todo">
                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {renderTaskTodo()}
                                </ul>
                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {renderTaskTododone()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
