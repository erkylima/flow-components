class State extends HTMLElement{
  counter: number;
  constructor() {
        super();
        if ("counter" in localStorage) {
          this.counter = parseInt(localStorage.getItem("counter"));
        } else {
          this.counter = 0
        }

        this.render();
    }
  
    public get count(): number {
      
        return this.counter;
    }
  
    public set count(value: number) {
        this.counter = value;
        localStorage.setItem("counter", this.counter + "");
        this.render();
    }
    
    buttonDecrement(): HTMLButtonElement{
        var newDrawer = document.createElement('button');
        newDrawer.innerText = `Decrement`;
        newDrawer.addEventListener('click', () => {
            this.count--;        
      });
      return newDrawer;
    }
    
    buttonIncrement(): HTMLButtonElement{
      var newDrawer = document.createElement('button');
      newDrawer.innerText = `Increment`;
        newDrawer.addEventListener('click', () => {
          this.count++;
        });
      return newDrawer;
    }

    render() {
      this.innerHTML = ``
      this.append(this.buttonDecrement())
      this.append(this.count +"")
      this.append(this.buttonIncrement())
      
    }
}

customElements.define('state-root', State);