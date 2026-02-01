import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import Column from "./Column";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Create Initial project plan" },
    "task-2": { id: "task-2", content: "Implement authentication" },
     "task-3": { id: "task-3", content: "Organise project repository" },
     "task-4": { id: "task-4", content: "Design landing page" },
     "task-5": { id: "task-5", content: "Review codebase structure" },
     "task-6": { id: "task-6", content: "Organise project repository" },
    
  },
  columns: {
    "col-1": { id: "col-1", title: "To Do", taskIds: ["task-1"] },
    "col-2": { id: "col-2", title: "In Progress", taskIds: ["task-2"] },
    "col-3": { id: "col-3", title: "Done", taskIds: ["task-3"] },
  },
  columnOrder: ["col-1", "col-2", "col-3"],
};

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      setData({ ...data, columns: { ...data.columns, [start.id]: { ...start, taskIds: newTaskIds } } });
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    setData({
      ...data,
      columns: {
        ...data.columns,
        [start.id]: { ...start, taskIds: startTaskIds },
        [finish.id]: { ...finish, taskIds: finishTaskIds },
      },
    });
  };

  const addTask = (columnId, content) => {
    const newTaskId = uuidv4();
    const newTask = { id: newTaskId, content };
    
    setData({
      ...data,
      tasks: { ...data.tasks, [newTaskId]: newTask },
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          taskIds: [...data.columns[columnId].taskIds, newTaskId],
        },
      },
    });
  };

  const deleteTask = (taskId) => {
    const newTasks = { ...data.tasks };
    delete newTasks[taskId];
    const newCols = { ...data.columns };
    Object.keys(newCols).forEach(id => {
      newCols[id].taskIds = newCols[id].taskIds.filter(tid => tid !== taskId);
    });
    setData({ ...data, tasks: newTasks, columns: newCols });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-wrapper">
        <h1 className="board-header">Kanban Board</h1>
        <div className="board-columns">
          {data.columnOrder.map((id) => {
            const column = data.columns[id];
            const tasks = column.taskIds.map((tid) => data.tasks[tid]);
            return (
              <Column 
                key={id} 
                column={column} 
                tasks={tasks} 
                onAddTask={addTask} 
                onDelete={deleteTask} 
              />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;