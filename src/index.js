const { makeKey } = require(`segcryptor`);

const { BST, BinarySearchTree } = require(`./bst`);
const { cipher, cipher62 } = require(`./cipher`);
const { DLList, DoublyLinkedList } = require(`./dllist`);
const { Queue } = require(`./queue`);
const { Ring, RingBuffer, CircularQueue } = require(`./ring`);
const { LList, LinkedList } = require(`./llist`);
const { LLQueue, LinkedListQueue } = require(`./llqueue`);
const { Stack } = require(`./stack`);

/******************************************************************************/

// check if the string is empty or contains only whitespace characters
// returns undefined if the value is not empty
// returns an object with a 'error' property containing an error message if the value is empty
//
// EXAMPLE OPTIONS
// const options = {
//   type: `character string`
// };
function checkEmpty(value, options) {
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
}

/******************************************************************************/

// check if a string is too many characters in length
// returns an object with an 'error' property containing an appropriate error message if the string is too long
// returns undefined if the string is not too long
//
// EXAMPLE OPTIONS
// const options = {
//   type: `character string`,
//   max: 255,
//   ignoreWhitespace: false, // ignore whitespace characters when calculating string length
// };
function checkLong(value, options) {
  let result;
  try {
    // get the options or fill in the undefined with defaults
    if (options === undefined || typeof options !== `object`) {
      options = {
        type: `character string`,
        max: 255,
        ignoreWhitespace: false,
      };
    } else {
      if (options.type === undefined) {
        options.type = `character string`;
      }
      if (options.max === undefined) {
        options.max = 255; // use 255 as it is the max length of a VARCHAR in SQL
      }
      if (options.ignoreWhitespace === undefined) {
        options.ignoreWhitespace = false;
      }
    }

    let valueCheck = value;
    if (options.ignoreWhitespace === true) {
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
}

/******************************************************************************/

// check if a string is too few characters in length
//
// EXAMPLE OPTIONS
// const options = {
//   type: `character string`,
//   min: 1,
//   ignoreWhitespace: false,
// };
function checkShort(value, options) {
  let result;
  try {
    // get the options or fill in the undefined with defaults
    if (options === undefined || typeof options !== `object`) {
      options = {
        type: `character string`,
        min: 1,
        ignoreWhitespace: false,
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
      if (options.ignoreWhitespace === undefined) {
        options.ignoreWhitespace = false;
      } else {
        options.ignoreWhitespace = this.toBoolean(options.ignoreWhitespace);
      }
    }

    let valueCheck = value;
    if (options.ignoreWhitespace === true) {
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
}

/******************************************************************************/

// checks to ensure that string meets the expectations of a regular expression
// returns undefined if the string matches the regex requirements
// returns an object with 'error' and possibly 'exception' properties containing information on the issue with the string
//
// EXAMPLE OPTIONS
// const options = {
//   type: `data value`,
// };
function checkRegex(value, regex, options) {
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
}

/******************************************************************************/

// converts a string or numeric value to a boolean true or false
function toBoolean(value) {
  if (typeof value === `number`) {
    if (value === 1) {
      return true;
    }
    return false;
  }
  if (typeof value === `string`) {
    value = value.toLowerCase();
    if (
      value === `true` || value === `yes` || value === `1` || value === `on` || value === `high`
    ) {
      return true;
    }
    if (
      value === `false` || value === `no` || value === `0` || value === `off` || value === `low`
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
}

/******************************************************************************/

// takes a number and returns a string padded to the left with a certain number of zeroes
//  where number is the number value to be turned into a string and padded
//        length is the total length the resulting string should be
function padWithZeroes(number, length) {
  let str = `${number}`;

  while (str.length < length) {
    str = `0${str}`;
  }

  return str;
}

/******************************************************************************/

// converts a news article or dev blog title to an ID that can also be used as part of its URL
function titleToID(title, max) {
  let id = title;

  // default to 40 maximum characters
  max = max !== undefined ? max : 40;

  // reformat it to lowercase characters only
  id = id.toLowerCase();
  // convert any whitespace to dashes
  id = id.replace(/\s+/g, `-`);
  // remove any characters that are not letters/numbers/dashes
  id = id.replace(/[^a-z0-9-]/g, ``);
  // get up to the first 40 characters of the title
  id = id.substring(0, max);

  return id;
}

/******************************************************************************/

// converts a forum post title to an ID that can be used as part of its URL
// a certain number of the last characters are randomly generated to help ensure the ID is unique
function makeForumID(title, max, suffixLength) {
  let id = title;

  // default to 40 maximum characters
  max = max !== undefined ? max : 40;
  suffixLength = suffixLength !== undefined ? suffixLength : 8;

  // reformat it to lowercase characters only
  id = id.toLowerCase();
  // convert any whitespace to dashes
  id = id.replace(/\s+/g, `-`);
  // remove any characters that are not letters/numbers/dashes
  id = id.replace(/[^a-z0-9-]/g, ``);
  // get the first certain number of characters (max - suffixLength)
  id = id.substring(0, (max - suffixLength));

  const idSuffix = makeKey({
    size: suffixLength,
    isComplex: true,
  });

  id = `${id}${idSuffix}`;

  return id;
}

/******************************************************************************/

// takes a user's socialID and reformats it, adding in the '#' before the number suffix
function formatID(id) {
  const firstPart = id.slice(0, id.length - 4);
  const lastPart = id.slice(id.length - 4, id.length);
  return `${firstPart}#${lastPart}`;
}
const formatSocial = formatID;

/******************************************************************************/

// removes the # from a formatted socialID
function reverseFormatID(id) {
  const firstPart = id.slice(0, id.length - 5);
  const lastPart = id.slice(id.length - 4, id.length);
  return `${firstPart}${lastPart}`;
}
const deformatSocial = reverseFormatID;

/******************************************************************************/

//
// TODO modify this to accept an options argument
function timestampToDate(timestamp) {
  // generate a timestamp using the current time if no timestamp was provided as an argument for the function
  timestamp = timestamp !== undefined ? timestamp : Date.now();

  // create a javascript date object from the timestamp data
  const dateObj = new Date(timestamp);
  // const months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];
  const year = dateObj.getFullYear();
  // const month = months[dateObj.getMonth()];
  // increment the month by 1 because the javascript date object starts the months at 0 for january
  const month = padWithZeroes(dateObj.getMonth() + 1, 2);
  const date = padWithZeroes(dateObj.getDate(), 2);
  const hour = padWithZeroes(dateObj.getHours(), 2);
  const min = padWithZeroes(dateObj.getMinutes(), 2);
  const sec = padWithZeroes(dateObj.getSeconds(), 2);
  // const sec = initial.getSeconds();
  const time = `${year}-${month}-${date} ${hour}:${min}:${sec}`;
  return time;
}

/******************************************************************************/

async function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

/******************************************************************************/

// receives a string of a combined IPv6 and IPv4 address (assuming that order) and will return either one or the other or both as an object
// const exStr = `::ffff:192.168.86.1`;
// const exOptions = {
//   get: `ipv4`, // what type of IP to return from the string : 'ipv4' for IPv4, 'ipv6' for IPv6, or 'both' for an object with both IPv4 and IPv6 strings
// }
// TODO make this so it can handle a string that only contains IPv6 data - currently will only work with a string that contains only IPv4 or both IPv6 and IPv4 (and in that order)
function separateIP(str, options) {
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
}

/******************************************************************************/

/**
* Truncates a floating-point number to a specified number of decimal places.
*
* @param {number} value - The floating-point number to truncate.
* @param {number} [precision=0] - The number of decimal places to keep.
* @return {number} The truncated floating-point number.
**/
function truncateFloat(value, precision) {
  if (precision === undefined) {
    precision = 0;
  }

  // Ensure the multiplier is a float
  let pMult = 1.0;
  let i = 0;
  while (i < precision) {
    pMult *= 10;
    i += 1;
  }

  // Multiply the value by the precision multiplier,
  // convert it to int (discarding any pesky leftover decimals)
  // and float-divide it by the same multiplier
  return Math.floor(value * pMult) / pMult;
}
const truncFloat = truncateFloat;

/******************************************************************************/

module.exports = {
  cipher,
  cipher62,
  BST,
  BinarySearchTree,
  DLList,
  DoublyLinkedList,
  Queue,
  Ring,
  RingBuffer,
  CircularQueue,
  LList,
  LinkedList,
  LLQueue,
  LinkedListQueue,
  Stack,
  checkEmpty,
  checkLong,
  checkShort,
  checkRegex,
  toBoolean,
  padWithZeroes,
  titleToID,
  makeForumID,
  formatID,
  formatSocial,
  reverseFormatID,
  deformatSocial,
  timestampToDate,
  sleep,
  separateIP,
  truncateFloat,
  truncFloat,
};
