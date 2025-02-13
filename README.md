# Goal List Web

Uma aplicação web moderna para gerenciamento de metas e objetivos, permitindo que você organize suas tarefas diárias ou semanais de forma eficiente.

## 🚀 Funcionalidades

- Criação de metas para dias específicos ou para toda a semana
- Listagem de metas pendentes
- Marcação/desmarcação de metas como concluídas
- Desmarcação em massa de todas as metas concluídas
- Interface responsiva e amigável
- Autenticação de usuários via JWT

## 🛠️ Tecnologias Utilizadas

- **Next.js**: Framework React para produção
- **TypeScript**: Linguagem principal
- **TailwindCSS**: Framework CSS para estilização
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de schemas
- **Axios**: Cliente HTTP para requisições
- **JWT Decode**: Decodificação de tokens JWT
- **React Toastify**: Notificações elegantes
- **Date-fns**: Manipulação de datas
- **Radix UI**: Componentes de interface acessíveis

## 📋 Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/ThalysonRibeiro/goal.list-web
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o ambiente de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Acesse `http://localhost:3000` no seu navegador

## 🚀 Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento
- `npm run build`: Gera a build de produção
- `npm run start`: Inicia o servidor de produção
- `npm run lint`: Executa a verificação de lint

## 🔒 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e configure as seguintes variáveis:

```env
NEXT_PUBLIC_API_URL=sua_url_da_api
```

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

- Versão atual: 0.1.0
