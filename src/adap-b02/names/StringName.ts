import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.delimiter = delimiter || DEFAULT_DELIMITER;
        this.name = source;
        if (this.name === "") {
            this.noComponents = 0;
        } else {
            this.noComponents = this.name.split(this.delimiter).length;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        if (delimiter === this.delimiter) {
            return this.name;
        } 
        
        return this.name.split(this.delimiter).join(delimiter);
    }

    public asDataString(): string {
        if (this.noComponents === 0) return "";
        return this.name.replace(/\\/g, '\\\\').replace(/\./g, '\\.');
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        const components = this.name.split(this.delimiter);
        return components[i];
    }

    public setComponent(i: number, c: string): void {
        const components = this.name.split(this.delimiter);
        components[i] = c;
        this.name = components.join(this.delimiter);
    }

    public insert(i: number, c: string): void {
        const components = this.name.split(this.delimiter);
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents++;
    }

    public append(c: string): void {
        if (this.name === "") {
            this.name += c;
        } else {
            this.name += this.delimiter + c;
        }
        this.noComponents++;
    }

    public remove(i: number): void {
        const components = this.name.split(this.delimiter);
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        this.noComponents--;

        if (this.noComponents === 0) {
            this.name = "";
        }
    }

    public concat(other: Name): void {
        const otherStr = (other as StringName).name;
        if (otherStr !== "") {
            this.name += (this.name === "" ? "" : this.delimiter) + otherStr;
            this.noComponents += (other as StringName).noComponents;
        }
    }

}