import styles from "./styles.module.css" assert { type: "css" }

export interface NodeProps {
    id: string;
    x: number;
    y: number;
    inputs: number;
    outputs: number;
    selected: boolean;
    onMouseDownNode?: (id: string, event: any) => void;
    onMouseDownOutput?: (outputPositionX: number, outputPositionY: number, nodeId: string, outputIndex: number) => void;
    onMouseEnterInput?: (inputPositionX: number, inputPositionY: number, nodeId: string, outputIndex: number) => void;
    onMouseLeaveInput?: (nodeId: string, inputIndex: number) => void;
}

export default class NodeComponent extends HTMLElement {
    props: NodeProps;
    constructor(props:NodeProps) {
        super();        
        this.props = props;
        this.render();
    }
    handleMouseDownOutput(ref: any, event: any, outputIndex: number) {
        // Disable drag node
        event.stopPropagation();

        const centerX =
            ref.getBoundingClientRect().left + Math.abs(ref.getBoundingClientRect().right - ref.getBoundingClientRect().left) / 2;
        const centerY =
            ref.getBoundingClientRect().top + Math.abs(ref.getBoundingClientRect().bottom - ref.getBoundingClientRect().top) / 2;

        this.props.onMouseDownOutput(centerX, centerY, this.props.id, outputIndex);
    }

    handleMouseEnterInput(ref: any, inputIndex: number) {
        const centerX =
            ref.getBoundingClientRect().left + Math.abs(ref.getBoundingClientRect().right - ref.getBoundingClientRect().left) / 2;
        const centerY =
            ref.getBoundingClientRect().top + Math.abs(ref.getBoundingClientRect().bottom - ref.getBoundingClientRect().top) / 2;

        this.props.onMouseEnterInput(centerX, centerY, this.props.id, inputIndex);
    }

    handleMouseLeaveInput(inputIndex: number) {
        this.props.onMouseLeaveInput(this.props.id, inputIndex);
    }

    render() {
        if(this.props){
            const node = document.createElement("div");
            node.className = this.props.selected ? "nodeSelected" : "node";
            node.style.transform = `translate(${this.props.x}px, ${this.props.y}px)`;
            node.onmousedown = (event: any) => {
                // Prevent click on board
                event.stopPropagation();

                this.props.onMouseDownNode(this.props.id, event);
            }
            const inputWrapper = document.createElement("div");
            inputWrapper.className = "inputsWrapper";
            [...Array(Number(this.props.inputs)).keys()].forEach(
                (_, index) => {
                    let inputRef: any = null;
                    let inputElement = document.createElement("div")
                    inputElement.className = "input";
                    inputElement.onmouseenter = (event: any) => {
                        this.handleMouseEnterInput(inputRef, index)
                    };
                    inputElement.onmouseleave = (event: any) => {
                        this.handleMouseLeaveInput(index)
                    };
                }
            );
            node.appendChild(inputWrapper);
            const outputWrapper = document.createElement("div");
            outputWrapper.className = "outputsWrapper";
            [...Array(Number(this.props.outputs)).keys()].forEach(
                (_, index) => {
                    let outputRef: any = null;
                    let outputElement = document.createElement("div")
                    outputElement.className = "output";
                    outputElement.onmousedown = (event: any) => {
                        this.handleMouseDownOutput(outputRef, event, index)
                    };
                    
                }
            );
            node.appendChild(outputWrapper);
                    
            this.innerHTML = `
                ${node.outerHTML}
            `
        }
    }
}


customElements.define('node-component', NodeComponent);