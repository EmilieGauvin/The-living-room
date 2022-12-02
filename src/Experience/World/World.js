import Experience from "../Experience";
import LivingRoom from "./LivingRoom";
import Background from './Background';


export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.camera = this.experience.camera.instance
        this.time = this.experience.time
        this.renderer = this.experience.renderer
        this.resources = this.experience.resources

        this.resources.on('ready', () => {
            this.livingRoom = new LivingRoom()
            this.background = new Background()
        })
    }

    update() {
        if (this.livingRoom) this.livingRoom.update()
    }
}





