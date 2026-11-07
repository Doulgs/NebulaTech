# Navegação por scroll e compatibilidade SDK 58

## Comportamento

A barra usa superfície escura translúcida, realce arredondado na aba ativa e “+” separado. Ao acumular 20 px de movimento para baixo, a superfície reduz para escala horizontal 0,965 e vertical 0,82; ao rolar para cima, retorna à escala 1. A área interativa e os ícones não são comprimidos. O botão “+” reduz apenas a camada visual em 10%, mantendo seu alvo de toque. O início da página e a troca de rota restauram a barra.

O handler de scroll e as transformações usam Reanimated no runtime de UI, sem atualizar estado React a cada frame. Spring de 300 ms, dampingRatio 1; movimento reduzido é respeitado. Overscroll e movimentos pequenos não ficam alternando o estado.

Headers de Home, Histórico, Carteira, Análises, Categorias, Membros, Perfil e Chat acompanham o conteúdo. As abas principais não mostram “Voltar”. Perfil pode voltar; folhas e detalhes usam “Fechar” à direita, com título e subtítulo à esquerda.

## Origem dos warnings e correção

- `ImageBackground`: o registro automático do react-native-css-interop 0.2.7 acessava a API obsoleta, mesmo sem uso no app. O registro e o import não utilizados foram removidos nos arquivos de runtime source/dist.
- Reanimated: css-interop e Gorhom 5.2.14 forneciam argumentos de dependências a hooks nativos de Reanimated 4.7.1. As dependências agora são enviadas somente na web. Isso inclui `useAnimatedScrollHandler`, que encaminha as dependências para `useHandler`.

O patch está em `patches/sdk58-compat.json` e é reaplicado por `postinstall`, com verificação de versão e SHA-256 antes/depois. Não há filtro de LogBox, alteração do logger ou downgrade. O script valida todos os arquivos antes de gravar; executá-lo novamente não altera arquivos já corrigidos.

## Provas

- `npm ci` reinstalou as dependências e reaplicou o patch automaticamente; a aplicação adicional ao handler de scroll usa o mesmo mecanismo validado.
- Teste executa o registro compilado com getter que lança erro se ImageBackground for acessado. Registros de Image, ScrollView e KeyboardAvoidingView permanecem.
- Teste executa os 32 argumentos condicionais com plataformas iOS e Android e verifica que retornam undefined sem avaliar dependências web.
- Testes financeiros, persistência e manifesto preservados.
- Lint, TypeScript, Expo Doctor 20/20 e exportação iOS/Android/web passaram durante a implementação.
- Na web em 390 × 844: rolagem 0 → 500 moveu o header de top 0 para −500 e recolheu a barra para matrix(0.965, 0, 0, 0.82, 0, 0). Rolagem 500 → 350 restaurou matrix(1, 0, 0, 1, 0, 0).
- Carteira não apresentou botão de voltar. A folha Nova transação mostrou título, subtítulo e botão Fechar em x=326, com alvo 44 × 44; o botão retornou à Carteira.

A prova dos warnings nativos combina identificação dos call sites, execução isolada e bundle nativo. Ainda é necessário reabrir o aplicativo no Expo Go para conferir os logs da execução no aparelho; não foi alegada captura de logs nativos nesta validação.
