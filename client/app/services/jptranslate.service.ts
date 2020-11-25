import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as xml2js from 'xml2js';

@Injectable()
export class JpTranslateService {
  KATAKANA_HIRAGANA_SHIFT = '\u3041'.charCodeAt(0) - '\u30a1'.charCodeAt(0);
  HIRAGANA_KATAKANA_SHIFT = '\u30a1'.charCodeAt(0) - '\u3041'.charCodeAt(0);

  constructor(
    private http: HttpClient
  ) {}

  isHiragana(ch) {
    ch = ch[0];
    return ch >= '\u3040' && ch <= '\u309f';
  }

  isKatakana(ch) {
    ch = ch[0];
    return ch >= '\u30a0' && ch <= '\u30ff';
  }

  isKana(ch) {
    return this.isHiragana(ch) || this.isKatakana(ch);
  }

  isKanji(ch) {
    ch = ch[0];
    return (ch >= '\u4e00' && ch <= '\u9fcf') || (ch >= '\uf900' && ch <= '\ufaff') || (ch >= '\u3400' && ch <= '\u4dbf');
  }

  isJapanese(ch) {
    return this.isKana(ch) || this.isKanji(ch);
  }

  hasHiragana(str) {
    for (let i = 0; i < str.length; i++) {
      if (this.isHiragana(str[i])) { return true; }
    }

    return false;
  }

  hasKatakana(str) {
    for (let i = 0; i < str.length; i++) {
      if (this.isKatakana(str[i])) { return true; }
    }

    return false;
  }

  hasKana(str) {
    for (let i = 0; i < str.length; i++) {
      if (this.isKana(str[i])) { return true; }
    }

    return false;
  }

  hasKanji(str) {
    for (let i = 0; i < str.length; i++) {
      if (this.isKanji(str[i])) { return true; }
    }

    return false;
  }

  hasJapanese(str) {
    for (let i = 0; i < str.length; i++) {
      if (this.isJapanese(str[i])) { return true; }
    }

    return false;
  }

  toRawHiragana(str) {
    return [...str].map((ch) => {
      if (ch > '\u30a0' && ch < '\u30f7') {
        return String.fromCharCode(ch.charCodeAt(0) + this.KATAKANA_HIRAGANA_SHIFT);
      }

      return ch;
    }).join('');
  }

  toRawKatakana(str) {
    return [...str].map((ch) => {
      if (ch > '\u3040' && ch < '\u3097') {
        return String.fromCharCode(ch.charCodeAt(0) + this.HIRAGANA_KATAKANA_SHIFT);
      }

      return ch;
    }).join('');
  }

  toRawRomaji(str) {
    const romajiSystem = {
      // 数字と記号
      '１': '1', '２': '2', '３': '3', '４': '4', '５': '5', '６': '6', '７': '7', '８': '8', '９': '9', '０': '0', '！': '!', '“': '"', '”': '"', '＃': '#', '＄': '$', '％': '%', '＆': '&', '’': '\'', '（': '(', '）': ')', '＝': '=', '～': '~', '｜': '|', '＠': '@', '‘': '`', '＋': '+', '＊': '*', '；': ';', '：': ':', '＜': '<', '＞': '>', '、': ',', '。': '.', '／': '/', '？': '?', '＿': '_', '・': '･', '「': '"', '」': '"', '｛': '{', '｝': '}', '￥': '\\', '＾': '^',

      // 直音-清音(ア～ノ)
      あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o', ア: 'a', イ: 'i', ウ: 'u', エ: 'e', オ: 'o',

      か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko', カ: 'ka', キ: 'ki', ク: 'ku', ケ: 'ke', コ: 'ko',

      さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so', サ: 'sa', シ: 'shi', ス: 'su', セ: 'se', ソ: 'so',

      た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to', タ: 'ta', チ: 'chi', ツ: 'tsu', テ: 'te', ト: 'to',

      な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no', ナ: 'na', ニ: 'ni', ヌ: 'nu', ネ: 'ne', ノ: 'no',

      // 直音-清音(ハ～ヲ)
      は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho', ハ: 'ha', ヒ: 'hi', フ: 'fu', ヘ: 'he', ホ: 'ho',

      ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo', マ: 'ma', ミ: 'mi', ム: 'mu', メ: 'me', モ: 'mo',

      や: 'ya', ゆ: 'yu', よ: 'yo', ヤ: 'ya', ユ: 'yu', ヨ: 'yo',

      ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro', ラ: 'ra', リ: 'ri', ル: 'ru', レ: 're', ロ: 'ro',

      わ: 'wa', ゐ: 'i', ゑ: 'e', を: 'o', ワ: 'wa', ヰ: 'i', ヱ: 'e', ヲ: 'o',

      // 直音-濁音(ガ～ボ)、半濁音(パ～ポ)
      が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go', ガ: 'ga', ギ: 'gi', グ: 'gu', ゲ: 'ge', ゴ: 'go',

      ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo', ザ: 'za', ジ: 'ji', ズ: 'zu', ゼ: 'ze', ゾ: 'zo',

      だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do', ダ: 'da', ヂ: 'ji', ヅ: 'zu', デ: 'de', ド: 'do',

      ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo', バ: 'ba', ビ: 'bi', ブ: 'bu', ベ: 'be', ボ: 'bo',

      ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po', パ: 'pa', ピ: 'pi', プ: 'pu', ペ: 'pe', ポ: 'po',

      // 拗音-清音(キャ～リョ)
      きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo', しゃ: 'sha', しゅ: 'shu', しょ: 'sho', ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho', にゃ: 'nya', にゅ: 'nyu', にょ: 'nyo', ひゃ: 'hya', ひゅ: 'hyu', ひょ: 'hyo', みゃ: 'mya', みゅ: 'myu', みょ: 'myo', りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo', キャ: 'kya', キュ: 'kyu', キョ: 'kyo', シャ: 'sha', シュ: 'shu', ショ: 'sho', チャ: 'cha', チュ: 'chu', チョ: 'cho', ニャ: 'nya', ニュ: 'nyu', ニョ: 'nyo', ヒャ: 'hya', ヒュ: 'hyu', ヒョ: 'hyo', ミャ: 'mya', ミュ: 'myu', ミョ: 'myo', リャ: 'rya', リュ: 'ryu', リョ: 'ryo',

      // 拗音-濁音(ギャ～ビョ)、半濁音(ピャ～ピョ)、合拗音(クヮ、グヮ)
      ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo', じゃ: 'ja', じゅ: 'ju', じょ: 'jo', ぢゃ: 'ja', ぢゅ: 'ju', ぢょ: 'jo', びゃ: 'bya', びゅ: 'byu', びょ: 'byo', ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo', // くゎ: "", // ぐゎ: "",
      ギャ: 'gya', ギュ: 'gyu', ギョ: 'gyo', ジャ: 'ja', ジュ: 'ju', ジョ: 'jo', ヂャ: 'ja', ヂュ: 'ju', ヂョ: 'jo', ビャ: 'bya', ビュ: 'byu', ビョ: 'byo', ピャ: 'pya', ピュ: 'pyu', ピョ: 'pyo', // クヮ: "", // グヮ: "",

      // 小書きの仮名、符号
      ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o', ゃ: 'ya', ゅ: 'yu', ょ: 'yo', ゎ: 'wa', ァ: 'a', ィ: 'i', ゥ: 'u', ェ: 'e', ォ: 'o', ャ: 'ya', ュ: 'yu', ョ: 'yo', ヮ: 'wa', ヵ: 'ka', ヶ: 'ke', ん: 'n', ン: 'n',
      // ー: "",
      '　': ' ',

      // 外来音(イェ～グォ)
      いぇ: 'ye', うぃ: 'wi', うぇ: 'we', うぉ: 'wo', きぇ: 'kye', くぁ: 'kwa', くぃ: 'kwi', くぇ: 'kwe', くぉ: 'kwo', ぐぁ: 'gwa', ぐぃ: 'gwi', ぐぇ: 'gwe', ぐぉ: 'gwo', イェ: 'ye', ウィ: 'wi', ウェ: 'we', ウォ: 'wo', ヴ: 'vu', ヴァ: 'va', ヴィ: 'vi', ヴェ: 've', ヴォ: 'vo', ヴュ: 'vyu', ヴョ: 'vyo', キェ: 'kya', クァ: 'kwa', クィ: 'kwi', クェ: 'kwe', クォ: 'kwo', グァ: 'gwa', グィ: 'gwi', グェ: 'gwe', グォ: 'gwo',

      // 外来音(シェ～フョ)
      しぇ: 'she', じぇ: 'je', // すぃ: "", // ずぃ: "",
      ちぇ: 'che', つぁ: 'tsa', つぃ: 'tsi', つぇ: 'tse', つぉ: 'tso', てぃ: 'ti', てゅ: 'tyu', でぃ: 'di', でゅ: 'dyu', とぅ: 'tu', どぅ: 'du', にぇ: 'nye', ひぇ: 'hye', ふぁ: 'fa', ふぃ: 'fi', ふぇ: 'fe', ふぉ: 'fo', ふゅ: 'fyu', ふょ: 'fyo', シェ: 'she', ジェ: 'je', // スィ: "", // ズィ: "",
      チェ: 'che', ツァ: 'tsa', ツィ: 'tsi', ツェ: 'tse', ツォ: 'tso', ティ: 'ti', テュ: 'tyu', ディ: 'di', デュ: 'dyu', トゥ: 'tu', ドゥ: 'du', ニェ: 'nye', ヒェ: 'hye', ファ: 'fa', フィ: 'fi', フェ: 'fe', フォ: 'fo', フュ: 'fyu', フョ: 'fyo'
    };

    const reg_tsu = /(っ|ッ)([bcdfghijklmnopqrstuvwyz])/gm;
    const reg_xtsu = /っ|ッ/gm;

    let pnt = 0;
    let ch;
    let r;
    let result = '';

    const reg_hatu = new RegExp(/(ん|ン)(?=あ|い|う|え|お|ア|イ|ウ|エ|オ|ぁ|ぃ|ぅ|ぇ|ぉ|ァ|ィ|ゥ|ェ|ォ|や|ゆ|よ|ヤ|ユ|ヨ|ゃ|ゅ|ょ|ャ|ュ|ョ)/g);
    let match;
    const indices = [];
    while ((match = reg_hatu.exec(str)) !== null) {
      indices.push(match.index + 1);
    }

    if (indices.length !== 0) {
      let mStr = '';
      for (let i = 0; i < indices.length; i++) {
        if (i === 0) {
          mStr += `${str.slice(0, indices[i])}'`;
        } else {
          mStr += `${str.slice(indices[i - 1], indices[i])}'`;
        }
      }
      mStr += str.slice(indices[indices.length - 1]);
      str = mStr;
    }

    // [ALL] kana to roman chars
    const max = str.length;
    while (pnt <= max) {
      if (r = romajiSystem[str.substring(pnt, pnt + 2)]) {
        result += r;
        pnt += 2;
      } else {
        result += (r = romajiSystem[ch = str.substring(pnt, pnt + 1)]) ? r : ch;
        pnt += 1;
      }
    }
    result = result.replace(reg_tsu, '$2$2');

    // 子音を重ねて特殊表記
    result = result.replace(/cc/gm, 'tc');
    result = result.replace(reg_xtsu, 'tsu');

    // 撥音の特殊表記 b、m、p
    result = result.replace(/nm/gm, 'mm');
    result = result.replace(/nb/gm, 'mb');
    result = result.replace(/np/gm, 'mp');

    // 長音変換
    result = result.replace(/aー/gm, 'ā');
    result = result.replace(/iー/gm, 'ī');
    result = result.replace(/uー/gm, 'ū');
    result = result.replace(/eー/gm, 'ē');
    result = result.replace(/oー/gm, 'ō');

    return result;
  }

  getStrType(str) {
    let hasKJ = false;
    let hasHK = false;
    for (let i = 0; i < str.length; i++) {
      if (this.isKanji(str[i])) {
        hasKJ = true;
      } else if (this.isHiragana(str[i]) || this.isKatakana(str[i])) {
        hasHK = true;
      }
    }

    if (hasKJ && hasHK) {
      return 1;
    } else if (hasKJ) {
      return 0;
    } else if (hasHK) {
      return 2;
    }

    return 3;
  }

  patchTokens(tokens) {
    // patch for token structure
    for (let cr = 0; cr < tokens.length; cr++) {
      if (this.hasJapanese(tokens[cr].surface_form)) {
        if (!tokens[cr].reading) {
          const splittedTokens = tokens[cr].surface_form.split('');
          splittedTokens.forEach(token => {
            if (this.isKana(token)) {
              tokens[cr].reading = this.toRawKatakana(tokens[cr].surface_form);
            } else {
              tokens[cr].reading = tokens[cr].surface_form;
            }
          });
        } else if (this.hasHiragana(tokens[cr].reading)) {
          tokens[cr].reading = this.toRawKatakana(tokens[cr].reading);
        }
      } else {
        tokens[cr].reading = tokens[cr].surface_form;
      }
    }

    // patch for 助動詞"う" after 動詞
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].pos && tokens[i].pos === '助動詞' && (tokens[i].surface_form === 'う' || tokens[i].surface_form === 'ウ')) {
        if (i - 1 >= 0 && tokens[i - 1].pos && tokens[i - 1].pos === '動詞') {
          tokens[i - 1].surface_form += 'う';

          if (tokens[i - 1].pronunciation) {
            tokens[i - 1].pronunciation += 'ー';
          } else {
            tokens[i - 1].pronunciation = `${tokens[i - 1].reading}ー`;
          }

          tokens[i - 1].reading += 'ウ';
          tokens.splice(i, 1);
          i--;
        }
      }
    }

    // patch for "っ" at the tail of 動詞、形容詞
    for (let j = 0; j < tokens.length; j++) {
      if (tokens[j].pos && (tokens[j].pos === '動詞' || tokens[j].pos === '形容詞') && tokens[j].surface_form.length > 1 && (tokens[j].surface_form[tokens[j].surface_form.length - 1] === 'っ' || tokens[j].surface_form[tokens[j].surface_form.length - 1] === 'ッ')) {
        if (j + 1 < tokens.length && tokens[j + 1].pos && (tokens[j + 1].pos === '動詞' || tokens[j + 1].pos === '助動詞')) {
          tokens[j].surface_form += tokens[j + 1].surface_form;

          if (tokens[j].pronunciation) {
            tokens[j].pronunciation += tokens[j + 1].pronunciation;
          } else {
            tokens[j].pronunciation = `${tokens[j].reading}${tokens[j + 1].reading}`;
          }

          tokens[j].reading += tokens[j + 1].reading;
          tokens.splice(j + 1, 1);
          j--;
        }
      }
    }

    return tokens;
  }

  kanaToHiragna(str) {
    return this.toRawHiragana(str);
  }

  kanaToKatakana(str) {
    return this.toRawKatakana(str);
  }

  kanaToRomaji(str) {
    return this.toRawRomaji(str);
  }

  yahooAnalyse(str) {
    const API_URL = 'api';
    const appId = 'dj00aiZpPWFPYTZ6Y29RZkh5aSZzPWNvbnN1bWVyc2VjcmV0Jng9MjU-';

    const result = [];

    return this.http.get(API_URL + '?appid=' + appId + '&sentence=' + str + '&results=ma', { responseType: 'text' });
  }

  convert(str) {
    str = str || '';

    return this.yahooAnalyse(str).toPromise().then(response => {
      const rawTokens = [];

      const parser = new xml2js.Parser({ strict: false, trim: true });
      parser.parseString(response, (err, data) => {
        if (data.RESULTSET.MA_RESULT[0].TOTAL_COUNT > 0) {
          for (let i = 0; i < data.RESULTSET.MA_RESULT[0].WORD_LIST[0].WORD.length; i++) {
            rawTokens.push({
              surface_form: data.RESULTSET.MA_RESULT[0].WORD_LIST[0].WORD[i].SURFACE[0],
              pos: data.RESULTSET.MA_RESULT[0].WORD_LIST[0].WORD[i].POS[0],
              reading: data.RESULTSET.MA_RESULT[0].WORD_LIST[0].WORD[i].READING[0]
            });
          }
        }
      });

      const tokens = this.patchTokens(rawTokens);

      const romajiConv = (token) => {
        let preToken;
        if (this.hasJapanese(token.surface_form)) {
          preToken = token.pronunciation || token.reading;
        } else {
          preToken = token.surface_form;
        }

        return this.toRawRomaji(preToken);
      };

      return tokens.map(romajiConv).join(' ');
    });
  }
}

