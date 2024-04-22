import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import crossIcon from '../../assets/icon-cross.svg'
import { updateBoard } from '../../features/board/boardSlice'

const EditBoardForm = ({handleClick}) => {
    const {currentBoard, updatingBoard} = useSelector(state => state.board)
    const {columns: cols} = useSelector(state => state.column)
    const [columns, setColumns] = useState(cols)
    const [colsToDelete, setColsToDelete] = useState([])
    const [boardName, setBoardName] = useState(currentBoard?.boardName)
    const [col, setCol] = useState('')
    const [colTwo, setColTwo] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)
    const [boardIsEmpty, setBoardIsEmpty] = useState(false)
    const columnRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(()=>{
        setColumns(cols)
        setBoardName(currentBoard?.boardName)
    },[cols,currentBoard?.boardName])
    
    function addColumn(col){
        if (columns.length === 0){
            if (col.trim() === '' && colTwo.trim() === ''){
                setIsEmpty(true)
                return
            }
            if (col.trim() !== '' && colTwo.trim() !== ''){
                setIsEmpty(false)
                setColumns([...columns, {name:colTwo.trim()}, {name:col.trim()}])
                setCol('')
                setColTwo('')
                columnRef.current.value = ''
                return
            }
            else if(colTwo.trim() === ''){
                setIsEmpty(false)
                setColumns([...columns, {name:col.trim()}])
                setCol('')
                columnRef.current.value = ''
                return
            }
            else {
                setIsEmpty(false)
                setColumns([...columns, {name:colTwo.trim()}])
                setColTwo('')
                columnRef.current.value = ''
                return
            }
        }
        else if(columns.length > 0 && col.trim() !== ''){
            setColumns([...columns, {name:col.trim()}])
            setCol('')
            setIsEmpty(false)
            columnRef.current.value = ''
            return
        } 
        else {
            setIsEmpty(true)
        }
    }

    function removeColumn(col){
        if(col.id){
            setColsToDelete([...colsToDelete, col.id])
        }
        setColumns(columns.filter(column => {
            if(column.id){
                if (column.id !== col.id){
                    return true
                }else {
                    return false
                }
            }
            else{
                if (column.name !== col.name){
                    return true
                }else {
                    return false
                }
            }
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        
        if(boardName.trim() === ''){
            setBoardIsEmpty(true)
            return
        }
        const board = {
            boardName,
            columns,
            colsToDelete
        }
        dispatch(updateBoard(board))
        // setBoardName('')
        setIsEmpty(false)
        setBoardIsEmpty(false)
        // setColumns([])
        setColsToDelete([])
        document.getElementById('edit-board').close()
        handleClick()
    }

    return (
    <form onSubmit={handleSubmit} className="form max-w-[500px]">
        <h2>Edit board</h2>
        <div className="flex flex-col gap-6">

        <div className="form-row ">
            <label className='text-mid-grey dark:text-white' htmlFor="boardName">Name</label>
            <div className="relative">
                <input
                type="text"
                id="boardName"
                className='input'
                style={boardIsEmpty ? {borderColor: 'rgb(234 85 85)'} : {}}
                defaultValue={boardName}
                onChange={e => setBoardName(e.currentTarget.value)}
                placeholder="e.g. Web Design"
                />
            {boardIsEmpty && <span className='text-sm text-red absolute right-6 top-1/2 -translate-y-1/2'>Can't be empty</span>}
            </div>
        </div>

        <div className="form-row">
            <h3 className='text-mid-grey dark:text-white'>Columns</h3>
            {columns?.length > 0 && columns.map((column, index) => {
                return (
                <div key={index} className='flex justify-center gap-4'>
                    <span className='board-col'>{column.name}</span>
                    <button
                        onClick={(e) => removeColumn(column)}
                        type="button"
                        aria-label='remove column'
                    >
                        <img className='w-4 h-4' src={crossIcon} alt="" />
                    </button>
                </div>)
            })}

            {columns.length === 0 && <div className='flex gap-4 relative'>
                <input
                    className='input w-full '
                    type="text"
                    name='colTwo'
                    style={isEmpty ? {borderColor: 'rgb(234 85 85)'} : {}}
                    placeholder="e.g. Todo"
                    onChange={(e) => setColTwo(e.currentTarget.value)}
                />
                {isEmpty && <span className='text-sm text-red absolute right-12 top-1/2 -translate-y-1/2'>Can't be empty</span>}
                <button
                    type="button"
                    aria-label='remove column'>
                    <img className='w-4 h-4' src={crossIcon} alt="" />
                </button>
            </div>}

            <div className='flex gap-4 relative'>
                <input
                    ref={columnRef}
                    id={(isEmpty && columns.length > 0) ? 'input-err':''}
                    style={(isEmpty && columns.length > 0) ? {borderColor: 'rgb(234 85 85)'} : {}}
                    className='input w-full '
                    type="text"
                    name='col'
                    placeholder="e.g. Todo"
                    onChange={(e) => setCol(e.currentTarget.value)}
                />
                {(isEmpty && columns.length > 0) && <span className='text-sm text-red absolute right-12 top-1/2 -translate-y-1/2'>Can't be empty</span>}
                <button
                    onClick={(e) => removeColumn(col)}
                    type="button"
                    aria-label='remove column'>
                    <img className='w-4 h-4' src={crossIcon} alt="" />
                </button>
            </div>

            <button
                onClick={() => addColumn(col)}
                type="button"
                className="btn-light">
                + add new column
            </button>
        </div>
        <button
            type='submit'
            className="btn-purple"
            disabled={updatingBoard}
        >
            {updatingBoard ? 'updating...' : 'save changes'}
        </button>
        </div>
    </form>
  )
}
export default EditBoardForm