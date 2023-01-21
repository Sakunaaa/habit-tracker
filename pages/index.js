import { supabaseClient } from "@/src/supabaseClient";
import { useEffect, useState } from "react";



export default function Home() {
  const [habits, setHabits] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchHabits = async () => {
    setIsLoading(true)
    const { data: habits, error } = await supabaseClient.from('habits').select('*');
    setHabits(habits)
    setIsLoading(false)
    if (error.message) {
      setError(error.message)
    }
  };
  
  useEffect(() => {
    fetchHabits()
  
  }, [])
  
	return <main>
    {error && <span>{error}</span>}
    {isLoading && <span>Loading...</span>}
    {habits.map(habit => <li key={habit.id}>{habit.content}</li>)}
  </main>;
}
