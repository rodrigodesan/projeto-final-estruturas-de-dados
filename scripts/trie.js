import { ArrayQueue } from './arrayQueue.js'

const R = 26
export class TrieNode{
    constructor(){
        this.val = null;
        this.next = new Array(R);
    }
}

export class Trie{
    constructor(){
        this.root = this.getNode();
    }

    getNode(){
        return new TrieNode();
    }

    charToIndex(ch){
        return ch.charCodeAt()-'a'.charCodeAt();
    }

    indexToChar(ind){
        return String.fromCharCode(ind + 'a'.charCodeAt());
    }

    get(key){
        let x = this._get(this.root,key,0);
        if (x == null){
            return null;
        }
        return x.val;
    }

    _get(x,key,d){
        if (x == null){
            return null;
        }
        if (d == key.length){
            return x;
        }
        let c = this.charToIndex(key[d]);
        return this._get(x.next[c],key,d+1);
    }

    put(key,val){
        this.root = this._put(this.root,key,val,0);
    }

    _put(x,key,val,d){
        if (x == null){
            x = this.getNode()
        }
        if (d == key.length){
            x.val = val;
            return x;
        }
        let c = this.charToIndex(key[d]);
        x.next[c] = this._put(x.next[c],key,val,d+1);
        return x;
    }

    delete(key){
        this.root = this._delete(this.root,key,0);
    }

    _delete(x,key,d){
        if (x == null){
            return null;
        }
        if (d == key.length){
            x.val = null;
        }else {
            let c = this.charToIndex(key[d]);
            x.next[c] = this._delete(x.next[c],key,d+1);
        }
        if (x.val != null){
            return x;
        }
        for (let c = 0; c < R; c++){
            if (x.next[c] != null){
                return x;
            }
        }
        return x;
    }

    keysWithPrefix(pre){
        let q = new ArrayQueue();
        this.collectWith(this._get(this.root,pre,0), pre,q);
        return q;
    }

    collectWith(x,pre,q){
        if (x == null){
            return; 
        }
        if (x.val != null){
            q.add(pre);
        }
        for (let c = 0; c < R; c++){
            this.collectWith(x.next[c], pre + this.indexToChar(c),q);
        }
    }

    keysThatMatch(pat){
        let q = new ArrayQueue();
        this.collectMatch(this.root,"",pat,q);
        return q;
    }

    collectMatch(x,pre,pat,q){
        let d = pre.length;
        if (x == null){
            return;
        }
        if (d == pat.length && x.val != null){
            q.add(pre);
        }
        if (d == pat.length){
            return;
        }
        let next = pat[d];
        for (let c = 0; c < R; c++){
            if (next == '.' || next == this.indexToChar(c)){
                this.collectMatch(x.next[c],pre+this.indexToChar(c),pat,q);
            }
        }
    }

    longestPrefixOf(s){
        let length = this.search(this.root,s,0,0);
        return s.slice(0,length);
    }

    search(x,s,d,length){
        if (x == null){
            return length;
        }
        if (x.val != null){
            length = d;
        }
        if (d == s.length){
            return length;
        }
        let c = this.charToIndex(s[d]);
        return this.search(x.next[c],s,d+1,length);
    }

}

/*let trie = new Trie();

trie.put("casa",1);
trie.put("circo",2);
trie.put("barco",3);
trie.put("bloco",4);
trie.put("risco",5);
trie.put("zebra",6);
trie.put("sopa",7);
trie.put("lua",8);
trie.put("casarao",9);

console.log(trie);
console.log(trie.keysWithPrefix('c'));
console.log(trie.keysThatMatch('...co'));
console.log(trie.longestPrefixOf("casao"));

trie.delete("circo");

console.log(trie.keysWithPrefix("c"));*/