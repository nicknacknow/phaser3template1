import CollisionManager from "./collisionManager.js";

class RoomManager {
    constructor(scene, isOnPreload) {
        this.scene = scene;
        this.walls = scene.add.layer(); this.walls.depth = 4;
        this.deco = scene.add.layer(); this.deco.depth = 3;
        this.decocollision = scene.add.layer(); this.decocollision.depth = 5;
        this.flooring = scene.add.layer();
        this.rooms = {};
        if (isOnPreload) {
            this.onPreload();
        }
    }

    loadRoom(roomName, sprite) {
        var roomData = this.rooms[roomName];
        for (const[key, v] of Object.entries(roomData)) {
            v.forEach(value => {
                var ts = this.createTileSprite(value[0], value[1], value[2], value[3], value[4], key);
                if (value[5] == true) {
                    this.collisionManager.GiveObjectCollision(sprite, ts);
                }
            });

        }
        this.collisionManager.CollideWithLayer(sprite, this.walls); // collide all walls
        this.collisionManager.CollideWithLayer(sprite, this.decocollision);
    }

    addRoom(roomName, roomData) {
        this.rooms[roomName] = roomData;
    }

    onPreload() {
        // load all atlas
        const scene = this.scene;
        scene.load.atlas("room", "/assets/sprites/room.png", "/assets/sprites/room_atlas.json");
        this.collisionManager = new CollisionManager(scene);

        const width = scene.game.renderer.width, height = scene.game.renderer.height;

        this.addRoom("Room1", {
            "walls": [
                // bedroom
                [width - 48 * 4, 0, 48 * 4, 48, "room_188"], // topRoomWall
                [width - 48 * 5, 0, 48, 48, "room_187"], // topRoomWallEdge
                [width - 48 * 4, 48, 48 * 4, 48, "room_205"], // roomWall
                [width - 48 * 5, 48, 48, 48, "room_204"], // roomWallEdge
                [width - 48 * 5, 48*4, 48, 48 * 2, "room_191"], // entranceWall
                // kitchen
                [width - 48 * 5, height - 48 * 7, 48 * 6, 48, "room_212"], // kitchenRoomWall
                [width - 48 * 6, height - 48 * 7, 48, 48, "room_211"], // kitchenRoomWallEdge
                // dining room
                [width - 48 * 9, height - 48 * 7, 48, 48, "room_213"], // diningRoomWallEdge
                [width - 48 * 12, height - 48 * 7, 48 * 3, 48, "room_205"], // diningRoomWall
                [width - 48 * 13, height - 48 * 7, 48, 48 * 6, "room_191"], // diningRoomSideWall
                [width - 48 * 13, height - 48, 48, 48, "room_211"], // diningRoomSideWall
                // main room
                [width - 48 * 6, 0, 48, 48, "room_189"], // topEdgeRoomWall
                [width - 48 * 6, 48, 48, 48, "room_206"], // edgeRoomWall
                    // window will be here.. will add later
                [width - 48 * 8, 0, 48 * 2, 48 * 2, "room_12"], // windowPlaceholder
                [width - 48 * 9, 0, 48, 48, "room_187"], // topEdgeWindowWall
                [width - 48 * 9, 48, 48, 48, "room_204"], // edgeWindowWall
                    // award wall will be here.. ill add later - html overlay for global stats? na
                [width - 48 * 17, 0, 48 * 8, 48 * 2, "room_250"]
            ],
            "flooring": [
                // carpet
                [0, 48 * 2, 48 * 12, 48 * 11, "room_328"], // mainCarpet
                [48, height - 48 * 2, 48 * 2, 48 * 2, "room_12"], // entranceCarpet
                // bedroom
                [width - 48 * 4, 0, 48 * 4, 48 * 6, "room_117"], // roomFloor
                [width - 48 * 5, 48 * 2, 48, 48 * 2, "room_117"], // roomFloorEntrance
                // kitchen
                [width - 48 * 6, height - 48 * 6, 48 * 6, 48 * 6, "room_182"], // kitchenFloor
                [width - 48 * 8, height - 48 * 7, 48 * 2, 48 * 7, "room_114"], // kitchenDiningRoomFloor
                // dining room
                [width - 48 * 12, height - 48 * 6, 48 * 4, 48 * 6, "room_294"], // diningRoomFloor
            ],
            "deco": [
                // dining room
                [width - 48 * 11, height - 48 * 5, 48 * 2, 48 * 4, "room_226", true], // diningRoomTable - true for collisions
                // bedroom
                [width - 48, 48 * 2, 48, 48, "room_87"], // rbed
                [width - 48 * 2, 48 * 2, 48, 48, "room_85"], // lbed
                [width - 48, 48 * 3, 48, 48, "room_111"], // bed1
                [width - 48 * 2, 48 * 3, 48, 48, "room_109"], // bed2
                // kitchen
                [width - 48 * 5, height - 48 * 6, 48 * 5, 48, "room_186"], // top
                [width - 48 * 4, height - 48 * 6, 48 * 2, 48, "room_154"], // sink
                [width - 48, height - 48 * 2, 48, 48 * 2, "room_186"] // bottom side
            ],
            "decocollision": [
                [width - 48, height - 48 * 4, 48, 48 * 2, "room_216"], // fridge
                [width - 48, height - 48 * 5, 48, 48, "room_125"], // side
                [width - 48 * 5, height - 48, 48 * 4, 48, "room_171"] // bottom
            ]
        });
    }

    createTileSprite(x,y,w,h,name, type) {
        var ts = this.scene.add.tileSprite(x,y,w,h, "room", name);
        ts.depth = 6;
        ts.originX = 0;
        ts.originY = 0;
        this.scene.physics.add.existing(ts, true);

        if (type) {
            this[type].add(ts);
        }

        return ts;
    }

    onCreate(sprite) {
        // use layers for walls, floors, deco etc
        // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Layer.html
        this.loadRoom("Room1", sprite.sprite);
    }
}

export default RoomManager;

/*

from room idea photo : remember tht walls tak up los of spce

collisions in layers:
https://www.youtube.com/watch?v=96kUkPgAiJA

*/