import moment from 'moment';

export const browserUtils = {
  formatPhoneNumber(phone: string) {
    const numbers = phone.match(/[0-9]/g);

    if (numbers == null) return '';

    const chunks = [numbers.join('').slice(0, 3), numbers.join('').slice(3, 7), numbers.join('').slice(7, 11)];

    return chunks.filter((v) => v.length > 0).join('-');
  },

  formatResidentRegistrationNo(code: string) {
    const numbers = code.match(/[0-9]/g);

    if (numbers == null) return '';
    const chunks = [numbers.join('').slice(0, 6), numbers.join('').slice(6, 13)];

    return chunks.filter((v) => v.length > 0).join('-');
  },

  formatCurrency(amount: number, currency: string) {
    if (!amount) return '0 ' + currency;
    const text = amount.toString();
    let result = '';
    for (let i: number = 0; i < amount.toString().length; i++) {
      result = text.charAt(amount.toString().length - i - 1) + result;

      if (i % 3 == 2 && text.charAt(amount.toString().length - i - 2)) result = ',' + result;
    }

    return result + ' ' + currency;
  },

  formatFloatText(value: string): string {
    // 숫자랑 . 만 남기고 없앰
    const found = value.match(/([0-9]|\.)/g);
    let result = found == null ? '' : found.join('');

    if (result.split('.').length > 2) {
      return this.formatFloatText(result.split('.').slice(0, -1).join('.'));
    }

    if (result.endsWith('.')) {
      return String(Number(result)) + '.';
    } else {
      return String(Number(result));
    }
  },

  formatNumber(value: string): number {
    const matches = value.match(/[0-9]/g);
    if (matches) {
      return Number(matches.join(''));
    } else {
      return 0;
    }
  },

  formatNumberStr(value: string): string {
    const matches = value.match(/[0-9]/g);
    if (matches) {
      return matches.join('');
    } else {
      return '';
    }
  },

  toPercent(ratio: number) {
    return `${ratio * 100}%`;
  },

  isEmail(emailstr: string): boolean {
    console.log(emailstr.match(/[a-zA-Z0-9]{3,}.@.[a-zA-Z0-9]{3,}.[a-zA-Z0-9]{2,}/g));
    return Boolean(emailstr.match(/[a-zA-Z0-9]{3,}.@.[a-zA-Z0-9]{3,}.[a-zA-Z0-9]{2,}/g));
  },

  formatDateStr(datestr: string) {
    return moment(datestr).format('YYYY-MM-DD');
  },

  formatBusinessRegistrationCode(code: string) {
    const numbers = code.match(/[0-9]/g);

    if (numbers == null) return '';

    const chunks = [numbers.join('').slice(0, 3), numbers.join('').slice(3, 5), numbers.join('').slice(5, 10)];

    return chunks.filter((v) => v.length > 0).join('-');
  },

  parseYoutubeUrl(text: string) {
    const fullurlregex = new RegExp(/(https:\/\/www.youtube.com\/watch\?)/g);
    const shorturlregex = new RegExp(/https:\/\/youtu.be/g);

    const isShort = text.match(shorturlregex) != null;
    const isFull =
      text.match(fullurlregex) != null &&
      text
        .replace(fullurlregex, '')
        .split('&')
        .filter((v) => v.startsWith('v=')).length > 0;

    // https://youtu.be/Pkzvr4brEV8
    let embedId;

    if (isFull) {
      embedId = text
        .replace(fullurlregex, '')
        .split('&')
        .filter((v) => v.startsWith('v='))[0]
        .slice(2);
    } else if (isShort) {
      embedId = text.replace(shorturlregex, '').slice(1);
    } else {
      embedId = null;
    }

    return {
      isValid: isShort || isFull,
      embedId,
    };
  },

  async resizeFile(originFile: File, maxWidth = 800): Promise<File> {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(originFile);
        reader.onload = (e) => {
          if (!e.target || typeof e.target.result !== 'string') return reject();
          const originImg = document.createElement('img');
          originImg.src = e.target.result as string;
          const meta = e.target.result.split(',')[0];

          originImg.onload = () => {
            const scaleSize = maxWidth / originImg.width;
            const [width, height] = [
              Math.min(originImg.width, originImg.width * scaleSize),
              Math.min(originImg.height, originImg.height * scaleSize),
            ];
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const canvasCtx = canvas.getContext('2d');
            canvasCtx?.drawImage(originImg, 0, 0, width, height);

            const blobBin = atob(canvas.toDataURL().split(',')[1]);
            const array: any[] = [];
            for (let i = 0; i < blobBin.length; i++) {
              array.push(blobBin.charCodeAt(i));
            }

            const type = meta.split(';')[0].split(':')[1];
            const blob = new Blob([new Uint8Array(array)], { type });

            resolve(new File([blob], originFile.name));
          };
        };
      } catch (err) {
        reject(err);
      }
    });
  },

  parseCookie(_cookies: string): { [cookieName: string]: string } {
    let cookies = _cookies.split(';').map((v) => v.trim().split('=') as [string, string]);

    return cookies.reduce((result, [key, value]) => {
      result[key] = value;

      return result;
    }, {} as { [cookieName: string]: string });
  },
};
