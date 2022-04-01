/* Tobi's Code */

import {SmptClient} from "https://deno.land/x/smtp/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
/* Imported from DENO documentation "https://deno.land/" */


/* Creating a new instance of email protocol*/
const client = new SmptClient();
const {SEND_EMAIL, PWD, RECV_EMAIL} = Deno.env.toObject();



/* Configuration to open portal for instance of email */
/* Gmail uses port 465 or 587 for outgoing mail */
/* Incoming mail uses port 993 - To be further developed */
/* Research from https://www.google.co.uk/search?q=what+internet+port+does+gmail+use&rls=com.microsoft%3Aen-GB%3A%7Breferrer%3Asource%3F%7D&rlz=1I7ADFA_enGB415&sxsrf=APq-WBsFYVp4eN4waHMMibvUM-89S_L6kA%3A1647947375466&ei=b645YsGSHM_ygQbu567QCw&ved=0ahUKEwiBhrGvytn2AhVPecAKHe6zC7oQ4dUDCA4&uact=5&oq=what+internet+port+does+gmail+use&gs_lcp=Cgdnd3Mtd2l6EAMyBAgjECc6BwgAEEcQsAM6BwgjELACECdKBAhBGABKBAhGGABQqzFY-jVgk0FoAnABeACAAUqIAYEBkgEBMpgBAKABAcgBCMABAQ&sclient=gws-wiz */

const connectConfig: any = {
  hostname: "smpt.gmail.com",
  port: 465,
  username: SEND_EMAIL,
  password: PWD
};
await client.connectTLS(connectConfig);


export async function sendEmail(data) {
  await client.send({
    from SEND_EMAIL,
    to: RECV_EMAIL,
    subject: "It's a hoot to have you on board"
    content: "${data."   /* inputting data from form */
  }});
  await client.close();