import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

/**
 * GET /api/applications
 * Returns all internship applications, newest first
 */


export async function GET() {
  const response = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (response.error) {
    return NextResponse.json(
      { message: "Failed to fetch applications" },
      { status: 500 }
    );
  }

  return NextResponse.json(response.data);
}

/**
 * POST /api/applications
 * Creates a new internship application
 */


export async function POST(req: Request) {
  const payload = await req.json();

  const { company, role, status, notes } = payload;

  const response = await supabase.from("applications").insert({
    company,
    role,
    status,
    notes,
  });

  if (response.error) {
    return NextResponse.json(
      { message: "Failed to create application" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Application created successfully" },
    { status: 201 }
  );
}

/**
 * DELETE /api/applications
 * Deletes an application by ID
 */


export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { message: "Application ID is required" },
      { status: 400 }
    );
  }

  const response = await supabase
    .from("applications")
    .delete()
    .eq("id", id);

  if (response.error) {
    return NextResponse.json(
      { message: "Failed to delete application" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Application deleted successfully" },
    { status: 200 }
  );
}
