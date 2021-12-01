export class ArrayQueue {
    constructor(){
        this.a = new Array(1)
        this.j = 0;
        this.n = 0;
    }

    add(x){
        if (this.n + 1 > this.a.length){
            this.resize();
        }
        this.a[(this.j+this.n) % this.a.length] = x;
        this.n ++;
        return true;
    }

    remove(){
        let x = this.a[this.j];
        this.a.splice(this.j,x);
        this.j = (this.j + 1) % this.a.length;
        this.n --;
        if (this.a.length >= 3*this.n){
            this.resize();
        }
        return x;
    }

    resize(){
        let b = new Array(Math.max(1, 2*this.n))
        for (let k = 0; k<this.n; k++){
            b[k] = this.a[(this.j + k) % this.a.length];
        }
        this.a = b;
        this.j = 0;
    }
}



