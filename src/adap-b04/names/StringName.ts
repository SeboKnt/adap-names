import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {

        if (source === "") {
            throw new IllegalArgumentException("Component cannot be empty");
        }
        if (source === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        super(delimiter);
        this.name = source;
        this.noComponents = source === '' ? 0 : source.split(this.delimiter).length;

        this.checkInvariant();
        
    }

    public clone(): Name {

        this.checkInvariant();
        const result = new StringName(this.name, this.delimiter);
        
        if (!result) {
            throw new MethodFailedException("Component produced is null or empty");
        }

        if (!(result instanceof StringName)) {
            throw new MethodFailedException("Component produced is not of type StringName");
        }

        if (result.asString() !== this.asString()) {
            throw new MethodFailedException("Component produced is not equal to original");
        }

        this.checkInvariant();
        return result;
    }

    public asString(delimiter: string = this.delimiter): string {
        
        this.checkInvariant();
        IllegalArgumentException.assert(delimiter.length === 1, "delimiter must be a single character");
        let result: string;
        if (delimiter === this.delimiter) {
            result = this.name;
        } else {
            result = this.name.split(this.delimiter).join(delimiter);
        }

        if (!result) {
            throw new MethodFailedException("Component produced is null or empty");
        }

        this.checkInvariant();
        return result;
    }

    public getNoComponents(): number {
        this.checkInvariant();

        if (typeof this.noComponents !== "number") {
            throw new MethodFailedException("getNoComponents did not produce a number");
        }
        
        if (this.noComponents < 0) {
            throw new MethodFailedException("getNoComponents produced negative number");
        }

        this.checkInvariant();
        return this.noComponents;
    }

    public getComponent(i: number): string {
        this.checkInvariant();
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("index out of bounds");
        }

        const result = this.name.split(this.delimiter)[i];

        if (!result && result !== "") {
            throw new MethodFailedException("Could not get component properly");
        }

        this.checkInvariant();
        return result;
    }

    public setComponent(i: number, c: string) {
        this.checkInvariant();
        if (i < 0 || i > this.noComponents) {
            throw new IllegalArgumentException("index out of bounds");
        }
        if (c === "") {
            throw new IllegalArgumentException("Component cannot be empty");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        const comps = this.name.split(this.delimiter);
        comps[i] = c;
        this.name = comps.join(this.delimiter);  

        if (this.getComponent(i) !== c) {
            throw new MethodFailedException("Could not set component properly");
        }

        this.checkInvariant();
    }

    public insert(i: number, c: string) {
        this.checkInvariant();
        if (i < 0 || i > this.noComponents) {
            throw new IllegalArgumentException("index out of bounds");
        }
        if (c === "") {
            throw new IllegalArgumentException("Component cannot be empty");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        const comps = this.name.split(this.delimiter);
        comps.splice(i, 0, c);
        this.name = comps.join(this.delimiter);
        this.noComponents++;

        if (this.noComponents !== comps.length) {
            throw new MethodFailedException("Could not insert component properly");
        }
        this.checkInvariant();
        
    }

    public append(c: string) {

        this.checkInvariant();
        if (c === "") {
            throw new IllegalArgumentException("Component cannot be empty");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        const comps = this.name.split(this.delimiter);
        comps.push(c);
        this.name = comps.join(this.delimiter);
        this.noComponents++;

        if (this.noComponents !== comps.length) {
            throw new MethodFailedException("Could not append component properly");
        }

        this.checkInvariant();
        
    }

    public remove(i: number) {

        this.checkInvariant();
        if (i < 1 || i >= this.noComponents) {
            throw new IllegalArgumentException("index out of bounds");
        }
        
        const comps = this.name.split(this.delimiter);
        comps.splice(i, 1);
        this.name = comps.join(this.delimiter);
        this.noComponents--;

        let check = this.noComponents;

        if (this.noComponents !== check - 1) {
            throw new MethodFailedException("Could not remove component properly");
        }

        // TODO: is this necessary?
        if (this.noComponents === 0) {
            this.name = "";
        }

        this.checkInvariant();
    }

    protected checkInvariant(): void {

        super.checkInvariant();
        
        if (this.name === null) {
            throw new InvalidStateException("name is null");
        }

    }

}