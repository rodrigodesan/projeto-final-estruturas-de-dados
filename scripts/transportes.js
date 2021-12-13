// Implementação Basica da TAD ArrayQueue
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

// Implementação de uma Trie de 26 caracteres. Foi feita uma pequena alteração nos métodos para que, 
// ao receber chaves com caracteres especiais ou letras maiúsculas, sejam totalmente convertidos para
// caracteres normais e letras minúsculas, isso para caber no alfabeto da Trie, evitando assim um 
// desperdício extra de espaço.

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

// Criação da Trie com as palavras do determinado modo, com o valor associado sendo o número da dica
// a que cada chave se refere.

let transportes = new Trie()

transportes.put("Carro", 1);
transportes.put("Ônibus", 2);
transportes.put("Caminhão", 3);
transportes.put("Bicicleta", 4);
transportes.put("Metrô", 5);
transportes.put("Avião", 6);


// Adição das dicas em um ArrayQueue que será usado para fazer a exibição na tela de todos as
// dicas na ordem em que foram adicionadas

let dicas = ["Transporte individual de 4 rodas", "Conhecido por Busu", "Transporte usado para altas cargas","Popurlamente conhecido por Camelo", "Separado por vagões", "Utilizado para sobrevoar cidades e paises"]
let dicasExibir = new ArrayQueue()

for (let i of dicas) {
    dicasExibir.add(i)
}

// Definição das variáveis nas quais serão usados cada um dos campos onde as letras serão digitadas

let d2_i1;
let d1_i1_d3_i1;
let d1_i2;
let d1_i3;
let d1_i4
let d1_i5;

let d2_i2;
let d3_i2;
let d2_i3;
let d3_i3;
let d5_i1;

let d4_i1_d2_i4;
let d4_i2;
let d4_i3;
let d4_i4_d3_i4;
let d4_i5;
let d4_i6;
let d4_i7_d5_i2;
let d4_i8;
let d4_i9;

let d2_i5;
let d3_i5;
let d5_i3;

let d2_i6;
let d3_i6;
let d5_i4;

let d3_i7;
let d5_i5;

let d6_i1;
let d6_i2;
let d6_i3;
let d6_i4;
let d6_i5_d3_i8;

let palavra1;
let palavra2;
let palavra3;
let palavra4;
let palavra5;
let palavra6;

// Série de funções que serão cada uma chamada em um dos inputs das letras. Basicamente, essas funções
// pegam a letra digitada no determinado input e utilizam o método keysThatMatch de Tries na posição
// em que aquela letra fica na palavra. Depois disso testa se alguma das palavras retornadas no método
// são a palavra daquela posição e, se alguma dessas checagens for verdadeira, deixa o determinado input
// verde. Se não, o deixa vermelho. Essa função também desabilita o botão de finalizar e os inputs.



// Palavra 1

function getd1i1() {
    d1_i1_d3_i1 = document.getElementById("dica1-item1-dica3-item1");
    let keys = transportes.keysThatMatch(`${d1_i1_d3_i1.value}....`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'carro') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d1_i1_d3_i1.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d1_i1_d3_i1.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd1i2() {
    d1_i2 = document.getElementById("dica1-item2");
    let keys = transportes.keysThatMatch(`.${d1_i2.value}...`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'carro') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d1_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d1_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd1i3() {
    d1_i3 = document.getElementById("dica1-item3");
    let keys = transportes.keysThatMatch(`..${d1_i3.value}..`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'carro') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d1_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d1_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd1i4() {
    d1_i4 = document.getElementById("dica1-item4");
    let keys = transportes.keysThatMatch(`...${d1_i4.value}.`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'carro') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d1_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d1_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd1i5() {
    d1_i5 = document.getElementById("dica1-item5");
    let keys = transportes.keysThatMatch(`....${d1_i5.value}`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'carro') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d1_i5.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d1_i5.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}


//Palavra 2
function getd2i1() {
    d2_i1 = document.getElementById("dica2-item1");
    let keys = transportes.keysThatMatch(`${d2_i1.value}.....`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'onibus') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d2_i1.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d2_i1.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd2i2() {
    d2_i2 = document.getElementById("dica2-item2");
    let keys = transportes.keysThatMatch(`.${d2_i2.value}....`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'onibus') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d2_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d2_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd2i3() {
    d2_i3 = document.getElementById("dica2-item3");
    let keys = transportes.keysThatMatch(`..${d2_i3.value}...`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'onibus') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d2_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d2_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd2i4() {
    d4_i1_d2_i4 = document.getElementById("dica4-item1-dica2-item4");
    let keys = transportes.keysThatMatch(`...${d4_i1_d2_i4.value}..`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'onibus') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d4_i1_d2_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d4_i1_d2_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd2i5() {
    d2_i5 = document.getElementById("dica2-item5");
    let keys = transportes.keysThatMatch(`....${d2_i5.value}.`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'onibus') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d2_i5.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d2_i5.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd2i6() {
    d2_i6 = document.getElementById("dica2-item6");
    let keys = transportes.keysThatMatch(`.....${d2_i6.value}`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'onibus') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d2_i6.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d2_i6.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

//Palavra 3

function getd3i2() {
    d3_i2 = document.getElementById("dica3-item2");
    let keys = transportes.keysThatMatch(`.${d3_i2.value}......`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'caminhao') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d3_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d3_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd3i3() {
    d3_i3 = document.getElementById("dica3-item3");
    let keys = transportes.keysThatMatch(`..${d3_i3.value}.....`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'caminhao') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d3_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d3_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd3i4() {
    d4_i4_d3_i4 = document.getElementById("dica4-item4-dica3-item4");
    let keys = transportes.keysThatMatch(`...${d4_i4_d3_i4.value}....`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'caminhao') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d4_i4_d3_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d4_i4_d3_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd3i5() {
    d3_i5 = document.getElementById("dica3-item5");
    let keys = transportes.keysThatMatch(`....${d3_i5.value}...`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'caminhao') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d3_i5.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d3_i5.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd3i6() {
    d3_i6 = document.getElementById("dica3-item6");
    let keys = transportes.keysThatMatch(`.....${d3_i6.value}..`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'caminhao') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d3_i6.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d3_i6.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd3i7() {
    d3_i7 = document.getElementById("dica3-item7");
    let keys = transportes.keysThatMatch(`......${d3_i7.value}.`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'caminhao') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d3_i7.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d3_i7.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd3i8() {
    d6_i5_d3_i8 = document.getElementById("dica6-item5-dica3-item8");
    let keys = transportes.keysThatMatch(`.......${d6_i5_d3_i8.value}`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'caminhao') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d6_i5_d3_i8.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d6_i5_d3_i8.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

// Palavra 4

function getd4i2() {
    d4_i2 = document.getElementById("dica4-item2");
    let keys = transportes.keysThatMatch(`.${d4_i2.value}.......`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'bicicleta') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d4_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d4_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd4i3() {
    d4_i3 = document.getElementById("dica4-item3");
    let keys = transportes.keysThatMatch(`..${d4_i3.value}......`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'bicicleta') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d4_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d4_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd4i5() {
    d4_i5 = document.getElementById("dica4-item5");
    let keys = transportes.keysThatMatch(`....${d4_i5.value}....`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'bicicleta') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d4_i5.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d4_i5.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}


function getd4i6() {
    d4_i6 = document.getElementById("dica4-item6");
    let keys = transportes.keysThatMatch(`.....${d4_i6.value}...`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'bicicleta') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d4_i6.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d4_i6.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd4i8() {
    d4_i8 = document.getElementById("dica4-item8");
    let keys = transportes.keysThatMatch(`.......${d4_i8.value}.`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'bicicleta') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d4_i8.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d4_i8.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd4i9() {
    d4_i9 = document.getElementById("dica4-item9");
    let keys = transportes.keysThatMatch(`........${d4_i9.value}`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'bicicleta') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d4_i9.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d4_i9.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

// Palavra 5

function getd5i1() {
    d5_i1 = document.getElementById("dica5-item1");
    let keys = transportes.keysThatMatch(`${d5_i1.value}....`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'metro') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d5_i1.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d5_i1.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd5i2() {
    d4_i7_d5_i2 = document.getElementById("dica4-item7-dica5-item2");
    let keys = transportes.keysThatMatch(`.${d4_i7_d5_i2.value}...`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'metro') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d4_i7_d5_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d4_i7_d5_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd5i3() {
    d5_i3 = document.getElementById("dica5-item3");
    let keys = transportes.keysThatMatch(`..${d5_i3.value}..`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'metro') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d5_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d5_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd5i4() {
    d5_i4 = document.getElementById("dica5-item4");
    let keys = transportes.keysThatMatch(`...${d5_i4.value}.`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'metro') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d5_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d5_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd5i5() {
    d5_i5 = document.getElementById("dica5-item5");
    let keys = transportes.keysThatMatch(`....${d5_i5.value}`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'metro') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d5_i5.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d5_i5.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

//Palavra 6

function getd6i1() {
    d6_i1 = document.getElementById("dica6-item1");
    let keys = transportes.keysThatMatch(`${d6_i1.value}....`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'aviao') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d6_i1.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d6_i1.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}


function getd6i2() {
    d6_i2 = document.getElementById("dica6-item2");
    let keys = transportes.keysThatMatch(`.${d6_i2.value}...`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'aviao') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d6_i2.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d6_i2.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd6i3() {
    d6_i3 = document.getElementById("dica6-item3");
    let keys = transportes.keysThatMatch(`..${d6_i3.value}..`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'aviao') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d6_i3.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d6_i3.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

function getd6i4() {
    d6_i4 = document.getElementById("dica6-item4");
    let keys = transportes.keysThatMatch(`...${d6_i4.value}.`)
    let pertence = false
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'aviao') {
            pertence = true;           
        }      
    }
    if (pertence) {
        d6_i4.style.backgroundColor = "rgba(190, 255, 190, 0.801)";
    } else {
        d6_i4.style.backgroundColor = "rgba(255, 158, 158, 0.746)";
    }
}

// Exibição das dicas na tela, criando tags li que recebem como texto os elementos extraídos
// a partir do método remove de ArrayQueue, ou seja, retornando na ordem em que foram adicionados

let pDicas = document.getElementById("dicas");
var li;
var dica;
for (let i = 0; i < dicas.length; i++){
    li = document.createElement("li");
    dica = dicasExibir.remove();
    li.innerText = `${dica}`;
    pDicas.appendChild(li);
}


// Função utilizada no botão resultado. Ela pega o que foi escrito em todos os inputs e com eles monta as palavras.
// Despois, testa, com o método get de Trie, se a palavra formada equivale ao valor associado que deveria, deixando os
// inputs daquela palavra vermelhors casa essa equivalência seja falsa. Além disso, essa função preenche todas as palavras
// com o mesmo padrão, tanto os espaços já preenchidos quanto os vazios. E também testa se todas as palavras preenchidas
// estão corretas, exibindo uma mensagem em caso positivo e outra em caso negativo.


function resultado() {
     d2_i1 = document.getElementById("dica2-item1");
     d1_i1_d3_i1 = document.getElementById("dica1-item1-dica3-item1");
     d1_i2 = document.getElementById("dica1-item2");
     d1_i3 = document.getElementById("dica1-item3");
     d1_i4 = document.getElementById("dica1-item4");
     d1_i5 = document.getElementById("dica1-item5");

     d2_i2 = document.getElementById("dica2-item2");
     d3_i2 = document.getElementById("dica3-item2");
     d2_i3 = document.getElementById("dica2-item3");
     d3_i3 = document.getElementById("dica3-item3");
     d5_i1 = document.getElementById("dica5-item1");

     d4_i1_d2_i4 = document.getElementById("dica4-item1-dica2-item4");
     d4_i2 = document.getElementById("dica4-item2");
     d4_i3 = document.getElementById("dica4-item3");
     d4_i4_d3_i4 = document.getElementById("dica4-item4-dica3-item4");
     d4_i5 = document.getElementById("dica4-item5");
     d4_i6 = document.getElementById("dica4-item6");
     d4_i7_d5_i2 =document.getElementById("dica4-item7-dica5-item2");
     d4_i8 = document.getElementById("dica4-item8");
     d4_i9 = document.getElementById("dica4-item9");

     d2_i5 = document.getElementById("dica2-item5");
     d3_i5 = document.getElementById("dica3-item5");
     d5_i3 = document.getElementById("dica5-item3");

     d2_i6 = document.getElementById("dica2-item6");
     d3_i6 = document.getElementById("dica3-item6");
     d5_i4 = document.getElementById("dica5-item4");

     d3_i7 = document.getElementById("dica3-item7");
     d5_i5 = document.getElementById("dica5-item5");

     d6_i1 = document.getElementById("dica6-item1");
     d6_i2 = document.getElementById("dica6-item2");
     d6_i3 = document.getElementById("dica6-item3");
     d6_i4 = document.getElementById("dica6-item4");
     d6_i5_d3_i8 = document.getElementById("dica6-item5-dica3-item8");

     palavra1 = d1_i1_d3_i1.value + d1_i2.value + d1_i3.value + d1_i4.value + d1_i5.value;

     palavra2 = d2_i1.value + d2_i2.value + d2_i3.value + d4_i1_d2_i4.value + d2_i5.value + d2_i6.value;
    
     palavra3 = d1_i1_d3_i1.value + d3_i2.value + d3_i3.value + d4_i4_d3_i4.value + d3_i5.value + d3_i6.value + d3_i7.value + d6_i5_d3_i8.value;

     palavra4 = d4_i1_d2_i4.value + d4_i2.value + d4_i3.value + d4_i4_d3_i4.value + d4_i5.value + d4_i6.value + d4_i7_d5_i2.value + d4_i8.value + d4_i9.value;

     palavra5 = d5_i1.value + d4_i7_d5_i2.value + d5_i3.value + d5_i4.value + d5_i5.value;

     palavra6 = d6_i1.value + d6_i2.value + d6_i3.value  + d6_i4.value + d6_i5_d3_i8.value;

     let correto = true;


     //Check Palavra 1
     let dica1 = document.getElementsByClassName("dica1");
     let p1 = "CARRO";
     if (transportes.get(palavra1) != 1){
         correto = false;
         for (let i = 0; i < dica1.length; i++){
             dica1[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
         }
     }
     for (let i = 0; i < p1.length;i++){
         dica1[i].value = p1[i];
     }

     //Check palavra 2
     let dica2 = document.getElementsByClassName("dica2");
     let p2 = "ÔNIBUS";
     if (transportes.get(palavra2) != 2){
         correto = false;
         for (let i = 0; i<dica2.length; i++){
             dica2[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
         }
     }
     for (let i = 0; i < p2.length;i++){
         dica2[i].value = p2[i];
     }
     
     //Check palavra 3

     let dica3 = document.getElementsByClassName("dica3");
     let p3 = "CAMINHÃO";
     if (transportes.get(palavra3) != 3){
         correto = false;
         for (let i = 0; i<dica3.length; i++){
             dica3[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
         }
     }
     for (let i = 0; i < p3.length;i++){
         dica3[i].value = p3[i];
     }

     //Check palavra 4

     let dica4 = document.getElementsByClassName("dica4");
     let p4 = "BICICLETA";
     if (transportes.get(palavra4) != 4){
         correto = false;
         for (let i = 0; i < dica4.length; i++){
             dica4[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
         }
     }
     for (let i = 0; i < p4.length;i++){
         dica4[i].value = p4[i];
     }

     //Check palavra 5

     let dica5 = document.getElementsByClassName("dica5");
     let p5 = "METRÔ";
     if (transportes.get(palavra5) != 5){
         correto = false;
         for (let i = 0; i < dica5.length; i++){
             dica5[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
         }
     }
     for (let i = 0; i < p5.length;i++){
         dica5[i].value = p5[i];
     }

     //Check palavra 6

     let dica6 = document.getElementsByClassName("dica6");
     let p6 = "AVIÃO";
     if (transportes.get(palavra6) != 6){
         correto = false;
         for (let i = 0; i < dica6.length; i++){
             dica6[i].style.backgroundColor = "rgba(255, 158, 158, 0.746)";
         }
     }
     for (let i = 0;i < p6.length;i++){
         dica6[i].value = p6[i];
     }

    // Mensagem de resultado
    let res = document.getElementById("resultado");
    res.style.marginTop = "10px";
    res.style.marginBottom = "20px";
    if (correto){
        res.innerText = "PARABÉNS, VOCÊ ACERTOU TUDO! Aperte o botão abaixo para jogar novamente.";
    } else{
        res.innerText = "Não foi dessa vez! Aperte o botão abaixo para jogar novamente.";
    }

    // Desabilitando botão após o primeiro click
    document.getElementById("finalizar").disabled = true;

    let inputs = document.getElementsByClassName("usable");
    for (let i of inputs){
        i.disabled = true;
    }

}

// Função que recarrega a página
function jogarNovamente(){
    document.location.reload(true);
}
