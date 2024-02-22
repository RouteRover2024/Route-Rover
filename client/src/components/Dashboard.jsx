import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Clock3,
  BarChart2,
  ArrowRightLeft,
  HelpCircleIcon
} from "lucide-react";

const Dashboard = () => {

  const navLinks = [
    {
      name: "Dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Activity",
      icon: Clock3
    },
    {
      name: "Analytic",
      icon: BarChart2
    },
    {
      name: "Transactions",
      icon: ArrowRightLeft
    },
    {
      name: "HelpCenter",
      icon: HelpCircleIcon
    }
  ]



  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/sucess", { withCredentials: true });

      console.log("response", response)
    } catch (error) {
      navigate("*")
    }
  }


  useEffect(() => {
    getUser()
  }, [])
  return (
    <div style={{ textAlign: "center" }}>
      <div className='px-10 py-12 flex flex-col border-r-1 w-1/5 h-screen'>
        {/* <div className="logo-div flex space-x-3 items-center">
          <img
            src="src\assets\RouteRoverLogoText.svg"
            alt="logo"
            className="h-8"
          />
        </div> */}

        <div className="mt-9 flex flex-col space-y-8">
          {navLinks.map((item, index) => <div key={index}>
            <item.icon />
            <span>{item?.name}</span>
          </div>)}

        </div>
      </div>
    </div>
  )
}






export default Dashboard