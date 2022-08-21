import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import { QuestionType } from '../../api/types'
import { Question } from '../Question/Question'

type PropsType = {
    questions: QuestionType[]
}

export const DragDrop: React.FC<PropsType> = ({ questions }) => {

    const [questionsOfDrag, setQuestionsOfDrag] = useState([] as QuestionType[])

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result
        if (!destination) return

        const items = Array.from(questionsOfDrag)
        const [newOrder] = items.splice(source.index, 1)
        items.splice(destination.index, 0, newOrder)

        setQuestionsOfDrag(items)
    }

    useEffect(() => {
        setQuestionsOfDrag(questions)
    }, [questions])


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="question">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {questionsOfDrag.map((q, index: number) => {
                            return (
                                <Draggable key={q.question_id} draggableId={q.question_id.toString()} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                        >
                                            <Question question={q} />
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 5,
    background: isDragging ? "#6ab1d7" : "white",
    borderRadius: '10px',
    backgroundPosition: '100% 0',
    backgroundSize: '200% auto',

    ...draggableStyle
})


export default DragDrop