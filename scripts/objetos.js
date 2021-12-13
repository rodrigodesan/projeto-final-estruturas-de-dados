class ArrayQueue {
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

const R = 26
class TrieNode{
    constructor(){
        this.val = null;
        this.next = new Array(R);
    }
}

class Trie{
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
        var k = key.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()
        let x = this._get(this.root,k,0);
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
        var k = key.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()
        this.root = this._put(this.root,k,val,0);
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
        var k = key.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()
        this.root = this._delete(this.root,k,0);
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
        var pref = pre.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()
        let q = new ArrayQueue();
        this.collectWith(this._get(this.root,pref,0), pref,q);
        return q.a;
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
        var pater = pat.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()
        let q = new ArrayQueue();
        this.collectMatch(this.root,"",pater,q);
        return q.a;
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
        var se = s.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()
        let length = this.search(this.root,se,0,0);
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

let objetos = new Trie();

objetos.put("Anel",1);
objetos.put("Caixa",2);
objetos.put("Livro",3);
objetos.put("Dado",4);
objetos.put("Vela",5);
objetos.put("Alfinete",6);
objetos.put("Escova",7);

let dicas = ["Argola que se usa no dedo","Armazena encomendas em seu interior","Conjunto de folhas ordenadas e encadernadas","Pequeno cubo com faces enumeradas de um a seis", "Peça de cera com pavio interior que serve para iluminar","Peça metálica, muito pequena e pontuda, para prender tecidos", "Utensílio com pêlos para pentear cabelos"]
let dicasExibir = new ArrayQueue();
for (let i of dicas){
    dicasExibir.add(i);
}


let d4_i1;
let d4_i2;
let d6_i1;
let d4_i3;
let d3_i1_d6_i2;
let d3_i2;
let d3_i3;
let d3_i4;
let d3_i5_d4_i4;
let d6_i3;
let d6_i4;
let d2_i1;
let d6_i5;
let d1_i1_d2_i2;
let d1_i2;
let d1_i3;
let d1_i4;
let d5_i1;
let d5_i2_d6_i6;
let d5_i3;
let d5_i4;
let d2_i3;
let d6_i7;
let d2_i4;
let d6_i8_d7_i1;
let d7_i2;
let d7_i3;
let d7_i4;
let d7_i5;
let d2_i5_d7_i6;
let palavra1;
let palavra2;
let palavra3;
let palavra4;
let palavra5;
let palavra6;
let palavra7;

// Palavra 1
function getd1i1(){
    d1_i1_d2_i2 = document.getElementById("dica1-item1-dica2-item2");
    let keys = objetos.keysThatMatch(`${d1_i1_d2_i2.value}...`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'anel'){
            pertence = true;
        }
    }
    if (pertence){
        d1_i1_d2_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d1_i1_d2_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd1i2(){
    d1_i2 = document.getElementById("dica1-item2");
    let keys = objetos.keysThatMatch(`.${d1_i2.value}..`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'anel'){
            pertence = true;
        }
    }
    if (pertence){
        d1_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d1_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd1i3(){
    d1_i3 = document.getElementById("dica1-item3");
    let keys = objetos.keysThatMatch(`..${d1_i3.value}.`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'anel'){
            pertence = true;
        }
    }
    if (pertence){
        d1_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d1_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd1i4(){
    d1_i4 = document.getElementById("dica1-item4");
    let keys = objetos.keysThatMatch(`...${d1_i4.value}`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'anel'){
            pertence = true;
        }
    }
    if (pertence){
        d1_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d1_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

// Palavra2 
function getd2i1(){
    d2_i1 = document.getElementById("dica2-item1");
    let keys = objetos.keysThatMatch(`${d2_i1.value}....`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'caixa'){
            pertence = true;
        }
    }
    if (pertence){
        d2_i1.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d2_i1.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd2i3(){
    d2_i3 = document.getElementById("dica2-item3");
    let keys = objetos.keysThatMatch(`..${d2_i3.value}..`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'caixa'){
            pertence = true;
        }
    }
    if (pertence){
        d2_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d2_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd2i4(){
    d2_i4 = document.getElementById("dica2-item4");
    let keys = objetos.keysThatMatch(`...${d2_i4.value}.`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'caixa'){
            pertence = true;
        }
    }
    if (pertence){
        d2_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d2_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd2i5(){
    d2_i5_d7_i6 = document.getElementById("dica2-item5-dica7-item6");
    let keys = objetos.keysThatMatch(`....${d2_i5_d7_i6.value}`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'caixa'){
            pertence = true;
        }
    }
    if (pertence){
        d2_i5_d7_i6.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d2_i5_d7_i6.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

// Palavra3
function getd3i1(){
    d3_i1_d6_i2 = document.getElementById("dica3-item1-dica6-item2");
    let keys = objetos.keysThatMatch(`${d3_i1_d6_i2.value}....`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'livro'){
            pertence = true;
        }
    }
    if (pertence){
        d3_i1_d6_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d3_i1_d6_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd3i2(){
    d3_i2 = document.getElementById("dica3-item2");
    let keys = objetos.keysThatMatch(`.${d3_i2.value}...`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'livro'){
            pertence = true;
        }
    }
    if (pertence){
        d3_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d3_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd3i3(){
    d3_i3 = document.getElementById("dica3-item3");
    let keys = objetos.keysThatMatch(`..${d3_i3.value}..`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'livro'){
            pertence = true;
        }
    }
    if (pertence){
        d3_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d3_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd3i4(){
    d3_i4 = document.getElementById("dica3-item4");
    let keys = objetos.keysThatMatch(`...${d3_i4.value}.`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'livro'){
            pertence = true;
        }
    }
    if (pertence){
        d3_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d3_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd3i5(){
    d3_i5_d4_i4 = document.getElementById("dica3-item5-dica4-item4");
    let keys = objetos.keysThatMatch(`....${d3_i5_d4_i4.value}`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'livro'){
            pertence = true;
        }
    }
    if (pertence){
        d3_i5_d4_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d3_i5_d4_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

//Palavra4
function getd4i1(){
    d4_i1 = document.getElementById("dica4-item1");
    let keys = objetos.keysThatMatch(`${d4_i1.value}...`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'dado'){
            pertence = true;
        }
    }
    if (pertence){
        d4_i1.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d4_i1.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd4i2(){
    d4_i2 = document.getElementById("dica4-item2");
    let keys = objetos.keysThatMatch(`.${d4_i2.value}..`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'dado'){
            pertence = true;
        }
    }
    if (pertence){
        d4_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d4_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd4i3(){
    d4_i3 = document.getElementById("dica4-item3");
    let keys = objetos.keysThatMatch(`..${d4_i3.value}.`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'dado'){
            pertence = true;
        }
    }
    if (pertence){
        d4_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d4_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

// Palavra5
function getd5i1(){
    d5_i1 = document.getElementById("dica5-item1");
    let keys = objetos.keysThatMatch(`${d5_i1.value}...`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'vela'){
            pertence = true;
        }
    }
    if (pertence){
        d5_i1.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d5_i1.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd5i2(){
    d5_i2_d6_i6 = document.getElementById("dica5-item2-dica6-item6");
    let keys = objetos.keysThatMatch(`.${d5_i2_d6_i6.value}..`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'vela'){
            pertence = true;
        }
    }
    if (pertence){
        d5_i2_d6_i6.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d5_i2_d6_i6.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd5i3(){
    d5_i3 = document.getElementById("dica5-item3");
    let keys = objetos.keysThatMatch(`..${d5_i3.value}.`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'vela'){
            pertence = true;
        }
    }
    if (pertence){
        d5_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d5_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd5i4(){
    d5_i4 = document.getElementById("dica5-item4");
    let keys = objetos.keysThatMatch(`...${d5_i4.value}`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'vela'){
            pertence = true;
        }
    }
    if (pertence){
        d5_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d5_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

// Palavra6
function getd6i1(){
    d6_i1 = document.getElementById("dica6-item1");
    let keys = objetos.keysThatMatch(`${d6_i1.value}.......`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'alfinete'){
            pertence = true;
        }
    }
    if (pertence){
        d6_i1.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d6_i1.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd6i3(){
    d6_i3 = document.getElementById("dica6-item3");
    let keys = objetos.keysThatMatch(`..${d6_i3.value}.....`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'alfinete'){
            pertence = true;
        }
    }
    if (pertence){
        d6_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d6_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd6i4(){
    d6_i4 = document.getElementById("dica6-item4");
    let keys = objetos.keysThatMatch(`...${d6_i4.value}....`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'alfinete'){
            pertence = true;
        }
    }
    if (pertence){
        d6_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d6_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd6i5(){
    d6_i5 = document.getElementById("dica6-item5");
    let keys = objetos.keysThatMatch(`....${d6_i5.value}...`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'alfinete'){
            pertence = true;
        }
    }
    if (pertence){
        d6_i5.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d6_i5.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd6i7(){
    d6_i7 = document.getElementById("dica6-item7");
    let keys = objetos.keysThatMatch(`......${d6_i7.value}.`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'alfinete'){
            pertence = true;
        }
    }
    if (pertence){
        d6_i7.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d6_i7.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd6i8(){
    d6_i8_d7_i1 = document.getElementById("dica6-item8-dica7-item1");
    let keys = objetos.keysThatMatch(`.......${d6_i8_d7_i1.value}`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'alfinete'){
            pertence = true;
        }
    }
    if (pertence){
        d6_i8_d7_i1.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d6_i8_d7_i1.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

// Palavra7
function getd7i2(){
    d7_i2 = document.getElementById("dica7-item2");
    let keys = objetos.keysThatMatch(`.${d7_i2.value}....`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'escova'){
            pertence = true;
        }
    }
    if (pertence){
        d7_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d7_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd7i3(){
    d7_i3 = document.getElementById("dica7-item3");
    let keys = objetos.keysThatMatch(`..${d7_i3.value}...`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'escova'){
            pertence = true;
        }
    }
    if (pertence){
        d7_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d7_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd7i4(){
    d7_i4 = document.getElementById("dica7-item4");
    let keys = objetos.keysThatMatch(`...${d7_i4.value}..`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'escova'){
            pertence = true;
        }
    }
    if (pertence){
        d7_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d7_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}
function getd7i5(){
    d7_i5 = document.getElementById("dica7-item5");
    let keys = objetos.keysThatMatch(`....${d7_i5.value}.`);
    let pertence = false
    for (let i = 0; i<keys.length; i++ ){
        if (keys[i] == 'escova'){
            pertence = true;
        }
    }
    if (pertence){
        d7_i5.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else{
        d7_i5.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

let pDicas = document.getElementById("dicas");
var li;
var dica;
for (let i = 0; i < dicas.length; i++){
    li = document.createElement("li");
    dica = dicasExibir.remove();
    li.innerText = `${dica}`;
    pDicas.appendChild(li);
}

function resultado(){
    d4_i1 = document.getElementById("dica4-item1");
    d4_i2 = document.getElementById("dica4-item2");
    d6_i1 = document.getElementById("dica6-item1");
    d4_i3 = document.getElementById("dica4-item3");
    d3_i1_d6_i2 = document.getElementById("dica3-item1-dica6-item2");
    d3_i2 = document.getElementById("dica3-item2");
    d3_i3 = document.getElementById("dica3-item3");
    d3_i4 = document.getElementById("dica3-item4");
    d3_i5_d4_i4 = document.getElementById("dica3-item5-dica4-item4");
    d6_i3 = document.getElementById("dica6-item3");
    d6_i4 = document.getElementById("dica6-item4");
    d2_i1 = document.getElementById("dica2-item1");
    d6_i5 = document.getElementById("dica6-item5");
    d1_i1_d2_i2 = document.getElementById("dica1-item1-dica2-item2");
    d1_i2 = document.getElementById("dica1-item2");
    d1_i3 = document.getElementById("dica1-item3");
    d1_i4 = document.getElementById("dica1-item4");
    d5_i1 = document.getElementById("dica5-item1");
    d5_i2_d6_i6 = document.getElementById("dica5-item2-dica6-item6");
    d5_i3 = document.getElementById("dica5-item3");
    d5_i4 = document.getElementById("dica5-item4");
    d2_i3 = document.getElementById("dica2-item3");
    d6_i7 = document.getElementById("dica6-item7");
    d2_i4 = document.getElementById("dica2-item4");
    d6_i8_d7_i1 = document.getElementById("dica6-item8-dica7-item1");
    d7_i2 = document.getElementById("dica7-item2");
    d7_i3 = document.getElementById("dica7-item3");
    d7_i4 = document.getElementById("dica7-item4");
    d7_i5 = document.getElementById("dica7-item5");
    d2_i5_d7_i6 = document.getElementById("dica2-item5-dica7-item6");
    palavra1 = d1_i1_d2_i2.value + d1_i2.value + d1_i3.value + d1_i4.value;
    palavra2 = d2_i1.value + d1_i1_d2_i2.value + d2_i3.value + d2_i4.value + d2_i5_d7_i6.value;
    palavra3 = d3_i1_d6_i2.value + d3_i2.value + d3_i3.value + d3_i4.value + d3_i5_d4_i4.value;
    palavra4 = d4_i1.value + d4_i2.value + d4_i3.value + d3_i5_d4_i4.value;
    palavra5 = d5_i1.value + d5_i2_d6_i6.value + d5_i3.value + d5_i4.value;
    palavra6 = d6_i1.value + d3_i1_d6_i2.value + d6_i3.value + d6_i4.value + d6_i5.value + d5_i2_d6_i6.value + d6_i7.value + d6_i8_d7_i1.value;
    palavra7 = d6_i8_d7_i1.value + d7_i2.value + d7_i3.value + d7_i4.value + d7_i5.value + d2_i5_d7_i6.value;

    let correto = true;

    // Checagem palavra1
    let dica1 = document.getElementsByClassName("dica1");
    let p1 = "ANEL";
    if (objetos.get(palavra1) != 1){
        correto = false;
        for (let i = 0; i<dica1.length; i++){
            dica1[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
        }
    }
    for (let i = 0;i<p1.length;i++){
        dica1[i].value = p1[i];
    }

    // Checagem palavra2
    let dica2 = document.getElementsByClassName("dica2");
    let p2 = "CAIXA";
    if (objetos.get(palavra2) != 2){
        correto = false;
        for (let i = 0; i<dica2.length; i++){
            dica2[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
        }
    }
    for (let i=0;i<p2.length;i++){
        dica2[i].value = p2[i];
    }

    // Checagem palavra3
    let dica3 = document.getElementsByClassName("dica3");
    let p3 = "LIVRO";
    if (objetos.get(palavra3) != 3){
        correto = false;
        for (let i = 0; i<dica3.length; i++){
            dica3[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
        }
    }
    for (let i=0;i<p3.length;i++){
        dica3[i].value = p3[i];
    }

    // Checagem palavra4
    let dica4 = document.getElementsByClassName("dica4");
    let p4 = "DADO";
    if (objetos.get(palavra4) != 4){
        correto = false;
        for (let i = 0; i<dica4.length; i++){
            dica4[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
        }
    }
    for (let i=0;i<p4.length;i++){
        dica4[i].value = p4[i];
    }

    // Checagem palavra5
    let dica5 = document.getElementsByClassName("dica5");
    let p5 = "VELA";
    if (objetos.get(palavra5) != 5){
        correto = false;
        for (let i = 0; i<dica5.length; i++){
            dica5[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
        }
    }
    for (let i=0;i<p5.length;i++){
        dica5[i].value = p5[i];
    }

    // Checagem palavra6
    let dica6 = document.getElementsByClassName("dica6");
    let p6 = "ALFINETE";
    if (objetos.get(palavra6) != 6){
        correto = false;
        for (let i = 0; i<dica6.length; i++){
            dica6[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
        }
    }
    for (let i=0;i<p6.length;i++){
        dica6[i].value = p6[i];
    }

    // Checagem palavra7
    let dica7 = document.getElementsByClassName("dica7");
    let p7 = "ESCOVA";
    if (objetos.get(palavra7) != 7){
        correto = false;
        for (let i = 0; i<dica7.length; i++){
            dica7[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
        }
    }
    for (let i=0;i<p7.length;i++){
        dica7[i].value = p7[i];
    }

    // Mensagem de resultado
    let res = document.getElementById("resultado");
    res.style.marginTop = "10px";
    res.style.marginBottom = "20px";
    if (correto){
        res.style.color = "rgba(190, 255, 190, 0.801)";
        res.innerText = "PARABÉNS, VOCÊ ACERTOU TUDO! Aperte o botão abaixo para jogar novamente."
    } else{
        res.style.color = "rgba(255, 158, 158, 0.746)";
        res.innerText = "Não foi dessa vez! Aperte o botão abaixo para jogar novamente."
    }
}

function jogarNovamente(){
    document.location.reload(true);
}
