import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = [...source];
    }

    public clone(): Name {
        return new StringArrayName([...this.components], this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
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
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    //  TODO
    public setComponent(i: number, c: string) {
        this.components[i] = c;
    }

    //  TODO
    public insert(i: number, c: string) {
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        this.components.push(c);
    }

    public remove(i: number) {
        this.components.splice(i, 1);
    }

    // Implemented in AbstractName
    //public concat(other: Name): void {
    //    throw new Error("needs implementation or deletion");
    //}
}