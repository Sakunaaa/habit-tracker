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
    if (error) {
      setError(error.message)
    }
  };
  
  useEffect(() => {
    fetchHabits()
  
  }, [])

  const toggleHabit = async (currentHabit) => {
    const { data, error } = await supabaseClient
  .from('habits')
  .update({ is_done: !currentHabit.is_done })
  .eq('id', currentHabit.id)
  }
  
	return <main>
    {error && <span>{error}</span>}
    {isLoading && <span>Loading...</span>}
    {habits.map(habit => <li key={habit.id}><span>{habit.content}</span> <button onClick={() => {toggleHabit(habit)}}>{`${habit.is_done}`}</button> </li>)}
  </main>;
}
