const $ = document.querySelector.bind(document);

const input = $<HTMLInputElement>('#input')!; //as HTMLTextAreaElement;
const formatInput = $<HTMLInputElement>('#formatInput')!;
const getContextBtn = $<HTMLButtonElement>('#get-context-btn')!;
const translateBtn = $<HTMLButtonElement>('#translate-btn')!;
const copyBtn = $<HTMLButtonElement>('#copy-btn')!;
const title = $<HTMLHeadingElement>('#title')!;

const editPromptModal = $<HTMLElement>('#edit-prompt-modal')!;
const editPromptCloseBtn = $<HTMLButtonElement>('#edit-prompt-close-btn')!;
const inputEditPrompt = $<HTMLInputElement>('#input-edit-prompt')!;
const editPromptModalOpenBtn = $<HTMLButtonElement>(
  '#edit-prompt-modal-open-btn'
)!;

const debounce = function <T extends any[]>(
  fun: (...args: T) => unknown,
  time = 500
) {
  let id: null | ReturnType<typeof setTimeout> = null;
  return function (this: any, ...args: T) {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => fun.apply(this, args), time);
  };
};
// let contextValue = JSON.parse(localStorage.getItem('context')) || '';
let isSwitch = false;
const getContext = function () {
  const valueInput = input.value.trim();
  if (valueInput) {
    // contextValue = valueInput;
    // localStorage.setItem('context', JSON.stringify(valueInput));
    // console.log({ valueInput });
    formatInput.value = '';
    formatInput.value = `
# I have this subtitle: 
${valueInput}
---
Can you tell me the context of this subtitle? Please include approximately 500 characters. Note the context of the subtitles, not the summary.
`.trim();
  }
};

const getTranslate = function () {
  const valueInput = input.value.trim();
  if (!valueInput) {
    formatInput.value = '';
    return;
  }
  // if (!contextValue) {
  //   alert('Chưa tạo context');
  //   return;
  // }
  localStorage.setItem('sampleSubtitle', valueInput);
  const prompt = localStorage.getItem('prompt') || '';
  formatInput.value = '';
  formatInput.value = `
# I have this subtitle: 
${valueInput}
---
${prompt}
`.trim();
  // console.log({ value: formatInput.value }, this);
};

// input.addEventListener('scroll',function(e){
// console.log('e', e.target.scrollTop);
// formatInput.scrollTo(0, e.target.scrollTop)
// })

function toggleModalEditPrompt(isOpen: boolean) {
  if (isOpen) {
    inputEditPrompt.value = localStorage.getItem('prompt') || '';

    editPromptModal.classList.replace('invisible', 'visible');
    editPromptModal.classList.replace('opacity-0', 'opacity-100');
  } else {
    editPromptModal.classList.replace('visible', 'invisible');
    editPromptModal.classList.replace('opacity-100', 'opacity-0');
  }
}

function savePrompt(prompt: string) {
  if (prompt && localStorage.getItem('prompt') !== prompt) {
    localStorage.setItem('prompt', prompt);
  }
}

getContextBtn.addEventListener('click', () => {
  isSwitch = false;
  formatInput.value = '';
  title.innerText = 'Prompt Get Context';
});

translateBtn.addEventListener('click', () => {
  isSwitch = true;
  input.value = '';
  formatInput.value = '';
  title.innerText = 'Translate';
});

input.addEventListener(
  'input',
  debounce(function (this: any) {
    isSwitch ? getTranslate.call(this) : getContext.call(this);
  })
);

copyBtn.addEventListener('click', async function () {
  formatInput.setSelectionRange(0, 1e5);
  await navigator.clipboard.writeText(formatInput.value);
});

editPromptModalOpenBtn.addEventListener('click', () => {
  toggleModalEditPrompt(true);
});

editPromptCloseBtn.addEventListener('click', () => {
  savePrompt(inputEditPrompt.value);
  toggleModalEditPrompt(false);
});
