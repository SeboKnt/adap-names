import { M } from "vitest/dist/chunks/reporters.d.BFLkQcL6";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException }  from "../common/MethodFailedException";
import { ServiceFailureException } from "../common/ServiceFailureException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    public move(to: Directory): void {
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        const originalBaseName = this.baseName;
        const bn = this.doGetBaseName();
        
        if(bn !== originalBaseName){
            throw new MethodFailedException("BaseNames are not the same", new InvalidStateException("BaseNames are not the same"));
        }

        if (!(this.parentNode === this)) {
            InvalidStateException.assert(bn.length > 0, "basename cannot be empty");
        }

        return bn;
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        
        if(bn == null){
            throw new MethodFailedException("Base cannot be null", new IllegalArgumentException("Base cannot be null"));
        }

        try {
            let result = new Set<Node>();
            if (this.getBaseName() === bn) {
                result.add(this);
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
