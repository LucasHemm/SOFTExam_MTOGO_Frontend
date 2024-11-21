import './App.css'
import {useEffect, useState} from "react";
import RestaurantOverview from './Components/RestaurantComponents/RestaurantOverview'



function App() {
const [user, setUser] = useState(null)


  return (
    <>
        <RestaurantOverview/>
    </>
  )
}

export default App
