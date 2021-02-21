//"Input Mask plugin" is better for production, but too heavy (350 kB) for test job 
//found and edited solution on Stackoverflow  - https://stackoverflow.com/a/55010378/13364610
const inputMask = function(el) {
    if (el) {
        const mask = '+7 ___ ___-__-__',
        slot = "_",
        prev = (j => Array.from(mask, (c,i) => c === slot? j=i+1: j))(0),
        first = [...mask].findIndex(c => c === slot),
        accept = new RegExp("\\d", "g"),
        clean = input => {
            input = input.match(accept) || [];
            return Array.from(mask, c =>
                (input[0] === c || c === slot) ? (input.shift() || c) : c
            );
        },
        format = () => {
            const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                i = clean(el.value.slice(0, i)).findIndex(c => c === slot);
                return i<0 ? prev[prev.length-1] : back ? (prev[i-1] || first) : i;
            });
            el.value = clean(el.value).join``;
            el.setSelectionRange(i, j);
            back = false;
        },
        setCursor = (e) => {
            if (el.selectionStart < 3) {
                e.preventDefault()
                el.setSelectionRange(3, 3);
            }
        },
        chechKey = (e) => {
            back = e.key === "Backspace"
            if (e.key === "ArrowLeft" && el.selectionStart === 3) {
               e.preventDefault()
            }

        };
        let back = false;
        format()
        el.addEventListener("keydown", chechKey);
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === mask && (el.value=""));
        el.addEventListener("click", setCursor);
    }
}
export default inputMask
