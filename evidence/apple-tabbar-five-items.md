# Barra integrada e superfícies de conteúdo

Skill local instalada em `/Users/douglas.domiciano/.codex/skills/mockflow-apple-liquid-glass`, com conteúdo idêntico ao arquivo fornecido no Desktop. O MCP WireframePro não está exposto nesta sessão; não foi gerado um wireframe por essa ferramenta. As diretrizes de acabamento foram aplicadas diretamente ao aplicativo, preservando a paleta violeta já solicitada.

A barra agora contém cinco elementos: Início, Carteira, Nova transação, Análises e Assistente. “Nova transação” é uma ação central e abre a folha de cadastro, sem se apresentar como aba selecionada. O Histórico continua disponível por “Ver tudo” e pelos atalhos de categoria. A seleção usa cápsula fosca de 52 × 36, com iluminação vertical discreta e ícone de 18 pontos.

O painel de saldo usa gradiente opaco. Categorias receberam uma base sólida sob a cor de destaque; atalhos e cards usam superfícies sólidas, bordas finas e sombras discretas. Cards compartilhados usam raio de 20 pontos. O texto usa a fonte System/San Francisco no iOS; o fallback existente foi mantido nas outras plataformas.

Vidro está reservado à navegação e controles, seguindo a separação entre conteúdo e navegação descrita em https://developer.apple.com/design/human-interface-guidelines/materials. O efeito nativo continua condicionado à disponibilidade de expo-glass-effect e à preferência de reduzir transparência.

Validação: lint, TypeScript, testes financeiros/persistência/manifesto, patches de compatibilidade e exportação iOS/Android/web passaram. Na web, foram confirmados cinco elementos, botão “+” na terceira posição, um único botão de nova transação, ausência de overflow em 320 px e abertura/fechamento do formulário. A barra conservou escala uniforme 0,82 ao rolar para baixo e recuperação ao retornar ao início. Tipografia e refração nativas precisam de conferência no aparelho iOS.
