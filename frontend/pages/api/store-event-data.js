import { Web3Storage, File, getFilesFromPath } from "web3.storage";
const { resolve } = require("path");

// This is an internal API route to post data on web3storage
// on the handlesubmit() call function from the create-event page.
export default async function handler(req, res) {
  if (req.method === "POST") {
    return await storeEventData(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function storeEventData(req, res) {
  // body from the create-event page (name, description, link, image)
  const body = req.body;
  try {
    console.log("storeEventData");
    const files = await makeFileObjects(body);
    const cid = await storeFiles(files);
    return res.status(200).json({ success: true, cid: cid });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error creating event", success: false });
  }
}

async function makeFileObjects(body) {
  // create a Buffer  from the stringify body
  const buffer = Buffer.from(JSON.stringify(body));

  const imageDirectory = resolve(process.cwd(), `public/images/${body.image}`);
  const files = await getFilesFromPath(imageDirectory);

  files.push(new File([buffer], "data.json"));
  console.log("smakeFileObjects");
  return files;
}

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN });
}

async function storeFiles(files) {
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("storeFiles");
  return cid;
}
