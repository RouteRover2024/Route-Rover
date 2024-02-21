import React from "react";
import {
    LayoutDashboard,
    Clock3,
    BarChart2,
    ArrowRightLeft,
    HelpCircleIcon,
} from "lucide-react";
import icon from "../../images/RouteRoverLogoText.svg";

const navLinks = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Activity",
        icon: Clock3,
    },
    {
        name: "Analytic",
        icon: BarChart2,
    },
    {
        name: "Transactions",
        icon: ArrowRightLeft,
    },
    {
        name: "HelpCenter",
        icon: HelpCircleIcon,
    },
];

function NavbarAfter() {
    return (
        <div className="px-10 py-12 flex flex-col border-r-1 w-1/5 h-screen">
            <div className="logo-div flex space-x-3 items-center">
                <img src={icon} alt="logo" className="h-8" />
            </div>

            <div className="mt-9 flex flex-col space-y-8">
                {navLinks.map((item, index) => (
                    <div key={index} className="flex space-x-4">
                        <item.icon />
                        <span>{item?.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NavbarAfter;
