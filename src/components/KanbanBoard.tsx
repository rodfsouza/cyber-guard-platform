import { useMemo, useState } from 'react';
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Column, ColumnId, Task } from '@/types';
import { KanbanColumn } from './KanbanColumn';

type KanbanBoardProps = {
  initialTasks: Task[];
  onTaskStatusChange: (taskId: string, newStatus: ColumnId) => void;
};

const initialColumns: Omit<Column, 'tasks'>[] = [
  { id: 'To Do', title: 'To Do' },
  { id: 'In Progress', title: 'In Progress' },
  { id: 'Completed', title: 'Completed' },
];

export const KanbanBoard = ({ initialTasks, onTaskStatusChange }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columns = useMemo<Column[]>(() => {
    return initialColumns.map(col => ({
      ...col,
      tasks: tasks.filter(task => task.status === col.id),
    }));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverAColumn = over.data.current?.type === 'Column';

    if (isActiveATask && isOverAColumn) {
      setTasks(prev => {
        const activeIndex = prev.findIndex(t => t.id === activeId);
        if (prev[activeIndex].status !== overId) {
          prev[activeIndex].status = overId as ColumnId;
          return arrayMove(prev, activeIndex, activeIndex);
        }
        return prev;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
      const activeTask = tasks.find(t => t.id === activeId);
      if (activeTask) {
        onTaskStatusChange(activeTask.id, activeTask.status);
      }
    }
    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto">
        {columns.map(col => (
          <KanbanColumn key={col.id} column={col} />
        ))}
      </div>
    </DndContext>
  );
};
