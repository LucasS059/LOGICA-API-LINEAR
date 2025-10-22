import 'dotenv/config';
import fetch from 'node-fetch';

// Query GraphQL para buscar todos os times
const GET_TEAMS_QUERY = `
  query Teams {
    teams {
      nodes {
        id
        name
      }
    }
  }
`;

/**
 * Função principal que executa a consulta
 */
async function getTeams() {
  const apiKey = process.env.LINEAR_API_KEY;

  if (!apiKey) {
    console.error('Erro: A variável de ambiente LINEAR_API_KEY não foi definida.');
    console.error('Certifique-se de ter um arquivo .env com seu token.');
    return;
  }

  try {
    console.log('Consultando times na sua organização Linear...');

    const response = await fetch('https://api.linear.app/graphql', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: GET_TEAMS_QUERY }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('Erro na API do Linear:', result.errors);
      return;
    }

    const teams = result.data.teams.nodes;

    if (teams.length === 0) {
      console.log('Nenhum time encontrado na sua organização.');
      return;
    }

    console.log('\nTimes encontrados:');
    console.log('------------------------------------');
    teams.forEach(team => {
      console.log(`- Nome: ${team.name}`);
      console.log(`  ID: ${team.id}\n`);
    });
    console.log('------------------------------------');


  } catch (error) {
    console.error('Ocorreu um erro ao fazer a requisição:', error);
  }
}

getTeams();