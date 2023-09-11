export class ListItem {
    constructor(item, owner) {
        this.dataitem = item;
        this.parag = null;
        this.img = null;
        this.div = null;
        this.owner = owner;
    }
    #onmouseenter(event) {
        this.div.style.border = "1px solid #0000ff";
    }
    #onmouseleave(event) {
        if (this.owner.curItem != this)
            this.div.style.border = "0px";
    }
    #onmouseclick(event) {
        if (this.owner.curItem && this.owner.curItem != this)
            this.owner.curItem.div.style.border = "0px";
        this.div.style.border = "1px solid #0000ff";
        this.owner.curItem = this;
    }
    #creatediv() {
        if (this.div == null) {
            this.div = document.createElement("div");
            let style = this.div.style;
            style.padding = "5px";
            style.width = this.owner.Setting.itemwidth + "px";
            style.height = this.owner.Setting.itemheight + "px";
            style.boxSizing = "border-box";
            style.textAlign = "center";
            this.div.addEventListener("mouseenter", this.#onmouseenter.bind(this));
            this.div.addEventListener("mouseleave", this.#onmouseleave.bind(this));
            this.div.addEventListener("click", this.#onmouseclick.bind(this));
        }
    }
    #createimg() {
        if (this.img == null) {
            this.img = document.createElement("img");
            this.img.src = this.dataitem.img;
            this.img.style.height = `${this.owner.Setting.itemheight - 30}px`;
        }
    }
    #createparag() {
        if (this.parag == null) {
            this.parag = document.createElement("p");
            this.parag.innerText = this.dataitem.text;
            this.parag.style.marginTop = "0px";
            this.parag.style.color = this.owner.Setting.color;
            this.parag.style.height = "20px";
        }
    }
    Create() {
        if (this.dataitem == null)
            return false;
        if (this.dataitem.text == null || this.dataitem.text == undefined)
            return false;
        if (this.dataitem.img == null || this.dataitem.img == undefined)
            return false;
        this.#creatediv();
        this.#createimg();
        this.div.appendChild(this.img);
        this.#createparag();
        this.div.appendChild(this.parag);
        return true;
    }
}
export class ListBox {
    #Items;
    Setting = {
        itemwidth: 100,
        itemheight: 100,
        color: '#ffffff'
    }
    constructor() {
        this.container = null;
        this.#Items = [];
        this.curItem = null;
    }
    Create() {
        if (this.container == null) {
            this.container = document.createElement("div");
            this.container.style.display = "flex";
            this.container.style.flexWrap = "wrap";
            this.container.style.alignContent = "flex-start";
        }
        return true;
    }
    AddItem(item) {
        let newitem = new ListItem(item, this);
        if (newitem.Create()) {
            this.#Items.push(newitem);
            this.container.appendChild(newitem.div);
            return newitem;
        }
        return null;
    }
}