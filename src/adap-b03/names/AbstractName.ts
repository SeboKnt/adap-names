import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter) {
            this.delimiter = delimiter;
        } else {
            this.delimiter = DEFAULT_DELIMITER;
        }
    }

    abstract clone(): Name;

    abstract asString(): string;

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        const escapedComponents: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            let s = this.getComponent(i);
            s = s.split(ESCAPE_CHARACTER).join(ESCAPE_CHARACTER + ESCAPE_CHARACTER);
            s = s.split(DEFAULT_DELIMITER).join(ESCAPE_CHARACTER + DEFAULT_DELIMITER);
            escapedComponents.push(s);
        }
        return escapedComponents.join(DEFAULT_DELIMITER);
    }

    public isEqual(other: Name): boolean {
        return other.getHashCode() === this.getHashCode();
    }

    public getHashCode(): number {
        let hash = 0;
        const subj = this.asDataString();
        for (let i = 0; i < subj.length; i++) {
            // ASCII Unicode Wert
            const char = subj.charCodeAt(i);
            // "bitshift"
            hash = hash * 31 + char;
            // Begrenzung auf 32 Bit
            hash |= 0;
        }
        return hash;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
    }

}