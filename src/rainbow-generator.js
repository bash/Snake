/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { Color } from "./color";

export class RainbowGenerator {
    /**
     *
     * @returns {string[]}
     */
    static get colors() {
        return [
            new Color('#D9361F', '#8C2214'), // Red
            new Color('#FE8B14', '#CC7010'), // Orange
            new Color('#F7D612', '#C4AA0E'), // Yellow
            new Color('#009444', '#007A38'), // Green
            new Color('#219EA9', '#1C868F'), // Bluegreen
            new Color('#214099', '#214099'), // Blue
            new Color('#7D3D95', '#7D3D95')  // Violet
        ];
    }

    constructor() {
        this.rewind();
    }

    rewind() {
        this.next = 0;
    }

    /**
     *
     * @returns {string}
     */
    get() {
        let color = RainbowGenerator.colors[this.next];

        this.next++;

        if (this.next === RainbowGenerator.colors.length) {
            this.rewind();
        }

        return color;
    }
}