const { prisma } = require("./lib/prisma");
const cloudinary = require("cloudinary").v2;

(async function populated() {
    cloudinary.config({
        cloud_name: "dlroxhny0",
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });

    console.log('start of populating')
    
        
    const game = await prisma.game.create({
        data: {
            url: await cloudinary.url('level2-scene_con9l9', {
                fetch_format: 'auto',
                quality: 'auto',
            }),
            names: {
                create: [
                    {
                        x: 90.009,
                        y: 6.313,
                        name: {
                            connect: {
                                id: 8
                            }
                        }
                    },
                    {
                        x: 91.834,
                        y: 57.848,
                        name: {
                            connect: {
                                id: 9
                            }
                        }
                    },
                    {
                        x: 29.440,
                        y: 40.673,
                        name: {
                            connect: {
                                id: 10
                            }
                        }
                    },
                    {
                        x: 28.134,
                        y: 66.568,
                        name: {
                            create: {
                                name: 'Wenda',
                                url: await cloudinary.url('Wenda', {
                                    fetch_format: 'auto',
                                    quality:'auto'
                                })
                            }
                        }
                    }
                ]
            }
        }
    })

    

    

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
    console.log('end of populating')

})();
