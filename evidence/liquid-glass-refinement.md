# Ajuste a partir da referência visual

Barra inferior restaurada com cinco ícones, seleção circular e botão “+” separado. Rótulos acessíveis preservados. O layout mantém alvos de toque de 44 pontos, inclusive na largura de 320 pontos.

`GlassSurface` usa `expo-glass-effect` quando as APIs de Liquid Glass estão disponíveis no iOS e a preferência de reduzir transparência está desativada. A composição mantém a camada de vidro fora da animação de opacidade dos ícones. Na web, usa backdrop-filter; em plataformas sem a API, usa superfícies translúcidas com gradiente. Não foi adicionada dependência nem alterada a SDK 58.

Fundo: violeta profundo #100B1C / #170E29 até #07060C, com brilho lateral discreto. Painel de saldo incorpora receitas, despesas, orçamento e dias restantes. Atalhos e categorias recuperam o desenho da referência. Header fixo com ícones de 17–18 pontos e avatar compacto; sino abre lançamentos agendados do mock.

Feedback de toque: escala 0,97 em 120 ms. A abertura do calendário recebe fade de 180 ms. Movimento reduzido é respeitado; abas continuam sem transição lateral. O vidro nativo produz refração conforme conteúdo se move atrás da barra, sem animação JS por frame.

Lint, TypeScript, 32 verificações financeiras/persistência/manifesto e exportação iOS/Android/web passaram durante a implementação. A inspeção visual foi feita na web em 390 × 844 e 320 × 740. O acabamento nativo do vidro e a fluidez ainda precisam de avaliação em dispositivo iOS compatível; a captura web comprova o fallback visual, não a refração nativa.

Verificação adicional: header permaneceu em top 0 após rolagem de 500 px; sino abriu os agendamentos e a seleção de Aluguel abriu os detalhes por substituição da folha, com retorno ao Início. Console sem erros nessa navegação. Prévia final: `home-liquid-glass.png`.
