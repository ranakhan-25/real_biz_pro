"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LamsHeaderNav, LamsTab } from "@/components/lams/LamsHeaderNav";
import { LamsMetrics } from "@/components/lams/LamsMetrics";
import { LandOwnersView } from "@/components/lams/LandOwnersView";
import { AcquisitionLeadsView } from "@/components/lams/AcquisitionLeadsView";
import { NegotiationProcessView } from "@/components/lams/NegotiationProcessView";
import { LegalDocumentsView } from "@/components/lams/LegalDocumentsView";
import { FollowUpView } from "@/components/lams/FollowUpView";

import {
  mockLandOwners,
  mockAcquisitionLeads,
  mockNegotiations,
  mockLegalDocuments,
  mockFollowUps,
} from "@/data/lams/lams.mock";
import {
  LandOwner,
  AcquisitionLead,
  NegotiationRecord,
  LegalDocument,
  FollowUpItem,
} from "@/types/lams";

const PATH_TO_TAB: Record<string, LamsTab> = {
  "": "owners",
  dashboard: "owners",
  "land-owners": "owners",
  "acquisition-leads": "leads",
  "negotiation-process": "negotiation",
  "legal-documents": "documents",
  "follow-up": "followup",
};

const TAB_TO_PATH: Record<LamsTab, string> = {
  owners: "land-owners",
  leads: "acquisition-leads",
  negotiation: "negotiation-process",
  documents: "legal-documents",
  followup: "follow-up",
};

export default function LamsDashboard({ path = "" }: { path?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  // Resolve initial tab from route path
  const initialTab = PATH_TO_TAB[path] ?? "owners";
  const [activeTab, setActiveTab] = useState<LamsTab>(initialTab);
  const [showInsights, setShowInsights] = useState(true);

  // Sync state if path prop changes from route navigation
  useEffect(() => {
    if (path && PATH_TO_TAB[path]) {
      setActiveTab(PATH_TO_TAB[path]);
    }
  }, [path]);

  // Stateful datasets
  const [owners, setOwners] = useState<LandOwner[]>(mockLandOwners);
  const [leads, setLeads] = useState<AcquisitionLead[]>(mockAcquisitionLeads);
  const [negotiations, setNegotiations] = useState<NegotiationRecord[]>(mockNegotiations);
  const [documents, setDocuments] = useState<LegalDocument[]>(mockLegalDocuments);
  const [followUps, setFollowUps] = useState<FollowUpItem[]>(mockFollowUps);

  // When tab is clicked in header, sync URL if inside /dashboard/lams
  const handleTabChange = (newTab: LamsTab) => {
    setActiveTab(newTab);
    if (pathname?.startsWith("/dashboard/lams")) {
      const subPath = TAB_TO_PATH[newTab];
      router.push(`/dashboard/lams/${subPath}`);
    }
  };

  // Handlers for Land Owners
  const handleAddOwner = (newOwner: LandOwner) => {
    setOwners((prev) => [newOwner, ...prev]);
  };
  const handleDeleteOwner = (id: string) => {
    setOwners((prev) => prev.filter((o) => o.id !== id));
  };

  // Handlers for Acquisition Leads
  const handleAddLead = (newLead: AcquisitionLead) => {
    setLeads((prev) => [newLead, ...prev]);
  };
  const handleDeleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // Handlers for Negotiations
  const handleAddNegotiation = (newRecord: NegotiationRecord) => {
    setNegotiations((prev) => [newRecord, ...prev]);
  };
  const handleDeleteNegotiation = (id: string) => {
    setNegotiations((prev) => prev.filter((n) => n.id !== id));
  };

  // Handlers for Legal Documents
  const handleAddDocument = (newDoc: LegalDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };
  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  // Handlers for Follow Ups
  const handleAddFollowUp = (newItem: FollowUpItem) => {
    setFollowUps((prev) => [newItem, ...prev]);
  };
  const handleDeleteFollowUp = (id: string) => {
    setFollowUps((prev) => prev.filter((f) => f.id !== id));
  };
  const handleToggleCompleteFollowUp = (id: string) => {
    setFollowUps((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              status: f.status === "Completed" ? "Pending" : "Completed",
            }
          : f,
      ),
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Module Header Navigation Tabs & Breadcrumb */}
      <LamsHeaderNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        showInsights={showInsights}
        onToggleInsights={() => setShowInsights((prev) => !prev)}
        counts={{
          owners: owners.length,
          leads: leads.length,
          negotiation: negotiations.length,
          documents: documents.length,
          followup: followUps.length,
        }}
      />

      {/* 2. Executive KPI Metric Strip + Collapsible Analytics Chart */}
      <LamsMetrics showInsights={showInsights} />

      {/* 3. Dynamic Module Views */}
      <div className="animate-in fade-in duration-200">
        {activeTab === "owners" && (
          <LandOwnersView
            owners={owners}
            onAddOwner={handleAddOwner}
            onDeleteOwner={handleDeleteOwner}
            acquisitionLeads={leads}
          />
        )}

        {activeTab === "leads" && (
          <AcquisitionLeadsView
            leads={leads}
            onAddLead={handleAddLead}
            onDeleteLead={handleDeleteLead}
          />
        )}

        {activeTab === "negotiation" && (
          <NegotiationProcessView
            negotiations={negotiations}
            onAddNegotiation={handleAddNegotiation}
            onDeleteNegotiation={handleDeleteNegotiation}
            acquisitionLeads={leads}
          />
        )}

        {activeTab === "documents" && (
          <LegalDocumentsView
            documents={documents}
            onAddDocument={handleAddDocument}
            onDeleteDocument={handleDeleteDocument}
            acquisitionLeads={leads}
          />
        )}

        {activeTab === "followup" && (
          <FollowUpView
            followUps={followUps}
            onAddFollowUp={handleAddFollowUp}
            onDeleteFollowUp={handleDeleteFollowUp}
            onToggleComplete={handleToggleCompleteFollowUp}
            acquisitionLeads={leads}
          />
        )}
      </div>
    </div>
  );
}
