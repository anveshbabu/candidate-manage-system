export const MENU = [
    // {
    //     title: "CORE",
    //     menuItems: [{
    //         icon: 'fa-solid fa-chart-line',
    //         text: 'Dashboard',
    //         subMenu: [
    //             {
    //                 icon: '',
    //                 text: 'Defualt',
    //             }, {
    //                 icon: '',
    //                 text: 'Performance',
    //             }, {
    //                 icon: '',
    //                 text: 'Train',
    //             }
    //         ]
    //     }

    //     ]


    // },
    {
        // title: "Models",
        menuItems: [
            {
                icon: 'fa-solid fa-chart-line',
                text: 'Dashboard',
                url: "/dashboard",
                userType:[1,2]
            },
            {
                icon: 'fa-solid fa-users',
                text: 'candidate',
                url: "/candidate",
                userType:[1,2]
            },
            {
                icon: 'fa-solid fa-book-open-reader',
                text: 'courses',
                url: "/course",
                userType:[1,2]
            },
            {
                icon: 'fa-solid fa-chalkboard-user',
                text: 'Batches',
                url: "/batche",
                userType:[1,2]
            },
            {
                icon: 'fa-solid fa-user',
                text: 'User',
                url: "/user",
                userType:[1,2]
                
            },
            {
                icon: 'fa-solid fa-file-invoice-dollar',
                text: 'Accounts',
                url: "/accounts",
                userType:[1]
            }

        ]

    },
    // {
    //     title: "SUPPORT",
    //     menuItems: [
    //         {
    //             icon: 'fa-brands fa-youtube',
    //             text: 'Guides & Tutorials',
    //         },
    //         {
    //             icon: 'fa-solid fa-tv',
    //             text: 'Api Reference',
    //         },
    //         {
    //             icon: 'fa-solid fa-headset',
    //             text: 'Help Center',
    //         }

    //     ]

    // },


]
