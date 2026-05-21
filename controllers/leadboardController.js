const { prisma } = require("../lib/prisma")


async function addRecord(req, res) {
    const {id} = req.params
    const {time, name} = req.body
    const record = await prisma.record.create({
        data: {
            time: +time,
            gameId: id,
            name,
        }
    })

    res.json(record)
}

async function getAllRecord(req, res) {
    const records = await prisma.game.findMany({
        take: 3,
        include: {
            records: {
                orderBy: {
                    time: 'asc',
                },
                take: 10,
            }
        }
    })

    res.json(records)
}
module.exports = {
    addRecord,
    getAllRecord,
}