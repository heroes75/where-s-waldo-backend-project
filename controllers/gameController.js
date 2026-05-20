const { prisma } = require("../lib/prisma");

async function getAllGame(req, res) {
    const games = await prisma.game.findMany({
        take: 3,
    });

    res.json({ games });
}

async function getGame(req, res) {
    const { id } = req.params;

    const game = await prisma.game.findUnique({
        where: {
            id,
        },
        include: {
            names: {
                include: {
                    name: true,
                    gameId: false,
                    nameId: true,
                },
            },
        },
    });
    res.json({ game: { ...game, names: game.names.map((name) => name.name) } });
}

async function verifyTargets(req, res) {
    const r = 2.5;
    const { id } = req.params;
    const { x, y, nameId } = req.body;
    const target = await prisma.nameOnGame.findUnique({
        where: {
            nameId_gameId: {
                nameId: +nameId,
                gameId: id,
            },
        },
        omit: {
            gameId: true,
            nameId: true,
        },
        include: {
            name: {
                include: {
                    target: true,
                },
                omit: {
                    id: true,
                    name: true,
                    url: true,
                },
            },
        },
    });
    const [{ x: x0, y: y0 }] = target.name.target;
    const isHitTarget = (x - x0) ** 2 + (y - y0) ** 2 <= r * r;
    res.json({ isHitTarget });
}

module.exports = {
    getAllGame,
    getGame,
    verifyTargets,
};
