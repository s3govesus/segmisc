/******************************************************************************/

// // converts the format of a given IP address
// // const exOptions = {
// //   target: `string`, // returns the value as a given type (default is string)
// //   filter: true, // remove punctuation syntax
// //   limit: 12, // grabs the last n characters from the IP address (excluding syntax)
// // };
// module.exports.formatIP = (ip, options) => {
//   if (options === undefined) {
//     options = {
//       target: `string`,
//       filter: true,
//       limit: 12,
//     };
//   } else {
//     if (options.target === undefined || typeof options.target !== `string`) {
//       options.target = `string`;
//     }
//     if (options.filter === undefined) {
//       options.filter = true;
//     }
//     if (typeof options.filter !== `boolean`) {
//       this.toBoolean(options.filter);
//     }
//     if (options.limit === undefined) {
//       options.limit = 12;
//     }
//     if (typeof options.limit !== `number`) {
//       options.limit = parseInt(options.limit, 10);
//     }
//   }
//   if (typeof ip === `object`) {
//     // it's likely an array
//     return ipFromArray(ip, options);
//   } if (typeof ip === `string`) {
//     // it's a string, probably with some kind of formatting
//   } else if (typeof ip === `number`) {
//     // it's just one longass number???
//   } else {
//     // throw error?
//   }
//   return undefined; // had to include this line to make eslint happy
// };

// /******************************************************************************/

// function ipFromArray(arr, options) {
//   let result = ``;

//   // determine if it's ipv4 or ipv6
//   let ipV = 4;
//   if (arr.length === 4) {
//     // ipv4
//     ipV = 4;
//   } else {
//     // ipv6
//     ipV = 6;
//   }

//   // if the target is string, add leading zeroes back to the address for reasons..
//   if (options.target === `string`) {
//     for (let i in arr) {
//       if (ipV === 4) {
//         padWithZeroes(arr, 3);
//       } else {
//         padWithZeroes(arr, 4);
//       }
//     }
//   }

//   // handle converting the IP address array to a string
//   if (options.target === `string`) {
//     for (let i in arr) {
//       if (ipV === 4) {
//         // determine where to put the '.'
//         if (i === 0) {
//           result += `${arr[i]}`;
//         } else {
//           result += `.${arr[i]}`;
//         }
//       } else {
//         if (i === 0) {
//           result += `${arr[i]}`;
//         } else {
//           result += `:${arr[i]}`;
//         }
//       }
//     }
//   }

//   if (options.filter === true) {
//     result = result.replace(`.`, result);
//     result = result.replace(`:`, result);
//   }
// }

// /******************************************************************************/

// function ipFromNumber(num) {

// }
