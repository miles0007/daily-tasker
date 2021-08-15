// import { v1 as uuidv1 } from 'uuid';

const { v1: uuidv1 } = require('uuid');
const uuid = require('uuid');

const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date().getTime(),
  nsecs: 5678,
};
// console.log(uuidv1(v1options));

let arr = []


for (let i=0; i<10000; i++) {
    let unique_id = uuid.v1();
    console.log(unique_id);
    if (!arr.includes(unique_id)) {
        arr.push(unique_id);
    }
    else {
        console.log('unique validation failed');
    }
}