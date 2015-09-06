/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

export class RainbowGenerator {
    /**
     *
     * @returns {string[]}
     */
    static get colors() {
        return [
            '#F03B23', // Red
            '#FE8B14', // Orange
            '#F7D612', // Yellow
            '#009444', // Green
            '#219EA9', // Bluegreen
            '#214099', // Blue
            '#7D3D95'  // Violet
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