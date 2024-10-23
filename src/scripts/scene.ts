export class Scene4e {
    static getCurrent() {
        return game.scenes.current;
    }

    static getCurrentScenesTokens() {
        const scene = this.getCurrent()

        if (!scene) return [];

        return scene.tokens.map(t => t);
    }

    static isAtSameLocation(token: TokenDocument, x: number, y: number) {
        const tokenTrueAxis = canvas?.grid?.getCenter(token.x, token.y);
        const targetTrueAxis = canvas?.grid?.getCenter(x, y);

        if (tokenTrueAxis && targetTrueAxis) return (tokenTrueAxis[0] == targetTrueAxis[0]) && (tokenTrueAxis[1] == targetTrueAxis[1]);

        return false;
    }

    static getTokenAtLocation(x: number, y: number) {
        return this.getCurrentScenesTokens().find(t => this.isAtSameLocation(t, x, y));
    }

    static measureDistance(token: TokenDocument, target: TokenDocument) {
        const distance = canvas?.grid?.measureDistance(token, target);

        return distance !== undefined ? distance : 999999;
    }

    static isAdjacent(token: TokenDocument, target: TokenDocument) {
        return (
            this.measureDistance(token, target) <= 1.5 &&
            target.name !== token.name
        );
    }

    static getAdjacentTokens(targetToken: TokenDocument, disposition: number) {
        return this.getCurrentScenesTokens().filter((token) =>
            (token as any).disposition === disposition && this.isAdjacent(targetToken, token)
        );
    }
}