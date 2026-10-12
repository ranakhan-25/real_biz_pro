/* eslint-disable prettier/prettier */
"use client";

import { useState, useMemo } from "react";

interface HierarchyNode {
  id: string;
  name: string;
  status: string;
  designation: string;
  children?: HierarchyNode[];
}

const hierarchyData: HierarchyNode = {
  id: "1",
  name: "Tazmul Reza",
  status: "Active",
  designation: "Executive",
  children: [
    {
      id: "2",
      name: "Rifat Hosain",
      status: "Active",
      designation: "Software Engineer",
    },
    {
      id: "3",
      name: "Mohin Uddin",
      status: "Active",
      designation: "Tea Boy",
    },
  ],
};

function EmployeeCard({ node }: { node: HierarchyNode }) {
  return (
    <div className="inline-flex flex-col items-center px-4 py-2.5 rounded-lg bg-teal-800 text-white text-center shadow-md min-w-[160px]">
      <p className="text-[13px] font-semibold leading-tight">
        {node.name}{" "}
        <span className="font-normal opacity-90">({node.status})</span>
      </p>
      <p className="text-[12px] opacity-85 mt-0.5">{node.designation}</p>
    </div>
  );
}

function TreeNode({ node }: { node: HierarchyNode }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <EmployeeCard node={node} />

      {hasChildren && (
        <>
          {/* Vertical line down from parent */}
          <div className="w-px h-6 bg-border" />

          {/* Horizontal connector + children */}
          <div className="relative flex items-start justify-center">
            {/* Horizontal line spanning children */}
            {node.children!.length > 1 && (
              <div
                className="absolute top-0 h-px bg-border"
                style={{
                  left: "calc(50% / " + node.children!.length + ")",
                  right: "calc(50% / " + node.children!.length + ")",
                }}
              />
            )}

            <div className="flex gap-8">
              {node.children!.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  {/* Vertical line up to horizontal */}
                  <div className="w-px h-6 bg-border" />
                  <TreeNode node={child} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function EmployeeHierarchyPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return hierarchyData;

    const q = search.trim().toLowerCase();

    function filterNode(node: HierarchyNode): HierarchyNode | null {
      const selfMatch =
        node.name.toLowerCase().includes(q) ||
        node.designation.toLowerCase().includes(q);

      const filteredChildren = (node.children || [])
        .map(filterNode)
        .filter(Boolean) as HierarchyNode[];

      if (selfMatch || filteredChildren.length > 0) {
        return {
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : node.children,
        };
      }
      return null;
    }

    return filterNode(hierarchyData) || hierarchyData;
  }, [search]);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Header */}
      <div className="bg-surface border-b border-border px-5 py-3 flex items-center justify-between">
        <h1 className="text-[15px] font-semibold text-ink">Employee Hierarchy</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search... type ? to get help."
          className="border border-border rounded-md px-3 py-1.5 text-[13px] w-56 bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-black"
        />
      </div>

      {/* Tree */}
      <div className="flex items-center justify-center py-16 px-4 overflow-x-auto">
        <TreeNode node={filtered} />
      </div>
    </div>
  );
}