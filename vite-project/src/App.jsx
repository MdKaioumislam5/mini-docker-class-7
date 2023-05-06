import { useState, useEffect } from 'react'


function App() {
  const [loading, setLoading] = useState(false)
  const [lastTime, setLastTime] = useState("");

  useEffect(() => {
    if(loading){
      fetch("/api/get/lasttime").then(async (data) => {
        const jsonData = await data.json();
        setLastTime(jsonData.get);
      })
    }
  }, [loading])

  const saveTimeToServer = async function() {
    setLoading(true);
    fetch(`/api/set/lasttime/${Date.now()}`).then(async (data) => {
      await data.json();
      setLoading(false);
    });
  };

  return (
    <>
      <p>{lastTime || "Not Synced Yet"}</p>
      <button onClick={saveTimeToServer}>Sync The Time</button>
    </>
  )
}

export default App
