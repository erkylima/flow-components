
import { Graph, JSONObject, Node } from '@antv/x6'
import { MiniMap } from '@antv/x6-plugin-minimap';
import { Scroller } from '@antv/x6-plugin-scroller';

Graph.registerNode(
    'starter-node',
    {
        inherit: 'rect', // 继承于 rect 节点
        width: 100,
        height: 40,
        ports: {
            groups: {
                right: {
                  position: 'right',
                  attrs: {
                    circle: {
                      magnet: true,
                      stroke: '#8f8f8f',
                      r: 5,
                    },
                  },
                },
                left: {
                    position: 'left',
                    attrs: {
                      circle: {
                        magnet: true,
                        stroke: '#8f8f8f',
                        r: 5,
                      },
                    },
                }
            }
        },
        markup: [
            {
                tagName: 'rect', // 标签名称
                selector: 'body', // 选择器
            },
            {
                tagName: 'image',
                selector: 'img',
            },
            {
                tagName: 'text',
                selector: 'label',
            },
        ],
        attrs: {
            body: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
                fill: '#fff',
                rx:15,
                ry:15,                
            },
            img: {
                'xlink:href':
                    'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
                width: 16,
                height: 16,
                x: 12,
                y: 12,
            },
        },
    },
    true,
)

Graph.registerNode(
    'end-node',
    {
        inherit: 'rect', // 继承于 rect 节点
        width: 100,
        height: 40,
        ports: {
            groups: {                
                left: {
                    position: 'left',                    
                    attrs: {
                      circle: {
                        magnet: true,
                        stroke: '#8f8f8f',
                        r: 5,
                      },
                    },
                }
            }
        },
        markup: [
            {
                tagName: 'rect', // 标签名称
                selector: 'body', // 选择器
            },
            {
                tagName: 'image',
                selector: 'img',
            },
            {
                tagName: 'text',
                selector: 'label',
            },
        ],
        attrs: {
            body: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
                fill: '#fff',
                rx:15,
                ry:15,                
            },
            img: {
                'xlink:href':
                    'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
                width: 16,
                height: 16,
                x: 12,
                y: 12,
            },
        },
    },
    true,
)

function Data(): JSONObject{
    const data = {
        nodes: [
          {
            id: 'node1',
            shape: 'starter-node',
            x: 300,
            y: 400,
            width: 80,
            height: 80,
            label: 'hello',
            ports: {
                items: [
                  {
                    id: 'port_1',
                    group: 'right',

                  },
                ]
            }
            // tools: ['button-remove']        
          },
          {
            id: 'node2',
            shape: 'end-node',            
            x: 560,
            y: 480,
            width: 80,
            height: 80,
            label: 'world',   
            ports: {
                items: [
                  {
                    id: 'port_2',
                    group: 'left',
                  },
                ]
            },
            attrs: {                
                body: {                    
                    stroke: '#8f8f8f',
                    strokeWidth: 1,
                    fill: '#fff',
                    rx: 6,
                    ry: 6,
                },
            },
          },
        ],
        edges: [
        //   {
        //     shape: 'edge',
        //     connectionPoint : 'anchor', 
        //     source: { cell: 'node1', port: 'port_1' },            
        //     target: { cell:'node2', port: 'port_2'},
        //     label: 'x6',
        //     connector: {
        //         name: 'rounded',
        //     },
        //     router: 'orth',

        //     attrs: {
        //       // line 是选择器名称，选中的边的 path 元素
        //       line: {
        //         stroke: '#8f8f8f',
        //         strokeWidth: 1,
        //       },
        //     },
        //   },
        ],
      }
    return data;      
}

class Flow extends HTMLElement {
    constructor() {
        super();    
        this.render();
      }    
      render() {
            
        const graph = new Graph({
            container: this,
            autoResize: true,   
            connecting: {
                router: 'orth',
                connector: "rounded",
                allowNode: false,
                allowBlank: false,
                allowLoop: false,
                allowMulti: false,
                allowEdge: false,
                allowPort: true,
            },
            
            mousewheel: {
                enabled: true,
                modifiers: 'Ctrl',
                maxScale: 4,
                minScale: 0.2,
            },            
            panning: true,                        
            background: {
              color: '#F2F7FA',
            },
        });
        graph.zoomToFit({ maxScale: 1 })
        graph.fromJSON(Data());                
        graph.use(
            new MiniMap({
              width: 200,
              height: 200,
            }),
            new Scroller({
                enabled: true,
                pageVisible: true,
                pageBreak: true,
                pannable: true,
            })        
        );
      }
}

customElements.define('flow-root', Flow);