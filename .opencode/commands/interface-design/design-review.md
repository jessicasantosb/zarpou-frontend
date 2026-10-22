---
description: Review estrito de craft e hierarquia de uma UI, com barra de aprovação
---

Carregue a skill `interface-design` e leia `.interface-design/system.md`. Faça um review estrito de craft de $ARGUMENTS (arquivo, diretório ou descrição de telas).

Rode os checks da skill contra o alvo:
1. Swap test — a tipografia/layout poderiam estar em qualquer produto?
2. Squint test — a hierarquia sobrevive ao borrão? algo salta demais?
3. Signature test — aponte 5 elementos específicos do sistema Zarpou (dourado CTA, marinho institucional, Poppins, raio 10px, sombra sutil).
4. Token test — hex literal ou utilitário fora do sistema? (proibido em Tailwind v4 aqui)

Reporte primeiro o que reprova, agrupado por gravidade (quebra sistema / inconsistência / polish). Termine com a barra de aprovação: APROVADO · APROVADO COM CORREÇÕES · REPROVADO. Se houver ferramenta de render, mostre antes/depois; senão, descreva o patch exato (classes/tokens) por item. Não aplique mudanças sem pedir confirmação.
