import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        IllegalArgumentException.assert(delimiter.length === 1, "delimiter must be a single character");
        this.delimiter = delimiter;
        this.checkInvariant();
    }

    protected isProperlyMasked(s: string): boolean {
        for (let i = 0; i < s.length; i++) {
            if (s[i] === ESCAPE_CHARACTER) {
                if (i + 1 < s.length && (s[i + 1] === ESCAPE_CHARACTER || s[i + 1] === this.delimiter)) {
                    i++; // skip next
                } else {
                    return false; // lone escape
                }
            } else if (s[i] === this.delimiter) {
                return false; // unescaped delimiter
            }
        }
        return true;
    }

    abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        this.checkInvariant();
        IllegalArgumentException.assert(delimiter.length === 1, "delimiter must be a single character");
        // implementation in subclasses
        throw new Error("needs implementation or deletion");
    }

    public toString(): string {
        this.checkInvariant();
        return this.asDataString();
    }

    public asDataString(): string {
        this.checkInvariant();
        const escapedComponents: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            let s = this.getComponent(i);
            s = s.split(ESCAPE_CHARACTER).join(ESCAPE_CHARACTER + ESCAPE_CHARACTER);
            s = s.split(DEFAULT_DELIMITER).join(ESCAPE_CHARACTER + DEFAULT_DELIMITER);
            escapedComponents.push(s);
        }
        const result = escapedComponents.join(DEFAULT_DELIMITER);
        this.checkInvariant();
        return result;
    }

    public isEqual(other: Name): boolean {
        this.checkInvariant();
        IllegalArgumentException.assert(other != null, "other cannot be null");
        const result = other.getHashCode() === this.getHashCode();
        this.checkInvariant();
        return result;
    }

    public getHashCode(): number {
        this.checkInvariant();
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
        this.checkInvariant();
        return hash;
    }

    public isEmpty(): boolean {
        this.checkInvariant();
        const result = this.getNoComponents() === 0;
        this.checkInvariant();
        return result;
    }

    public getDelimiterCharacter(): string {
        this.checkInvariant();
        const result = this.delimiter;
        this.checkInvariant();
        return result;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        this.checkInvariant();
        
        if (other == null) {
            throw new IllegalArgumentException("other cannot be null");
        }

        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
        this.checkInvariant();
    }

    protected checkInvariant(): void {
        if (this.delimiter.length !== 1) {
            throw new InvalidStateException("delimiter must be a single character");
        }

        if (typeof this.delimiter !== "string") {
            throw new InvalidStateException("delimiter must be a string");
        }
    }
}