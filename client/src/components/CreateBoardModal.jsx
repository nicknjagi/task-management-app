import { createBoard } from '../features/board/boardSlice'
import { useDispatch } from 'react-redux'
import boardIcon from '../assets/icon-board.svg'
import crossIcon from '../assets/icon-cross.svg'
import { useRef, useState } from 'react'

const CreateBoardModal = () => {
    const [columns, setColumns] = useState([])
    const [boardName, setBoardName] = useState('')
    const [col, setCol] = useState('')
    const [colTwo, setColTwo] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)
    const [boardIsEmpty, setBoardIsEmpty] = useState(false)
    const columnRef = useRef(null)
    const dispatch = useDispatch()

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
        setColumns(columns.filter(column => column.name !== col))
        console.log(columns.filter(column => {
            if (column.name !== column){
                return true
            }else {
                return false
            }
        }));
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
            userId:1
        }

        dispatch(createBoard(board))
        setBoardName('')
        setIsEmpty(false)
        setBoardIsEmpty(false)
        setColumns([])
      }

  return (
    <div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button onClick={()=>document.getElementById('my_modal_4').showModal()}className="px-8 mt-3 dark:text-main-purple hover:opacity-90 transition">
            <div className="flex items-center gap-4">
                <img src={boardIcon}  className='inline-block' alt="" />
                <span>+ Create New Board</span>
            </div>
        </button>
        <dialog id="my_modal_4" className="modal">
            <div className="modal-box dark:bg-dark-grey">
                <form method="dialog" >
                {/* if there is a button in form, it will close the modal */}
                <button className="button button-sm button-circle button-ghost absolute right-2 top-2">✕</button>
                </form>
                <form onSubmit={handleSubmit} className="form max-w-[500px]">
                    <h2>Create new board</h2>
                    <div className="flex flex-col gap-6">

                    <div className="form-row ">
                        <label htmlFor="boardName">Board Name</label>
                        <div className="relative">
                            <input
                            type="text"
                            id="boardName"
                            style={boardIsEmpty ? {borderColor: 'rgb(234 85 85)'} : {}}
                            className={`w-full`}
                            value={boardName}
                            onChange={e => setBoardName(e.currentTarget.value)}
                            placeholder="e.g. Web Design"
                            />
                        {boardIsEmpty && <span className='text-sm text-red absolute right-6 top-1/2 -translate-y-1/2'>Can't be empty</span>}
                        </div>
                    </div>

                    <div className="form-row">
                        <h3>Board Columns</h3>
                        {columns.length > 0 && columns.map((column, index) => {
                            return (
                            <div key={index} className='flex gap-4'>
                                <span className='inline-block input w-full'>{column.name}</span>
                                <button
                                    onClick={(e) => removeColumn(column.name)}
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
                                className='input w-full '
                                type="text"
                                name='col'
                                placeholder="e.g. Todo"
                                onChange={(e) => setCol(e.currentTarget.value)}
                            />
                            {(isEmpty && columns.length > 0) && <span className='text-sm text-red absolute right-12 top-1/2 -translate-y-1/2'>Can't be empty</span>}
                            <button
                                onClick={(e) => removeColumn(col.name)}
                                type="button"
                                aria-label='remove column'>
                                <img className='w-4 h-4' src={crossIcon} alt="" />
                            </button>
                        </div>

                        <button
                            onClick={() => addColumn(col)}
                            type="button"
                            className="dark:bg-white text-sm font-bold dark:text-main-purple button">
                            add column
                        </button>
                    </div>
                    <button
                        className="button text-sm font-semibold text-white dark:bg-main-purple dark:hover:bg-main-purple-hover transition"
                    >
                        Create New board
                    </button>
                    </div>
                </form>
            </div>
        </dialog>
    </div>
  )
}
export default CreateBoardModal