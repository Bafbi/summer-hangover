// src/utils/debug.ts
export function checkUndefinedParams(params: any[]) {
    params.forEach((param, index) => {
      if (param === undefined) {
        console.error(`Parameter at index ${index} is undefined`);
        throw new Error(`Parameter at index ${index} is undefined`);
      }
    });
  }
  