# 🔧 Como Habilitar GitHub Pages

Siga estes passos para publicar o site no GitHub Pages:

## Passo 1: Habilitar GitHub Pages no Repositório

1. Vá para o seu repositório no GitHub: `https://github.com/Leonsis/Modo-Pomodoro`
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source** (Fonte), selecione:
   - **Source**: `GitHub Actions`
5. Clique em **Save** (Salvar)

## Passo 2: Verificar o Ambiente GitHub Pages

1. Ainda em **Settings**, vá para **Environments** no menu lateral
2. Certifique-se de que o ambiente `github-pages` existe
3. Se não existir, ele será criado automaticamente quando o workflow executar pela primeira vez

## Passo 3: Executar o Workflow

1. Vá para a aba **Actions** no repositório
2. Você verá o workflow "Deploy static content to Pages"
3. Se ele não executou automaticamente, clique em **Run workflow** e depois em **Run workflow** novamente
4. Aguarde o workflow completar (pode levar 1-2 minutos)

## Passo 4: Verificar a URL do Site

Após o workflow completar com sucesso:

1. Vá para **Settings** → **Pages** novamente
2. Você verá a URL do seu site (geralmente: `https://leonsis.github.io/Modo-Pomodoro/`)
3. O site estará disponível em alguns minutos após o deploy

## Problemas Comuns

### Erro 404 ainda aparece
- Aguarde alguns minutos após o deploy (pode levar até 5 minutos)
- Limpe o cache do navegador (Ctrl+F5)
- Verifique se o workflow executou com sucesso na aba Actions

### Workflow não executa
- Verifique se o GitHub Pages está configurado para usar **GitHub Actions**
- Verifique se você está fazendo push para a branch `main`
- Certifique-se de que o arquivo `.github/workflows/static.yml` existe

### Service Worker não funciona
- O site precisa ser servido via HTTPS (GitHub Pages já fornece isso)
- Verifique o console do navegador para ver erros
- O Service Worker só funciona após o site estar no GitHub Pages

## 📝 Nota Importante

Após habilitar o GitHub Pages e o workflow executar com sucesso, o site estará disponível em:
**`https://leonsis.github.io/Modo-Pomodoro/`**

Você pode então adicionar o site à tela inicial do seu dispositivo móvel como um PWA!

