import keccak256 from 'keccak256'
import { MerkleTree } from 'merkletreejs'

function checkIncludeWhitelist(addr) {
  const keccakAddr = keccak256(addr);
  const result = tree.verify(hexProof, keccakAddr, rootHash);
  console.log(addr, 'included in the white list?:', result);
  return result;
}

function getHexProof(addr) {
  const keccakAddr = keccak256(addr);
  const hexProof = tree.getHexProof(keccakAddr);
  return hexProof;
}

let whitelistAddresses = [
  "0x9134b4d5c9450839A4E9862D6d171fc3c5355480",
  "0x33a08911476AB6d2394E937C8E6346A77140E14A",
];

const leafNodes = whitelistAddresses.map((addr) => keccak256(addr));
const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
// console.log(tree.toString()) // ツリー構造を確認できる
const rootHash = tree.getRoot(); // ルートハッシュを取得
const hexRoot = tree.getHexRoot(); // Hex形式でルートハッシュを取得(これをコントラクトに書き込む)
console.log('hexRoot: ', hexRoot);

const hexProof = tree.getHexProof(leafNodes[0]);
console.log('hexProof: ', hexProof);

// Whitelistに入っているかの検証
checkIncludeWhitelist('0x9134b4d5c9450839A4E9862D6d171fc3c5355480');

// Whitelist外のアドレスが弾かれるかを確認してみる
checkIncludeWhitelist('0xB386B60a03bCc525eaA8BFD4c9ad2D028C65fca1');

// コントラクトを叩く際の引数
getHexProof('0x9134b4d5c9450839A4E9862D6d171fc3c5355480');
