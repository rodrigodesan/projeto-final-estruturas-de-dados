const w = 32;


export class ChainedHashTable {
    constructor(){
        this.d = 1;
        this.t = this.alloc_table(2**this.d);
        this.z = this.random_odd_int();
        this.n = 0;
    }

    random_odd_int() {
        let v = Math.round(Math.random() * (w));
        if(v%2 != 0){
            return v;
        }
        else{
            return this.random_odd_int();
        }
    }

    alloc_table(s){
        let table = [];
        for (var i = 0; i < s; i++) {
            table.push(new Array());
        }
        return table;
    }

    clear(){
        this.d = 1;
        this.t = this.alloc_table(2**this.d);
        this.n = 0;
    }

    resize(){
        this.d = 1;
        while (2**this.d <= this.n){
            this.d ++;
        }
        this.n = 0
        let old_t = this.t;
        this.t = this.alloc_table(2**this.d);
        for (let i = 0; i < old_t.length; i++){
            for (let x of old_t[i]){
                this.add(x);
            }
        }
    }


    rolling_hash(x){
        let hash = 0;
        let n = x.length - 1
        for (let i of x){
            hash += i.charCodeAt() * (this.z**(n))
            n --;
        }
        return (hash % this.t.length);
    }

    add(x){
        if (this.find(x) != null){
            return false;
        }
        if (this.n + 1 > this.t.length){
            this.resize();
        }
        let l = this.t[this.rolling_hash(x)];
        l.push(x);
        this.n ++;
        return true;
    }
    
    remove(x){
        let l = this.t[this.rolling_hash(x)];
        for (let y of l){
            if (y == x){
                l.pop();
                this.n --;
                if (3*this.n < this.t.length){
                    this.resize();
                }
                return y;
            }
        }
        return null;
    }

    find(x){
        let l = this.t[this.rolling_hash(x)];
        for (let y of l){
            if (y == x){
                return y;
            }
        }
        return null;
    }
    
}






/*var hash = new ChainedHashTable()
console.log(hash.rolling_hash("casa"))

hash.add("Casa")

hash.add("Jogo")
console.log(hash)
hash.add("Vila")
console.log(hash)
hash.add("Vilao")
console.log(hash)
hash.add("Vilas")
console.log(hash)
hash.add("Vilão")
console.log(hash)
hash.add("boneca")
console.log(hash)
hash.add("circo")
console.log(hash)
hash.add("festa")
console.log(hash)
hash.add("chico")
console.log(hash)
console.log(hash.rolling_hash("casa"))*/