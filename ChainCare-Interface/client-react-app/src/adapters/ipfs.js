import { create } from "ipfs-http-client";
import { BufferList } from "bl";

const ipfs = create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

export const addToIPFS = async (data) => {
  const { cid } = await ipfs.add(data);
  return new Promise((resolve, reject) => {
    resolve(cid.toString());
  });
};

export const getFromIPFS = async (hashToGet) => {
  for await (const data of ipfs.get(hashToGet)) {
    const content = new BufferList();
    for await (const chunk of data.content) {
      content.append(chunk);
    }
    console.log(content.toString());
    return content.toString();
  }
};
