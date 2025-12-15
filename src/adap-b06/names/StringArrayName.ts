import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected readonly components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = [...source];
    }

    public clone(): Name {
        return new StringArrayName([...this.components], this.delimiter);;
    }

    // TODO
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i > this.components.length) {
            throw new IllegalArgumentException("index out of bounds");
        } 
        return this.components[i];
    }

    public setComponent(i: number, c: string): Name {
        if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("index out of bounds");
        }

        if (c === "") {
            throw new IllegalArgumentException("Component cannot be empty");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        const newComponents = [...this.components];
        newComponents[i] = c;
        return new StringArrayName(newComponents, this.delimiter);
    }

    public insert(i: number, c: string): Name {
        if (i < 0 || i > this.components.length) {
            throw new IllegalArgumentException("index out of bounds");
        }

        if (c === "") {
            throw new IllegalArgumentException("Component cannot be empty");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        const newComponents = [...this.components];
        newComponents.splice(i, 0, c);
        return new StringArrayName(newComponents, this.delimiter);
    }

    public append(c: string): Name {
        if (c === "") {
            throw new IllegalArgumentException("Component cannot be empty");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        const newComponents = [...this.components, c];
        return new StringArrayName(newComponents, this.delimiter);
    }

    public remove(i: number): Name {

        if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("index out of bounds");
        }

        const newComponents = [...this.components];
        newComponents.splice(i, 1);
        return new StringArrayName(newComponents, this.delimiter);
    }

    public concat(other: Name): Name {
        let result: Name = this;
        for (let i = 0; i < other.getNoComponents(); i++) {
            result = result.append(other.getComponent(i));
        }
        return result;
    }
}