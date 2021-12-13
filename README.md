# projeto-final-estruturas-de-dados

Projeto final da disciplina de Estruturas de Dados

https://rodrigodesan.github.io/projeto-final-estruturas-de-dados/index.html

---

## Estruturas utilizadas

### Tries

- Por estarmos lidando com palavras e pelo fator de busca rápida foi escolhida a estrutura Trie. Importante observar que: a Trie implementada no nosso código é uma versão modificada, que converte caracteres especiais e letras maiúsculas em caracteres minúsculos e normais, assim mantendo o alfabeto da Trie em 26, deixando a estrutura mais eficiente.

- A função `keysThatMach(s)` retorna as chaves que casam com o padrão inserido _s_. Ela foi utilizada nas funções que verificam se o caractere digitado pertence aquele espaço ou não.

- Também foi utilizada a função `get(key)` na função `resultado()`. Onde quando a função é chamada, para cada palavra é feita uam verificação usando o _get_, em que a palavra digitada pelo usuária é enviada como imput e o valor de retorno é comparado com o valor associado à chave.

### Filas

- As dicas foram armazenadas na fila utilizando a função `add(x)`.

- Para que as dicas fossem exibidas na ordem correta elas foram retiradas utilizando a função `remove()`.
