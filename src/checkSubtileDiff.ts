const $ = document.querySelector.bind(document);
/**
 * @type {HTMLInputElement} Input element for subtitle one.
 */
const subtileInputOne = $<HTMLInputElement>('#subtile-input-one')!;
/**
 * @type {HTMLInputElement} Input element for subtitle two.
 */
const subtileInputTwo = $<HTMLInputElement>('#subtile-input-two')!;
/**
 * @type {HTMLButtonElement}  Button element used to trigger check action.
 */
const checkBtn = $<HTMLButtonElement>('#check-btn')!; // as HTMLButtonElement

/**
 * @type {HTMLButtonElement}  Button element used to trigger check action.
 */
const getSampleSubBtn = $<HTMLButtonElement>('#get-sample-sub-btn')!; // as HTMLButtonElement

/**
 *
 * @param {string} subtile
 * @returns {string[]}
 */

/**
 * @type {HTMLDivElement}
 */
const modalResult = $<HTMLDivElement>('#model-result')!;
/**
 * @type {HTMLDivElement}
 */
const overlayModel = $<HTMLDivElement>('#overlay-model')!;
console.log('f');

overlayModel.addEventListener('click', function () {
  const isHidden = modalResult.classList.contains('invisible');
  modalResult.classList.toggle('invisible', !isHidden);
  overlayModel.classList.toggle('invisible', !isHidden);

  modalResult.classList.toggle('opacity-0', !isHidden);
  overlayModel.classList.toggle('opacity-0', !isHidden);
});

/**
 * @param {string} subtile
 * @returns {{line: string, times: string}[]}
 */

type BlockSubType = {
  line: string;
  times: string;
};

const parseSubtitles = (subtile: string) => {
  if (typeof subtile !== 'string') return [];
  const blocksSub = subtile.toLocaleLowerCase().trim().split('\n\n');
  const results: BlockSubType[] = [];
  blocksSub.forEach(block => {
    const component = block.split('\n');
    const [line, times] = component;
    const findTimes = times?.match(
      /(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/
    );

    // results.push(times ? times[0] : 'Không có time');
    results.push({
      line,
      times: findTimes?.[0] || 'Không có time',
    });
  });
  return results;
};

getSampleSubBtn.addEventListener('click', () => {
  subtileInputTwo.value = localStorage.getItem('sampleSubtitle') || '';
});

type ListError = {
  name: string;
  line: string;
  value: string;
};

checkBtn.addEventListener('click', () => {
  if (!subtileInputOne.value || !subtileInputTwo.value) return;
  const subtitleBlocks1 = parseSubtitles(subtileInputOne.value);
  const subtitleBlocks2 = parseSubtitles(subtileInputTwo.value);
  // console.log(subtitleBlocks1, subtitleBlocks2);

  if (subtitleBlocks1.length !== subtitleBlocks2.length) {
    alert('Hai đoạn phụ đề khác nhau về số lượng câu');
    return;
  }

  const listError: ListError[][] = [];
  subtitleBlocks1.forEach((timeSub1, index) => {
    const subItemBlock2 = subtitleBlocks2[index];
    let isDiff = subItemBlock2.times !== timeSub1.times;

    if (isDiff) {
      listError.push([
        {
          name: 'subtile cần check',
          line: timeSub1.line,
          value: timeSub1.times,
        },
        {
          name: 'subtile mẫu',
          line: subItemBlock2.line,
          value: subItemBlock2.times,
        },
      ]);
    }
  });

  if (listError.length > 0) {
    console.log(listError);
    overlayModel.classList.remove('invisible', 'opacity-0');
    modalResult.classList.remove('invisible', 'opacity-0');
    const tbody = modalResult.querySelector('table tbody')!;
    tbody.innerHTML = '';
    const markup = `
            ${listError
              .flatMap(list => list)
              .map(line => {
                return `
                <tr class="capitalize [&_th]:text-xl text-center">
                    <td class="px-5 py-2">${line.name}</td>
                    <td class="px-5 py-2">${line.line}</td>
                    <td class="px-5 py-2">${line.value}</td>
                </tr>
                `;
              })
              .join('')}`;
    tbody.insertAdjacentHTML('beforeend', markup);
    // alert('Hai đoạn phụ đề khác nhau');
    return;
  }
  alert('Hai đoạn phụ đề giống nhau');
});

subtileInputOne.addEventListener('scroll', function (e) {
  subtileInputTwo.scrollTo(0, (e.target as HTMLElement).scrollTop);
});
// console.log([
//   `24
// 00:01:27,280 --> 00:01:28,810
// trong một mảng.

// 25
// 00:01:28,810 --> 00:01:30,700
// Vì vậy, có một mảng ingredients`,
// ]);
