'use client';

import type { Todo } from '@vb/shared';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p className="text-sm text-text-secondary text-center py-6">
        No todos yet. Add one above.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id, !todo.completed)}
            className="w-4 h-4 rounded border-border accent-primary cursor-pointer shrink-0"
          />
          <span
            className={`flex-1 text-sm ${
              todo.completed ? 'line-through text-text-secondary' : 'text-text'
            }`}
          >
            {todo.title}
          </span>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors shrink-0"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
