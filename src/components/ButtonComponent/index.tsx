import { ButtonBuilder, ClickOutside, DivBuilder } from "../../util/builder";

export interface ButtonsProps {
    showDelete: boolean;
    onClickAdd: (numberInputs: number, numberOutputs: number) => void;
    onClickDelete: () => void;
}

export default class ButtonComponent extends HTMLElement {
    private props: ButtonsProps;
    isOpen: boolean = false;
    numberInputs: number
    numberOutputs: number
    constructor(props: ButtonsProps) {
        super();
        this.props = props;
    }
    handleOnClickAdd(event: any) {
        event.stopPropagation();
        this.isOpen = true;
    }

    handleOnClickAddNode(event: any) {
        event.stopPropagation();

        // Validate number of inputs and outputs
        if (this.numberInputs > 4 || this.numberInputs < 0 || this.numberOutputs > 4 || this.numberOutputs < 0) return;

        this.isOpen = false;
        this.props.onClickAdd(this.numberInputs, this.numberOutputs);
        this.numberInputs = 0;
        this.numberOutputs = 0;
    }

    handleChangeNumberInputs(event: any) {
        this.numberInputs = event.target.value;
    }

    handleChangeNumberOutputs(event: any) {
        this.numberOutputs = event.target.value;
    }
    
    handleClickOutsideDropwdown() {
        this.isOpen = false;
        this.numberInputs = 0;
        this.numberOutputs = 0;
    }

    render(){
        this.className= "wrapperB"
        const buttonDelete = ButtonBuilder("delete-button", this.props.showDelete ? "buttonDelete" : "buttonDeleteHidden")
        buttonDelete.onclick = this.props.onClickDelete
        buttonDelete.innerHTML = `
        <svg
            fill="currentColor"
            stroke-width="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            style="overflow: visible;"
            >
            <path d="m170.5 51.6-19 28.4h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6h-93.7c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6 36.7 55H424c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8v304c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128h-8c-13.3 0-24-10.7-24-24s10.7-24 24-24h69.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128v304c0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32V128H80zm80 64v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0v208c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"></path>
        </svg>
        `;
        this.appendChild(buttonDelete);
        const buttonAdd = ButtonBuilder("add-button", "buttonAdd")
        buttonAdd.onclick = this.handleOnClickAdd

        const isOpen = DivBuilder("is-open", this.isOpen ? "dropdown" : "dropdownHidden")
        isOpen.addEventListener("click", (e) => { ClickOutside(isOpen, this.handleClickOutsideDropwdown)})
        isOpen.innerHTML = `
        <label class="label">Number of inputs</label>
        <input class="input" type="number" value=${this.numberInputs} onInput=${this.handleChangeNumberInputs}></input>
        <label class="label">Number of outputs</label>
        <input class="input" type="number" value=${this.numberOutputs} onInput=${this.handleChangeNumberOutputs}></input>
        <button class="buttonRect" onClick=${this.handleOnClickAddNode}>
            Add node
        </button>
        `
        this.appendChild(buttonAdd);
    
        this.appendChild(isOpen);
    }
}

customElements.define('button-component', ButtonComponent);