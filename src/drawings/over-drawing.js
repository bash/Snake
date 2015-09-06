/**
 * (c) 2015 Ruben Schmidmeister <ruby@fog.im>
 */

import { Map } from '../entities/map';
import { Block } from '../entities/block';
import { RainbowGenerator } from '../rainbow-generator';

export class OverDrawing {
    /**
     *
     * @returns {Map}
     */
    static draw() {
        var map = new Map(20),
            generator = new RainbowGenerator();

        var x = 1,
            y = 7;

        // Draw the "O"
        map.obstacles.push(
            new Block(x, y + 1, generator.get()),
            new Block(x, y + 2, generator.get()),
            new Block(x, y + 3, generator.get()),
            new Block(x + 1, y + 4, generator.get()),
            new Block(x + 2, y + 4, generator.get()),
            new Block(x + 3, y + 3, generator.get()),
            new Block(x + 3, y + 2, generator.get()),
            new Block(x + 3, y + 1, generator.get()),
            new Block(x + 2, y, generator.get()),
            new Block(x + 1, y, generator.get())
        );

        x = x + 5;

        // Draw "V"
        map.obstacles.push(
            new Block(x, y, generator.get()),
            new Block(x, y + 1, generator.get()),
            new Block(x, y + 2, generator.get()),
            new Block(x, y + 3, generator.get()),
            new Block(x + 1, y + 4, generator.get()),
            new Block(x + 2, y + 4, generator.get()),
            new Block(x + 3, y + 3, generator.get()),
            new Block(x + 3, y + 2, generator.get()),
            new Block(x + 3, y + 1, generator.get()),
            new Block(x + 3, y, generator.get())
        );

        x = x + 5;

        // Draw "E"
        map.obstacles.push(
            new Block(x, y, generator.get()),
            new Block(x, y + 1, generator.get()),
            new Block(x, y + 2, generator.get()),
            new Block(x, y + 3, generator.get()),
            new Block(x, y + 4, generator.get()),
            new Block(x + 1, y + 4, generator.get()),
            new Block(x + 2, y + 4, generator.get()),
            new Block(x + 2, y, generator.get()),
            new Block(x + 1, y, generator.get()),
            // Midle parts
            new Block(x + 2, y + 2, generator.get()),
            new Block(x + 1, y + 2, generator.get())
        );

        x = x + 4;

        // Draw the "R"
        map.obstacles.push(
            new Block(x, y, generator.get()),
            new Block(x, y + 1, generator.get()),
            new Block(x, y + 2, generator.get()),
            new Block(x, y + 3, generator.get()),
            new Block(x, y + 4, generator.get()),
            new Block(x + 3, y + 4, generator.get()),
            new Block(x + 3, y + 3, generator.get()),
            new Block(x + 3, y + 1, generator.get()),
            new Block(x + 2, y, generator.get()),
            new Block(x + 1, y, generator.get()),

            // Midle parts
            new Block(x + 2, y + 2, generator.get()),
            new Block(x + 1, y + 2, generator.get())
        );

        return map;
    }
}