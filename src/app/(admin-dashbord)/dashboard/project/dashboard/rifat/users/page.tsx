"use client";

import React, { useState } from "react";
import { Plus, Trash2, Edit } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function UsersPage() {
  // Dami data add kora holo
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Rifat Ahmed", email: "rifat@example.com", phone: "+880 1711-223344" },
    { id: 2, name: "Tanvir Hossain", email: "tanvir@example.com", phone: "+880 1822-334455" },
    { id: 3, name: "Sakib Khan", email: "sakib@example.com", phone: "+880 1933-445566" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newUser: User = {
      id: users.length + 1,
      name: newName,
      email: newEmail,
      phone: newPhone || "N/A",
    };

    setUsers([...users, newUser]);
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6 space-y-4 max-w-[1700px] mx-auto text-slate-900 bg-[#f5f7fa] min-h-screen">
      
      {/* Top Header with Add New Button */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-base font-bold text-slate-800">Users List</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 text-white text-xs font-bold rounded-lg hover:bg-cyan-600 transition-colors shadow-sm"
        >
          <Plus size={16} /> ADD NEW
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-[#655bea] text-white font-bold text-[11px]">
              <th className="px-4 py-3 w-16">#</th>
              <th className="px-4 py-3">NAME</th>
              <th className="px-4 py-3">EMAIL</th>
              <th className="px-4 py-3">PHONE</th>
              <th className="px-4 py-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-500">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{user.name}</td>
                  <td className="px-4 py-3 text-slate-600">{user.email}</td>
                  <td className="px-4 py-3 text-slate-600">{user.phone}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-1 text-rose-500 hover:text-rose-700 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400 italic">
                  No User
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add New User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Add New User</h3>
            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  placeholder="Enter name"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  placeholder="Enter email"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="Enter phone"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-xs font-bold hover:bg-cyan-600 shadow-sm"
                >
                  Save User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}