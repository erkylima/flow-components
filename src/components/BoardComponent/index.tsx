import { DivBuilder } from "../../util/builder";
import ButtonComponent, { ButtonsProps } from "../ButtonComponent";
import NodeComponent from "../NodeComponent";

export interface Node {
    id: string;
    numberInputs: number;
    numberOutputs: number;
    prevPosition: { x: number; y: number };
    currPosition: {x: number; y: number };
    inputEdgeIds?:  string[];
    outputEdgeIds?: string[];
}

export interface InsideInput {
    nodeId: string;
    inputIndex: number;
    positionX: number;
    positionY: number;
}


export default class BoardComponent extends HTMLElement {
    
    private scale: number;
    private grabbingBoard: boolean | null;
    private selectedNode: string | null;
    private insideInput: InsideInput | null;
    private clickedPosition: { x: number; y: number };
    private nodes: Node[];
        
    constructor(initialNodes: Node[]) {
        super();
        this.nodes = initialNodes;
        this.render();
    }

    public setGrabbingBoard(value: null | boolean) {
        this.grabbingBoard = value;
        this.render();
    }
    
    public getGrabbingBoard(): boolean | null {
        return this.grabbingBoard;
    }
    
    public setSelectedNode(value: string | null){
        this.selectedNode = value;
        this.render();
    }
    public getSelectedNode():string {
        return this.selectedNode;
    }

    public setClickedPosition(object: { x: number; y: number}) {
        alert(object)
        this.clickedPosition = object
    }

    public getClickedPosition(): { x: number; y: number} {
        return this.clickedPosition;
    }

    public setNodes(value: Node[]) {
        this.nodes = value;
        this.render();
    }
    public getNodes(): Node[] {
        return this.nodes;
    }

    public setInsideInput(insideInput: InsideInput) {
        this.insideInput = insideInput;
        this.render();
    }

    public getInsideInput(): InsideInput {
        return this.insideInput;
    }

    handleOnMouseDownBoard(event: any) {
        // Deselect node
        this.setSelectedNode(null);


        // Start grabbing board
        this.setGrabbingBoard(null);
        this.setClickedPosition({ x: event.x, y: event.y });
    }


    handleOnMouseDownNode(id: string, event: any) {        

        // Select node
        this.setSelectedNode(id);

        // Update first click position
        this.setClickedPosition({ x: event.x, y: event.y });

        const node = this.getNodes().find((node) => node.id === this.getSelectedNode());
        if (node) {
            // Update node position
                node.prevPosition = { x: node.currPosition.x * this.scale, y: node.currPosition.y * this.scale };
                this.render();
        };

    }
    
    handleOnClickAdd(numberInputs: number, numberOutputs: number) {
        // Create random positions
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;

        // Create signal
        var nodePrev = { x: randomX, y: randomY };
        function setNodePrev(obj: { x: number; y: number }){
            nodePrev = obj
        }
        var nodeCurr = { x: randomX, y: randomY };
        function setNodeCurr(obj: { x: number; y: number }){
            nodeCurr = obj
        }
        var inputsEdgesIds  = [...Array<string>()];
        function setInputEdgesIds(values: string[]){
            inputsEdgesIds = values
        }
        var outputsEdgesIds = [...Array<string>()];
        function setOutputEdgesIds(values: string[]){
            outputsEdgesIds = values
        }

        // Update global nodes array
        this.setNodes([...this.nodes, 
            {
                id: `node_${Math.random().toString(36).substring(2, 8)}`,
                numberInputs: numberInputs,
                numberOutputs: numberOutputs,
                prevPosition:  nodePrev ,
                currPosition: nodeCurr,
                inputEdgeIds: inputsEdgesIds,
                outputEdgeIds: outputsEdgesIds,
            },
        ]);
        
    }

    handleOnClickDelete() {
        // Find node in global nodes array
        const node = this.getNodes().find((node) => node.id === this.selectedNode);

        // Check if node exists
        if (!node) {
            this.setSelectedNode(null);
            return;
        }

        // Delete node edges
        const inputs = node.inputEdgeIds;
        const outputs = node.outputEdgeIds;

        // Get all unique edges to delete
        const allEdges = [...inputs, ...outputs];
        const uniqueEdges = allEdges.filter((value, index, array) => {
            return array.indexOf(value) === index;
        });
        

        // Delete node
        this.setNodes([...this.nodes.filter((node) => node.id !== this.selectedNode)]);
        this.setSelectedNode(null);
    }

    handleOnMouseDownOutput(outputPositionX: number, outputPositionY: number, nodeId: string, outputIndex: number) {
        // Deselect node
        this.setSelectedNode(null);

        const boardWrapperElement = document.getElementById("boardWrapper");

        if (boardWrapperElement) {
            // Create edge position signals with updated scale value
            var prevEdgeStart = {
                x: (outputPositionX + boardWrapperElement.scrollLeft) / this.scale,
                y: (outputPositionY + boardWrapperElement.scrollTop) / this.scale,
            };
            function setPrevEdgeStart(obj:{ x: number; y: number }){
                this.prevEdgeStart = obj;
                this.render();
            }
            var currEdgeStart = {
                x: (outputPositionX + boardWrapperElement.scrollLeft) / this.scale,
                y: (outputPositionY + boardWrapperElement.scrollTop) / this.scale,
            };
            function setCurrEdgeStart(obj:{ x: number; y: number }){
                this.currEdgeStart = obj;
                this.render();
            }
            var prevEdgeEnd = {
                x: (outputPositionX + boardWrapperElement.scrollLeft) / this.scale,
                y: (outputPositionY + boardWrapperElement.scrollTop) / this.scale,
            };
            function setPrevEdgeEnd(obj:{ x: number; y: number }){
                this.prevEdgeEnd = obj;
                this.render();
            }
            var currEdgeEnd = {
                x: (outputPositionX + boardWrapperElement.scrollLeft) / this.scale,
                y: (outputPositionY + boardWrapperElement.scrollTop) / this.scale,
            };
            function setCurrEdgeEnd(obj:{ x: number; y: number }){
                this.currEdgeEnd = obj;
                this.render();
            }

        }
    }

    handleOnMouseEnterInput(inputPositionX: number, inputPositionY: number, nodeId: string, inputIndex: number) {
        this.setInsideInput({ nodeId, inputIndex, positionX: inputPositionX, positionY: inputPositionY });
    }

    handleOnMouseLeaveInput(nodeId: string, inputIndex: number) {
        if (this.insideInput !== null && this.insideInput?.nodeId === nodeId && this.insideInput?.inputIndex === inputIndex) this.setInsideInput(null);
    }

    handleOnMouseUpBoard() {
        this.clickedPosition = { x: -1, y: -1 };

        // Stop grabbing board
        this.grabbingBoard = false;
        
    }

    handleOnMouseMove(event: any) {
        // User clicked somewhere
        if (this.clickedPosition.x >= 0 && this.clickedPosition.y >= 0) {
            // User clicked on node
            if (this.selectedNode !== null) {
                const deltaX = event.x - this.clickedPosition.x;
                const deltaY = event.y - this.clickedPosition.y;

                const node = this.getNodes().find((node) => node.id === this.selectedNode);
                if (node) {
                    // Update node position
                    node.currPosition = { 
                        x: (node.prevPosition.x + deltaX) / this.scale,
                        y: (node.prevPosition.y + deltaY) / this.scale
                    };                    
                    this.render();
                   
                }
            }
            // User clicked on board, move board
            else {
                const deltaX = event.x - this.clickedPosition.x;
                const deltaY = event.y - this.clickedPosition.y;

                const boardWrapperElement = document.getElementById("boardWrapper");
                if (boardWrapperElement) {
                    boardWrapperElement.scrollBy(-deltaX, -deltaY);
                    this.setClickedPosition({ x: event.x, y: event.y });
                }
            }
        }

    }

    public setScale(scale: number): void {
        this.scale = scale;
        this.render();
    }
    public getScale(): number {
        return this.scale;
    }

    render(){
        const boardWrapperElement = DivBuilder("boardWrapper","wrapper")
        const boardElement = DivBuilder("board",this.grabbingBoard ? "boardDragging" : "board");
        boardElement.onmousedown = this.handleOnMouseDownBoard
        boardElement.onmouseup = this.handleOnMouseUpBoard
        boardElement.onmousemove = this.handleOnMouseMove
        if (boardElement) {
            boardElement.addEventListener("wheel", (evt: WheelEvent) => {
                this.setScale(this.scale + +evt.deltaY * -0.005);

                this.setScale(Math.min(Math.max(1, this.scale), 2));

                boardElement.style.transform = `scale(${this.scale})`;
                boardElement.style.marginTop = `${(this.scale - 1) * 50}vh`;
                boardElement.style.marginLeft = `${(this.scale - 1) * 50}vw`;
                },
                {
                    passive: false
                }
            );
        };
        const buttonProps: ButtonsProps = {
            showDelete: this.selectedNode !== null,
            onClickAdd: this.handleOnClickAdd,
            onClickDelete: this.handleOnClickDelete,
        }
        const buttonComponent = new ButtonComponent(buttonProps);
        boardWrapperElement.appendChild(buttonComponent);
        this.nodes.forEach((node) => {

            
            const nodeComponent = new NodeComponent(
                {
                    id:node.id,
                    x:node.currPosition.x,
                    y:node.currPosition.y,
                    inputs:node.numberInputs,
                    outputs:node.numberOutputs,
                    selected: this.selectedNode === node.id,            
                    onMouseDownNode:this.handleOnMouseDownNode,
                    onMouseDownOutput:this.handleOnMouseDownOutput,
                    onMouseEnterInput:this.handleOnMouseEnterInput,
                    onMouseLeaveInput:this.handleOnMouseLeaveInput,
                }
            );
            boardElement.appendChild(nodeComponent);
        });
        boardWrapperElement.appendChild(boardElement);

        this.innerHTML = boardWrapperElement.outerHTML;
    }
}

customElements.define('board-root', BoardComponent);