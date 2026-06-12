const { prisma } = require("./lib/prisma");
const cloudinary = require("cloudinary").v2;

(async function populated() {
    cloudinary.config({
        cloud_name: "dlroxhny0",
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });

    console.log("start of populating");

    const game = await prisma.game.create({
        data: {
            url: await cloudinary.url("sKITQIw_eyv9ci", {
                fetch_format: "auto",
                quality: "auto",
            }),
            names: {
                create: [
                    {
                        x: 62.699,
                        y: 68.53,
                        name: {
                            connect: {
                                id: 8,
                            },
                        },
                    },
                    {
                        x: 23.289,
                        y: 62.398,
                        name: {
                            connect: {
                                id: 9,
                            },
                        },
                    },
                    {
                        x: 39.262,
                        y: 46.74,
                        name: {
                            connect: {
                                id: 10,
                            },
                        },
                    },
                    {
                        x: 79.442,
                        y: 29.285,
                        name: {
                            connect: {
                                id: 11,
                            },
                        },
                    },
                ],
            },
        },
    });

    // const targets = await prisma.targets.createManyAndReturn({
    //     data: [
    //         {
    //         x: 24.511,
    //         y: 49.641,
    //         nameId:  9,
    //         gameId: 'cmpeul32y0000yyud7tymzxse',

    //     },
    //     {
    //         x: 62.516,
    //         y: 49.308,
    //         nameId: 10,
    //         gameId: 'cmpeul32y0000yyud7tymzxse',

    //     }
    // ]
    // })
    // console.log('games:', games[0].names.map(name => name.name))
    console.log("end of populating");
})();
