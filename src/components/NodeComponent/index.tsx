import "./styles.module.css";

export interface Props {
    ref?: any;
    x: number;
    y: number;
    selected: boolean;
    actions?: { delete?: boolean };
    label?: string;
    content: any;
    inputs: number;
    outputs: number;
    onNodeMount: (inputs: { offset: { x: number; y: number } }[], outputs: { offset: { x: number; y: number } }[]) => void;
    onMouseDown?: (event: any) => void;
    onMouseDownOutput?: (outputIndex: number) => void;
    onMouseUpInput?: (inputIndex: number) => void;
    onClickOutside?: () => void;
    onClickDelete?: () => void;
}

export default class NodeComponent extends HTMLElement {
    props: Props;
    private inputRefs: [...Array<HTMLElement>]
    private outputRefs: [...Array<HTMLElement>]
    constructor(props:Props) {
        super();
        this.props = props;
        this.onNodeMount();

        this.render();
    }
    onNodeMount(){
        this.inputRefs = [...Array(this.props.inputs)];
        this.outputRefs = [...Array(this.props.outputs)];
        let inputs: { offset: { x: number; y: number } }[] = [];
        let outputs: { offset: { x: number; y: number } }[] = [];

        for (let i = 0; i < this.inputRefs.length; i++) {
            alert(this.inputRefs.length)
            inputs.push({ offset: { x: this.inputRefs[i].getBoundingClientRect().x, y: this.inputRefs[i].getBoundingClientRect().y } });
        }

        for (let i = 0; i < this.outputRefs.length; i++) {
            outputs.push({ offset: { x: this.outputRefs[i].getBoundingClientRect().x, y: this.outputRefs[i].getBoundingClientRect().y } });
        }
        
    }
    clickOutside(el: any, accessor: any) {
        const onClick = (e: any) => {
            if (!el.contains(e.target)) {
                accessor()?.();
            }
        };
        document.body.addEventListener("click", onClick);
        document.body.removeEventListener("click", onClick)
    }

    render() {
        const element = (<div
            ref={this.props.ref}
            class={this.props.selected ? "nodeSelected" : "node"}
            style={{ transform: `translate(${this.props.x}px, ${this.props.y}px)` }}
            onMouseDown={this.props.onMouseDown}
            use:clickOutside={() => this.props.onClickOutside()}
        >
            <div class={this.props.selected ? "actions" : "actionsHidden"}>
                {this.props.actions && this.props.actions.delete && (
                    <svg
                        class={"delete"}
                        onClick={() => {
                            if (this.props.onClickDelete) this.props.onClickDelete();
                        }}
                        fill="currentColor"
                        stroke-width="0"
                        baseProfile="tiny"
                        version="1.2"
                        viewBox="4 4 16 16"
                        style="overflow: visible;"
                    >
                        <path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293a.999.999 0 11-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 01-1.414 0 .999.999 0 010-1.414L10.586 12 8.293 9.707a.999.999 0 111.414-1.414L12 10.586l2.293-2.293a.999.999 0 111.414 1.414L13.414 12l2.293 2.293z"></path>
                    </svg>
                )}
            </div>
            {this.props.label && <span class={"nodeLabel"}>{this.props.label}</span>}
            <div class={"nodeContent"}>{this.props.content}</div>
            {this.props.inputs > 0 && (
                <div class={"nodeInputs"}>
                    {[...Array(this.props.inputs).keys()].forEach(function (value, i) {
                        <div
                        ref={(ref: any) => {
                            this.inputRefs[i] = ref;
                        }}
                        class={"nodeInput"}
                        onMouseDown={(event: any) => {
                            event.stopPropagation();
                        }}
                        onMouseUp={(event: any) => {
                            event.stopPropagation();
                            if (this.props.onMouseUpInput) this.props.onMouseUpInput(i);
                        }}
                    ></div>
                    })}                    
                </div>
            )}
            {this.props.outputs > 0 && (
                <div id="outputs" class={"nodeOutputs"}>
                    {[...Array(this.props.outputs).keys()].forEach(function(value, i){
                        <div
                        ref={(ref: any) => {
                            this.outputRefs[i] = ref;
                        }}
                        class={"nodeOutput"}
                        onMouseDown={(event: any) => {
                            event.stopPropagation();
                            if (this.props.onMouseDownOutput) this.props.onMouseDownOutput(i);
                        }}
                    ></div>
                    })}                    
                </div>
            )}
        </div>)
        this.innerHTML = `
            ${element.outerHTML}
        `
    }
}


customElements.define('node-component', NodeComponent);