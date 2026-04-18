import { db } from "./config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface BookingData {
  name:     string;
  phone:    string;
  email:    string;
  service:  string;
  date:     string;
  address:  string;
  notes?:   string;
}

export async function createBooking(data: BookingData) {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...data,
      status:    "pending",
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Booking error:", error);
    return { success: false, error };   
  }
}