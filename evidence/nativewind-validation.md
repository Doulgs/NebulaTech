# Validação da refatoração NativeWind / SDK 57

- Referência relida pelo MCP Claude Design: HTML v2 e support.js, sem diferença de conteúdo para as cópias importadas.
- As 24 dependências solicitadas foram conferidas no package.json e na instalação; NativeWind 4.2.7 e Tailwind 3.4 configurados.
- Migração de SDK 58 para 57: React 19.2.3 / React Native 0.86.3 e módulos nativos compatíveis. Os intervalos solicitados foram preservados.
- Telas e componentes migrados para NativeWind. Nenhum StyleSheet.create restante no app. Estilos calculados e slots nativos de bibliotecas preservados em style.
- Headers fora da área rolável. No navegador: header de Início com top=0 antes e após scrollTop=700. Header da folha com top=98.88 antes e após scrollTop=223 do formulário.
- Bottom sheets: criação de lançamento, categoria, detalhes de transação e confirmação de pagamento. Folhas de formulário integradas ao Expo Router e retorno seguro ao abrir URL diretamente.
- Despesa de R$ 42,50 salva pelo formulário: saldo R$ 23.805,42 e despesas R$ 4.954,85. Formulário vazio mostra erro de validação. Botão Voltar fecha a folha.
- Corrigida incompatibilidade do BottomSheetTextInput com o browser: input comum na web; input integrado ao bottom sheet nos dispositivos.
- App do SDK 57 abriu no Expo Go do iPhone 17 Pro e entrou no dashboard via botão de demonstração. A interação de teclado/gestos nativos foi interrompida pelo bloqueio do Mac e não foi concluída. Android exige validação em execução.

Os testes de cálculo financeiro existentes foram preservados. Consulte o resultado final dos comandos de lint, TypeScript, testes, Expo Doctor e exportação no relatório de entrega.

## Correção do warning de assets no Expo Go

A inspeção do túnel registrou `X-Forwarded-Proto: http, http`. O manifesto original tinha `launchAsset.url` começando por `http, http://` e não incluía `iconUrl`. O erro vinha do `bundleUrl.match(...)[0]` no Expo CLI, e não dos PNGs ou arquivos de fonte.

Foi criado um patch versionado para @expo/cli 57.0.32, aplicado por `postinstall`. Testes do parser cobrem protocolo ausente, HTTP/HTTPS, valores duplicados, arrays, espaços, maiúsculas e esquemas inválidos. Nove casos passaram. O servidor do túnel na porta 8082 foi reiniciado. As requisições externas pelo túnel, simulando iOS e Android e cabeçalho duplicado, retornaram URLs HTTPS válidas, ícone com HTTP 200 (51.201 bytes) e fonte Manrope com HTTP 200 (98.080 bytes).

## Checks finais

- Lint e TypeScript: passaram sem avisos.
- Testes: 16 casos financeiros e 9 casos de protocolo do manifesto passaram.
- Expo Doctor: 21/21 checks.
- Bundles iOS, Android e web exportados após a refatoração. O patch posterior altera apenas a interpretação de headers no servidor de desenvolvimento.
- Postinstall reaplicou o patch do CLI com sucesso.
- Confirmação de pagamento aberta via BottomSheetModal no navegador, sem erros no console.
- Pagamento simulado zerou a fatura e reduziu o saldo em R$ 3.842,10; a folha fechou após salvar. Os lançamentos de validação foram removidos ao final.
