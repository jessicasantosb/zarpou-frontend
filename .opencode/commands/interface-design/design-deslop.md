---
description: Passagem rápida, limitada ao diff, que remove "slop" visual
---

Carregue a skill `interface-design` e leia `.interface-design/system.md`. Olhe apenas o diff atual ($ARGUMENTS, vazio = working tree) e remova visual slop:

- hex/rgb literal ou cinza Tailwind hardcoded no lugar de token semântico
- className gigante repetido que deveria ser componente de `components/ui/`
- estados faltando (hover/focus/disabled/loading/vazio/erro)
- espaçamento fora da grade, padding assimétrico sem motivo, radius trocado
- hierarquia plana (tudo mesmo tamanho/peso) e decoração colorida sem significado
- `<div onClick>` no lugar de `<button>`/`<a>` nativo

Para cada item: diga o arquivo, a linha do problema e o patch mínimo (classes/tokens do sistema). Faça as edições direto, sem reescrever arquivos inteiros e sem tocar em nada fora do escopo do diff. Termine com o resumo: quantos itens corrigidos, quantos deixados de fora (e por quê).
