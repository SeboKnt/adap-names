import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

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

    public setComponent(i: number, c: string) {
        if (i < 0 || i > this.components.length) {
            throw new IllegalArgumentException("index out of bounds");
        }

        if (c === "") {
            throw new IllegalArgumentException("Component cannot be empty");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        if (i < 0 || i > this.components.length) {
            throw new IllegalArgumentException("index out of bounds");
        }

        if (c === "") {
            throw new IllegalArgumentException("Component cannot be empty");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        let check = this.components.length;

        this.components.splice(i, 0, c);

        if (this.components.length !== check + 1) {
            throw new MethodFailedException("Could not insert component properly");
        }
    }

    public append(c: string) {
        if (c === "") {
            throw new IllegalArgumentException("Component cannot be empty");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        let check = this.components.length;
        this.components.push(c);

        if (this.components.length !== check + 1) {
            throw new MethodFailedException("Could not append component properly");
        }
    }

    public remove(i: number) {

        if (i < 0 || i >= this.components.length) {
            throw new IllegalArgumentException("index out of bounds");
        }

        let check = this.components.length;
        this.components.splice(i, 1);

        if (this.components.length !== check - 1)  {
            throw new MethodFailedException("Could not remove component properly");
        }
    }
}