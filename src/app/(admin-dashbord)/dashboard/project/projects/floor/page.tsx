'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Home, 
  ChevronRight, 
  Plus, 
  Search, 
  Layers, 
  Grid, 
  X,
  Eye,
  Edit,
  Trash2,
  DollarSign
} from 'lucide-react';

interface ProjectFloor {
  id: string;
  buildingUuid: string;
  name: string;
  number: number; // Unique in building
  units_count: number;
}

interface ProjectUnit {
  id: string;
  floorUuid: string;
  code: string;
  type: '1BHK' | '2BHK' | '3BHK' | 'office' | 'shop' | 'plot';
  size_sqft: number;
  facing: string;
  price: number;
  status: 'available' | 'booked' | 'sold' | 'reserved' | 'blocked';
}

const initialFloors: ProjectFloor[] = [
  { id: 'FLR-001', buildingUuid: 'BLD-101', name: 'Ground Floor', number: 0, units_count: 1 },
  { id: 'FLR-002', buildingUuid: 'BLD-101', name: '1st Floor - Commercial', number: 1, units_count: 1 },
  { id: 'FLR-003', buildingUuid: 'BLD-101', name: '2nd Floor - Premium Suites', number: 2, units_count: 2 },
  { id: 'FLR-004', buildingUuid: 'BLD-101', name: '3rd Floor - Executive Penthouse', number: 3, units_count: 0 }
];

const initialUnits: ProjectUnit[] = [
  { id: 'UNT-001', floorUuid: 'FLR-003', code: 'A-301', type: '3BHK', size_sqft: 1850, facing: 'SE', price: 185000, status: 'available' },
  { id: 'UNT-002', floorUuid: 'FLR-003', code: 'A-302', type: '2BHK', size_sqft: 1250, facing: 'N', price: 125000, status: 'booked' },
  { id: 'UNT-003', floorUuid: 'FLR-001', code: 'G-001', type: 'shop', size_sqft: 600, facing: 'E', price: 90000, status: 'available' },
  { id: 'UNT-004', floorUuid: 'FLR-002', code: 'C-101', type: 'office', size_sqft: 1200, facing: 'N', price: 150000, status: 'sold' },
];

export default function FloorsListPage() {
  const [floors, setFloors] = useState<ProjectFloor[]>(initialFloors);
  const [units, setUnits] = useState<ProjectUnit[]>(initialUnits);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewFloor, setViewFloor] = useState<ProjectFloor | null>(null);
  const [editFloor, setEditFloor] = useState<ProjectFloor | null>(null);

  // View Floor Units Modal State
  const [selectedFloorForUnits, setSelectedFloorForUnits] = useState<ProjectFloor | null>(null);
  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const [unitFormData, setUnitFormData] = useState({
    code: '',
    type: '3BHK' as ProjectUnit['type'],
    size_sqft: '',
    facing: 'SE',
    price: '',
    status: 'available' as ProjectUnit['status']
  });

  // Add Floor Form State
  const [formData, setFormData] = useState({
    name: '',
    number: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const floorNum = parseInt(formData.number) || 0;

    const newFloor: ProjectFloor = {
      id: `FLR-00${floors.length + 1}`,
      buildingUuid: 'BLD-101',
      name: formData.name || `Floor ${floorNum}`,
      number: floorNum,
      units_count: 0
    };

    setFloors([...floors, newFloor]);
    setIsModalOpen(false);
    setFormData({ name: '', number: '' });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFloor) return;
    setFloors(floors.map(f => f.id === editFloor.id ? editFloor : f));
    setEditFloor(null);
  };

  // Add Unit to Specific Floor Handler
  const handleAddUnitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFloorForUnits) return;

    const newUnit: ProjectUnit = {
      id: `UNT-00${units.length + 1}`,
      floorUuid: selectedFloorForUnits.id,
      code: unitFormData.code || `U-${Math.floor(100 + Math.random() * 900)}`,
      type: unitFormData.type,
      size_sqft: parseFloat(unitFormData.size_sqft) || 1000,
      facing: unitFormData.facing,
      price: parseFloat(unitFormData.price) || 100000,
      status: unitFormData.status
    };

    setUnits([newUnit, ...units]);

    // Update floor units count
    setFloors(floors.map(f => f.id === selectedFloorForUnits.id ? { ...f, units_count: f.units_count + 1 } : f));
    setSelectedFloorForUnits({ ...selectedFloorForUnits, units_count: selectedFloorForUnits.units_count + 1 });

    setIsAddUnitModalOpen(false);
    setUnitFormData({ code: '', type: '3BHK', size_sqft: '', facing: 'SE', price: '', status: 'available' });
  };

  const filteredFloors = useMemo(() => {
    return floors.filter((f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.number.toString().includes(searchQuery)
    );
  }, [floors, searchQuery]);

  return (
    <div className="min-h-screen bg-white p-6 lg:p-8 font-sans text-slate-800">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <nav className="flex items-center text-sm text-slate-500 space-x-2 mb-1">
            <Link href="/projects" className="flex items-center hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4 mr-1 text-slate-600" /> Projects
            </Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <Link href="/projects/sites" className="hover:text-blue-600 cursor-pointer">Buildings</Link>
            <ChevronRight className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-900">Floors</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Building Floors Directory</h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Add Floor
        </button>
      </div>

      {/* Floors Table */}
      <div className="border border-slate-200 rounded-2xl shadow-sm bg-white overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <p className="font-bold text-slate-900 text-sm">Building: Tower A - Residential West</p>
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search floor name, number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-2 w-full focus:outline-none focus:border-blue-600 shadow-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                <th className="py-3.5 px-4">Floor Code</th>
                <th className="py-3.5 px-4">Floor Name</th>
                <th className="py-3.5 px-4">Floor Number</th>
                <th className="py-3.5 px-4">Units#</th>
                <th className="py-3.5 px-4 text-center">Units Link</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredFloors.length > 0 ? (
                filteredFloors.map((floor) => (
                  <tr key={floor.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-blue-600">{floor.id}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{floor.name}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">#Level {floor.number}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{floor.units_count} Units</td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedFloorForUnits(floor)}
                        className="text-xs text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-all hover:bg-blue-100"
                      >
                        View Units <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setViewFloor(floor)}
                          className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditFloor({ ...floor })}
                          className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                          title="Edit Floor"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setFloors(floors.filter(f => f.id !== floor.id))}
                          className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors"
                          title="Delete Floor"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No floors found matching selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. ADD FLOOR MODAL                                                        */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Add Floor Form</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Floor Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2nd Floor - Premium Suites"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Floor Number *</label>
                <input
                  type="number"
                  required
                  placeholder="2"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600 shadow-sm"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm"
                >
                  Save Floor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VIEW FLOOR UNITS MODAL (FUNCTIONAL)                                    */}
      {/* ========================================================================= */}
      {selectedFloorForUnits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Units on {selectedFloorForUnits.name}</h2>
                <p className="text-xs text-slate-500 font-mono">Floor ID: {selectedFloorForUnits.id}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddUnitModalOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 px-3 rounded-xl shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Unit to Floor
                </button>
                <button onClick={() => setSelectedFloorForUnits(null)} className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {units.filter(u => u.floorUuid === selectedFloorForUnits.id).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {units.filter(u => u.floorUuid === selectedFloorForUnits.id).map(unit => (
                    <div key={unit.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-blue-600">{unit.code}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full capitalize">
                          {unit.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span>Type:</span> <span className="font-bold text-slate-800 uppercase">{unit.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Size:</span> <span className="font-bold text-slate-800">{unit.size_sqft} sqft</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Facing:</span> <span className="font-bold text-slate-800 font-mono">{unit.facing}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-900">
                          <span>Price:</span> <span className="text-blue-600">${unit.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <p>No units found for this floor yet.</p>
                  <button
                    onClick={() => setIsAddUnitModalOpen(true)}
                    className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
                  >
                    + Click here to add the first unit
                  </button>
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button onClick={() => setSelectedFloorForUnits(null)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. ADD UNIT SUB-MODAL                                                     */}
      {/* ========================================================================= */}
      {isAddUnitModalOpen && selectedFloorForUnits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">Add Unit to {selectedFloorForUnits.name}</h2>
              <button onClick={() => setIsAddUnitModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUnitSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Unit Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A-301"
                  value={unitFormData.code}
                  onChange={(e) => setUnitFormData({ ...unitFormData, code: e.target.value })}
                  className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full font-mono focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Type *</label>
                  <select
                    value={unitFormData.type}
                    onChange={(e) => setUnitFormData({ ...unitFormData, type: e.target.value as any })}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600 capitalize"
                  >
                    <option value="1BHK">1BHK</option>
                    <option value="2BHK">2BHK</option>
                    <option value="3BHK">3BHK</option>
                    <option value="office">Office</option>
                    <option value="shop">Shop</option>
                    <option value="plot">Plot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Size (sqft) *</label>
                  <input
                    type="number"
                    required
                    placeholder="1200"
                    value={unitFormData.size_sqft}
                    onChange={(e) => setUnitFormData({ ...unitFormData, size_sqft: e.target.value })}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Facing *</label>
                  <select
                    value={unitFormData.facing}
                    onChange={(e) => setUnitFormData({ ...unitFormData, facing: e.target.value })}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600 uppercase"
                  >
                    <option value="N">North (N)</option>
                    <option value="S">South (S)</option>
                    <option value="E">East (E)</option>
                    <option value="W">West (W)</option>
                    <option value="SE">SE</option>
                    <option value="SW">SW</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    required
                    placeholder="150000"
                    value={unitFormData.price}
                    onChange={(e) => setUnitFormData({ ...unitFormData, price: e.target.value })}
                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddUnitModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 bg-white text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm"
                >
                  Save Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. VIEW FLOOR DETAILS MODAL                                               */}
      {/* ========================================================================= */}
      {viewFloor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Floor Details — {viewFloor.id}</h2>
              <button onClick={() => setViewFloor(null)} className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Floor Name:</span>
                  <span className="font-bold text-slate-800">{viewFloor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Floor Level Number:</span>
                  <span className="font-bold text-slate-800 font-mono">#Level {viewFloor.number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500 uppercase font-semibold">Total Units:</span>
                  <span className="font-bold text-blue-600">{viewFloor.units_count} Units</span>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button onClick={() => setViewFloor(null)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. EDIT FLOOR MODAL                                                       */}
      {/* ========================================================================= */}
      {editFloor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Edit Floor — {editFloor.id}</h2>
              <button onClick={() => setEditFloor(null)} className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Floor Name</label>
                <input
                  type="text"
                  required
                  value={editFloor.name}
                  onChange={(e) => setEditFloor({ ...editFloor, name: e.target.value })}
                  className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Floor Number</label>
                <input
                  type="number"
                  required
                  value={editFloor.number}
                  onChange={(e) => setEditFloor({ ...editFloor, number: parseInt(e.target.value) || 0 })}
                  className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditFloor(null)}
                  className="px-5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl shadow-sm"
                >
                  Update Floor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}