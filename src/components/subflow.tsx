import BoardComponent,{Node} from "./BoardComponent";
import "./NodeComponent"
import NodeComponent, { NodeProps }  from "./NodeComponent";
import "./button"



class Flow2 extends HTMLElement {
    constructor() {
        super();    

        this.render();
      }    
      render() {
        // var props: NodeProps = {
        //   x:1,
        //   y:1,
        //   id: "node1",
        //   inputs: 2,
        //   outputs: 2,
        //   selected: false
        // };
        // const node = new NodeComponent(props);
        const nodes: Node[] = [{
          id:"node1",
          numberInputs: 0,
          numberOutputs: 0,          
          inputEdgeIds: [],
          outputEdgeIds: [],
          prevPosition: { x: 0, y: 0 },
          currPosition: { x: 450, y: 500 },
      }];
        
        const node = new BoardComponent(nodes);
        this.innerHTML = "<state-root></state-root>";
      }
}

customElements.define('flow2-root', Flow2);