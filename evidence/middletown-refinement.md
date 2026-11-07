# Refinamento visual e arquitetura

## Referência verificada

O Middletown foi consultado em `/Users/douglas.domiciano/IrrahTech/Delaware/delaware-middletown` nesta sessão. A referência arquitetural inclui `components/billing/billing-screen/{core,parts}`, `components/layout/screen-header`, `hooks/use-dashboard.ts`, `services/dashboard-service.ts`, `services/query-client.ts`, `stores/theme-store.ts` e `theme/colors.ts`.

Foram adotados os limites de responsabilidade, mantendo os contratos e os dados da Nebula. A SDK 58 e as versões das dependências foram preservadas. Não foram copiados endpoints, fluxos comerciais ou a SDK 57 do Middletown.

## Direção e crítica visual

Produto: finanças pessoais e familiares. Trabalho principal: entender saldo disponível, orçamento e últimos movimentos, com acesso rápido a registrar transações.

Paleta: fundo índigo `#0C0C16`, superfície `#171724`, superfície elevada `#202032`, texto `#F4F2FC`, lilás `#B9A2FF`, menta `#8CD9BF`. Manrope acompanha leitura e ações; Space Grotesk distingue valores financeiros. Os tokens estão compartilhados entre NativeWind e código nativo.

Composição escolhida: identidade no header fixo, painel de saldo, atalhos, orçamento, categorias e movimentos. A assinatura orbital fica concentrada no painel de saldo. A revisão retirou o campo de estrelas das telas de dados, reduziu fundos coloridos nos cards de categoria e acrescentou nomes às abas. A identidade Nebula foi preservada; não foram geradas imagens adicionais para decorar a interface.

As cinco skills solicitadas orientaram o trabalho: Frontend Design para direção e crítica; Creative Production no tratamento de estilo e preservação da identidade; Expo UI para a preferência nativa com Host/Switch; Expo Animation para feedback de toque; Caveman para comunicação concisa. A captura da Home registra o resultado visual implementado.

## Organização

- Rotas declaram a tela de domínio.
- `components/ui` concentra primitivas; imports diretos evitam um barrel global.
- `components/layout` mantém header, navegação, contexto e bottom sheets.
- Telas ficam em componentes por domínio. Home, carteira e histórico compõem `parts` a partir de um `core` enxuto.
- `hooks` concentra acesso aos dados, filtros e ações do dashboard, carteira e histórico.
- `services` mantém QueryClient, query keys, contrato de persistência e fila de escrita.
- React Query compartilha o snapshot financeiro; Zustand mantém avisos transitórios.
- O adapter e os dados continuam na pasta `mock`. A chave `@nebula/finance-v1` foi preservada.

## Verificação realizada

- Lint e TypeScript sem erros ou avisos.
- 16 verificações financeiras e 9 casos do protocolo do manifesto preservados.
- 7 verificações do serviço: hidratação compartilhada, atualizações concorrentes sem perda de dados, falha sem publicar estado não persistido, fila recuperável e nova tentativa de leitura.
- Expo Doctor: 20/20; dependências compatíveis com SDK 58.
- Exportação para iOS, Android e web concluída.
- Navegador em 390 × 844: login demonstrativo; preferência nativa de ocultar valores; navegação para Home e carteira; lançamento de R$ 42,50; fatura de R$ 3.842,10 paga pelo BottomSheetModal.
- Após o lançamento: saldo R$ 23.805,42 e despesas R$ 4.954,85. Após o pagamento: fatura R$ 0,00 e saldo R$ 19.963,32.
- Header principal permaneceu em top 0 com rolagem de 600 px. Header da folha permaneceu em top 90,56 com rolagem interna de 160 px.
- Tela de 320 × 740 com movimento reduzido: valores adaptados à largura, sem overflow horizontal.
- Busca no histórico por Spotify retornou 1 transação de R$ 21,90.
- Dados exclusivos desta validação removidos do contexto isolado do navegador após o teste.

## Movimento e limites da prova

Feedback de toque: transform/opacity, Reanimated CSS, curva cubicBezier(0.23, 1, 0.32, 1), 120 ms, escala 0,97. Não há animação entre abas, ciclos decorativos ou processamento JS por frame. Movimento reduzido remove escala e duração. Sheets existentes continuam com Gorhom, conforme a solicitação anterior.

Exportar bundles nativos não comprova fluidez em dispositivo. Sensação do toque, teclado, gesto de fechar sheets e interrupção durante movimento precisam de teste em build release no Android mais lento suportado e no iPhone. Não foi alegada validação dessa performance em Expo Go ou simulador.
