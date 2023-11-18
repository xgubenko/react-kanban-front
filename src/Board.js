import {useState} from "react";
import './App.css';

export const Board = () => {

    const [boards, setBoards] = useState([
        {
            id: 1, title: "Сделать", items: [
                {id: 1, title: "Пойти в магазин"},
                {id: 2, title: "Уборка"},
                {id: 3, title: "Задача"},
                {id: 4, title: "Смонтировать"},
            ]
        },
        {
            id: 2, title: "Проверить", items: [
                {id: 1, title: "Работа"},
                {id: 2, title: "Чтение"},
                {id: 3, title: "Погулять"}
            ]
        },
        {
            id: 3, title: "Сделано", items: [
                {id: 1, title: "Проверить почту"},
                {id: 2, title: "Помыть полы"},
                {id: 3, title: "Посмотреть видео"},
            ]
        }
    ])

    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentItem, setCurrentItem] = useState(null)

    function dragItemStartHandler(e, board, item) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragItemEndHandler(e) {
        e.target.style.boxShadow = 'none'

    }

    function dragItemOverHandler(e) {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 4px 3px gray'
        }

    }

    function dropItemHandler(e, board, item) {
        e.preventDefault()
        e.target.style.boxShadow = 'none'

        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)

        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)

        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }

    function dragLeaveItemHandler(e) {
        e.target.style.boxShadow = 'none'

    }

    function dropCardHandler(e, board) {
        e.preventDefault()
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
        e.target.style.boxShadow = 'none'

    }

    return (
        <div>
            {boards.map(board =>
                <div
                    className={'board'}
                    onDragOver={(e) => dragItemOverHandler(e)}
                    onDrop={(e) => dropCardHandler(e, board)}
                >

                    <div className="board-title">{board.title}</div>
                    {board.items.map(item =>
                        <div
                            onDragStart={(e) => dragItemStartHandler(e, board, item)}
                            onDragLeave={(e) => dragLeaveItemHandler(e)}
                            onDragEnd={(e) => dragItemEndHandler(e)}
                            onDragOver={(e) => dragItemOverHandler(e)}
                            onDrop={(e) => dropItemHandler(e, board, item)}
                            draggable={true}
                            className={'item'}>{item.title}</div>
                    )}
                </div>
            )}
        </div>
    )
}