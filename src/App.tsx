import React, {useEffect, useState} from 'react';
import './App.scss';
import TodoForm from "./components/TodoForm/TodoForm";
import TodosList from "./components/TodosList/TodosList";
import {useAppDispatch} from "./redux/hooks";
import {addTodo, getTodos} from "./redux/todosSlice";
import Paginator from "./components/common/Paginator/Paginator";
import Preloader from "./components/common/Preloader/Preloader";
import TodosNav from "./components/TodosNav/TodosNav";

function App() {
    const [text, setText] = useState({
        header: '',
        description: ''
    })
    const [isLoading, setIsLoading] = useState(true)
    const [openForm, setOpenForm] = useState(false)
    const [keepFormOpen, setKeepFormOpen] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)

    const dispatch = useAppDispatch()

    useEffect(() => {
        const match = document.cookie.match(/userId=([^;]+)/);
        if (match) {
            setUserId(match[1])
        } else {
            const createdUserId = crypto.randomUUID()
            document.cookie = `userId=${createdUserId}; path=/; max-age=${60 * 60 * 24 * 365}`
            setUserId(userId)
        }
    }, [])

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                await dispatch(getTodos({searchParams: ''}))
            } finally {
                setIsLoading(false)
            }
        }
        fetchTodos()
    }, [dispatch])

    const addNewTodo = (e: React.FormEvent) => {
        if (text && text.header) {
            dispatch(addTodo(text))
            if (!keepFormOpen) {
                setOpenForm(false)
            }
        }
        setText({
            header: '',
            description: ''
        })
        e.preventDefault()
    }

    const cancel = () => {
        setOpenForm(false)
    }

    return (
        <div className="App">
            <TodosNav keepFormOpen={keepFormOpen}
                      setKeepFormOpen={setKeepFormOpen}
                      setOpenForm={setOpenForm}
            />

            <TodoForm
                type='add'
                onSubmit={addNewTodo}
                setText={setText}
                cancel={cancel}
                text={text}
                openForm={openForm}
            />
            {isLoading ? <Preloader/> : <TodosList/>}
            <Paginator/>
        </div>
    );
}

export default App;
