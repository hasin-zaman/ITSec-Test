import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "@/store/tasksApi";

export default function TasksPage() {
  const { data, isLoading, refetch } = useGetTasksQuery();
  const tasks = data?.tasks || [];

  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: "", description: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return toast.error("Title is required");
    try {
      await addTask(newTask).unwrap();
      toast.success("Task added successfully");
      setNewTask({ title: "", description: "" });
      refetch();
    } catch {
      toast.error("Failed to add task");
    }
  };

  const handleUpdate = async (id) => {
    if (!editedTask.title.trim()) return toast.error("Title is required");
    try {
      await updateTask({ id, ...editedTask }).unwrap();
      toast.success("Task updated");
      setEditingId(null);
      refetch();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(id).unwrap();
      toast.success("Task deleted");
      refetch();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (isLoading) return <p className="text-center mt-20">Loading tasks...</p>;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        {/* Add Task */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="desc">Description</Label>
                <Input
                  id="desc"
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Add Task
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.length === 0 && (
            <p className="text-center text-muted-foreground">
              No tasks yet. Add one!
            </p>
          )}
          {tasks.map((task) => (
            <Card key={task.id || task._id}>
              <CardHeader className="flex justify-between items-center">
                {editingId === task.id || editingId === task._id ? (
                  <div className="space-y-2 w-full">
                    <Input
                      value={editedTask.title}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, title: e.target.value })
                      }
                      placeholder="Edit title"
                    />
                    <Input
                      value={editedTask.description}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          description: e.target.value,
                        })
                      }
                      placeholder="Edit description"
                    />
                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={() =>
                          handleUpdate(task.id || task._id)
                        }
                        size="sm"
                      >
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <CardTitle>{task.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        onClick={() => {
                          setEditingId(task.id || task._id);
                          setEditedTask({
                            title: task.title,
                            description: task.description,
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(task.id || task._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}