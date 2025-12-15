import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected readonly name: string = "";
    protected readonly noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if (source === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        super(delimiter);
        this.name = source;
        this.noComponents = source === '' ? 0 : source === this.delimiter ? 1 : source.split(this.delimiter).length;

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

    public setComponent(i: number, c: string): Name {
        this.checkInvariant();
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("index out of bounds");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        const comps = this.name.split(this.delimiter);
        comps[i] = c;
        const newName = comps.join(this.delimiter);
        const result = new StringName(newName, this.delimiter);

        this.checkInvariant();
        return result;
    }

    public insert(i: number, c: string): Name {
        this.checkInvariant();
        if (i < 0 || i > this.noComponents) {
            throw new IllegalArgumentException("index out of bounds");
        }
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        const comps = this.name.split(this.delimiter);
        comps.splice(i, 0, c);
        const newName = comps.join(this.delimiter);
        const result = new StringName(newName, this.delimiter);

        this.checkInvariant();
        return result;
        
    }

    public append(c: string): Name {

        this.checkInvariant();
        if (c === null) {
            throw new IllegalArgumentException("Component cannot be null");
        }

        const newName = this.name === "" ? c : this.name + this.delimiter + c;
        const newNoComponents = this.noComponents + 1;
        const result = new StringName(newName, this.delimiter);

        this.checkInvariant();
        return result;
        
    }

    public remove(i: number): Name {

        this.checkInvariant();
        if (i < 0 || i >= this.noComponents) {
            throw new IllegalArgumentException("index out of bounds");
        }
        
        const comps = this.name.split(this.delimiter);
        comps.splice(i, 1);
        const newName = comps.join(this.delimiter);
        const result = new StringName(newName, this.delimiter);

        this.checkInvariant();
        return result;
    }

    public concat(other: Name): Name {
        this.checkInvariant();
        if (other === null) {
            throw new IllegalArgumentException("Other name cannot be null");
        }

        let result: Name = this;
        for (let i = 0; i < other.getNoComponents(); i++) {
            result = result.append(other.getComponent(i));
        }

        this.checkInvariant();
        return result;
    }

    protected checkInvariant(): void {

        super.checkInvariant();
        
        if (this.name === null) {
            throw new InvalidStateException("name is null");
        }

    }

}