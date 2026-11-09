
import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import {
  dataJotai,
  addUser,
  deleteUser,
  editUser,
} from "../store/ST";

import type { User } from "../store/ST";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import {
  Dialog,
  DialogContent, DialogHeader, DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const Home = () => {
  const users = useAtomValue(dataJotai);

  const add = useSetAtom(addUser);
  const remove = useSetAtom(deleteUser);
  const edit = useSetAtom(editUser);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelectEdit = (user: User) => {
    setEditId(user.id);
    setName(user.name);
    setAge(String(user.age));
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    remove(id);
  };

  const handleSubmit = () => {
    if (!name.trim() || !age) return;

    if (editId !== null) {
      edit({ id: editId, name, age: Number(age) });
      setEditId(null);
    } else {
      add({ id: Date.now(), name, age: Number(age) });
    }

    setName("");
    setAge("");
    setOpen(false);
  };

  return (
    <div className="p-6">

      <Dialog open={open} onOpenChange={setOpen}>


        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setEditId(null);
              setName("");
              setAge("");
            }}
          >
            Add User
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editId !== null ? "Edit User" : "Add User"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <Button onClick={handleSubmit} className="w-full">
              {editId !== null ? "Save Changes" : "Add User"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {users.map((user) => (
        <div
          key={user.id}
          className="mt-4 flex items-center justify-between rounded-lg border p-4"
        >
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.age}</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleSelectEdit(user)}
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}

    </div>
  );
};

export default Home;
