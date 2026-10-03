"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  FolderKanban,
} from "lucide-react";
import { ProjectType } from "@/types/project-type";

const initialProjects: ProjectType[] = [
  { id: 14, code: "P4773027", name: "Office" },
  { id: 15, code: "P7566761", name: "Real Estate" },
  { id: 16, code: "P9579440", name: "Construction" },
  { id: 17, code: "P2596945", name: "Design" },
  { id: 18, code: "P1554959", name: "Land Share" },
  { id: 19, code: "P7784999", name: "Share Project" },
  { id: 21, code: "P2777817", name: "Interior" },
  { id: 22, code: "P1279431", name: "Residential" },
];

type ColumnKey = "id" | "code" | "name" | "action";

export default function ProjectTypePage() {
  const [projects, setProjects] =
    useState<ProjectType[]>(initialProjects);

  const [searchQuery, setSearchQuery] = useState("");

  // ==============================
  // MODAL
  // ==============================
  const [isModalOpen, setIsModalOpen] = useState(false);

  // null = Add
  // id   = Edit
  const [editingProjectId, setEditingProjectId] =
    useState<number | null>(null);

  // ==============================
  // FORM
  // ==============================
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");

  // ==============================
  // COLUMN DROPDOWN
  // ==============================
  const [isColumnMenuOpen, setIsColumnMenuOpen] =
    useState(false);

  const columnMenuRef = useRef<HTMLDivElement>(null);

  const [visibleColumns, setVisibleColumns] =
    useState<Record<ColumnKey, boolean>>({
      id: true,
      code: true,
      name: true,
      action: true,
    });

  // ==============================
  // CLOSE COLUMN MENU OUTSIDE CLICK
  // ==============================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        columnMenuRef.current &&
        !columnMenuRef.current.contains(
          event.target as Node
        )
      ) {
        setIsColumnMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ==============================
  // SEARCH
  // ==============================
  const filteredProjects = projects.filter(
    (item) =>
      item.code
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // ==============================
  // COLUMN TOGGLE
  // ==============================
  const toggleColumn = (column: ColumnKey) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  // ==============================
  // SELECT ALL COLUMNS
  // ==============================
  const selectAllColumns = () => {
    setVisibleColumns({
      id: true,
      code: true,
      name: true,
      action: true,
    });
  };

  // ==============================
  // CLEAR ALL COLUMNS
  // ==============================
  const clearAllColumns = () => {
    setVisibleColumns({
      id: false,
      code: false,
      name: false,
      action: false,
    });
  };

  // ==============================
  // OPEN ADD MODAL
  // ==============================
  const handleOpenAdd = () => {
    setEditingProjectId(null);
    setNewCode("");
    setNewName("");
    setIsModalOpen(true);
  };

  // ==============================
  // OPEN EDIT MODAL
  // ==============================
  const handleEdit = (project: ProjectType) => {
    setEditingProjectId(project.id);
    setNewCode(project.code);
    setNewName(project.name);
    setIsModalOpen(true);
  };

  // ==============================
  // CLOSE MODAL
  // ==============================
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewCode("");
    setNewName("");
    setEditingProjectId(null);
  };

  // ==============================
  // SUBMIT / UPDATE
  // ==============================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCode.trim() || !newName.trim()) {
      return;
    }

    // ============================
    // EDIT EXISTING PROJECT
    // ============================
    if (editingProjectId !== null) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProjectId
            ? {
                ...project,
                code: newCode.trim(),
                name: newName.trim(),
              }
            : project
        )
      );
    }

    // ============================
    // ADD NEW PROJECT
    // ============================
    else {
      const newProject: ProjectType = {
        id:
          projects.length > 0
            ? Math.max(
                ...projects.map((p) => p.id)
              ) + 1
            : 1,

        code: newCode.trim(),
        name: newName.trim(),
      };

      setProjects((prev) => [
        newProject,
        ...prev,
      ]);
    }

    handleCloseModal();
  };

  // ==============================
  // DELETE
  // ==============================
  const handleDelete = (id: number) => {
    setProjects((prev) =>
      prev.filter((project) => project.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">

      {/* =========================================
          BREADCRUMB
      ========================================== */}
      <nav className="flex items-center px-4 pt-4 pb-3 text-[12px] font-medium text-slate-500">

        <a
          href="#"
          className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
        >
          Home
        </a>

        <ChevronRight className="mx-2 h-3 w-3 text-slate-300" />

        <span className="cursor-pointer hover:text-indigo-600">
          Project
        </span>

        <ChevronRight className="mx-2 h-3 w-3 text-slate-300" />

        <span className="text-slate-700">
          Project Type
        </span>

      </nav>

      {/* =========================================
          TOP CREATE BUTTON
      ========================================== */}
      <div className="mb-3 flex items-center justify-end px-4">

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 rounded-md bg-[#6755d9] px-3 py-2 text-[11px] font-semibold text-white shadow-sm transition-all hover:bg-[#5847c7]"
        >
          <Plus className="h-3.5 w-3.5" />

          Create Project Type
        </button>

      </div>

      {/* =========================================
          TABLE AREA
      ========================================== */}
      <div className="px-4">

        <div className="relative">

          {/* =====================================
              SELECT COLUMNS
          ====================================== */}
          <div
            ref={columnMenuRef}
            className="absolute left-0 top-0 z-30"
          >

            <button
              onClick={() =>
                setIsColumnMenuOpen(
                  (prev) => !prev
                )
              }
              className="flex items-center gap-1 rounded-md border border-[#6655d8] bg-white px-2.5 py-1.5 text-[10px] font-semibold text-[#5847c7] transition-all hover:bg-indigo-50"
            >
              Select Columns

              <ChevronRight
                className={`h-3 w-3 transition-transform ${
                  isColumnMenuOpen
                    ? "rotate-90"
                    : ""
                }`}
              />
            </button>

            {/* DROPDOWN */}
            {isColumnMenuOpen && (
              <div className="absolute left-0 top-8 w-[165px] rounded-md border border-slate-200 bg-white shadow-lg">

                {/* ID */}
                <label className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-slate-50">

                  <input
                    type="checkbox"
                    checked={visibleColumns.id}
                    onChange={() =>
                      toggleColumn("id")
                    }
                    className="h-3 w-3 accent-[#6755d9]"
                  />

                  <span className="text-[11px] text-slate-700">
                    ID
                  </span>

                </label>

                {/* CODE */}
                <label className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-slate-50">

                  <input
                    type="checkbox"
                    checked={visibleColumns.code}
                    onChange={() =>
                      toggleColumn("code")
                    }
                    className="h-3 w-3 accent-[#6755d9]"
                  />

                  <span className="text-[11px] text-slate-700">
                    Code
                  </span>

                </label>

                {/* NAME */}
                <label className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-slate-50">

                  <input
                    type="checkbox"
                    checked={visibleColumns.name}
                    onChange={() =>
                      toggleColumn("name")
                    }
                    className="h-3 w-3 accent-[#6755d9]"
                  />

                  <span className="text-[11px] text-slate-700">
                    Name
                  </span>

                </label>

                {/* ACTION */}
                <label className="flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-slate-50">

                  <input
                    type="checkbox"
                    checked={visibleColumns.action}
                    onChange={() =>
                      toggleColumn("action")
                    }
                    className="h-3 w-3 accent-[#6755d9]"
                  />

                  <span className="text-[11px] text-slate-700">
                    Action
                  </span>

                </label>

                {/* BUTTONS */}
                <div className="flex items-center gap-1 border-t border-slate-100 p-2">

                  <button
                    onClick={clearAllColumns}
                    className="rounded bg-cyan-500 px-2.5 py-1 text-[9px] font-semibold text-white hover:bg-cyan-600"
                  >
                    Clear All
                  </button>

                  <button
                    onClick={selectAllColumns}
                    className="rounded bg-cyan-500 px-2.5 py-1 text-[9px] font-semibold text-white hover:bg-cyan-600"
                  >
                    Select All
                  </button>

                </div>

              </div>
            )}

          </div>

          {/* =====================================
              SEARCH
          ====================================== */}
          <div className="mb-3 flex justify-end">

            <div className="flex items-center gap-2">

              <label className="text-[11px] text-slate-700">
                Search:
              </label>

              <div className="relative">

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(
                      e.target.value
                    )
                  }
                  className="h-7 w-[138px] rounded border border-slate-300 bg-white px-2 text-[11px] outline-none focus:border-[#6755d9]"
                />

                {searchQuery && (
                  <button
                    onClick={() =>
                      setSearchQuery("")
                    }
                    className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}

              </div>

            </div>

          </div>

          {/* =====================================
              TABLE
          ====================================== */}
          <div className="overflow-x-auto">

            <table className="w-full border-collapse text-left">

              {/* HEADER */}
              <thead>

                <tr className="bg-[#7464e5] text-[10px] uppercase text-white">

                  {visibleColumns.id && (
                    <th className="border-r border-white/10 px-5 py-1.5 font-semibold">
                      <div className="flex items-center gap-1">
                        ID
                        <span className="text-white/60">
                          ↕
                        </span>
                      </div>
                    </th>
                  )}

                  {visibleColumns.code && (
                    <th className="border-r border-white/10 px-5 py-1.5 font-semibold">
                      <div className="flex items-center gap-1">
                        Code
                        <span className="text-white/60">
                          ↕
                        </span>
                      </div>
                    </th>
                  )}

                  {visibleColumns.name && (
                    <th className="border-r border-white/10 px-5 py-1.5 font-semibold">
                      <div className="flex items-center gap-1">
                        Name
                        <span className="text-white/60">
                          ↕
                        </span>
                      </div>
                    </th>
                  )}

                  {visibleColumns.action && (
                    <th className="px-5 py-1.5 text-center font-semibold">
                      Action
                    </th>
                  )}

                </tr>

              </thead>

              {/* BODY */}
              <tbody className="text-[11px] text-slate-700">

                {filteredProjects.length > 0 ? (

                  filteredProjects.map(
                    (item, index) => (

                      <tr
                        key={item.id}
                        className={`border-b border-slate-200 transition-colors hover:bg-indigo-50/30 ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-slate-50/30"
                        }`}
                      >

                        {/* ID */}
                        {visibleColumns.id && (
                          <td className="px-5 py-1.5">
                            {item.id}
                          </td>
                        )}

                        {/* CODE */}
                        {visibleColumns.code && (
                          <td className="px-5 py-1.5 font-medium text-slate-700">
                            {item.code}
                          </td>
                        )}

                        {/* NAME */}
                        {visibleColumns.name && (
                          <td className="px-5 py-1.5">
                            {item.name}
                          </td>
                        )}

                        {/* ACTION */}
                        {visibleColumns.action && (
                          <td className="px-5 py-1.5">

                            <div className="flex items-center justify-center gap-2">

                              {/* EDIT */}
                              <button
                                onClick={() =>
                                  handleEdit(item)
                                }
                                className="flex h-7 w-8 items-center justify-center rounded bg-[#7564e7] text-white transition-colors hover:bg-[#6251d0]"
                                title="Edit"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>

                              {/* DELETE */}
                              <button
                                onClick={() =>
                                  handleDelete(
                                    item.id
                                  )
                                }
                                className="flex h-7 w-8 items-center justify-center rounded bg-[#f45b5b] text-white transition-colors hover:bg-[#df4848]"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>

                            </div>

                          </td>
                        )}

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan={4}
                      className="py-10 text-center text-xs text-slate-400"
                    >
                      No matching project types found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* =====================================
              PAGINATION
          ====================================== */}
          <div className="flex items-center justify-end gap-1 py-3">

            <button
              disabled
              className="flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-400"
            >
              <ChevronLeft className="h-3 w-3" />
              Previous
            </button>

            <button className="rounded bg-[#6755d9] px-2.5 py-1 text-[10px] font-semibold text-white">
              1
            </button>

            <button className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-600 hover:bg-slate-50">
              Next
              <ChevronRight className="h-3 w-3" />
            </button>

          </div>

        </div>

      </div>

      {/* =====================================================
          ADD / EDIT MODAL
      ====================================================== */}
      {isModalOpen && (

        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/20">

          <div className="relative mt-0 w-full max-w-[860px] overflow-hidden rounded-b-md bg-white shadow-2xl">

            {/* =========================================
                MODAL HEADER
            ========================================== */}
            <div className="flex h-10 items-center justify-between bg-[#e7eaed] px-4">

              <h2 className="text-[12px] font-medium text-slate-800">

                {editingProjectId !== null
                  ? "Project Edit"
                  : "Project Add"}

              </h2>

              <button
                onClick={handleCloseModal}
                className="flex h-6 w-6 items-center justify-center text-slate-500 transition-colors hover:text-slate-800"
              >
                <X className="h-4 w-4" />
              </button>

            </div>

            {/* =========================================
                FORM
            ========================================== */}
            <form onSubmit={handleSubmit}>

              {/* BODY */}
              <div className="grid grid-cols-1 gap-4 bg-[#e9ecef] px-5 py-4 md:grid-cols-2">

                {/* CODE */}
                <div>

                  <label className="mb-1.5 block text-[11px] font-medium text-slate-700">
                    Code
                  </label>

                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) =>
                      setNewCode(e.target.value)
                    }
                    placeholder="P4773027"
                    className="h-7 w-full rounded border border-slate-300 bg-white px-2 text-[11px] text-slate-700 outline-none transition focus:border-[#6755d9] focus:ring-1 focus:ring-[#6755d9]/20"
                  />

                </div>

                {/* NAME */}
                <div>

                  <label className="mb-1.5 block text-[11px] font-medium text-slate-700">
                    Name
                  </label>

                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) =>
                      setNewName(e.target.value)
                    }
                    placeholder="Office"
                    className="h-7 w-full rounded border border-slate-300 bg-white px-2 text-[11px] text-slate-700 outline-none transition focus:border-[#6755d9] focus:ring-1 focus:ring-[#6755d9]/20"
                  />

                </div>

              </div>

              {/* =========================================
                  MODAL FOOTER
              ========================================== */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-white px-5 py-3">

                {/* CLOSE */}
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-md bg-[#a5a8ac] px-4 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#909398]"
                >
                  Close
                </button>

                {/* SUBMIT / UPDATE */}
                <button
                  type="submit"
                  className="rounded-md bg-[#6755d9] px-4 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#5847c7]"
                >
                  {editingProjectId !== null
                    ? "Update"
                    : "Submit"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}