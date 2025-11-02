# 🍅 Modo Pomodoro

Um aplicativo web moderno e intuitivo para implementar a técnica Pomodoro, desenvolvido com tecnologias web nativas.

## 🌐 Visualizar Projeto

**Acesse o projeto em:** [https://leonsis.github.io/Modo-Pomodoro/](https://leonsis.github.io/Modo-Pomodoro/)

O aplicativo está hospedado no GitHub Pages e pode ser usado diretamente no navegador. Você também pode instalá-lo como um PWA no seu dispositivo!

## 📋 Objetivo

Este projeto foi desenvolvido para ajudar pessoas a melhorarem sua produtividade e foco através da técnica Pomodoro, que consiste em trabalhar em blocos de tempo focados (geralmente 25 minutos) seguidos de pausas curtas. O objetivo é criar uma ferramenta simples, eficaz e visualmente agradável que permita aos usuários gerenciar seu tempo de trabalho de forma mais eficiente.

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Estilização customizada com variáveis CSS, animações e design responsivo
- **JavaScript (Vanilla)**: Lógica da aplicação sem dependências de frameworks

### Bibliotecas Externas
- **Bootstrap 5.3.2**: Framework CSS para componentes e grid system (via CDN)
- **Font Awesome 6.4.0**: Ícones para melhorar a interface visual (via CDN)

### APIs do Navegador
- **Web Audio API**: Geração de sons de notificação quando o timer finaliza
- **Notification API**: Notificações do navegador para alertar sobre mudanças de modo
- **SVG**: Criação de barra de progresso circular animada

## 🏗️ Como o Projeto Foi Feito

### Estrutura do Projeto

```
modoPomodoro/
├── index.html          # Estrutura HTML principal
├── src/
│   ├── script.js       # Lógica JavaScript do aplicativo
│   └── style.css       # Estilos customizados
└── README.md           # Documentação do projeto
```

### Funcionalidades Implementadas

#### 1. **Gerenciamento de Estados**
- Sistema de estados que controla o ciclo do timer (pomodoro, pausa curta, pausa longa)
- Controle de execução (rodando, pausado, parado)
- Rastreamento de Pomodoros completos e sessões

#### 2. **Timer Inteligente**
- Timer configurável para Pomodoro, pausa curta e pausa longa
- Alternância automática entre modos após completar cada ciclo
- Sistema que detecta quando completar 4 Pomodoros para sugerir pausa longa

#### 3. **Interface Visual**
- Barra de progresso circular animada usando SVG
- Indicadores visuais de status (trabalhando, pausa, pronto)
- Design responsivo que se adapta a diferentes tamanhos de tela
- Cards com sombras e animações suaves para melhor experiência do usuário

#### 4. **Recursos Interativos**
- Accordion expansível com instruções sobre a técnica Pomodoro
- Controles intuitivos (Iniciar, Pausar, Reiniciar)
- Configurações personalizáveis para tempos de Pomodoro, pausa curta e pausa longa
- Contadores visuais de Pomodoros completos e sessão atual

#### 5. **Notificações**
- Sons de notificação usando Web Audio API
- Notificações do navegador (com solicitação de permissão)
- Feedback visual e sonoro ao completar cada ciclo

### Design e UX

- **Cores**: Paleta suave com tons de azul e cinza para criar um ambiente calmo e focado
- **Tipografia**: Fonte system default para melhor legibilidade
- **Responsividade**: Adaptação automática para dispositivos móveis
- **Animações**: Transições suaves e animações de pulso durante o timer ativo
- **Acessibilidade**: Uso de semântica HTML e contraste adequado de cores

## 🚀 Como Usar

### Execução Local

1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` em um navegador moderno
3. Não é necessário instalar dependências, pois todas as bibliotecas são carregadas via CDN

### Funcionalidades

1. **Ajustar Configurações**: Na seção de configurações, defina os tempos desejados para Pomodoro, pausa curta e pausa longa
2. **Iniciar Timer**: Clique no botão "Iniciar" para começar um ciclo Pomodoro
3. **Pausar**: Durante a execução, você pode pausar o timer a qualquer momento
4. **Reiniciar**: Use o botão "Reiniciar" para voltar ao estado inicial e resetar os contadores
5. **Visualizar Instruções**: Clique na seta abaixo do indicador de status para ver instruções sobre a técnica Pomodoro

## 📱 Compatibilidade

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Dispositivos desktop e mobile
- Suporte para notificações do navegador (requer permissão do usuário)

## 🎯 Características Principais

- ✅ Timer configurável
- ✅ Barra de progresso visual circular
- ✅ Alternância automática entre modos
- ✅ Contadores de Pomodoros e sessões
- ✅ Notificações sonoras e do navegador
- ✅ Design responsivo
- ✅ Interface intuitiva e moderna
- ✅ Sem dependências de build (HTML, CSS, JS puro)

## 📝 Notas Técnicas

- O projeto utiliza JavaScript vanilla, facilitando a manutenção e compreensão do código
- As configurações são carregadas dinamicamente dos inputs quando o timer não está rodando
- O sistema de notificações solicita permissão automaticamente quando o navegador suporta
- A barra de progresso SVG é recalculada dinamicamente para diferentes tamanhos de tela

---

Desenvolvido com foco em simplicidade, performance e experiência do usuário.