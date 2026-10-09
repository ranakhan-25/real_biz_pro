import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5002/realbizpro/api/v1";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "This Month";

  try {
    // Attempt to fetch live items count and stock report if backend is available
    let totalItems = 120;
    let totalStockValue = 3500000;
    try {
      const itemsRes = await fetch(`${API_BASE}/inventory/items`, { next: { revalidate: 30 } });
      if (itemsRes.ok) {
        const json = await itemsRes.json();
        const list = json.data || json;
        if (Array.isArray(list)) {
          totalItems = list.length;
        }
      }
    } catch {
      // Fallback
    }

    const data = {
      quickCards: {
        totalStock: {
          value: totalStockValue,
          changePercent: 12.5,
          trend: [28, 32, 30, 35, 34, 38, 42],
        },
        materialIssues: {
          value: 1200000,
          changePercent: -4.2,
          trend: [15, 14, 16, 13, 14, 12, 11],
        },
        wasteScrap: {
          value: 45000,
          changePercent: 1.8,
          trend: [5, 4, 6, 5, 7, 5, 6],
        },
        overflowMaterial: {
          value: 180000,
          changePercent: -8.0,
          trend: [22, 20, 21, 19, 18, 17, 16],
        },
      },
      purchaseDonut: {
        currentLabel: period,
        previousLabel: "Previous Period",
        currentPercent: 72,
      },
      purchaseVsConsumption: [
        { label: "Jan", purchase: 450000, consumption: 320000 },
        { label: "Feb", purchase: 520000, consumption: 410000 },
        { label: "Mar", purchase: 610000, consumption: 480000 },
        { label: "Apr", purchase: 580000, consumption: 510000 },
        { label: "May", purchase: 710000, consumption: 590000 },
        { label: "Jun", purchase: 840000, consumption: 680000 },
      ],
      pendingItems: [
        {
          id: 1,
          itemName: "MS Rod 16mm (BSRM)",
          category: "Rod",
          unit: "Ton",
          pendingQty: 25,
          requiredBy: "2026-10-15",
          status: "Pending Approval",
        },
        {
          id: 2,
          itemName: "Portland Cement CEM-II",
          category: "Cement",
          unit: "Bag",
          pendingQty: 300,
          requiredBy: "2026-10-18",
          status: "Pending PO",
        },
      ],
      overflowMaterial: [
        {
          id: 1,
          itemName: "1st Class Brick",
          project: "Rifat Eyecon City",
          excessQty: 1500,
          unit: "Pcs",
          action: "Transfer Recommended",
        },
      ],
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate dashboard metrics" },
      { status: 500 }
    );
  }
}
