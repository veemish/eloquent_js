let text = " 'I'm the coock,' he said, 'it's my job.' ";

console.log(text.replace(/(^|\W)'|'(\W|$)/g,'$1"2'));
//"I'm the cook," he said, "it's my job."