import IMAGES from "../../assets/dashboard/sidebar/"


export const sidebarItems = [

    {
        id: 1,
        route:"/user/dashboard",
        title: "Dashboard",
        icon: IMAGES.MENU,
        active: true
    },

    {
        id: 2,
        route:"/user/crops",
        title: "Crop Management",
        icon: IMAGES.PLANT,
        active: false
    },

    {
        id: 3,
        route:"/user/dashboard",
        title: "Livestock Management",
        icon: IMAGES.LIVESTOCK,
        active: false
    },

    {
        id: 4,
        route:"/user/inventory",
        title: "Inventory",
        icon: IMAGES.INVENTORY,
        active: false
    },

]

export const sidebarItems_settings = [

    {
        id: 1,
        route:"/user/dashboard",
        title: "Settings",
        icon: IMAGES.SETTINGS,
        active: false
    },

    {
        id: 2,
        route:"/view-post",
        title: "Community",
        icon: IMAGES.COMMUNITY,
        active: false
    },

    {
        id: 3,
        route:"/user/dashboard",
        title: "Notifications",
        icon: IMAGES.NOTIFICATIONS,
        active: false
    },

    {
        id: 4,
        route:"/user/profile",
        title: "My Profile",
        icon: IMAGES.PROFILE,
        active: false
    },

    {
        id: 5,
        route:"/logout",
        title: "Logout",
        icon: IMAGES.LOGOUT,
        active: false
    },



]