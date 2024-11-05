const $ = document.querySelector.bind(document);

const input = $('#input'); //as HTMLTextAreaElement;
const formatInput = $('#formatInput');
const getContextBtn = $('#get-context-btn');
const translateBtn = $('#translate-btn');
const copyBtn = $('#copy-btn');
const title = $('#title');

const editPromptModal = $('#edit-prompt-modal');
const editPromptCloseBtn = $('#edit-prompt-close-btn');
const inputEditPrompt = $('#input-edit-prompt');
const editPromptModalOpenBtn = $('#edit-prompt-modal-open-btn');
const debounce = function (fun, time = 500) {
  let id = null;
  return function (...arg) {
    clearTimeout(id);
    id = setTimeout(fun.bind(this, ...arg), time);
  };
};

let contextValue = JSON.parse(localStorage.getItem('context'));
let isSwitch = false;
const getContext = function () {
  const valueInput = input.value;
  if (!valueInput) {
    return;
  }
  contextValue = valueInput;
  localStorage.setItem('context', JSON.stringify(valueInput));
  console.log({ valueInput });
};

const getTranslate = function () {
  const valueInput = input.value.trim();
  if (!valueInput) {
    formatInput.value = '';
    return;
  }
  if (!contextValue) {
    alert('Chưa tạo context');
    return;
  }
  localStorage.setItem('sampleSubtitle', valueInput);
  const prompt = localStorage.getItem('prompt');
  formatInput.value = '';
  formatInput.value = `
# Requirement: “Translate this subtitle into Vietnamese.”
---
### I have this subtitle: 
<p>
${valueInput}
</p>
---
### Context of subtitle: 
<p>
${contextValue}
</p>
---
${prompt}
`.trim();
  console.log({ value: formatInput.value }, this);
};

getContextBtn.addEventListener('click', () => {
  isSwitch = false;
  input.value = contextValue;
  formatInput.value = '';
  title.innerText = 'Context';
});

translateBtn.addEventListener('click', () => {
  isSwitch = true;
  input.value = '';
  formatInput.value = '';
  title.innerText = 'Translate';
});

input.addEventListener(
  'input',
  debounce(() => {
    isSwitch ? getTranslate() : getContext();
  })
);

// input.addEventListener('scroll',function(e){
// console.log('e', e.target.scrollTop);
// formatInput.scrollTo(0, e.target.scrollTop)
// })
copyBtn.addEventListener('click', async function () {
  formatInput.setSelectionRange(0, 1e5);
  await navigator.clipboard.writeText(formatInput.value);
});

function toggleModalEditPrompt(isOpen) {
  if (isOpen) {
    inputEditPrompt.value = localStorage.getItem('prompt');
    editPromptModal.classList.remove('invisible', 'opacity-0');
    editPromptModal.classList.add('visible', 'opacity-100');
  } else {
    editPromptModal.classList.remove('visible', 'opacity-100');
    editPromptModal.classList.add('invisible', 'opacity-0');
  }
}

editPromptModalOpenBtn.addEventListener('click', () => {
  toggleModalEditPrompt(true);
});

function savePrompt(prompt) {
  if (!prompt) return;
  const promptStore = localStorage.getItem('prompt');
  if (promptStore.includes(prompt)) {
    return;
  }
  localStorage.setItem('prompt', prompt);
}

editPromptCloseBtn.addEventListener('click', () => {
  savePrompt(inputEditPrompt.value);
  toggleModalEditPrompt(false);
});
