'use client'

import React, { useEffect, useState } from 'react';
import {CounterChanel, incrementCounterValue} from '../app/actions'
import {createClient} from '@/utils/supabase/client'
import { channel } from 'diagnostics_channel';
import { count } from 'console';

const supabase = createClient();

export default function Counter({counter}:{counter: Counter | null}) {
   // Definir el estado inicial del contador
   const [contador, setContador] = useState<Counter | null >(counter);

   useEffect(() => {
    const channel = supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
      },
      (payload) => {setContador( payload.new as Counter)}
    )
    .subscribe()
    return () => {
      supabase.removeChannel(channel);
    };

  
  }, []);

   // Función para incrementar el contador
   const incrementarContador = async () => {
    if (contador?.value == 0) {
      await incrementCounterValue(contador.value + 1);
      const { value, ...props } = contador
      setContador({ value: value + 1, ...props });
    }

    else if (contador?.value) {
      await incrementCounterValue(contador.value + 1);
      const { value, ...props } = contador
      setContador({ value: value + 1, ...props });
    }
  

     
   };
   
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
      <h2>Contador: {contador?.value}</h2>
      {/* Botón para incrementar el contador */}
      <button onClick={incrementarContador}>Incrementar</button>
    </div>
    </main>
  );
}
