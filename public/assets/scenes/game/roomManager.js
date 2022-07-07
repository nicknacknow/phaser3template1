class RoomManager {
    constructor(scene, isOnPreload) {
        this.scene = scene;
        if (isOnPreload) {
            this.onPreload();
        }
    }

    onPreload() {
        // load all atlas
        this.scene.load.atlas("room", "/assets/sprites/room.png", "/assets/sprites/room_atlas.json");
    }

    createTileSprite(x,y,w,h,name) {
        var ts = this.scene.add.tileSprite(x,y,w,h, "room", name);
        ts.originX = 0;
        ts.originY = 0;
        return ts;
    }

    onCreate() {
        // use layers for walls, floors, deco etc
        // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Layer.html
        const scene = this.scene;
        const width = scene.game.renderer.width, height = scene.game.renderer.height;
        
        const walls = scene.add.layer();
        var roomWall = this.createTileSprite(width - 48 * 4, 0, 48 * 4, 48 * 2, "room_192");
        var roomWallEdge = this.createTileSprite(width - 48 * 5, 0, 48, 48 * 2, "room_191");
        
        walls.add([roomWall, roomWallEdge]);
        walls.depth = 5;

        const flooring = scene.add.layer();
        var roomFloor = this.createTileSprite(width - 48 * 4, 0, 48 * 4, 48 * 6, "room_117");
        var roomFloorEdge = this.createTileSprite(width - 48 * 5, 0, 48, 48 * 6, "room_116");

        flooring.add([roomFloor, roomFloorEdge]);
        
        // var test = scene.add.tileSprite(50, 50, 150, 150, "room", "room_182")
        // test.originX = 0;
        // test.originY = 0;
        // wallLayer.add([test]);
    }
}

export default RoomManager;

/*

from room idea photo : remember tht walls tak up los of spce

collisions in layers:
https://www.youtube.com/watch?v=96kUkPgAiJA

*/