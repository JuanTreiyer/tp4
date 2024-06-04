'use server'
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function CounterChanel() {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const channel = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
      },
      (payload) => {return (payload.new as number)}
    )
    .subscribe()
    return () => {  
        channel
        supabase.removeChannel(channel)
    }

}

export async function getCounterValue() {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const { data, error } = await supabase.from('counter').select('*');
    if (data) {
        return data[0] 
    } else {
        console.error("Error getting Category: ", error);
        return null;
    }
}

export async function incrementCounterValue(newValue: number | null) {
    const counterId = 1;
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const { data, error } = await supabase.from('counter').update({value: newValue}).eq('id',counterId);
    if (data) {
        return data[0] 
    } else {
        console.error("Error getting Category: ", error);
        return null;
    }
}