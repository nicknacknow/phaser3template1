class AnimationManager {
    constructor(scene, isOnPreload) {
        this.scene = scene;
        if (isOnPreload) {
            this.onPreload();
        }
    }

    onPreload() {
        // load all atlas
        this.scene.load.atlas("main", "/assets/sprites/atlas1.png", "/assets/sprites/atlas1_atlas.json");
    }

    onCreate(anims) {
        // load all animations
        anims.forEach(data => {
            this.scene.anims.create({
                key: data.key,
                frames: this.scene.anims.generateFrameNumbers("main", {
                    frames: data.frames
                }),
                frameRate: data.frameRate,
                //repeat: -1
            })
        });
    }
}

export default AnimationManager;