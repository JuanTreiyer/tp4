import { Database } from "@/lib/supabase.types";
declare global {
    type Counter = Database["public"]["Tables"]["counter"]["Row"];
    type inserCounter = Database["public"]["Tables"]["counter"]["Update"];
}