const { prisma } = require("./lib/prisma");
const cloudinary = require("cloudinary").v2;

(async function populated() {
    cloudinary.config({
        cloud_name: "dlroxhny0",
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });

    console.log('start of populating')
    // const game = await prisma.game.create({
    //     data: {
    //         url: await cloudinary.url("level1-scene_aut0sq"),
    //         name: {
    //             create: {
    //                 data: [
    //                     {
    //                         name: 'Waldo',
    //                         url: await cloudinary.url("waldo", {
    //                             fetch_format: "auto",
    //                         }),
    //                         target: {
    //                             create: {
    //                                 x: 51.128,
    //                                 y: 49.852,
    //                                 nameId: 1
    //                             },
    //                         },
    //                     },
    //                     {
    //                         name: 'Odlaw',
    //                         url: await cloudinary.url('odlaw', {
    //                             fetch_format: 'auto',
    //                             quality: 'auto',
    //                         }),
    //                         target: {
    //                             create: {
    //                                 x: 24.511,
    //                                 y: 49.641,
    //                                 nameId: 2
    //                             }
    //                         }
    //                     },
    //                     {
    //                         name: 'Wizard',
    //                         url: await cloudinary.url('wizard'),
    //                         target: {
    //                             create: {
    //                                 x: 62.516,
    //                                 y: 49.308,
    //                                 nameId: 3
    //                             }
    //                         }
    //                     }
    //                 ],
    //             },
    //         },
    //     },
    // });

    const game = await prisma.game.create({
        data: {
            url: await cloudinary.url("level1-scene_aut0sq", {
                fetch_format: "auto",
                quality: "auto",
            }),
            names: {
                create: [
                    {
                        name: {
                            create: {
                                name: "Waldo",
                                url: await cloudinary.url("waldo"),
                                target: {
                                    create: {
                                        x: 51.128,
                                        y: 49.852,
                                    },
                                },
                            },
                        },
                    },
                    {
                        name: {
                            create: {
                                name: "Odlaw",
                                url: await cloudinary.url("odlaw"),
                                target: {
                                    create: {
                                        x: 24.511,
                                        y: 49.641,
                                    },
                                },
                            },
                        },
                    },
                    {
                        name: {
                            create: {
                                name: "Wizard",
                                url: await cloudinary.url("Wizard"),
                                target: {
                                    create: {
                                        x: 62.516,
                                        y: 49.308,
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        },
        include: {
            targets: true
        }
    });
    console.log('end of populating')

})();
