export class Node {
    constructor(x,next){
        this.x = x;
        this.next = next;
    }
}

class SLList {
    constructor(){
        this.n = 0;
        this.head = null;
        this.tail = null;
    }
    new_node(x){
        let node = new Node(x,null);
        return node
    }
    push(x){
        let u = this.new_node(x);
        u.next = this.head;
        this.head = u;
        if (this.n == 0){
            this.tail = u; 
        }
        this.n ++;
    }
    pop(){
        if (this.n == 0){
            return null; 
        }
        let x = this.head.x;
        this.head = this.head.next;
        this.n --;
        if (this.n == 0){
            this.tail = null;
        }
        return x;
    }
    add(x){
        let u = this.new_node(x);
        if (this.n == 0){
            this.head = u;
        }else {
            this.tail.next = u;
        }
        this.tail = u;
        this.n ++;
    }
    get_node(i){
        let u = this.head;
        for (var n = 0; n<i; n++){
            u = u.next;
        }
        return u;
    }
    get(i){
        if (i < 0 || i > this.n-1){
            throw 'IndexError';
        }
        let node = this.get_node(i);
        return node.x;
    }
    set(i,x){
        if (i<0 || i>this.n-1){
            throw 'IndexError';
        }
        let u = this.get_node(i);
        let y = u.x;
        u.x = x;
        return y; 
    }
    _add(i,x){
        if (i<0 || i>this.n){
            throw 'IndexError';
        }
        if (i==0){
            this.push(x);
            return true;
        }
        let u = this.head;
        for (let n=0;n<i-1;n++){
            u = u.next;
        }
        let w = this.new_node(x)
        w.next = u.next;
        u.next = w;
        this.n ++;
        return true;
    }

    remove(i){
        if (i<0 || i>this.n-1){
            throw "IndexError";
        }
        if (i==0){
            return this.pop();
        }
        let u = this.head;
        for (let n=0;n<i-1;n++){
            u = u.next;
        }
        let w = u.next;
        u.next = u.next.next;
        this.n --;
        return w.x;
    }
}


