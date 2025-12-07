import { Node } from "./Node";
import { ServiceFailureException } from "../common/ServiceFailureException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public findNodes(bn: string): Set<Node> {
        try {
            let result = new Set<Node>();
            if (this.getBaseName() === bn) {
                result.add(this);
            }
            for (let child of this.childNodes) {
                let childResults = child.findNodes(bn);
                for (let node of childResults) {
                    result.add(node);
                }
            }
            return result;
        } catch (e) {
            if (e instanceof MethodFailedException) {
                throw new ServiceFailureException("findNodes failed", e.getTrigger());
            } else if (e instanceof InvalidStateException) {
                throw new ServiceFailureException("findNodes failed", e);
            } else {
                throw e;
            }
        }
        return new Set<Node>();
    }

}