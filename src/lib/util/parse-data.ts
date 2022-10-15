const parseDesignerData = (text: string) => {
  return Object.assign({}, ...(text
    .split(';')
    .map((x: string) => {
      const key = x.split('=')[0];
      const value = x.split('=')[1];
      if (/\[(.*)\]/.test(value)) {
        const array = ((value.match(/\[(.*)\]/) || ['', ''])[1]).split(',');
        return { [key]: array }
      }
      return { [key]: value }
    })));
}

export default parseDesignerData;