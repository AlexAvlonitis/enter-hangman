export const readFile = (file) => {
  const f = new XMLHttpRequest();
  let wordsArray = [];
  f.open("GET", file, false);
  f.onreadystatechange = () => {
    if(f.readyState === 4) {
      if(f.status === 200 || f.status === 0) {
        let res = f.responseText;
        res.split("\n").map((word) => { wordsArray.push(word) })
      }
    }
  }
  f.send(null);
  return wordsArray;
}
