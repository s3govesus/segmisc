const { makeKey } = require(`segcryptor`);

/******************************************************************************/

// check if the string is empty or contains only whitespace characters
//
// EXAMPLE OPTIONS
// const options = {
//   type: `character string`
// };
exports.checkEmpty = (value, options) => {
  let result;
  try {
    // get the options or fill in the undefined with defaults
    if (options === undefined || typeof options !== `object`) {
      options = {
        type: `character string`,
      };
    } else if (options.type === undefined) {
      options.type = `character string`;
    }

    const valueCheck = value;
    if (valueCheck.replace(/[\s\t\r\n]/g, ``).length === 0) {
      result = {
        error: `The value for the ${options.type} is effectively empty.`,
      };
    }
  } catch (ex) {
    result = {
      error:
        `An exception error occurred while attempting to check if the ${options.type} was empty.`,
      exception: ex.message,
    };
  }
  return result;
};

/******************************************************************************/

// check if a string is too many characters in length
//
// EXAMPLE OPTIONS
// const options = {
//   type: `character string`,
//   max: 255,
//   filterWhitespace: false, // ignore whitespace characters when calculating string length
// };
exports.checkLong = (value, options) => {
  let result;
  try {
    // get the options or fill in the undefined with defaults
    if (options === undefined || typeof options !== `object`) {
      options = {
        type: `character string`,
        max: 255,
        filterWhitespace: false,
      };
    } else {
      if (options.type === undefined) {
        options.type = `character string`;
      }
      if (options.max === undefined) {
        options.max = 255; // use 255 as it is the max length of a VARCHAR in SQL
      }
      if (options.filterWhitespace === undefined) {
        options.filterWhitespace = false;
      }
    }

    let valueCheck = value;
    if (options.filterWhitespace === true) {
      valueCheck = valueCheck.replace(/[\s\t\r\n]/g, ``);
    }
    if (valueCheck.length > options.max) {
      result = {
        error:
          `The ${options.type} is too long (max. ${options.max} characters).`,
      };
    }
  } catch (ex) {
    result = {
      error:
        `An exception error occurred while attempting to check if the ${options.type} was too long.`,
      exception: ex.message,
    };
  }
  return result;
};

/******************************************************************************/

// check if a string is too few characters in length
//
// EXAMPLE OPTIONS
// const options = {
//   type: `character string`,
//   min: 1,
//   filterWhitespace: false,
// };
exports.checkShort = (value, options) => {
  let result;
  try {
    // get the options or fill in the undefined with defaults
    if (options === undefined || typeof options !== `object`) {
      options = {
        type: `character string`,
        min: 1,
        filterWhitespace: false,
      };
    } else {
      if (options.type === undefined) {
        options.type = `character string`;
      } else {
        options.type = options.type.toString();
      }
      if (options.min === undefined) {
        options.min = 1;
      } else {
        options.min = Number(options.min);
      }
      if (options.filterWhitespace === undefined) {
        options.filterWhitespace = false;
      } else {
        options.filterWhitespace = this.toBoolean(options.filterWhitespace);
      }
    }

    let valueCheck = value;
    if (options.filterWhitespace === true) {
      valueCheck = valueCheck.replace(/[\s\t\r\n]/g, ``);
    }
    if (valueCheck.length < options.min) {
      result = {
        error:
          `The ${options.type} is too short (min. ${options.min} characters).`,
      };
    }
  } catch (ex) {
    try {
      return {
        error:
          `An exception error occurred while attempting to check if the ${options.type} was too short.`,
        exception: ex.message,
      };
    } catch (ex2) {
      return {
        error:
          `An exception error occurred while attempting to determine the configuration for checking if a character string was too short : ${ex2.message}`,
        exception: ex.message,
      };
    }
  }
  return result;
};

/******************************************************************************/

// checks to ensure that string meets the expectations of a regular expression
//
// EXAMPLE OPTIONS
// const options = {
//   type: `data value`,
// };
exports.checkRegex = (value, regex, options) => {
  let result;

  try {
    if (options === undefined || typeof options !== `object`) {
      options = {
        type: `data value`,
      };
    } else if (options.type === undefined) {
      options.type = `data value`;
    } else {
      options.type = options.type.toString();
    }
    if (typeof regex !== `object`) {
      regex = new RegExp(regex);
    }
  } catch (ex) {
    // TODO ? nothing ?
    return {
      error:
        `An exception error occurred while attempting to determine the configuration for checking a data value against a regular expression : ${ex.message}`,
      exception: ex.message,
    };
  }

  try {
    if (regex.test(value) === false) {
      result = {
        error:
          `The ${options.type} failed to meet specific criteria defined by a regular expression and was determined to be invalid.`,
      };
    }
  } catch (ex) {
    result = {
      error:
        `An exception error occurred while attempting to test the ${options.type} against a regular expression.`,
      exception: ex.message,
    };
  }

  return result;
};

/******************************************************************************/

// converts a string or numeric value to a boolean true or false
exports.toBoolean = (value) => {
  if (typeof value === `number`) {
    if (value === 1) {
      return true;
    }
    return false;
  }
  if (typeof value === `string`) {
    value = value.toLowerCase();
    if (
      value === `true` || value === `yes` || value === `1` || value === `on`
    ) {
      return true;
    }
    if (
      value === `false` || value === `no` || value === `0` || value === `off`
    ) {
      return false;
    }
    throw new Error(
      `Error attempting to parse ${
        JSON.stringify(value)
      } as a boolean value : unknown string value.`,
    );
  }
  if (typeof value === `boolean`) {
    return value;
  }
  throw new Error(
    `Error attempting to parse ${JSON.stringify(value)} as a boolean value.`,
  );
};

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

/******************************************************************************/

exports.padWithZeroes = (number, length) => {
  let str = `${number}`;

  while (str.length < length) {
    str = `0${str}`;
  }

  return str;
};

/******************************************************************************/

// converts a news article or dev blog title to an ID that can also be used as part of its URL
exports.titleToID = (title) => {
  let id = title;
  // convert any spaces to dashes
  id = id.replace(` `, `-`);
  // remove any remaining whitespace
  id = id.replace(/\s+/g, ``);
  // remove any characters that are not letters/numbers/dashes
  id = id.replace(/[^a-zA-Z0-9-]/g, ``);
  // reformat it to lowercase characters only
  id = id.toLowerCase();
  // get up to the first 40 characters of the title
  id = id.substring(0, 40);

  return id;
};

/******************************************************************************/

// converts a forum post title to an ID that can be used as part of its URL
exports.makeForumID = (title) => {
  let id = title;
  // convert any spaces to dashes
  id = id.replace(` `, `-`);
  // remove any remaining whitespace
  id = id.replace(/\s+/g, ``);
  // remove any characters that are not letters/numbers/dashes
  id = id.replace(/[^a-zA-Z0-9-]/g, ``);
  // reformat it to lowercase characters only
  id = id.toLowerCase();
  // get up to the first 32 characters of the title
  id = id.substring(0, 32);

  const idSuffix = makeKey({
    size: 7,
    isComplex: true,
  });

  id = `${id}_${idSuffix}`;

  return id;
};

/******************************************************************************/

// takes a user's socialID and reformats it, adding in the '#' before the number suffix
exports.formatID = (id) => {
  const firstPart = id.slice(0, id.length - 4);
  const lastPart = id.slice(id.length - 4, id.length);
  return `${firstPart}#${lastPart}`;
};

/******************************************************************************/

// removes the # from a formatted socialID
exports.reverseFormatID = (id) => {
  const firstPart = id.slice(0, id.length - 5);
  const lastPart = id.slice(id.length - 4, id.length);
  return `${firstPart}${lastPart}`;
};

/******************************************************************************/

//
// TODO modify this to accept an options argument
exports.timestampToDate = (timestamp) => {
  timestamp = timestamp !== undefined ? timestamp : Date.now();
  const initial = new Date(timestamp);
  const months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];
  const year = initial.getFullYear();
  // const month = months[initial.getMonth()];
  const month = this.padWithZeroes(initial.getMonth() + 1, 2);
  const date = this.padWithZeroes(initial.getDate(), 2);
  const hour = this.padWithZeroes(initial.getHours(), 2);
  const min = this.padWithZeroes(initial.getMinutes(), 2);
  const sec = this.padWithZeroes(initial.getSeconds(), 2);
  // const sec = initial.getSeconds();
  const time = `${year}-${month}-${date} ${hour}:${min}:${sec}`;
  return time;
};

/******************************************************************************/

exports.sleep = async (msec) => {
  return new Promise((resolve) => setTimeout(resolve, msec));
};

/******************************************************************************/

exports.cipher = [
  {
    symbol: `0`,
    value: 0,
  },
  {
    symbol: `1`,
    value: 1,
  },
  {
    symbol: `2`,
    value: 2,
  },
  {
    symbol: `3`,
    value: 3,
  },
  {
    symbol: `4`,
    value: 4,
  },
  {
    symbol: `5`,
    value: 5,
  },
  {
    symbol: `6`,
    value: 6,
  },
  {
    symbol: `7`,
    value: 7,
  },
  {
    symbol: `8`,
    value: 8,
  },
  {
    symbol: `9`,
    value: 9,
  },
  {
    symbol: `a`,
    value: 10,
  },
  {
    symbol: `b`,
    value: 11,
  },
  {
    symbol: `c`,
    value: 12,
  },
  {
    symbol: `d`,
    value: 13,
  },
  {
    symbol: `e`,
    value: 14,
  },
  {
    symbol: `f`,
    value: 15,
  },
  {
    symbol: `g`,
    value: 16,
  },
  {
    symbol: `h`,
    value: 17,
  },
  {
    symbol: `i`,
    value: 18,
  },
  {
    symbol: `j`,
    value: 19,
  },
  {
    symbol: `k`,
    value: 20,
  },
  {
    symbol: `l`,
    value: 21,
  },
  {
    symbol: `m`,
    value: 22,
  },
  {
    symbol: `n`,
    value: 23,
  },
  {
    symbol: `o`,
    value: 24,
  },
  {
    symbol: `p`,
    value: 25,
  },
  {
    symbol: `q`,
    value: 26,
  },
  {
    symbol: `r`,
    value: 27,
  },
  {
    symbol: `s`,
    value: 28,
  },
  {
    symbol: `t`,
    value: 29,
  },
  {
    symbol: `u`,
    value: 30,
  },
  {
    symbol: `v`,
    value: 31,
  },
  {
    symbol: `w`,
    value: 32,
  },
  {
    symbol: `x`,
    value: 33,
  },
  {
    symbol: `y`,
    value: 34,
  },
  {
    symbol: `z`,
    value: 35,
  },
];

/******************************************************************************/

// receives a string of a combined IPv6 and IPv4 address (assuming that order) and will return either one or the other or both as an object
// const exStr = `::ffff:192.168.86.1`;
// const exOptions = {
//   get: `ipv4`, // what type of IP to return from the string : 'ipv4' for IPv4, 'ipv6' for IPv6, or 'both' for an object with both IPv4 and IPv6 strings
// }
// TODO make this so it can handle a string that only contains IPv6 data - currently will only work with a string that contains only IPv4 or both IPv6 and IPv4 (and in that order)
exports.separateIP = (str, options) => {
  let result;

  // get the options or fill with defaults
  if (options === undefined || typeof options !== `object`) {
    options = {
      get: `ipv4`,
    };
  } else {
    if (options.get === undefined || typeof options.get !== `string`) {
      options.get = `ipv4`;
    } else {
      options.get = options.get.toLowerCase();
    }
  }

  let v4Start = str.lastIndexOf(`:`) + 1 || 0;
  let ipv4 = str.substring(v4Start);
  let ipv6 = str.substring(0, v4Start - 1);

  if (options.get === `ipv4`) {
    result = ipv4;
  } else if (options.get === `ipv6`) {
    result = ipv6;
  } else if (options.get === `both`) {
    result = {
      ipv4,
      ipv6,
    };
  }

  return result;
};
