import fs from "fs";
import fetch from "node-fetch";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config(); 

const API_URL = "https://api.linear.app/graphql";
const LINEAR_API_KEY = process.env.LINEAR_API_KEY;
const TEAM_ID = process.env.TEAM_ID;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (prompt) => new Promise(res => rl.question(prompt, res));

async function main() {
    const title = await question("📌 Título da Issue: ");
    const description = await question("Descrição da Issue: ");
    const filesInput = await question("Caminhos dos arquivos (separados por vírgula): ");
    rl.close();

    const issue = await createIssue(title, description);
    console.log(`Issue criada: ${issue.identifier}\n`);

    const files = filesInput.split(",").map(f => f.trim()).filter(f => f && fs.existsSync(f));
    if (!files.length) return console.log("Nenhum arquivo válido encontrado.");

    for (const filePath of files) {
        const buffer = fs.readFileSync(filePath);
        const { uploadUrl, assetUrl, headers } = await getUploadURL(filePath);
        await uploadToStorage(uploadUrl, buffer, getMimeType(filePath), headers);
        await attachToIssue(issue.id, assetUrl, filePath); // <-- aqui
        console.log(`📎 Arquivo anexado: ${assetUrl}`);
    }


    console.log("\nTodos os arquivos enviados e anexados com sucesso!");
}

async function createIssue(title, description) {
    const query = `
    mutation issueCreate($input: IssueCreateInput!) {
      issueCreate(input: $input) { success issue { id identifier } }
    }
  `;
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": LINEAR_API_KEY },
        body: JSON.stringify({ query, variables: { input: { teamId: TEAM_ID, title, description } } }),
    });
    const json = await res.json();
    if (!json.data?.issueCreate?.success) throw new Error("Falha ao criar issue");
    return json.data.issueCreate.issue;
}

async function getUploadURL(filePath) {
    const size = fs.statSync(filePath).size;
    const query = `
    mutation fileUpload($contentType: String!, $filename: String!, $size: Int!) {
      fileUpload(contentType: $contentType, filename: $filename, size: $size) {
        success uploadFile { uploadUrl assetUrl headers { key value } }
      }
    }
  `;
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": LINEAR_API_KEY },
        body: JSON.stringify({ query, variables: { contentType: getMimeType(filePath), filename: filePath, size } }),
    });
    const json = await res.json();
    if (!json.data?.fileUpload?.success) throw new Error("Falha ao obter URL de upload");
    return json.data.fileUpload.uploadFile;
}

async function uploadToStorage(url, buffer, type, headersList) {
    const headers = { "Content-Type": type, ...Object.fromEntries(headersList.map(h => [h.key, h.value])) };
    const res = await fetch(url, { method: "PUT", headers, body: buffer });
    if (!res.ok) throw new Error("Falha ao enviar arquivo");
}

async function attachToIssue(issueId, assetUrl, filePath) {
    const fileName = filePath.split("/").pop().split("\\").pop();
    const query = `
    mutation attachmentCreate($input: AttachmentCreateInput!) {
      attachmentCreate(input: $input) { success }
    }
  `;
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": LINEAR_API_KEY },
        body: JSON.stringify({
            query,
            variables: { input: { title: fileName, url: assetUrl, issueId } },
        }),
    });
    const json = await res.json();
    if (!json.data?.attachmentCreate?.success) throw new Error("Falha ao anexar arquivo");
}


function getMimeType(filePath) {
    const ext = filePath.split(".").pop().toLowerCase();
    return { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", pdf: "application/pdf", xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }[ext] || "application/octet-stream";
}

main();
