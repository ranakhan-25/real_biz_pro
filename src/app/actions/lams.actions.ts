"use server";

import { revalidateTag } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5002/realbizpro/api/v1";

// ----------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------
function safeDate(dateStr: string | undefined | null): string {
  if (!dateStr) return new Date().toISOString();
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

// ----------------------------------------------------------------------
// Acquisition Leads
// ----------------------------------------------------------------------
export async function getAcquisitionLeads() {
  try {
    const res = await fetch(`${API_BASE_URL}/lams/acquisition-leads`, {
      next: { tags: ["lams-acquisition-leadss"] },
    });
    if (!res.ok) throw new Error("Failed to fetch acquisition leads");
    const json = await res.json();
    const rawData = json.data || json;
    if (!Array.isArray(rawData)) return [];
    
    return rawData.map((item: any) => ({
      uuid: item.id,
      leadCode: 'AL-' + (item.id || '').substring(0,6).toUpperCase(),
      title: item.lead_title || 'Unknown Title',
      district: 'Dhaka', // Mock fallback
      upazila: 'Savar', // Mock fallback
      mouza: 'Boliarpur', // Mock fallback
      dagNo: '102', // Mock fallback
      khatianNo: '405', // Mock fallback
      ownerName: 'Unknown Owner', // Mock fallback
      landArea: item.land_area || 0,
      landAreaUnit: 'Decimal',
      expectedPrice: 0,
      offeredPrice: 0,
      leadStage: 'New', // Mock fallback
      leadSource: 'Direct',
      assignedUser: 'Admin',
    }));
  } catch (error) {
    console.error("Network error in getAcquisitionLeads:", error);
    return [];
  }
}

export async function createAcquisitionLead(data: any) {
  const payload = {
    lead_title: data.title || 'Untitled',
    lead_date: safeDate(data.createdAt),
    land_type: 'Commercial',
    land_area: parseFloat(data.landArea) || 0,
  };
  
  const res = await fetch(`${API_BASE_URL}/lams/acquisition-leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create acquisition lead");
  revalidateTag("lams-acquisition-leadss");
  const json = await res.json(); return json.data || json;
}

export async function updateAcquisitionLead(uuid: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/lams/acquisition-leads/${uuid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lead_title: data.title,
      land_area: parseFloat(data.landArea) || undefined,
    }),
  });
  if (!res.ok) throw new Error("Failed to update acquisition lead");
  revalidateTag("lams-acquisition-leadss");
  const json = await res.json(); return json.data || json;
}

export async function deleteAcquisitionLead(uuid: string) {
  const res = await fetch(`${API_BASE_URL}/lams/acquisition-leads/${uuid}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete acquisition lead");
  revalidateTag("lams-acquisition-leadss");
}

// ----------------------------------------------------------------------
// Land Owners
// ----------------------------------------------------------------------
export async function getLandOwners() {
  try {

  const res = await fetch(`${API_BASE_URL}/lams/land-owners`, {
    next: { tags: ["lams-land-ownerss"] },
  });
  if (!res.ok) throw new Error("Failed to fetch land owners");
  const json = await res.json();
  const rawData = json.data || json;
  if (!Array.isArray(rawData)) return [];
  
  return rawData.map((item: any) => ({
    uuid: item.id,
    code: 'LW-' + (item.id || '').substring(0,6).toUpperCase(),
    acquisitionLeadId: item.lead_id,
    landPlot: 'General Parcel',
    ownerName: item.name || 'Unknown',
    isPrimary: item.owner_type === 'Owner',
    fatherName: 'Unknown',
    nidNumber: item.nid_number || '',
    phone: item.contact_number || '',
    address: item.address || '',
    status: 'Active',
    addedBy: 'Admin',
    remarks: '',
    ownershipSharePercentage: item.ownership_percentage || 50,
  }));

  } catch (error) {
    console.error("Network error in getLandOwners:", error);
    return [];
  }
}

export async function createLandOwner(data: any) {
  const payload = {
    lead_id: data.acquisitionLeadId,
    owner_type: data.isPrimary ? 'Owner' : 'Broker',
    name: data.ownerName || 'Unknown',
    contact_number: data.phone || '',
    email: 'test@example.com',
    address: data.address || '',
    nid_number: data.nidNumber || '',
    ownership_percentage: parseFloat(data.ownershipSharePercentage) || 0,
  };

  const res = await fetch(`${API_BASE_URL}/lams/land-owners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) {
    const errorData = await res.text();
    console.error("Backend error for createLandOwner:", errorData);
    throw new Error("Failed to create land owner");
  }
  revalidateTag("lams-land-ownerss");
  const json = await res.json(); return json.data || json;
}

export async function updateLandOwner(uuid: string, data: any) {
  const payload: any = {};
  if (data.ownerName) payload.name = data.ownerName;
  if (data.phone) payload.contact_number = data.phone;
  if (data.address) payload.address = data.address;
  if (data.nidNumber) payload.nid_number = data.nidNumber;
  if (data.ownershipSharePercentage) payload.ownership_percentage = parseFloat(data.ownershipSharePercentage);

  const res = await fetch(`${API_BASE_URL}/lams/land-owners/${uuid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update land owner");
  revalidateTag("lams-land-ownerss");
  const json = await res.json(); return json.data || json;
}

export async function deleteLandOwner(uuid: string) {
  const res = await fetch(`${API_BASE_URL}/lams/land-owners/${uuid}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete land owner");
  revalidateTag("lams-land-ownerss");
}

// ----------------------------------------------------------------------
// Negotiation Process
// ----------------------------------------------------------------------
export async function getNegotiationProcesses() {
  try {

  const res = await fetch(`${API_BASE_URL}/lams/negotiation-processes`, {
    next: { tags: ["lams-negotiation-processeses"] },
  });
  if (!res.ok) throw new Error("Failed to fetch negotiation processes");
  const json = await res.json();
  const rawData = json.data || json;
  if (!Array.isArray(rawData)) return [];
  
  return rawData.map((item: any) => ({
    uuid: item.id,
    acquisitionLeadId: item.lead_id,
    leadTitle: 'Unknown Lead',
    mouza: 'Unknown',
    dagNo: '000',
    offeredTotalPrice: item.offered_price || 0,
    offeredPricePerDecimal: 0,
    counterOfferByOwner: item.agreed_price || 0,
    counterPricePerDecimal: 0,
    negotiationStatus: item.negotiation_status || 'In Progress',
    meetingDate: item.negotiation_date ? new Date(item.negotiation_date).toLocaleString() : '',
    attendedBy: 'Admin',
    remarks: item.meeting_notes || '',
  }));

  } catch (error) {
    console.error("Network error in getNegotiationProcesses:", error);
    return [];
  }
}

export async function createNegotiationProcess(data: any) {
  const payload = {
    lead_id: data.acquisitionLeadId,
    negotiation_date: safeDate(data.meetingDate),
    offered_price: parseFloat(data.offeredTotalPrice) || 0,
    agreed_price: parseFloat(data.counterOfferByOwner) || 0,
    negotiation_status: data.negotiationStatus || 'In Progress',
    next_meeting_date: new Date().toISOString(),
    meeting_notes: data.remarks || '',
  };

  const res = await fetch(`${API_BASE_URL}/lams/negotiation-processes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create negotiation process");
  revalidateTag("lams-negotiation-processeses");
  const json = await res.json(); return json.data || json;
}

export async function updateNegotiationProcess(uuid: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/lams/negotiation-processes/${uuid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      negotiation_status: data.negotiationStatus || undefined,
        offered_price: parseFloat(data.offeredTotalPrice) || undefined,
        agreed_price: parseFloat(data.counterOfferByOwner) || undefined,
        negotiation_date: data.meetingDate ? new Date(data.meetingDate).toISOString() : undefined,
        meeting_notes: data.remarks || undefined
    }),
  });
  if (!res.ok) throw new Error("Failed to update negotiation process");
  revalidateTag("lams-negotiation-processeses");
  const json = await res.json(); return json.data || json;
}

export async function deleteNegotiationProcess(uuid: string) {
  const res = await fetch(`${API_BASE_URL}/lams/negotiation-processes/${uuid}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete negotiation process");
  revalidateTag("lams-negotiation-processeses");
}

// ----------------------------------------------------------------------
// Legal Documents
// ----------------------------------------------------------------------
export async function getLegalDocuments() {
  try {

  const res = await fetch(`${API_BASE_URL}/lams/legal-documents`, {
    next: { tags: ["lams-legal-documentss"] },
  });
  if (!res.ok) throw new Error("Failed to fetch legal documents");
  const json = await res.json();
  const rawData = json.data || json;
  if (!Array.isArray(rawData)) return [];
  
  return rawData.map((item: any) => ({
    uuid: item.id,
    acquisitionLeadId: item.lead_id,
    leadTitle: 'Unknown Lead',
    documentType: item.document_type || 'Deed',
    documentFileName: item.document_number || 'Unknown',
    fileSize: '1MB',
    verificationStatus: item.verification_status || 'Pending',
    verifiedBy: 'Admin',
    verificationDate: item.issue_date ? new Date(item.issue_date).toLocaleDateString() : '',
    remarks: item.vetting_remarks || '',
  }));

  } catch (error) {
    console.error("Network error in getLegalDocuments:", error);
    return [];
  }
}

export async function createLegalDocument(data: any) {
  const payload = {
    lead_id: data.acquisitionLeadId,
    document_type: data.documentType,
    document_number: data.documentFileName || 'DOC-DEFAULT',
    issue_date: safeDate(data.verificationDate),
    file_path: '/uploads/dummy.pdf',
    verification_status: data.verificationStatus || 'Pending',
    vetting_remarks: data.remarks || '',
  };

  const res = await fetch(`${API_BASE_URL}/lams/legal-documents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create legal document");
  revalidateTag("lams-legal-documentss");
  const json = await res.json(); return json.data || json;
}

export async function updateLegalDocument(uuid: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/lams/legal-documents/${uuid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      verification_status: data.verificationStatus || undefined,
        document_type: data.documentType || undefined,
        document_number: data.documentFileName || undefined,
        issue_date: data.verificationDate ? new Date(data.verificationDate).toISOString() : undefined,
        vetting_remarks: data.remarks || undefined
    }),
  });
  if (!res.ok) throw new Error("Failed to update legal document");
  revalidateTag("lams-legal-documentss");
  const json = await res.json(); return json.data || json;
}

export async function deleteLegalDocument(uuid: string) {
  const res = await fetch(`${API_BASE_URL}/lams/legal-documents/${uuid}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete legal document");
  revalidateTag("lams-legal-documentss");
}

// ----------------------------------------------------------------------
// Follow Ups
// ----------------------------------------------------------------------
export async function getFollowUps() {
  try {

  const res = await fetch(`${API_BASE_URL}/lams/follow-ups`, {
    next: { tags: ["lams-follow-upss"] },
  });
  if (!res.ok) throw new Error("Failed to fetch follow-upss");
  const json = await res.json();
  const rawData = json.data || json;
  if (!Array.isArray(rawData)) return [];

  return rawData.map((item: any) => ({
    uuid: item.id,
    acquisitionLeadId: item.lead_id,
    date: item.follow_up_date ? new Date(item.follow_up_date).toLocaleDateString() : '',
    landDetails: 'Mock Land Details',
    ownerDetails: 'Mock Owner',
    contact: '017000000',
    followUpType: item.follow_up_type || 'Call',
    status: item.outcome === 'Interested' ? 'Completed' : 'Pending', // heuristic
    note: item.remarks || '',
    assignedTo: 'Admin',
  }));

  } catch (error) {
    console.error("Network error in getFollowUps:", error);
    return [];
  }
}

export async function createFollowUp(data: any) {
  const payload = {
    lead_id: data.acquisitionLeadId,
    follow_up_date: safeDate(data.date),
    follow_up_type: data.followUpType || 'Call',
    outcome: data.status === 'Completed' ? 'Interested' : 'Pending',
    next_action_date: safeDate(null),
    remarks: data.note || '',
  };

  const res = await fetch(`${API_BASE_URL}/lams/follow-ups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create follow-ups");
  revalidateTag("lams-follow-upss");
  const json = await res.json(); return json.data || json;
}

export async function updateFollowUp(uuid: string, data: any) {
  const payload: any = {};
  if (data.status) payload.outcome = data.status === 'Completed' ? 'Interested' : 'Pending';
  if (data.followUpType) payload.follow_up_type = data.followUpType;
  if (data.date) payload.follow_up_date = new Date(data.date).toISOString();
  if (data.note) payload.remarks = data.note;

  const res = await fetch(`${API_BASE_URL}/lams/follow-ups/${uuid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update follow-ups");
  revalidateTag("lams-follow-upss");
  const json = await res.json(); return json.data || json;
}

export async function deleteFollowUp(uuid: string) {
  const res = await fetch(`${API_BASE_URL}/lams/follow-ups/${uuid}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete follow-ups");
  revalidateTag("lams-follow-upss");
}
