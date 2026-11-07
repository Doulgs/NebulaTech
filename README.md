# Nébula Finance

App Expo / React Native baseado no projeto **Nebula Finance v2**, importado pelo MCP Claude Design. A implementação usa componentes nativos; o HTML não é executado em WebView.

## Executar

Requer Node.js compatível com Expo SDK 58, npm e Expo Go atualizado.

```sh
npm ci
npm start
```

- Web: `npm run web`, em http://localhost:8090.
- iOS: `npm run ios` para abrir o simulador pelo endereço local.
- Android: `npm run android` com um emulador iniciado, ou leia o QR code pelo Expo Go.
- O projeto usa a porta 8090 porque 8081 já estava ocupada por Docker nesta máquina. Pode alterar com `npx expo start --port 8092`.
- Não é necessário configurar chaves, serviços ou backend.

Na tela inicial, use **Explorar demonstração** ou informe qualquer e-mail válido e senha de pelo menos 6 caracteres. A senha não é persistida nem enviada. Google e Apple são entradas demonstrativas, identificadas na interface. Recuperação de senha explica a limitação local.

## Funcionalidades

- Acesso e criação de perfil locais; sessão persistente e saída pelo avatar.
- Resumo, visibilidade de valores, calendário de outubro e despesas por categoria.
- Histórico com busca, filtros por tipo, categoria e membro; detalhes e comprovante compartilhável de demonstração.
- Cadastro de receitas, despesas e transferências; data, membro e recorrência semanal, mensal ou anual, de 2 a 36 ocorrências.
- Carteira com três cartões, seleção, bloqueio e pagamento local da fatura com atualização do saldo e histórico.
- Análises com gráfico por categoria, período de 3 ou 6 meses e seleção de mês.
- Categorias com orçamento, cores e criação de novas categorias.
- Membros, limites e convites locais com validação de e-mail e cancelamento.
- Chat simulado que consulta os dados locais e mantém a conversa.

## Estilos, headers e modais

O app usa **NativeWind 4.2.7 + Tailwind CSS 3.4**, com tokens compartilhados em `src/theme/colors.json` e `src/theme/tokens.json`, classes nas telas e componentes compartilhados e composição de classes por `tailwind-merge`. As cores definidas pelo usuário, percentuais dos gráficos, safe areas e efeitos nativos continuam sendo valores calculados em `style`.

Os headers das telas ficam dentro da área rolável. As abas principais não mostram botão de voltar; perfil e detalhes têm navegação de retorno. Nas folhas, o header tem título, subtítulo e botão de fechar à direita, separado da área de conteúdo.

Os formulários de lançamento, criação de categoria e detalhes da transação usam `BottomSheet` de `@gorhom/bottom-sheet`. A confirmação de pagamento usa `BottomSheetModal`. A raiz inclui `GestureHandlerRootView`, `BottomSheetModalProvider` e `QueryClientProvider`. Os inputs das folhas usam `BottomSheetTextInput` no iOS/Android; na web usam `TextInput` para compatibilidade com React Native Web. As folhas fecham pelo botão, backdrop, gesto de arrastar ou voltar no Android. Links diretos têm retorno seguro para o Início.

As bibliotecas adicionais solicitadas estão instaladas; módulos Expo e dependências nativas usam as versões compatíveis com SDK 58. React/React DOM usam 19.3.0 e React Native 0.88.1, compatíveis com SDK 58. React Query mantém o snapshot financeiro e deduplica a hidratação. Zustand cuida dos avisos transitórios da interface. React Hook Form, resolvers, Zod, Axios e date-fns continuam disponíveis para as próximas integrações. O perfil usa `Host` e `Switch` universais do `@expo/ui` para a preferência de privacidade.

A referência foi consultada novamente pelo MCP. O `Nebula Finance v2.dc.html` e o `support.js` retornaram o mesmo conteúdo da importação anterior (etags `1793599269401265` e `1793597137058884`).

## Dados e futura integração

```text
mock/
  seed.json      # dados importados: contas, cartões, membros, categorias e transações
  index.ts       # criação do estado inicial e sugestões do chat
  storage.ts     # repositório local baseado em AsyncStorage
src/
  app/           # rotas Expo Router
  components/
    ui/          # primitivas visuais, feedback de toque e controles nativos
    layout/      # headers fixos, navegação e bottom sheets
    dashboard/   # home-screen/core e parts
    wallet/      # cards-screen/core e parts
    transactions/ # histórico, cadastro e detalhe
    ...          # auth, analytics, family, categories, assistant e profile
  hooks/         # dados, filtros e ações das telas
  services/      # query client, query keys e serviço financeiro serializado
  stores/        # estado transitório da interface (Zustand)
  theme/         # cores, tipografia, espaçamento, raios e movimento
  types/         # contratos de domínio
  utils/         # formatação e cálculos financeiros
```

A organização segue os mesmos limites de responsabilidade observados no Middletown: rotas declarativas, componentes por domínio, composição `core`/`parts`, hooks, services, stores, types e utils.

O ponto para integrar o backend é o contrato de repositório em `src/services/core/finance-service-core.ts`. `src/services/finance-service.ts` conecta esse contrato ao adapter em `mock/storage.ts`; as telas não acessam AsyncStorage diretamente. Os dados persistem no dispositivo (AsyncStorage) ou no navegador (localStorage), separados por instalação/origem. Os formulários só fecham após a gravação terminar e preservam os campos em caso de falha.

A demonstração preserva **19/10/2026**, a data de referência do design, mesmo que o relógio atual esteja em outro mês. Datas posteriores ficam agendadas e não alteram o saldo atual. Recorrências em dias inexistentes são ajustadas para o último dia do mês; por exemplo, 31/01 → 28/02.

Os totais iniciais e o histórico parcial são os do design original: não representam um extrato completo reconciliado. Novos lançamentos atualizam o saldo; os realizados em outubro também atualizam os resumos e categorias de outubro. Pagamentos de fatura são transferências para evitar contar a despesa duas vezes. O gráfico de fluxo do saldo é uma série histórica ilustrativa identificada na tela.

Os convites não enviam e-mail, os cartões não têm vínculo bancário, e o chat responde por regras locais, sem um modelo de IA ou chave de API. Uma autenticação real, isolamento de contas e todos os serviços externos dependem do backend futuro.

## Validação

```sh
npm test
npm run typecheck
npm run lint
npm run export
npx expo-doctor
```

Os testes verificam valores monetários, impacto de lançamentos no saldo e categorias, agendamentos, separação de meses, pagamento de fatura e recorrências em viradas de mês/ano.

As referências originais (`Nebula Finance v2.dc.html` e `support.js`) estão em `../design/`. Os arquivos são somente referência; o app não depende do runtime web do Claude Design.

## Expo Go por túnel e assets

O Expo CLI do SDK 58 normaliza o cabeçalho `X-Forwarded-Proto` dos túneis. O patch temporário criado para SDK 57 foi removido; a correção agora vem do próprio CLI.

`npm test` inclui 9 cenários de cabeçalhos do manifesto, além dos 16 testes financeiros e 7 verificações do serviço de persistência. Para abrir no celular fora da rede local, execute `npm start -- --tunnel`. Após alterar configuração do Metro do NativeWind, reinicie o servidor e leia o QR code novamente.

## Direção visual e movimento

A identidade Nebula foi refinada com fundos índigo, superfícies sólidas, contraste lilás, Manrope para leitura e Space Grotesk para valores. O fundo usa um degradê violeta profundo até o preto; saldo e orçamento ficam no mesmo painel, seguindo a referência visual. Os headers acompanham a rolagem, a barra flutuante usa ícones com rótulos acessíveis e o formulário mantém os dados após falhas.

Feedback de toque usa Reanimated CSS: escala 0,97 e opacidade em 120 ms, curva `cubicBezier(0.23, 1, 0.32, 1)`. Movimento reduzido remove escala e transição. As abas não deslizam. Os bottom sheets existentes continuam sob responsabilidade do Gorhom, conforme o escopo anterior.

A barra e ações do header usam `GlassSurface`: Liquid Glass via `expo-glass-effect` no iOS compatível, respeitando a preferência de reduzir transparência, backdrop blur na web e acabamento translúcido nas demais plataformas. O botão “+” fica dentro da barra, na posição central. Há cinco elementos: Início, Carteira, Nova transação, Análises e Assistente. O histórico continua acessível por “Ver tudo” na Home e filtros de categorias. O sino abre a folha de lançamentos agendados.

A barra flutuante reduz a superfície ao rolar para baixo e recupera o tamanho ao rolar para cima ou chegar ao início. A animação mantém os alvos de toque, usa Reanimated no runtime de UI e respeita movimento reduzido. A troca de aba restaura a barra.

`npm ci` aplica correções de compatibilidade verificadas por hash em NativeWind e Gorhom: remove o registro não utilizado de ImageBackground e passa dependências de hooks Reanimated somente na web. As versões são verificadas antes de aplicar; uma atualização desses pacotes exige revisar o patch em `patches/sdk58-compat.json`. `npm test` verifica o registro sem acessar a API obsoleta e a omissão das dependências no iOS/Android. Não há supressão de logs.

Os cards de conteúdo usam superfícies mais opacas, raio de 20 pontos e sombras discretas. O vidro fica na camada de navegação e controles. A paleta violeta foi mantida; no iOS, textos e valores usam a fonte System (San Francisco). A aba ativa usa uma cápsula fosca e o botão central é uma ação, sem estado de aba selecionada.
