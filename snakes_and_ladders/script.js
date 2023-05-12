let ladders = [[80,100],[71,91],[28,84],[51,67],[21,42],[16,38],[4,14],[9,31],[36,44]];
let snakes = [[98,78],[95,75],[93,73],[87,24],[64,52],[47,23],[62,19],[49,11],[17,6]];
let graph = [];
let board;
let s = 5;
let e = 100;
let connections = [];
let die = 0;


function setup() {
    createCanvas(800, 600);
    
    board = new Graph()
    
    for (let i = 0; i < 100; ++i){
        graph.push([i, i + 1]);
    }
    
    graph.push([100, 100]);
    
    board.Directed_Graph(graph);
    board.Directed_Graph(ladders);
    board.Directed_Graph(snakes);
    frameRate(5);
    
    
}


function draw() {
    background(255);
    let pos = 1;
    // showBoard(pos);
    // while (pos != 100) {
    // die = 3;
    console.log("die: " + die);
    pos += die;
    console.log("pos:" + pos);
    if (pos >= 100) {
        // showBoard(100)
        console.log("shit workd");
            // break
    }
    pos = checkSnkLadr(pos, board.graph);
        
    // }
    showBoard(pos);
}


changeDie = () => {
    let val = document.getElementById("die").value;
    console.log(val, die);
    val = parseInt(val);
    die += val;
}


showBoard = (pos) => {
    let x = 0;
    let y = 0;
    let r = 50;
    let d = -1; // direction of the row
    let ldr = {}; // ladder x y cooridnates
    let snk = {}; // snake x y cooridnates
    let offset = 25;
    let indx = 101;
    let blist = Object.keys(board.graph); // flattened list for displaying easyily
    
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i < 10; ++i) {
        let newBoard;
        if (d == 1) {
            newBoard = blist.slice(indx - 10, indx);
        } else {
            newBoard = blist.slice(indx - 10, indx).reverse()
        }
        
        newBoard.forEach(i => {
            i = parseInt(i);
            if (i == pos) {
                textSize(16);
                textAlign(CENTER);
                text(i, x + offset, y + offset);
                fill(255, 255, 0, 150);
                rect(x, y, r, r);
                x += r;

                if ([].concat.apply([], ladders).includes(i)) {
                    ldr[i] = [x - offset, y + offset];
                } else if ([].concat.apply([], snakes).includes(i)) {
                    snk[i] = [x - offset, y + offset];
                }
            } else if ([].concat.apply([], snakes).includes(i)) {
                textSize(16);
                textAlign(CENTER);
                text(i, x + offset, y + offset);
                // fill(255, 0, 0, 150);
                rect(x, y, r, r);
                x += r;
                snk[i] = [x - offset, y + offset];
            } else if ([].concat.apply([], ladders).includes(i)) {
                textSize(16);
                textAlign(CENTER);
                text(i, x + offset, y + offset);
                // fill(0, 255, 0, 150);
                rect(x, y, r, r);
                x += r;
                ldr[i] = [x - offset, y + offset];
            }  else {
                textSize(16);
                textAlign(CENTER);
                text(i, x + offset, y + offset);
                fill(100, 100, 100, 100);
                rect(x, y, r, r);
                x += r;
            }
        });
        
        x = 0;
        y += r;
        d *= -1;
        indx -= 10;
    }
    for (let i = 0; i < ladders.length; ++i) {
        // ladders
        push();
        stroke(0, 255, 0, 100);
        strokeWeight(40);
        line(ldr[ladders[i][0]][0], ldr[ladders[i][0]][1], ldr[ladders[i][1]][0], ldr[ladders[i][1]][1]);
        pop();

        // snakes
        push();
        stroke(255, 0, 0, 100);
        strokeWeight(40);
        line(snk[snakes[i][0]][0], snk[snakes[i][0]][1], snk[snakes[i][1]][0], snk[snakes[i][1]][1]);
        pop();
    };
}


checkSnkLadr = (pos, board) => {
    let ways = board[pos]; // connections from current node to other nodes
    // console.log(ways);
    if (ways.length == 1){
        pos = pos;
    }
    else{
        ways.forEach(i => {
            if (i != pos + 1) {
                pos = i;
            }
        });
    }
    return pos;
}


class Graph {
    constructor() {
        this.graph = {};
    }
            
    Directed_Graph(connections) {
        for (let i = 0; i < connections.length; ++i) {
            let node;
            let val;
            node = connections[i][0];
            val = connections[i][1];
            if (node in this.graph) {
                let v = this.graph[node];
                v.push(val);
                this.graph[node] = v;
            } else {
                this.graph[node] = [val];
            }
        }
    }         
}