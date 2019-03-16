import { select } from 'soupselect';

const DOMSelectHelpers = {
  selectFirst: (dom: object, selector: string) => {
    const res = select(dom, selector);

    if (!Array.isArray(res) || res.length < 1) {
      throw new Error('NO MATCH: ' + selector);
    }

    return res[0];
  },
  selectFirstChild: (dom: object, selector: string) => {
    const res = DOMSelectHelpers.selectFirst(dom, selector);

    if (!Array.isArray(res.children) || res.children.length < 1) {
      throw new Error('NO CHILDREN: ' + selector);
    }

    return res.children[0];
  }
};

export default DOMSelectHelpers;
