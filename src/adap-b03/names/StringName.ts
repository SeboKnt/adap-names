import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = source === '' ? 0 : source.split(this.delimiter).length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        if (delimiter === this.delimiter) {
            return this.name;
        } 
        
        return this.name.split(this.delimiter).join(delimiter);
    }

    // Implemented in AbstractName
    //public asDataString(): string {
    //    throw new Error("needs implementation or deletion");
    //}

    // Implemented in AbstractName
    //public isEqual(other: Name): boolean {
    //    throw new Error("needs implementation or deletion");
    //}

    // Implemented in AbstractName
    //public getHashCode(): number {
    //    throw new Error("needs implementation or deletion");
    //}

    // Implemented in AbstractName
    //public isEmpty(): boolean {
    //    throw new Error("needs implementation or deletion");
    //}

    // Implemented in AbstractName
    //public getDelimiterCharacter(): string {
    //    throw new Error("needs implementation or deletion");
    //}

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        return this.name.split(this.delimiter)[i];
    }

    public setComponent(i: number, c: string) {
        const comps = this.name.split(this.delimiter);
        comps[i] = c;
        this.name = comps.join(this.delimiter);
    }

    public insert(i: number, c: string) {
        const comps = this.name.split(this.delimiter);
        comps.splice(i, 0, c);
        this.name = comps.join(this.delimiter);
        this.noComponents++;
    }

    public append(c: string) {
        const comps = this.name.split(this.delimiter);
        comps.push(c);
        this.name = comps.join(this.delimiter);
        this.noComponents++;
    }

    public remove(i: number) {
        const comps = this.name.split(this.delimiter);
        comps.splice(i, 1);
        this.name = comps.join(this.delimiter);
        this.noComponents--;

        if (this.noComponents === 0) {
            this.name = "";
        }
    }

}