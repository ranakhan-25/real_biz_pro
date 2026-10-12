'use client';

import React, { useState } from 'react';
import {
  Search,
  Plus,
  ChevronRight,
  Home,
  X,
  Save,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  Wrench,
} from 'lucide-react';

export interface ServiceRecord {
  id: string;
  productType: string;
  code: string;
  name: string;
  purchasePrice: number;
  salePrice: number;
  category: string;
  unit: string;
  brand: string;
}

const initialServiceData: ServiceRecord[] = [
  {
    id: '1',
    productType: 'Service',
    code: 'S0045',
    name: 'gddc',
    purchasePrice: 0,
    salePrice: 0,
    category: 'Day labour',
    unit: 'Sft',
    brand: 'BBH',
  },
  {
    id: '2',
    productType: 'Service',
    code: 'S0044',
    name: 'test',
    purchasePrice: 0,
    salePrice: 0,
    category: 'Paint Work',
    unit: 'Set',
    brand: 'BSRM',
  },
  {
    id: '3',
    productType: 'Service',
    code: 'S0043',
    name: 'cdxc',
    purchasePrice: 0,
    salePrice: 0,
    category: 'Paint Work',
    unit: 'Cft',
    brand: 'BBH',
  },
  {
    id: '4',
    productType: 'Service',
    code: 'S0042',
    name: 'tefg',
    purchasePrice: 0,
    salePrice: 0,
    category: 'Day labour',
    unit: 'Sft',
    brand: 'ABC',
  },
  {
    id: '5',
    productType: 'Service',
    code: 'S057',
    name: 'Water Repellent(service)',
    purchasePrice: 10,
    salePrice: 0,
    category: 'Paint Work',
    unit: 'Sft',
    brand: '',
  },
  {
    id: '6',
    productType: 'Service',
    code: 'S056',
    name: 'Weather Coat (Outside)(service)',
    purchasePrice: 7,
    salePrice: 0,
    category: 'Paint Work',
    unit: 'Job',
    brand: '',
  },
  {
    id: '7',
    productType: 'Service',
    code: 'S055',
    name: 'Enamail Paint(service)',
    purchasePrice: 5,
    salePrice: 0,
    category: 'Paint Work',
    unit: 'Job',
    brand: '',
  },
  {
    id: '8',
    productType: 'Service',
    code: 'S054',
    name: 'Plastic Paint (Inside Floor)(service)',
    purchasePrice: 5,
    salePrice: 0,
    category: 'Paint Work',
    unit: 'Job',
    brand: '',
  },
  {
    id: '9',
    productType: 'Service',
    code: 'S052',
    name: 'Gas Pipe Wiring (All Floor)',
    purchasePrice: 0,
    salePrice: 0,
    category: 'Wiring',
    unit: '',
    brand: '',
  },
  {
    id: '10',
    productType: 'Service',
    code: 'S051',
    name: 'Internal Pipe Wiring',
    purchasePrice: 0,
    salePrice: 0,
    category: 'Wiring',
    unit: '',
    brand: '',
  },
  {
    id: '11',
    productType: 'Service',
    code: 'S050',
    name: 'Main Gate Fabrication',
    purchasePrice: 1500,
    salePrice: 2000,
    category: 'Metal Work',
    unit: 'Pcs',
    brand: 'Local',
  },
  {
    id: '12',
    productType: 'Service',
    code: 'S049',
    name: 'Tile Setting Installation',
    purchasePrice: 25,
    salePrice: 35,
    category: 'Masonry',
    unit: 'Sft',
    brand: 'Expert',
  },
  {
    id: '13',
    productType: 'Service',
    code: 'S048',
    name: 'Roof Waterproofing',
    purchasePrice: 45,
    salePrice: 60,
    category: 'Civil',
    unit: 'Sft',
    brand: 'Henkel',
  },
  {
    id: '14',
    productType: 'Service',
    code: 'S047',
    name: 'Sanitary Fitting Setup',
    purchasePrice: 500,
    salePrice: 750,
    category: 'Plumbing',
    unit: 'Job',
    brand: 'RFL',
  },
  {
    id: '15',
    productType: 'Service',
    code: 'S046',
    name: 'AC Ducting Installation',
    purchasePrice: 1200,
    salePrice: 1600,
    category: 'HVAC',
    unit: 'Rft',
    brand: 'Carrier',
  },
];

export default function ServiceListModule() {
  const [viewMode, setViewMode] = useState<'list' | 'create'>('list');

  const [services, setServices] =
    useState<ServiceRecord[]>(initialServiceData);

  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState<ServiceRecord | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    productType: 'Service',
    code: 'S0' + (services.length + 46),
    name: '',
    purchasePrice: '',
    salePrice: '',
    category: 'Paint Work',
    unit: 'Sft',
    brand: 'BBH',
  });

  // Search filter
  const filteredData = services.filter((item) => {
    const query = searchQuery.toLowerCase();

    return (
      item.name.toLowerCase().includes(query) ||
      item.code.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query)
    );
  });

  // Pagination
  const totalPages =
    Math.ceil(filteredData.length / entriesPerPage) || 1;

  const startIndex = (currentPage - 1) * entriesPerPage;

  const currentTableData = filteredData.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  // Add service
  const handleAddServiceSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newItem: ServiceRecord = {
      id: Date.now().toString(),
      productType: formData.productType,
      code: formData.code,
      name: formData.name,
      purchasePrice: Number(formData.purchasePrice) || 0,
      salePrice: Number(formData.salePrice) || 0,
      category: formData.category,
      unit: formData.unit,
      brand: formData.brand,
    };

    setServices((prev) => [newItem, ...prev]);

    setViewMode('list');
    setCurrentPage(1);

    setFormData({
      productType: 'Service',
      code: 'S0' + (services.length + 47),
      name: '',
      purchasePrice: '',
      salePrice: '',
      category: 'Paint Work',
      unit: 'Sft',
      brand: 'BBH',
    });
  };

  // Update service
  const handleUpdateSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!selectedService) return;

    setServices((prev) =>
      prev.map((service) =>
        service.id === selectedService.id
          ? {
              ...service,
              name: formData.name,
              purchasePrice:
                Number(formData.purchasePrice) || 0,
              salePrice: Number(formData.salePrice) || 0,
              category: formData.category,
              unit: formData.unit,
              brand: formData.brand,
            }
          : service
      )
    );

    setIsEditOpen(false);
    setSelectedService(null);
  };

  // Delete service
  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this service record?'
    );

    if (!confirmed) return;

    setServices((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Open edit modal
  const handleEdit = (item: ServiceRecord) => {
    setSelectedService(item);

    setFormData({
      productType: item.productType,
      code: item.code,
      name: item.name,
      purchasePrice: String(item.purchasePrice),
      salePrice: String(item.salePrice),
      category: item.category,
      unit: item.unit,
      brand: item.brand,
    });

    setIsEditOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 p-2 sm:p-3 font-sans">
      <div className="w-full space-y-3">

        {/* ================= BREADCRUMB ================= */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-1">
          <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer transition-colors">
            <Home className="w-3.5 h-3.5" />
            Home
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

          <span className="text-slate-600">
            Labour/Worker
          </span>

          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />

          <span className="text-indigo-600 font-semibold">
            {viewMode === 'list'
              ? 'Service/Work Name'
              : 'Service/Work Name Add'}
          </span>
        </div>

        {/* ================= HEADER ================= */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
          <div>
            <h1 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-indigo-600" />

              {viewMode === 'list'
                ? 'Service & Work Name Management'
                : 'Create New Service/Work'}
            </h1>

            <p className="text-[11px] text-slate-500 mt-0.5">
              Manage labour tasks, service pricing, and
              specifications across full screen width.
            </p>
          </div>

          <div>
            {viewMode === 'list' ? (
              <button
                type="button"
                onClick={() => setViewMode('create')}
                className="inline-flex items-center gap-1.5 bg-[#5949d6] hover:bg-[#4d3ec2] text-white text-[11px] font-semibold px-4 py-2 rounded-md shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                +Service/Work Name Add
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-semibold px-4 py-2 rounded-md shadow-sm transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Previous
              </button>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* ================= SERVICE LIST ========================== */}
        {/* ========================================================= */}

        {viewMode === 'list' && (
          <div className="w-full space-y-3">

            {/* Search / Entries */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white px-4 py-3 rounded-lg border border-slate-200 w-full shadow-sm">
              
              {/* Entries */}
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span>Show</span>

                <select
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(
                      Number(e.target.value)
                    );
                    setCurrentPage(1);
                  }}
                  className="border border-slate-300 rounded px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>

                <span>entries</span>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-slate-600 font-medium">
                  Search:
                </span>

                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search code, name, category, brand..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* ================= TABLE ================= */}
            <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm bg-white w-full">

              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left border-collapse text-xs">

                  {/* Table Head */}
                  <thead>
                    <tr className="bg-[#5949d6] text-white font-semibold tracking-wide">

                      <th className="py-2.5 px-3 w-12">
                        ID
                      </th>

                      <th className="py-2.5 px-3">
                        PRODUCT TYPE
                      </th>

                      <th className="py-2.5 px-3 w-24">
                        CODE
                      </th>

                      <th className="py-2.5 px-3">
                        NAME
                      </th>

                      <th className="py-2.5 px-3 text-right">
                        PURCHASE PRICE
                      </th>

                      <th className="py-2.5 px-3 text-right">
                        SALE PRICE
                      </th>

                      <th className="py-2.5 px-3">
                        CATEGORY
                      </th>

                      <th className="py-2.5 px-3 w-20">
                        UNIT
                      </th>

                      <th className="py-2.5 px-3 w-28">
                        BRAND
                      </th>

                      <th className="py-2.5 px-3 text-center w-28">
                        ACTION
                      </th>

                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-slate-100">

                    {currentTableData.length > 0 ? (
                      currentTableData.map(
                        (item, index) => (
                          <tr
                            key={item.id}
                            className="hover:bg-indigo-50/40 transition-colors"
                          >
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-600">
                              {startIndex + index + 1}
                            </td>

                            <td className="py-2.5 px-3 font-semibold text-slate-600">
                              {item.productType}
                            </td>

                            <td className="py-2.5 px-3 font-mono text-indigo-700 font-semibold">
                              {item.code}
                            </td>

                            <td className="py-2.5 px-3 font-bold text-slate-900">
                              {item.name}
                            </td>

                            <td className="py-2.5 px-3 text-right font-medium text-slate-700">
                              {item.purchasePrice}
                            </td>

                            <td className="py-2.5 px-3 text-right font-medium text-slate-700">
                              {item.salePrice}
                            </td>

                            <td className="py-2.5 px-3 font-medium text-indigo-600">
                              {item.category}
                            </td>

                            <td className="py-2.5 px-3 font-medium text-slate-600">
                              {item.unit}
                            </td>

                            <td className="py-2.5 px-3 font-semibold text-slate-800">
                              {item.brand}
                            </td>

                            <td className="py-2.5 px-3 text-center">
                              <div className="inline-flex items-center gap-1 justify-center">

                                {/* View */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedService(item);
                                    setIsViewOpen(true);
                                  }}
                                  className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded transition-colors cursor-pointer"
                                  title="View Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {/* Edit */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleEdit(item)
                                  }
                                  className="p-1.5 bg-cyan-50 hover:bg-cyan-100 text-cyan-600 rounded transition-colors cursor-pointer"
                                  title="Edit Record"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>

                                {/* Delete */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(item.id)
                                  }
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded transition-colors cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                              </div>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={10}
                          className="text-center py-12 text-slate-400 font-medium"
                        >
                          No matching service or work
                          records found
                        </td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </div>

              {/* ================= PAGINATION ================= */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-3 border-t border-slate-200 bg-white gap-2 text-xs text-slate-500 font-medium w-full">

                <div>
                  Showing{' '}
                  {filteredData.length > 0
                    ? startIndex + 1
                    : 0}{' '}
                  to{' '}
                  {Math.min(
                    startIndex + entriesPerPage,
                    filteredData.length
                  )}{' '}
                  of {filteredData.length} entries
                </div>

                <div className="inline-flex items-center gap-1 flex-wrap justify-center">

                  {/* Previous */}
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.max(prev - 1, 1)
                      )
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded border border-slate-200 ${
                      currentPage === 1
                        ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                        : 'bg-white text-slate-700 hover:bg-slate-100 cursor-pointer'
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  {Array.from(
                    { length: totalPages },
                    (_, i) => i + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() =>
                        setCurrentPage(pageNumber)
                      }
                      className={`px-3 py-1 rounded border font-semibold ${
                        currentPage === pageNumber
                          ? 'border-[#5949d6] bg-[#5949d6] text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          prev + 1,
                          totalPages
                        )
                      )
                    }
                    disabled={
                      currentPage === totalPages
                    }
                    className={`px-3 py-1 rounded border border-slate-200 ${
                      currentPage === totalPages
                        ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                        : 'bg-white text-slate-700 hover:bg-slate-100 cursor-pointer'
                    }`}
                  >
                    Next
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ================= CREATE FORM =========================== */}
        {/* ========================================================= */}

        {viewMode === 'create' && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-5 w-full">

            <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-200 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" />
              New Service / Work Name Entry Form
            </h2>

            <form
              onSubmit={handleAddServiceSubmit}
              className="space-y-4 text-xs w-full"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Product Type */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Product Type *
                  </label>

                  <select
                    value={formData.productType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productType: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Service">
                      Service
                    </option>
                    <option value="Labour">
                      Labour
                    </option>
                  </select>
                </div>

                {/* Code */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Code *
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-md px-3 py-2 font-mono font-bold text-indigo-700 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Name *
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter service/work name..."
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-slate-900"
                  />
                </div>

                {/* Purchase Price */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Purchase Price *
                  </label>

                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.purchasePrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        purchasePrice: e.target.value,
                      })
                    }
                    placeholder="0"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Sale Price */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Sale Price *
                  </label>

                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.salePrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        salePrice: e.target.value,
                      })
                    }
                    placeholder="0"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category *
                  </label>

                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Paint Work">
                      Paint Work
                    </option>
                    <option value="Day labour">
                      Day labour
                    </option>
                    <option value="Wiring">
                      Wiring
                    </option>
                    <option value="Plumbing">
                      Plumbing
                    </option>
                    <option value="Civil">
                      Civil
                    </option>
                    <option value="HVAC">
                      HVAC
                    </option>
                    <option value="Metal Work">
                      Metal Work
                    </option>
                    <option value="Masonry">
                      Masonry
                    </option>
                  </select>
                </div>

                {/* Unit */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Unit
                  </label>

                  <select
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unit: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Sft">Sft</option>
                    <option value="Cft">Cft</option>
                    <option value="Set">Set</option>
                    <option value="Job">Job</option>
                    <option value="Rft">Rft</option>
                    <option value="Pcs">Pcs</option>
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Brand
                  </label>

                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        brand: e.target.value,
                      })
                    }
                    placeholder="Optional brand name..."
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">

                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 cursor-pointer font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-md shadow-sm cursor-pointer font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  Save Service
                </button>

              </div>
            </form>
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* ================= VIEW DETAILS MODAL ==================== */}
      {/* ========================================================= */}

      {isViewOpen && selectedService && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">

            {/* Modal Header */}
            <div className="bg-[#5949d6] text-white px-5 py-3.5 flex items-center justify-between">

              <h3 className="font-bold text-xs flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-300" />
                Service Details: {selectedService.code}
              </h3>

              <button
                type="button"
                onClick={() => {
                  setIsViewOpen(false);
                  setSelectedService(null);
                }}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-3 text-xs">

              <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200">

                <div className="flex justify-between gap-4 py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Service Name:
                  </span>

                  <span className="font-bold text-slate-900 text-right">
                    {selectedService.name}
                  </span>
                </div>

                <div className="flex justify-between gap-4 py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Code:
                  </span>

                  <span className="font-mono font-bold text-indigo-700">
                    {selectedService.code}
                  </span>
                </div>

                <div className="flex justify-between gap-4 py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Product Type:
                  </span>

                  <span className="font-bold text-slate-800">
                    {selectedService.productType}
                  </span>
                </div>

                <div className="flex justify-between gap-4 py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Purchase / Sale Price:
                  </span>

                  <span className="font-bold text-emerald-600">
                    {selectedService.purchasePrice} /{' '}
                    {selectedService.salePrice}
                  </span>
                </div>

                <div className="flex justify-between gap-4 py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">
                    Category / Unit:
                  </span>

                  <span className="font-bold text-indigo-600 text-right">
                    {selectedService.category} (
                    {selectedService.unit || 'N/A'})
                  </span>
                </div>

                <div className="flex justify-between gap-4 py-1">
                  <span className="text-slate-500 font-medium">
                    Brand:
                  </span>

                  <span className="font-bold text-slate-800">
                    {selectedService.brand || 'N/A'}
                  </span>
                </div>

              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsViewOpen(false);
                    setSelectedService(null);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-semibold cursor-pointer"
                >
                  Close Details
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ================= EDIT MODAL ============================ */}
      {/* ========================================================= */}

      {isEditOpen && selectedService && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">

            {/* Header */}
            <div className="bg-[#5949d6] text-white px-5 py-3.5 flex items-center justify-between">

              <h3 className="font-bold text-xs flex items-center gap-2">
                <Edit className="w-4 h-4 text-cyan-300" />
                Edit Service: {selectedService.code}
              </h3>

              <button
                type="button"
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedService(null);
                }}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleUpdateSubmit}
              className="p-5 space-y-3 text-xs"
            >

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Code */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Code
                  </label>

                  <input
                    type="text"
                    disabled
                    value={formData.code}
                    className="w-full border border-slate-200 rounded-md px-3 py-2 font-mono font-bold text-slate-400 bg-slate-100 cursor-not-allowed"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Name *
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold text-slate-900"
                  />
                </div>

                {/* Purchase */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Purchase Price *
                  </label>

                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.purchasePrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        purchasePrice: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Sale */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Sale Price *
                  </label>

                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.salePrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        salePrice: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category *
                  </label>

                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Paint Work">
                      Paint Work
                    </option>
                    <option value="Day labour">
                      Day labour
                    </option>
                    <option value="Wiring">
                      Wiring
                    </option>
                    <option value="Plumbing">
                      Plumbing
                    </option>
                    <option value="Civil">
                      Civil
                    </option>
                    <option value="HVAC">
                      HVAC
                    </option>
                    <option value="Metal Work">
                      Metal Work
                    </option>
                    <option value="Masonry">
                      Masonry
                    </option>
                  </select>
                </div>

                {/* Unit */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Unit
                  </label>

                  <select
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unit: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-md px-3 py-2 bg-white font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="Sft">Sft</option>
                    <option value="Cft">Cft</option>
                    <option value="Set">Set</option>
                    <option value="Job">Job</option>
                    <option value="Rft">Rft</option>
                    <option value="Pcs">Pcs</option>
                  </select>
                </div>

                {/* Brand */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Brand
                  </label>

                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        brand: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">

                <button
                  type="button"
                  onClick={() => {
                    setIsEditOpen(false);
                    setSelectedService(null);
                  }}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 cursor-pointer font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 bg-[#5949d6] hover:bg-[#4d3ec2] text-white rounded-md shadow-sm cursor-pointer font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  Update Changes
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}