const StrUtils = {
  rpad: (msg: string, fill = ' ', width = process.stdout.columns) =>
    msg.padEnd(width, fill),

  center: (msg: string, fill = ' ', width = process.stdout.columns) => {
    const w = width + msg.length;

    const space = Math.floor(w / 2);
    return msg.padStart(space, fill).padEnd(width, fill);
  }
};

export default StrUtils;
