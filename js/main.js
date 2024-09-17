const $ = document.querySelector.bind(document);

const input = $('#input'); //as HTMLTextAreaElement;
const formatInput = $('#formatInput');
const getContextBtn = $('#get-context-btn');
const translateBtn = $('#translate-btn');
const copyBtn = $('#copy-btn');
const title = $('#title')
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
  formatInput.value = '';
  formatInput.value = `
# Requirement: “Translate this subtitle into Vietnamese.”
---
### I have this subtitle: 
\`\`\`
${valueInput}
\`\`\`
---
### Context of subtitle: 
\`\`\`
${contextValue}
\`\`\`
---
### Please do exactly what I ask. Do not modify it arbitrarily.
- Here are my specific requests:
    1.	Maintain the “correct format” of the subtitle,
    2.	"Accurately keep" the "time stamps" of the subtitle I have sent.
    3.	Keep the “correct” number “order” of the subtitle sentences, do not change the numbering or the amount of sentences in the subtitle section.
    4.	The translated sentence must make sense and be understandable when read.
    5.	Keep the main idea of the original sentence.
    6.	Ensure correct grammar and suitability to the context.
    7.	Keep the variables mentioned, terms in programming, in JavaScript untranslated.
    8.  Please check the grammar and spelling to make sure they're correct.
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
