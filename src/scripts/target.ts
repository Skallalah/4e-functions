import { Actor4e } from "./actor";
import { Scene4e } from "./scene";

export class Target4e {
    static test() {
        const scene = Scene4e.getCurrent();

        console.log(scene);

        console.log(Scene4e.getCurrentScenesTokens())

        const actor = Actor4e.findActorByName("Grund Coeur-d'Ours");

        console.log(actor.system.abilities?.con?.mod)

        console.log(Actor4e.getTokensByName("Esprit Protecteur"))
    }

    static async selectTarget(token: Token, icon: string) {
        // @ts-ignore
        return new Portal()
            .color("#ffffff")
            .texture(icon)
            .origin(token)
            .pick();
    }

    static async teleportTokenTo(token: Token, target: Token, icon: string) {
        // @ts-ignore
        return new Portal()
            .color("#ffffff")
            .texture(icon)
            .origin(token)
            .setLocation(target)
            .teleport()
    }
}