
/*text2md*/



export async function DataToMd(title, description) {
  await Deno.writeTextFile(`/home/codio/workspace/public/uploads/${title}.md`, `${description}`);
  console.log("File with review written in markdown");

}




