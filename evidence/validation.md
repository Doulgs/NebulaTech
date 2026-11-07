# Validação — Nébula Finance

Referência importada pelo MCP Claude Design: `Nebula Finance v2.dc.html` e `support.js`, projeto `0f987e80-e5ed-4dc2-a17a-6c8e5afd319a`.

Verificações automatizadas concluídas:

- `npm run lint`: passou, sem avisos.
- `npm run typecheck`: passou.
- `npm test`: 16 asserções passaram, incluindo formatos monetários, agendamentos, saldo, categorias, separação de meses, transferências e recorrências em fim de mês/ano.
- `npm run export`: bundles iOS, Android e web gerados em `dist/`.
- `npx expo-doctor`: 20/20 checks passaram.
- `git diff --check`: passou.

Fluxos exercitados no navegador, com largura de celular:

- Login inválido apresenta erro; login demonstrativo entra e persiste após recarga.
- Formulário vazio bloqueia lançamento. Despesa de R$ 123,45 com recorrência mensal gera 12 ocorrências; somente a primeira altera o saldo de R$ 23.847,92 para R$ 23.724,47 e as despesas de R$ 4.912,35 para R$ 5.035,80.
- Busca sem correspondência exibe estado vazio. Histórico mostra as ocorrências futuras como agendadas.
- Bloqueio de cartão persiste após recarga. Pagamento local da fatura Black zera a fatura, libera o limite e reduz o saldo por R$ 3.842,10.
- Gráfico por categoria responde à seleção. Filtro 3M mostra o período correspondente.
- Chat simulado responde com o valor atualizado de Mercado (R$ 1.408,05 após o lançamento de teste).
- Categoria com orçamento de R$ 800,00 permanece após recarga. Uma falha simulada no armazenamento mantém os campos preenchidos; restaurar o armazenamento e tentar novamente salva com sucesso.
- Convite demonstrativo incrementa a lista e pode ser cancelado.
- Console sem erros na leitura final das categorias.

O app foi aberto no Expo Go no simulador iPhone 17 Pro (iOS 26.5), usando `exp://127.0.0.1:8091`. A captura `ios-auth.png` comprova a tela nativa de acesso. A primeira tentativa via IP da rede local falhou; o endereço local resolveu. Os demais fluxos foram exercitados no navegador; a interação completa em aparelho físico e Android ainda precisa de validação.

Os registros criados para o teste foram removidos da demonstração do navegador.
