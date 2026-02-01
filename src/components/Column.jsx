import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = ({ column, tasks, onAddTask, onDelete }) => {
  const [text, setText] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (text.trim()) {
      onAddTask(column.id, text);
      setText("");
      setIsAdding(false);
    }
  };

  return (
    <div className="column">
      <h3 className="column-title">{column.title} <span className="task-count">{tasks.length}</span></h3>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`task-list ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onDelete={onDelete} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="column-footer">
        {isAdding ? (
          <div className="add-input-area">
            <textarea
              autoFocus
              placeholder="What needs to be done?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <div className="add-actions">
              <button className="confirm-btn" onClick={handleAdd}>Add Task</button>
              <button className="cancel-btn" onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button className="init-add-btn" onClick={() => setIsAdding(true)}>
            + Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default Column;