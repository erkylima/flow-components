import "./NodeComponent"
import NodeComponent, { Props }  from "./NodeComponent";




class Flow2 extends HTMLElement {
    constructor() {
        super();    

        this.render();
      }    
      render() {
        var props: Props = {
          x:1,
          y:1,
          label: "label",
          content: "content",
          inputs: 2,
          outputs: 2,
          selected: false
        };
        const node = new NodeComponent(props);      
        this.innerHTML = node.innerHTML;
      }
}

customElements.define('flow2-root', Flow2);