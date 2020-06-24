import './polyfill';

window.addEventListener('DOMContentLoaded', () => {
  /**
   * control-type-01
   */
  (function controlType01() {
    const roots = document.querySelectorAll('.control-type-01');
    let caretIntervalId: NodeJS.Timeout;

    roots.forEach(root => {
      const label = root.querySelector('.control-type-01__label') as HTMLElement;
      const input = root.querySelector('.control-type-01__input') as HTMLInputElement;
      const caret = root.querySelector<HTMLElement>('.control-type-01__caret');

      label.addEventListener('click', () => {
        input.focus();
      });
      input.addEventListener('focus', () => {
        root.classList.add('control-type01--focus');

        if (caret) blinkCaret(caret);
      });
      input.addEventListener('blur', () => {
        if (caret) {
          clearInterval(caretIntervalId);
          caret.classList.remove('control-type-01__caret--visible');
        }
      });
      input.addEventListener('keyup', () => {
        if (caret) {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.style.fontSize = '16px';
          span.style.position = 'fixed';
          span.style.zIndex = '-1';
          span.textContent = input.value;
          root.insertAdjacentElement('beforeend', span);
          let left = span.offsetWidth;
          const inputWidth =
            input.clientWidth -
            parseInt(window.getComputedStyle(input).paddingLeft, 10) -
            parseInt(window.getComputedStyle(input).paddingRight, 10);
          if (left >= inputWidth) left = inputWidth;
          caret.style.left = `${left}px`;
          root.removeChild(span);
        }
      });
    });

    function blinkCaret(caret: Element) {
      clearInterval(caretIntervalId);
      caretIntervalId = setInterval(() => {
        caret.classList.toggle('control-type-01__caret--visible');
      }, 500);
    }
  })();

  /**
   * パスワードの表示切り替え
   */
  (document.querySelector('.js-password-switch') as HTMLElement).addEventListener('click', () => {
    const pass = document.querySelector('.js-password') as HTMLInputElement;

    if (pass.type === 'password') {
      pass.type = 'text';
    } else {
      pass.type = 'password';
    }
  });

  /**
   * バラけたinputの連続入力
   */
  (function inputSplit() {
    const root = document.querySelector('.js-input-split') as HTMLElement;

    root.addEventListener('keyup', handleKey);
    root.addEventListener('input', handleKey);

    function handleKey(event) {
      // 矢印の←と→は無視
      if (event.keyCode === 37 || event.keyCode === 39) return;
      const target = (event.target as Element).closest('input');
      if (target === null) return;

      const value = target.value;
      const next = target.nextElementSibling as HTMLInputElement | null;
      const prev = target.previousElementSibling as HTMLInputElement | null;

      // backspace
      if (event.keyCode === 8 && prev) {
        prev.focus();
      }

      if (!isNaN(parseInt(value))) {
        if (next) {
          next.focus();
        }
      }
    }
  })();

  /**
   * control-type-02
   */
  // NOTE: selectをJSで出来ない
  // (function controlType02() {
  //   document.querySelectorAll('.control-type-02').forEach(element => {
  //     element.addEventListener('click', () => {
  //       const select = element.querySelector('select');
  //       if (select) select.focus();
  //     });
  //   });
  // })();

  /**
   * hankaku
   */
  (function hankaku() {
    const input = document.querySelector('.js-input-hankaku') as HTMLInputElement;
    input.addEventListener('input', exclude);
    function exclude() {
      let value = input.value;
      value = value.replace(/[^A-Z^a-z\d-]/g, '');
      input.value = value;
    }
  })();
});
