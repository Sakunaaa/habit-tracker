import { supabaseClient } from "@/src/supabaseClient";
import { useEffect } from "react";

const fetchHabits = async () => {
	const { data: habits, error } = await supabaseClient.from('habits').select('*');
  console.log(habits)
};


export default function Home() {

  useEffect(() => {
    fetchHabits()
  
  }, [])
  
	return <main></main>;
}
