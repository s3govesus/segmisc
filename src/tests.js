const { cipher, cipher62 } = require(`./cipher`);
const { DLList } = require(`./dllist`); // alternatively, DoublyLinkedList
const { LList } = require(`./llist`); // alternatively, LinkedList
const { LLQueue } = require(`./llqueue`); // alternatively, LinkedListQueue
const { Queue } = require(`./queue`);
const { Ring } = require(`./ring`); // alternatively, RingBuffer, CircularQueue
const { Stack } = require(`./stack`);
const {
  checkEmpty, checkLong, checkShort, checkRegex, toBoolean, padWithZeroes, titleToID, makeForumID, formatSocial, deformatSocial, timestampToDate, sleep, separateIP,
} = require(`./index`);

console.log(``);
console.log(`Running tests...`);
console.log(``);
console.log(`/******************************************************************************/`);
console.log(``);

/******************************************************************************/

function testCipher() {
  console.log(`Testing the cipher object...`);
  console.log();
  let a = cipher[0];
  console.log(`cipher[0] : ${JSON.stringify(a)}`);
  let b = cipher[3];
  console.log(`cipher[3] : ${JSON.stringify(b)}`);
  let c = cipher[10];
  console.log(`cipher[10] : ${JSON.stringify(c)}`);
  let d = cipher[35];
  console.log(`cipher[35] : ${JSON.stringify(d)}`);
  console.log();
  console.log(`Finished testing the cipher object!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testCipher();

/******************************************************************************/

function testCipher62() {
  console.log(`Testing the cipher62 object...`);
  console.log();
  let a = cipher62[0];
  console.log(`cipher[0] : ${JSON.stringify(a)}`);
  let b = cipher62[3];
  console.log(`cipher[3] : ${JSON.stringify(b)}`);
  let c = cipher62[10];
  console.log(`cipher[10] : ${JSON.stringify(c)}`);
  let d = cipher62[35];
  console.log(`cipher[35] : ${JSON.stringify(d)}`);
  let e = cipher62[41];
  console.log(`cipher[41] : ${JSON.stringify(e)}`);
  let f = cipher62[61];
  console.log(`cipher[61] : ${JSON.stringify(f)}`);
  console.log();
  console.log(`Finished testing the cipher62 object!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testCipher62();

/******************************************************************************/

// test the class for creating a doubly linked list data structure
function testDLList() {
  console.log(`Testing the DLList class...`);
  console.log();
  let a = new DLList();
  console.log(`isEmpty() : ${a.isEmpty()}`);
  a.print();
  console.log(`append(10)...`);
  a.append(10);
  a.print();
  console.log(`append(20)...`);
  a.append(20);
  a.print();
  console.log(`prepend(30)...`);
  a.prepend(30);
  a.print();
  console.log(`prepend(40)...`);
  a.prepend(40);
  a.print();
  console.log(`append(50)...`);
  a.append(50);
  a.print();
  console.log(`removeFromEnd()...`);
  a.removeFromEnd();
  a.print();
  console.log(`removeFromFront()...`);
  a.removeFromFront();
  a.print();
  console.log(`print reverse!`);
  a.print({ reverse: true });
  console.log(`getSize() : ${a.getSize()}`);
  console.log(`isEmpty() : ${a.isEmpty()}`);
  console.log();
  console.log(`Finished testing the DLList class!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testDLList();

/******************************************************************************/

// test the class for creating a linked list data structure
function testLList() {
  console.log(`Testing the LList class...`);
  console.log();
  let a = new LList();
  console.log(`isEmpty() : ${a.isEmpty()}`);
  a.print();
  console.log(`append(10)...`);
  a.append(10);
  a.print();
  console.log(`append(20)...`);
  a.append(20);
  a.print();
  console.log(`prepend(30)...`);
  a.prepend(30);
  a.print();
  console.log(`insert(40, 1)...`);
  a.insert(40, 1);
  a.print();
  console.log(`insert(50, 3)...`);
  a.insert(50, 3);
  a.print();
  console.log(`removeFromFront()...`);
  a.removeFromFront();
  a.print();
  console.log(`removeFrom(2)...`);
  a.removeFrom(2);
  a.print();
  console.log(`removeFromEnd()...`);
  a.removeFromEnd();
  a.print();
  console.log(`search(10) : ${a.search(10)}`);
  console.log(`search(60) : ${a.search(60)}`);
  console.log(`reverse()`);
  a.reverse();
  a.print();
  console.log();
  console.log(`Finished testing the LList class!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testLList();

/******************************************************************************/

// test the class for creating a linked list queue data structure
function testLLQueue() {
  console.log(`Testing the LLQueue class...`);
  console.log();
  let a = new LLQueue();
  console.log(`isEmpty() : ${a.isEmpty()}`);
  a.print();
  console.log(`add(10)...`);
  a.add(10);
  a.print();
  console.log(`add(20)...`);
  a.add(20);
  a.print();
  console.log(`add(30)...`);
  a.add(30);
  a.print();
  console.log(`check() : ${a.check()}`);
  console.log(`getSize() : ${a.getSize()}`);
  console.log(`remove()...`);
  a.remove();
  a.print();
  console.log(`add(40)...`);
  a.add(40);
  a.print();
  console.log();
  console.log(`Finished testing the LLQueue class!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testLLQueue();

/******************************************************************************/

// test the class for creating a queue data structure (as an object as opposed to an array or ring buffer)
function testQueue() {
  console.log(`Testing the Queue class...`);
  console.log();
  let a = new Queue();
  console.log(`isEmpty() : ${a.isEmpty()}`);
  a.print();
  console.log(`add(10)...`);
  a.add(10);
  a.print();
  console.log(`add(20)...`);
  a.add(20);
  a.print();
  console.log(`add(30)...`);
  a.add(30);
  a.print();
  console.log(`add(40)...`);
  a.add(40);
  a.print();
  console.log(`isEmpty() : ${a.isEmpty()}`);
  console.log(`check() : ${a.check()}`);
  console.log(`size() : ${a.size()}`);
  console.log(`remove()...`);
  a.remove();
  a.print();
  console.log(`check() : ${a.check()}`);
  console.log(`size() : ${a.size()}`);
  console.log();
  console.log(`Finished testing the Queue class!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testQueue();

/******************************************************************************/

// test the class for creating a ring buffer / circular queue data structure
function testRing() {
  console.log(`Testing the Ring class...`);
  console.log();
  let a = new Ring(5);
  console.log(`isEmpty() : ${a.isEmpty()}`);
  a.print();
  console.log(`isFull() : ${a.isFull()}`);
  console.log(`add(10)...`);
  a.add(10);
  a.print();
  console.log(`add(20)...`);
  a.add(20);
  a.print();
  console.log(`remove()...`);
  a.remove();
  a.print();
  console.log(`add(30)...`);
  a.add(30);
  a.print();
  console.log(`add(40)...`);
  a.add(40);
  a.print();
  console.log(`check() : ${a.check()}`);
  console.log(`add(50)...`);
  a.add(50);
  a.print();
  console.log(`add(60)...`);
  a.add(60);
  a.print();
  console.log(`isFull() : ${a.isFull()}`);
  console.log(`add(70)...`);
  a.add(70);
  a.print();
  console.log(`isEmpty() : ${a.isEmpty()}`);
  console.log();
  console.log(`Finished testing the Ring class!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testRing();

/******************************************************************************/

// test the class for creating a stack (last in, first out) data structure
function testStack() {
  console.log(`Testing the Stack class...`);
  console.log();
  let a = new Stack();
  console.log(`isEmpty() : ${a.isEmpty()}`);
  a.print();
  console.log(`push(10)...`);
  a.push(10);
  a.print();
  console.log(`push(20)...`);
  a.push(20);
  a.print();
  console.log(`push(30)...`);
  a.push(30);
  a.print();
  console.log(`getSize() : ${a.getSize()}`);
  console.log(`pop()...`);
  a.pop();
  a.print();
  console.log(`isEmpty() : ${a.isEmpty()}`);
  console.log();
  console.log(`Finished testing the Stack class!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testStack();

/******************************************************************************/

// test the function to check if a string value is empty (or contains only whitespace characters and effectively is empty)
function testCheckEmpty() {
  console.log(`Testing the checkEmpty() function...`);
  console.log();
  let a = ``;
  console.log(`checking "${a}" :`);
  console.log(checkEmpty(a));
  console.log();
  let b = `   `;
  console.log(`checking "${b}" :`);
  console.log(checkEmpty(b));
  console.log();
  let c = `fart`;
  console.log(`checking "${c}" :`);
  console.log(checkEmpty(c));
  console.log();
  console.log(`Finished testing the checkEmpty() function!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testCheckEmpty();

/******************************************************************************/

function testCheckLong() {
  console.log(`Testing the checkLong() function...`);
  console.log();
  let a = `12 456 890`;
  console.log(`test string is "${a}" -- 10 characters including whitespace / 8 characters excluding whitespace`);
  console.log();
  console.log(`checking options.max = 8, ignoreWhitespace: false :`);
  console.log(JSON.stringify(checkLong(a, { max: 8, ignoreWhitespace: false })));
  console.log();
  console.log(`checking options.max = 8, ignoreWhitespace: true :`);
  console.log(JSON.stringify(checkLong(a, { max: 8, ignoreWhitespace: true })));
  console.log();
  console.log(`checking options.max = 10, ignoreWhitespace: false :`);
  console.log(JSON.stringify(checkLong(a, { max: 10, ignoreWhitespace: false })));
  console.log();
  console.log(`Finished testing the checkLong() function!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testCheckLong();

/******************************************************************************/

function testCheckShort() {
  console.log(`Testing the checkShort() function...`);
  console.log();
  let a = `12 456 890`;
  console.log(`test string is "${a}" -- 10 characters including whitespace / 8 characters excluding whitespace`);
  console.log();
  console.log(`checking options.min = 10, ignoreWhitespace: false :`);
  console.log(JSON.stringify(checkShort(a, { min: 10, ignoreWhitespace: false })));
  console.log();
  console.log(`checking options.min = 10, ignoreWhitespace: true :`);
  console.log(JSON.stringify(checkShort(a, { min: 10, ignoreWhitespace: true })));
  console.log();
  console.log(`checking options.min = 12 :`);
  console.log(JSON.stringify(checkShort(a, { min: 12 })));
  console.log();
  console.log(`Finished testing the checkShort() function!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testCheckShort();

/******************************************************************************/

function testCheckRegex() {
  console.log(`Testing the checkRegex() function...`);
  console.log();
  let reg1 = /[a-z]/g;
  let str1 = `this is a test`;
  let str2 = `!!!!`;
  console.log(`checkRegex('this is a test', /[a-z]/g) : ${JSON.stringify(checkRegex(str1, reg1))}`);
  console.log(`checkRegex('!!!!', /[a-z]/g) : ${JSON.stringify(checkRegex(str2, reg1))}`);
  console.log();
  console.log(`Finished testing the checkRegex() function!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testCheckRegex();

/******************************************************************************/

function testToBoolean() {
  console.log(`Testing the toBoolean() function...`);
  console.log();
  console.log(`toBoolean(true)....: ${toBoolean(true)}`);
  console.log(`toBoolean(1).......: ${toBoolean(1)}`);
  console.log(`toBoolean('1').....: ${toBoolean(`1`)}`);
  console.log(`toBoolean('true')..: ${toBoolean(`true`)}`);
  console.log(`toBoolean('yes')...: ${toBoolean(`yes`)}`);
  console.log(`toBoolean('on')....: ${toBoolean(`on`)}`);
  console.log(`toBoolean('high')..: ${toBoolean(`high`)}`);
  console.log(`toBoolean(false)...: ${toBoolean(false)}`);
  console.log(`toBoolean(0).......: ${toBoolean(0)}`);
  console.log(`toBoolean('0').....: ${toBoolean(`0`)}`);
  console.log(`toBoolean('false').: ${toBoolean(`false`)}`);
  console.log(`toBoolean('no')....: ${toBoolean(`no`)}`);
  console.log(`toBoolean('off')...: ${toBoolean(`off`)}`);
  console.log(`toBoolean('low')...: ${toBoolean(`low`)}`);
  console.log();
  console.log(`Finished testing the toBoolean() function!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testToBoolean();

/******************************************************************************/

function testPadWithZeroes() {
  console.log(`Testing the padWithZeroes() function...`);
  console.log();
  console.log(`padWithZeroes(10, 3)..: ${padWithZeroes(10, 3)}`);
  console.log(`padWithZeroes(0, 3)...: ${padWithZeroes(0, 3)}`);
  console.log(`padWithZeroes(100, 3).: ${padWithZeroes(100, 3)}`);
  console.log();
  console.log(`Finished testing the padWithZeroes() function!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testPadWithZeroes();

/******************************************************************************/

function testTitleToID() {
  console.log(`Testing the titleToID() function...`);
  console.log();
  console.log(`testing : "The Maximum Number of Characters that a Title Can Be is Forty", max 40 : ${titleToID(`The Maximum Number of Characters that a Title Can Be is Forty`, 40)}`);
  console.log(`testing : "Test Title", max 4 : ${titleToID(`Test Title`, 4)}`);
  console.log(`testing : "Test Title", max 40 : ${titleToID(`Test Title`, 40)}`);
  console.log();
  console.log(`Finished testing the titleToID() function!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testTitleToID();

/******************************************************************************/

function testMakeForumID() {
  console.log(`Testing the makeForumID() function...`);
  console.log();
  console.log(`testing : "This is an Example of a Forum Post Title", max 32, suffixLength 8 : ${makeForumID(`This is an Example of a Forum Post Title`, 32, 8)}`);
  console.log();
  console.log(`Finished testing the makeForumID() function!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testMakeForumID();

/******************************************************************************/

function testFormatSocial() {
  console.log(`Testing the formatSocial() function...`);
  console.log();
  console.log(`formatSocial('fartmonster1357') : ${formatSocial(`fartmonster1357`)}`);
  console.log();
  console.log(`Finished testing the formatSocial() function!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testFormatSocial();

/******************************************************************************/

function testDeformatSocial() {
  console.log(`Testing the deformatSocial() function...`);
  console.log();
  console.log(`deformatSocial('fartmonster#1357') : ${deformatSocial(`fartmonster#1357`)}`);
  console.log();
  console.log(`Finished testing the deformatSocial() function!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testDeformatSocial();

/******************************************************************************/

function testTimestampToDate() {
  console.log(`Testing the timestampToDate() function...`);
  console.log();
  console.log(`timestampToDate(0) : ${timestampToDate(0)}`);
  console.log(`timestampToDate(111111111111) : ${timestampToDate(111111111111)}`);
  console.log(`timestampToDate() : ${timestampToDate()}`);
  console.log();
  console.log(`Finished testing the timestampToDate() function!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testTimestampToDate();
