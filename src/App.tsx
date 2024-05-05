import './components/button'
import './components/subflow'
import './components/NodeComponent/styles.module.css'
function Layout(): HTMLElement{
    var newDrawer = document.createElement('div');

    newDrawer.innerHTML = `
        <div class="container">
            <div class="sidebar">
                
            </div>
            <div class="content">                
                <flow2-root></flow2-root>
            </div>
    
        </div>
    `
    return newDrawer;
}


class AppRoot extends HTMLElement {   
  constructor() {
      super();
      debugger;
      this.render();
    }
  

    render() {
      this.innerHTML = `${Layout().innerHTML}` 
    }
    
}


customElements.define('app-root', AppRoot);