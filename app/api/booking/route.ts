import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, phone, email, service, date, address, notes } = body;

    if (!name || !phone || !service || !date || !address) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "bookings"), {
      name,
      phone,
      email:     email || "",
      service,
      date,
      address,
      notes:     notes || "",
      status:    "pending",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      id:      docRef.id,
      message: "Booking confirmed successfully",
    });

  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Purohit Baaje Booking API",
    status:  "active",
    version: "1.0.0",
  });
}