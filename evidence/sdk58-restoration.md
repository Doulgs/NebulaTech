# Restauração do SDK 58

A lista de bibliotecas adicionais não autorizava downgrade. O projeto foi restaurado para Expo SDK 58, com React 19.3.0 e React Native 0.88.1, mantendo NativeWind, headers fixos e bottom sheets.

Módulos Expo e dependências nativas foram alinhados ao bundledNativeModules do SDK 58. As bibliotecas JavaScript adicionais permanecem instaladas. O patch do CLI 57 foi removido; o CLI 58 já normaliza o protocolo encaminhado pelo túnel.

A instalação anterior do SDK 57 foi isolada em /tmp para evitar resolução de peers contra pacotes antigos. O lockfile é regenerado para a árvore do SDK 58.

Verificação: manifesto externo do túnel informa `runtimeVersion=exposdk:58.0.0` e `sdkVersion=58.0.0`. Bundles iOS, Android e web foram exportados. O ícone respondeu HTTP 200 pelo túnel. Testes do manifesto usam o parser oficial do CLI 58, sem patch.
