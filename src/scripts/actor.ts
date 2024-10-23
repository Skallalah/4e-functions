import { Scene4e } from "./scene";

export class Actor4e {
    static findActorByName(name: string) {
        return game.actors.getName(name);
    }

    static findTokenByName(name: string) {
        return Scene4e.getCurrentScenesTokens().find(token => token.name === name);
    }

    static getTokensByName(name: string) {
        return Scene4e.getCurrentScenesTokens().filter(token => token.name === name);
    }
}