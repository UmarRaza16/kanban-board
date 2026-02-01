import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index, onDelete }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`task-card ${snapshot.isDragging ? "dragging" : ""}`}
        >
          <span>{task.content}</span>
          <button className="delete-btn" onClick={() => onDelete(task.id)}>
            ×
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;