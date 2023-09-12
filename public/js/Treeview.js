export class TreeNode {
    #dataitem;
    constructor(item, owner, tree, ischild = false) {
        this.#dataitem = item;
        this.owner = owner;
        this.li = null;
        this.ul = null;
        this.ischild = ischild;
        this.haschildren = false;
        this.symbol = null;
        this.bextend = false;
        this.selected = false;
        this.tree = tree;
    }
    #mouseenter(event) {
        this.li.style.backgroundColor = '#f500f5';
        if (this.ischild) {
            if (!this.owner.selected)
                this.owner.li.style.backgroundColor = '';
        }
    }
    #mouseleave(event) {
        if (!this.selected)
            this.li.style.backgroundColor = '';
        event.stopPropagation();
    }
    #mouseclick(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.tree.curNode != this) {
            this.li.style.backgroundColor = '#f500f5';
            this.selected = true;
            if (this.ischild) {
                this.owner.li.style.backgroundColor = '';
                this.owner.selected = false;
            }
            if (this.tree.curNode) {
                this.tree.curNode.li.style.backgroundColor = '';
                this.tree.curNode.selected = false;
            }
            this.tree.curNode = this;
        }
    }
    #mousedbclick(event) {
        if (this.haschildren) {
            let style = this.ul.style;
            this.bextend = !this.bextend;
            style.display = this.bextend ? 'block' : 'none';
            style.paddingLeft = this.bextend ? `${this.symbol.offsetWidth}px` : '0px';
            this.symbol.textContent = this.bextend ? '-' : '+';
        }
        event.preventDefault();
        event.stopPropagation();
    }
    #createCollapsed() {
        if (this.symbol)
            return;
        const symbol = document.createElement('span');
        symbol.style.marginRight = '5px';
        symbol.textContent = '+';
        this.symbol = symbol;
        this.li.insertBefore(symbol, this.li.firstChild);
    }
    create() {
        if (this.li)
            return false;
        var li = document.createElement("li");
        this.li = li;
        li.className = "treeview-item";
        li.innerHTML = this.#dataitem.text;

        li.style.cursor = "default";
        li.style.caretColor = 'transparent';
        li.style.userSelect = 'none';
        li.addEventListener('mouseenter', this.#mouseenter.bind(this));
        li.addEventListener('mouseout', this.#mouseleave.bind(this));
        li.addEventListener('click', this.#mouseclick.bind(this));
        li.addEventListener("dblclick", this.#mousedbclick.bind(this));
        li.addEventListener("mouseover", this.#mouseenter.bind(this));
        return true;
    }
    addSubNode(item) {
        if (this.ul == null) {
            var childul = document.createElement("ul");
            childul.style.listStyleType = "none";
            childul.style.display = "none";
            childul.style.left = "0px";
            childul.style.top = "100%";
            childul.style.backgroundColor = "#ffffff";
            this.li.appendChild(childul);
            this.ul = childul;
        }

        let childnode = new TreeNode(item, this, this.tree, true);
        if (childnode.create()) {
            this.ul.appendChild(childnode.li);
            this.#createCollapsed();
            this.haschildren = true;
            return childnode;
        }
        return null;
    }
}
export class Treeview {
    constructor(parentid) {
        this.parentid = parentid;
        this.ul = null;
        this.curNode = null;
    }
    #onclick(event) {
        // if (event.treeNode != undefined && event.treeNode != null) {
        //     if (this.curNode != event.treeNode && this.curNode != null) {
        //         this.curNode.selected = false;
        //         this.curNode.li.style.backgroundColor = "";
        //     }
        //     this.curNode = event.treeNode;
        // }
    }
    #createul() {
        if (this.parentid != "") {
            var parent = document.getElementById(this.parentid);
            var rootul = document.createElement("ul");
            rootul.className = "treeview";
            rootul.style.listStyleType = "none";
            rootul.style.margin = "0px";
            rootul.style.padding = "0px";
            rootul.style.backgroundColor = "#ffffff";
            rootul.addEventListener("click", this.#onclick.bind(this));
            parent.appendChild(rootul);
            this.ul = rootul;
        }
    }
    create() {
        this.#createul();
    }
    addNode(item) {
        let node = new TreeNode(item, this, this);
        if (node.create()) {
            this.ul.appendChild(node.li);
            return node;
        }
        return null;
    }
}