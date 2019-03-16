import fetch from 'node-fetch';
import htmlparser from 'htmlparser';
import entities from 'entities';
import { select } from 'soupselect';
import DOMSelectHelpers from '../../utils/DOMSelectHelpers';

export interface SearchResults {
  artist: string | undefined;
  title: string;
  link: string;
}

export default class WikiLyrics {
  private baseUrl = 'http://lyrics.wikia.com/wiki';

  public searchLyrics = async (
    term: string,
    page: number = 1
  ): Promise<SearchResults[]> => {
    const url: string = this.buildSearchUrl(term, page);
    const res = await fetch(url);
    const content = await res.text();
    const results = [];

    this.parseHtml(content, dom => {
      const list = select(dom, 'ul.Results li.result article');

      list.forEach(item => {
        const link = DOMSelectHelpers.selectFirst(item, 'h1 a.result-link')
          .attribs.href;
        const match = DOMSelectHelpers.selectFirstChild(
          item,
          'h1 a.result-link'
        ).raw;
        const [artist, title] = match.split(':');

        results.push({ artist, title, link });
      });
    });

    return results;
  };

  public fetchLyrics = async (url: string): Promise<string> => {
    let text = '';
    const res = await fetch(url);
    const content = await res.text();

    this.parseHtml(content, dom => {
      const lyrics = DOMSelectHelpers.selectFirst(dom, 'div.lyricbox');

      lyrics.children.forEach(item => {
        if (item.type === 'text') {
          text += entities.decodeXML(item.raw);
        } else if (item.type === 'tag' && item.name === 'br') {
          text += '\n';
        }
      });
    });

    return text;
  };

  private buildSearchUrl = (term: string, page: number = 1): string =>
    `${this.baseUrl}/Special:Search?search=${term}${
      page > 1 ? `&page=${page}` : ''
    }`;

  private parseHtml = (content: string, process: (dom) => void) => {
    const handler = new htmlparser.DefaultHandler((error, dom) => {
      if (error) {
        throw new Error('PARSER ERROR: ' + error);
      }

      process(dom);
    });

    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(content);
  };
}
