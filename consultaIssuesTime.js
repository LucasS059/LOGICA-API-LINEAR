import 'dotenv/config';
import fetch from 'node-fetch';

// Query GraphQL para buscar issues de um time específico
const GET_ISSUES_BY_TEAM_QUERY = `
  query GetTeamIssues($teamId: String!) {
    team(id: $teamId) {
      name
      issues {
        nodes {
          id
          identifier
          title
          createdAt
          updatedAt
        }
      }
    }
  }
`;

/**
 * Função principal que executa a consulta de issues
 */
async function getIssuesByTeam() {
  const apiKey = process.env.LINEAR_API_KEY;
  const teamId = process.env.TEAM_ID;

  if (!apiKey || !teamId) {
    console.error('Erro: As variáveis de ambiente LINEAR_API_KEY e TEAM_ID devem ser definidas.');
    console.error('Certifique-se de que seu arquivo .env está configurado corretamente.');
    return;
  }

  try {
    console.log(`🔎 Consultando issues para o time com ID: ${teamId}...`);

    const response = await fetch('https://api.linear.app/graphql', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_ISSUES_BY_TEAM_QUERY,
        variables: { teamId: teamId },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('Erro na API do Linear:', result.errors);
      return;
    }
    
    const team = result.data.team;
    const issues = team.issues.nodes;

    if (issues.length === 0) {
      console.log(`Nenhuma issue encontrada no time "${team.name}".`);
      return;
    }

    console.log(`\nIssues do time "${team.name}":`);
    console.log('------------------------------------');
    issues.forEach(issue => {
      console.log(`- Título: ${issue.title} [${issue.identifier}]`);
      console.log(`  Criada em: ${new Date(issue.createdAt).toLocaleString()}`);
      console.log(`  ID: ${issue.id}\n`);
    });
    console.log('------------------------------------');

  } catch (error) {
    console.error('Ocorreu um erro ao fazer a requisição:', error);
  }
}

getIssuesByTeam();