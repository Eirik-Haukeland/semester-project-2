$(document).ready(function () {
  $('pre.highlight').each(function () {
    const $codeBlock = $(this);

    const $copyButton = $('<button>', {
      class: 'copy',
      type: 'button',
      'aria-label': 'Copy code to clipboard',
      text: 'Copy'
    }).appendTo($codeBlock);

    $copyButton.click(function () {
      const code = $codeBlock.find('code').text().trim();
      navigator.clipboard.writeText(code);

      $copyButton.text('Copied');

      setTimeout(function () {
        $copyButton.text('Copy');
      }, 3000);
    });
  });
});