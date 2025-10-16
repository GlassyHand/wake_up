function interactExitPassword() {
    var password = prompt('나의 이름은...');
    if (password === 'JOHAN') {
      alert('문이 열렸다.');
      var exitElement = document.getElementById('exit-door');
      if (exitElement) {
        var img = exitElement.querySelector('img');
        if (img) img.src = 'img/north/exitOpened.png';
      }
    } else if (password !== null) {
      alert('아무 일도 일어나지 않았다...');
    }
  }
  
  function interactFallenLetter() {
    openOverlay('img/north/fallenLetter_zoom.png');}
  
  function interactFlowerpot() {
    window.__overlayContext = 'flowerpot';
    if (window.__flowerpotOpened) {
      openOverlay('img/north/flowerpotOpened_zoom.png');
      return;
    }
    openOverlay('img/north/flowerpotClosed_zoom.png');}
  
  function handleFlowerpotOverlayClick() {
    if (window.__flowerpotOpened) return;
    var selectedSlot = document.querySelector('#inventory .inventory-slot.selected');
    var hasFullCan = selectedSlot && selectedSlot.querySelector('img') &&
                     selectedSlot.querySelector('img').src.includes('item_wateringcan_full.png');
    if (!hasFullCan) return;
    window.__flowerpotOpened = true;
    openOverlay('img/north/flowerpotOpened_zoom.png');
    var potElement = document.getElementById('flowerpot-closed');
    if (potElement) {
      var img = potElement.querySelector('img');
      if (img) img.src = 'img/north/flowerpotOpened.png';
    }
  }





  document.addEventListener('DOMContentLoaded', function() {
    var exitDoor = document.getElementById('exit-door');
    if (!exitDoor) return;
    exitDoor.addEventListener('click', function() {
      var img = exitDoor.querySelector('img');
      if (img && img.src && img.src.includes('exitOpened.png')) {
        if (typeof showEnding === 'function') {
          showEnding();
        }
      }
    });
  });